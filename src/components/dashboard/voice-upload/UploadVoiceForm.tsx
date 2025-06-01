// src/components/dashboard/voice-upload/UploadVoiceForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { uploadAndProcessVoice } from "@/actions/voiceActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, UploadCloud, FileAudio } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState, useRef } from "react";
import WaveformPreview from "./WaveformPreview"; // Placeholder component

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <UploadCloud className="mr-2 h-4 w-4" />
      Upload and Process Voice
    </Button>
  );
}

export default function UploadVoiceForm() {
  const { toast } = useToast();
  const [state, formAction] = useFormState(uploadAndProcessVoice, { success: false, error: null, message: null });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [originalFileName, setOriginalFileName] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);


  useEffect(() => {
    if (state.success && state.message) {
      toast({ title: "Success", description: state.message });
      formRef.current?.reset();
      setAudioFile(null);
      setAudioDataUri(null);
      setOriginalFileName("");
    } else if (state.error) {
      toast({ variant: "destructive", title: "Error", description: String(state.error) });
    }
  }, [state, toast]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Basic validation (can be expanded)
      if (!file.type.startsWith("audio/")) {
        toast({ variant: "destructive", title: "Invalid File Type", description: "Please upload an audio file." });
        return;
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast({ variant: "destructive", title: "File Too Large", description: "Maximum file size is 50MB." });
        return;
      }
      setAudioFile(file);
      setOriginalFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => setAudioDataUri(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Upload Voice Sample</CardTitle>
        <CardDescription>Upload a clean audio sample (30s - 5min) to clone a voice. Supported formats: WAV, MP3.</CardDescription>
      </CardHeader>
      <form action={formAction} ref={formRef}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="voiceName">Voice Name</Label>
            <Input id="voiceName" name="voiceName" placeholder="e.g., My Narrator Voice" required />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="audioFile">Audio File</Label>
            <Input id="audioFile" type="file" accept="audio/wav, audio/mpeg" onChange={handleFileChange} required />
            {audioFile && (
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <FileAudio className="mr-2 h-4 w-4" />
                <span>{audioFile.name} ({(audioFile.size / 1024 / 1024).toFixed(2)} MB)</span>
              </div>
            )}
          </div>

          {audioDataUri && <WaveformPreview audioDataUri={audioDataUri} />}
          
          {/* Hidden inputs for data URI and original file name to be submitted with the form */}
          {audioDataUri && <input type="hidden" name="audioDataUri" value={audioDataUri} />}
          {originalFileName && <input type="hidden" name="originalFileName" value={originalFileName} />}

          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Upload Error</AlertTitle>
              <AlertDescription>{String(state.error)}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
