// src/components/dashboard/generations/GenerationHistoryItem.tsx
"use client";

import type { GenerationResult } from "@/actions/generationActions";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Download, Mic2, FileText, CalendarDays } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import AudioPlayer from "../speech-generation/AudioPlayer";

interface GenerationHistoryItemProps {
  generation: GenerationResult;
}

export default function GenerationHistoryItem({ generation }: GenerationHistoryItemProps) {
  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg truncate" title={generation.text}>
            "{generation.text.substring(0, 50)}{generation.text.length > 50 ? "..." : ""}"
          </CardTitle>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
             {formatDistanceToNow(new Date(generation.createdAt), { addSuffix: true })}
          </span>
        </div>
        <CardDescription className="flex items-center gap-4 text-xs pt-1">
          <span className="flex items-center"><Mic2 className="mr-1 h-3 w-3" /> {generation.voiceName}</span>
          <span className="flex items-center"><CalendarDays className="mr-1 h-3 w-3" /> {new Date(generation.createdAt).toLocaleDateString()}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="py-3">
        <AudioPlayer audioUrl={generation.downloadURL} fileName={`${generation.voiceName}_${generation.id}.mp3`}/>
      </CardContent>
      {/* <CardFooter className="flex justify-end gap-2 pt-3">
        <Button variant="outline" size="sm" disabled>
          <Play className="mr-1 h-4 w-4" /> Replay
        </Button>
        <Button asChild variant="outline" size="sm">
          <a href={generation.downloadURL} download={`${generation.voiceName}_${generation.id}.mp3`}>
            <Download className="mr-1 h-4 w-4" /> Download
          </a>
        </Button>
      </CardFooter> */}
    </Card>
  );
}
