// src/app/dashboard/voices/[voiceId]/page.tsx
import VoiceCustomizationPanel from "@/components/voices/VoiceCustomizationPanel";
import { getClonedVoiceById } from "@/actions/voiceActions"; // Mocked action
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VoiceDetailsPageProps {
  params: {
    voiceId: string;
  };
}

export default async function VoiceDetailsPage({ params }: VoiceDetailsPageProps) {
  const { voiceId } = params;
  const { voice, error } = await getClonedVoiceById(voiceId);

  if (error || !voice) {
    return (
      <div className="container mx-auto py-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-destructive mb-2">Voice Not Found</h1>
        <p className="text-muted-foreground mb-6">{error || "The requested voice could not be loaded."}</p>
        <Button asChild>
          <Link href="/dashboard/voices">Go Back to Voices</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <VoiceCustomizationPanel voice={voice} />
      {/* Future sections: Test voice, view generation history for this voice, etc. */}
    </div>
  );
}
