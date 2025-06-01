// src/components/dashboard/voice-upload/WaveformPreview.tsx
"use client";

import { useEffect, useRef } from 'react';

interface WaveformPreviewProps {
  audioDataUri: string | null;
}

// This is a placeholder. A real waveform would use a library like Wavesurfer.js
export default function WaveformPreview({ audioDataUri }: WaveformPreviewProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioDataUri && audioRef.current) {
      audioRef.current.src = audioDataUri;
    }
  }, [audioDataUri]);

  if (!audioDataUri) {
    return null;
  }

  return (
    <div className="p-4 border rounded-md bg-muted/50">
      <p className="text-sm text-muted-foreground mb-2">Audio Preview:</p>
      {/* Basic audio player as a placeholder for waveform */}
      <audio ref={audioRef} controls className="w-full">
        Your browser does not support the audio element.
      </audio>
      <p className="text-xs text-muted-foreground mt-2">
        (Waveform visualization would appear here in a full implementation)
      </p>
    </div>
  );
}
