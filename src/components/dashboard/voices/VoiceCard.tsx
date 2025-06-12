// src/components/dashboard/voices/VoiceCard.tsx
"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic2, Edit3, Trash2, Play, Download, AlertCircle } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteClonedVoice } from "@/actions/voiceActions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export interface Voice {
  id: string;
  name: string;
  createdAt: string; // ISO string
  downloadURL?: string; // URL to the cloned audio file
  // Add other relevant fields like pitch, emotion, etc. if needed for display
  pitch?: number;
  emotion?: string;
}

interface VoiceCardProps {
  voice: Voice;
}

export default function VoiceCard({ voice }: VoiceCardProps) {
  const { toast } = useToast();
  const router = useRouter();

  const handleDelete = async () => {
    const result = await deleteClonedVoice(voice.id);
    if (result.success) {
      toast({ title: "Success", description: result.message });
      router.refresh(); // Refresh the list of voices
    } else {
      toast({ variant: "destructive", title: "Error", description: result.error });
    }
  };

  return (
    <Card className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{voice.name}</CardTitle>
          <Mic2 className="h-6 w-6 text-primary" />
        </div>
        <CardDescription>
          Created {formatDistanceToNow(new Date(voice.createdAt), { addSuffix: true })}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Placeholder for quick voice stats or preview */}
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Pitch: {voice.pitch || 0}%</p>
          <p>Emotion: {voice.emotion || "Neutral"}</p>
        </div>
        {voice.downloadURL && (
          <audio src={voice.downloadURL} controls className="w-full mt-4 h-10 text-sm" />
        )}
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2 md:grid-cols-3">
        <Button asChild variant="outline" size="sm">
          <Link href={`/dashboard/voices/${voice.id}`}>
            <Edit3 className="mr-1 h-4 w-4" /> Customize
          </Link>
        </Button>
        <Button variant="outline" size="sm" disabled> {/* Play functionality can be added later */}
            <Play className="mr-1 h-4 w-4" /> Play
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" className="col-span-2 md:col-span-1">
              <Trash2 className="mr-1 h-4 w-4" /> Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the voice <strong className="text-foreground">{voice.name}</strong> and all its associated data.
              </AlertDialogDescription>
            </AlertDialogHeader>
             {/* Placeholder for potential error messages during delete confirmation */}
            <div id={`delete-error-${voice.id}`} className="text-red-500 text-sm"></div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
