// src/components/voices/VoiceCustomizationPanel.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ParameterSlider from "./ParameterSlider";
import type { Voice } from "@/components/dashboard/voices/VoiceCard"; // Assuming Voice type is defined here
import { getAISuggestionsForVoice, updateVoiceCustomization } from "@/actions/voiceActions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Save, Wand2, RotateCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea"; // For voice description

interface VoiceCustomizationPanelProps {
  voice: Voice;
}

// Define default values for the form
const defaultCustomizations = {
  pitch: 0,
  bassDepth: 50,
  tempo: 1.0,
  clarity: 75,
  emotion: "neutral" as "neutral" | "angry" | "excited" | "calm" | "sad",
  naturalness: 80,
  accent: "US" as "US" | "UK" | "Indian" | "Australian" | "Other",
};

export default function VoiceCustomizationPanel({ voice }: VoiceCustomizationPanelProps) {
  const { toast } = useToast();
  const [customizations, setCustomizations] = useState({
    pitch: voice.pitch ?? defaultCustomizations.pitch,
    bassDepth: (voice as any).bassDepth ?? defaultCustomizations.bassDepth, // Assuming bassDepth might be on voice
    tempo: (voice as any).tempo ?? defaultCustomizations.tempo,
    clarity: (voice as any).clarity ?? defaultCustomizations.clarity,
    emotion: (voice.emotion as any) ?? defaultCustomizations.emotion,
    naturalness: (voice as any).naturalness ?? defaultCustomizations.naturalness,
    accent: (voice as any).accent ?? defaultCustomizations.accent,
  });
  const [voiceDescription, setVoiceDescription] = useState("A clear, professional voice for narration."); // Default description
  const [isSaving, setIsSaving] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const handleValueChange = (param: keyof typeof customizations, value: any) => {
    setCustomizations((prev) => ({ ...prev, [param]: value }));
  };
  
  const resetToDefaults = () => {
    setCustomizations({
      pitch: voice.pitch ?? defaultCustomizations.pitch,
      bassDepth: (voice as any).bassDepth ?? defaultCustomizations.bassDepth,
      tempo: (voice as any).tempo ?? defaultCustomizations.tempo,
      clarity: (voice as any).clarity ?? defaultCustomizations.clarity,
      emotion: (voice.emotion as any) ?? defaultCustomizations.emotion,
      naturalness: (voice as any).naturalness ?? defaultCustomizations.naturalness,
      accent: (voice as any).accent ?? defaultCustomizations.accent,
    });
    toast({ title: "Settings Reset", description: "Customizations reset to original values." });
  };

  const handleGetSuggestions = async () => {
    if (!voice.downloadURL) {
      toast({ variant: "destructive", title: "Error", description: "Voice audio URL not found. Cannot get suggestions." });
      return;
    }
    setIsSuggesting(true);
    // This is a conceptual representation. In a real scenario, you'd need to fetch the actual audio data
    // if the AI flow requires the raw audio bytes/data URI instead of a URL.
    // For now, we assume `voice.downloadURL` can be converted or used if the AI accepts URLs.
    // The `voiceSuggestions` flow expects a data URI. We'll mock this for now.
    // A proper implementation would fetch the audio from downloadURL and convert it to data URI.
    const mockAudioDataUri = "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAVFYAAFRWAAABAAgAZGF0YQAAAAA="; // Tiny valid WAV
    
    const result = await getAISuggestionsForVoice(mockAudioDataUri, voiceDescription);
    if (result.success && result.suggestions) {
      const { suggestedPitch, suggestedTone, suggestedClarity, suggestedTempo } = result.suggestions;
      setCustomizations(prev => ({
        ...prev,
        pitch: suggestedPitch ?? prev.pitch,
        emotion: (suggestedTone as any) ?? prev.emotion,
        clarity: parseFloat(suggestedClarity ?? String(prev.clarity)) || prev.clarity, // Ensure clarity is number
        tempo: (suggestedTempo ? suggestedTempo / 100 + 1 : prev.tempo) // Assuming tempo suggestion is % change
      }));
      toast({ title: "AI Suggestions Applied", description: "Review and save the new settings." });
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error || "Failed to get AI suggestions." });
    }
    setIsSuggesting(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSaving(true);
    const result = await updateVoiceCustomization(voice.id, customizations);
    if (result.success) {
      toast({ title: "Success", description: result.message });
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
    setIsSaving(false);
  };

  const emotionOptions = ["neutral", "angry", "excited", "calm", "sad"];
  const accentOptions = ["US", "UK", "Indian", "Australian", "Other"];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customize Voice: {voice.name}</CardTitle>
        <CardDescription>Adjust the parameters to fine-tune your cloned voice. Changes will be applied for future generations.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ParameterSlider id="pitch" label="Pitch" value={customizations.pitch} onValueChange={(v) => handleValueChange("pitch", v)} min={-100} max={100} step={1} unit="%" />
            <ParameterSlider id="bassDepth" label="Bass/Depth" value={customizations.bassDepth} onValueChange={(v) => handleValueChange("bassDepth", v)} min={0} max={100} step={1} unit="%" />
            <ParameterSlider id="tempo" label="Tempo" value={customizations.tempo} onValueChange={(v) => handleValueChange("tempo", v)} min={0.1} max={3.0} step={0.05} unit="x" />
            <ParameterSlider id="clarity" label="Clarity" value={customizations.clarity} onValueChange={(v) => handleValueChange("clarity", v)} min={0} max={100} step={1} unit="%" />
            <ParameterSlider id="naturalness" label="Naturalness" value={customizations.naturalness} onValueChange={(v) => handleValueChange("naturalness", v)} min={0} max={100} step={1} unit="%" />
            
            <div className="space-y-2">
              <Label htmlFor="emotion">Emotional Tone</Label>
              <Select name="emotion" value={customizations.emotion} onValueChange={(v) => handleValueChange("emotion", v as any)}>
                <SelectTrigger id="emotion"><SelectValue placeholder="Select emotion" /></SelectTrigger>
                <SelectContent>
                  {emotionOptions.map(opt => <SelectItem key={opt} value={opt}>{opt.charAt(0).toUpperCase() + opt.slice(1)}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="accent">Accent</Label>
              <Select name="accent" value={customizations.accent} onValueChange={(v) => handleValueChange("accent", v as any)}>
                <SelectTrigger id="accent"><SelectValue placeholder="Select accent" /></SelectTrigger>
                <SelectContent>
                  {accentOptions.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <Label htmlFor="voiceDescription">Voice Description (for AI Suggestions)</Label>
            <Textarea 
              id="voiceDescription" 
              value={voiceDescription} 
              onChange={(e) => setVoiceDescription(e.target.value)}
              placeholder="e.g., A deep, authoritative voice for documentary narration."
              rows={3}
            />
            <Button type="button" variant="outline" onClick={handleGetSuggestions} disabled={isSuggesting || !voice.downloadURL}>
              {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
              Get AI Suggestions
            </Button>
            {!voice.downloadURL && <p className="text-xs text-destructive">Voice audio not available for AI suggestions.</p>}
          </div>

        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={resetToDefaults} disabled={isSaving}>
            <RotateCcw className="mr-2 h-4 w-4" /> Reset
          </Button>
          <Button type="submit" disabled={isSaving}>
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
