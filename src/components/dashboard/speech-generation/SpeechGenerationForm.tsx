// src/components/dashboard/speech-generation/SpeechGenerationForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { generateSpeech, type GenerationResult } from "@/actions/generationActions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2, PlayCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import type { Voice } from "@/components/dashboard/voices/VoiceCard";
import AudioPlayer from "./AudioPlayer";

interface SpeechGenerationFormProps {
  availableVoices: Voice[]; // Pass available voices as a prop
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <Sparkles className="mr-2 h-4 w-4" />
      Generate Speech
    </Button>
  );
}

export default function SpeechGenerationForm({ availableVoices }: SpeechGenerationFormProps) {
  const { toast } = useToast();
  const [state, formAction] = useFormState(generateSpeech, { success: false, error: null, generation: null });
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null);
  const [generatedFileName, setGeneratedFileName] = useState<string>("generated_speech.mp3");

  useEffect(() => {
    if (state.success && state.message && state.generation) {
      toast({ title: "Success", description: state.message });
      setGeneratedAudioUrl(state.generation.downloadURL);
      setGeneratedFileName(`${state.generation.voiceName.replace(/\s+/g, "_")}_${state.generation.id}.mp3`);
    } else if (state.error) {
      toast({ variant: "destructive", title: "Error", description: String(state.error) });
      setGeneratedAudioUrl(null);
    }
  }, [state, toast]);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Generate Speech</CardTitle>
        <CardDescription>Enter text, select a voice, and generate audio. Unlimited generations!</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="text">Text to Synthesize</Label>
            <Textarea
              id="text"
              name="text"
              placeholder="Type or paste your text here... (max 5000 characters)"
              rows={6}
              required
              maxLength={5000}
            />
            {/* Add character count if desired */}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="voiceId">Select Voice</Label>
            <Select name="voiceId" required>
              <SelectTrigger id="voiceId">
                <SelectValue placeholder="Choose a cloned voice" />
              </SelectTrigger>
              <SelectContent>
                {availableVoices.length > 0 ? (
                  availableVoices.map((voice) => (
                    <SelectItem key={voice.id} value={voice.id}>
                      {voice.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>No voices available. Please upload a voice first.</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {state.error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Generation Error</AlertTitle>
              <AlertDescription>{String(state.error)}</AlertDescription>
            </Alert>
          )}
          
          <AudioPlayer audioUrl={generatedAudioUrl} fileName={generatedFileName} />

        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
