"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, UploadCloud, FileAudio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import WaveformPreview from "./WaveformPreview";

export default function UploadVoiceForm() {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("audio/")) {
        toast({ variant: "destructive", title: "Invalid File", description: "Please upload an audio file." });
        return;
      }
      if (file.size > 50 * 1024 * 1024) {
        toast({ variant: "destructive", title: "Too Large", description: "Max file size is 50MB." });
        return;
      }
      setAudioFile(file);
      setOriginalFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setAudioDataUri(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(formRef.current!);

    if (audioDataUri && originalFileName) {
      formData.append("audioDataUri", audioDataUri);
      formData.append("originalFileName", originalFileName);
    }

    try {
      const res = await fetch("/api/upload-voice", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (result.success) {
        toast({ title: "Success", description: result.message });
        formRef.current?.reset();
        setAudioFile(null);
        setAudioDataUri(null);
        setOriginalFileName("");
      } else {
        throw new Error(result.error || "Unknown error.");
      }
    } catch (err: any) {
      setError(err.message);
      toast({ variant: "destructive", title: "Upload Failed", description: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Voice Sample</CardTitle>
        <CardDescription>Upload a clean audio sample (30s - 5min) to clone a voice.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} ref={formRef}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="voiceName">Voice Name</Label>
            <Input id="voiceName" name="voiceName" placeholder="e.g., My Narrator Voice" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="audioFile">Audio File</Label>
            <Input id="audioFile" type="file" accept="audio/*" onChange={handleFileChange} required />
            {audioFile && (
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <FileAudio className="mr-2 h-4 w-4" />
                <span>{audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            )}
          </div>

          {audioDataUri && <WaveformPreview audioDataUri={audioDataUri} />}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload and Process Voice
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
