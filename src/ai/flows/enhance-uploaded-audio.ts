'use server';

/**
 * @fileOverview An audio enhancement AI agent.
 *
 * - enhanceUploadedAudio - A function that enhances the quality of an uploaded audio sample.
 * - EnhanceUploadedAudioInput - The input type for the enhanceUploadedAudio function.
 * - EnhanceUploadedAudioOutput - The return type for the enhanceUploadedAudio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceUploadedAudioInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio sample, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhanceUploadedAudioInput = z.infer<typeof EnhanceUploadedAudioInputSchema>;

const EnhanceUploadedAudioOutputSchema = z.object({
  enhancedAudioDataUri: z
    .string()
    .describe(
      'The enhanced audio sample, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // keep the backslashes here to prevent JSON parsing errors.
    ),
});
export type EnhanceUploadedAudioOutput = z.infer<typeof EnhanceUploadedAudioOutputSchema>;

export async function enhanceUploadedAudio(input: EnhanceUploadedAudioInput): Promise<EnhanceUploadedAudioOutput> {
  return enhanceUploadedAudioFlow(input);
}

const enhanceAudioPrompt = ai.definePrompt({
  name: 'enhanceAudioPrompt',
  input: {schema: EnhanceUploadedAudioInputSchema},
  output: {schema: EnhanceUploadedAudioOutputSchema},
  prompt: `You are an expert audio engineer specializing in enhancing the quality of audio samples for voice cloning.

You will receive an audio sample and apply noise reduction, echo filtering, and other enhancements to improve its clarity and suitability for voice cloning.

Return the enhanced audio sample as a data URI.

Audio Sample: {{media url=audioDataUri}}`,
});

const enhanceUploadedAudioFlow = ai.defineFlow(
  {
    name: 'enhanceUploadedAudioFlow',
    inputSchema: EnhanceUploadedAudioInputSchema,
    outputSchema: EnhanceUploadedAudioOutputSchema,
  },
  async input => {
    const {output} = await enhanceAudioPrompt(input);
    return output!;
  }
);
