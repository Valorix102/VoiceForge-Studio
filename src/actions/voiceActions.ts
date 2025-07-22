// src/actions/voiceActions.ts
"use server";

import { z } from "zod";
import {
  enhanceUploadedAudio,
  type EnhanceUploadedAudioInput,
} from "@/ai/flows/enhance-uploaded-audio";
import {
  voiceSuggestions,
  type VoiceSuggestionsInput,
} from "@/ai/flows/voice-suggestions";

async function getCurrentUserId(): Promise<string | null> {
  console.warn("Mocking getCurrentUserId. Implement proper server-side user identification.");
  return "mock-user-id";
}

const UploadVoiceSchema = z.object({
  voiceName: z.string().min(3, "Voice name must be at least 3 characters."),
  audioDataUri: z.string().startsWith("data:audio/", "Invalid audio data URI."),
  originalFileName: z.string(),
});

export async function uploadAndProcessVoice(prevState: any, formData: FormData) {
  try {
    const userId = await getCurrentUserId();
    if (!userId) {
      return { success: false, error: "User not authenticated." };
    }

    const voiceName = formData.get("voiceName")?.toString() || "";
    const audioDataUri = formData.get("audioDataUri")?.toString() || "";
    const originalFileName = formData.get("originalFileName")?.toString() || "";

    const validatedFields = UploadVoiceSchema.safeParse({
      voiceName,
      audioDataUri,
      originalFileName,
    });

    if (!validatedFields.success) {
      return {
        success: false,
        error:
          "Invalid input: " +
          JSON.stringify(validatedFields.error.flatten().fieldErrors),
      };
    }

    const { voiceName: name, audioDataUri: uri, originalFileName: fileName } =
      validatedFields.data;

    const enhanceInput: EnhanceUploadedAudioInput = { audioDataUri: uri };
    const enhancedOutput = await enhanceUploadedAudio(enhanceInput);
    const enhancedAudioDataUri = enhancedOutput.enhancedAudioDataUri;

    const voiceId = `${name.replace(/\s+/g, "-").toLowerCase()}-${Date.now()}`;
    const storagePath = `voices/${userId}/${voiceId}/enhanced_audio.wav`;

    const downloadURL = "mock_download_url_for_enhanced_audio.wav";

    const voiceData = {
      name,
      originalAudioFileName: fileName,
      clonedAudioStoragePath: storagePath,
      downloadURL,
      createdAt: new Date().toISOString(),
      pitch: 0,
      bassDepth: 50,
      tempo: 1.0,
      clarity: 75,
      emotion: "neutral",
      naturalness: 80,
      accent: "US",
      userId,
    };

    console.log(`Mock: Saved metadata for voiceId ${voiceId}`, voiceData);

    return {
      success: true,
      message: "Voice uploaded and processed successfully!",
      voiceId,
      voiceData,
    };
  } catch (error: any) {
    console.error("Error processing voice:", error);
    return {
      success: false,
      error: error.message || "Failed to process voice.",
    };
  }
}
