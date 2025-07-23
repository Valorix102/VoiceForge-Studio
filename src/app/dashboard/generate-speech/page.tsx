// src/app/dashboard/generate-speech/page.tsx
import SpeechGenerationForm from "@/components/dashboard/speech-generation/SpeechGenerationForm";
import { getClonedVoices } from "@/actions/voiceActions"; // Mocked action
import type { Voice } from "@/components/dashboard/voices/VoiceCard";
import { AlertTriangle } from "lucide-react";

export default async function GenerateSpeechPage() {
  const { voices, error } = await getClonedVoices();

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading Voices</h1>
        <p className="text-muted-foreground mb-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
       <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Text-to-Speech</h1>
        <p className="text-muted-foreground">Convert your text into natural-sounding speech using your cloned voices.</p>
      </div>
      <SpeechGenerationForm availableVoices={voices as Voice[]} />
    </div>
  );
}

// src/app/dashboard/generations/page.tsx
import GenerationHistoryItem from "@/components/dashboard/generations/GenerationHistoryItem";
import { getGenerationHistory, type GenerationResult } from "@/actions/generationActions"; // Mocked action
import { AlertTriangle, History } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function GenerationsHistoryPage() {
  const { generations, error } = await getGenerationHistory(20); // Fetch last 20 generations

  if (error) {
    return (
      <div className="container mx-auto py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive mb-2">Error Loading History</h1>
        <p className="text-muted-foreground mb-6">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Generation History</h1>
        <p className="text-muted-foreground">Review your past speech generations.</p>
      </div>

      {generations.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-card">
          <Image src="https://placehold.co/300x200.png" alt="No generations yet" width={300} height={200} className="mx-auto mb-6 rounded-md" data-ai-hint="empty document list" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Generations Yet</h2>
          <p className="text-muted-foreground mb-6">
            You haven&apos;t generated any speech. Try creating some audio using your cloned voices.
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard/generate-speech">
              <History className="mr-2 h-5 w-5" /> Generate Speech
            </Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {generations.map((gen) => (
            <GenerationHistoryItem key={gen.id} generation={gen as GenerationResult} />
          ))}
        </div>
      )}
    </div>
  );
}
