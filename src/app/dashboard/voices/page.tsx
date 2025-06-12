// src/app/dashboard/voices/page.tsx
import VoiceCard, { type Voice } from "@/components/dashboard/voices/VoiceCard";
import { Button } from "@/components/ui/button";
import { getClonedVoices } from "@/actions/voiceActions"; // Mocked action
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function ManageVoicesPage() {
  const { voices, error } = await getClonedVoices();

  if (error) {
    return <div className="container mx-auto py-8 text-red-500">Error fetching voices: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Manage Voices</h1>
          <p className="text-muted-foreground">View, customize, and manage your cloned voices.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/voice-upload">
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Voice
          </Link>
        </Button>
      </div>

      {voices.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-card">
          <Image src="https://placehold.co/300x200.png" alt="No voices found" width={300} height={200} className="mx-auto mb-6 rounded-md" data-ai-hint="empty state illustration" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Voices Yet</h2>
          <p className="text-muted-foreground mb-6">
            It looks like you haven&apos;t cloned any voices. Get started by uploading an audio sample.
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard/voice-upload">
              <PlusCircle className="mr-2 h-5 w-5" /> Clone Your First Voice
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {voices.map((voice) => (
            <VoiceCard key={voice.id} voice={voice as Voice} />
          ))}
        </div>
      )}
    </div>
  );
}
