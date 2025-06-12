// src/components/dashboard/speech-generation/AudioPlayer.tsx
"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AudioPlayerProps {
  audioUrl: string | null;
  fileName?: string; // For download
}

export default function AudioPlayer({ audioUrl, fileName = "generated_speech.mp3" }: AudioPlayerProps) {
  if (!audioUrl) {
    return null;
  }

  return (
    <div className="mt-4 p-4 border rounded-md bg-muted/50">
      <p className="text-sm font-medium mb-2">Generated Audio:</p>
      <div className="flex items-center gap-4">
        <audio controls src={audioUrl} className="w-full">
          Your browser does not support the audio element.
        </audio>
        <Button asChild variant="outline" size="icon">
          <a href={audioUrl} download={fileName} title="Download audio">
            <Download className="h-5 w-5" />
            <span className="sr-only">Download audio</span>
          </a>
        </Button>
      </div>
    </div>
  );
}
