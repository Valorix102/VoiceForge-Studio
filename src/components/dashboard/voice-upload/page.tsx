//src/app/dashboard/voice-upload/page.tsx

import UploadVoiceForm from "@/components/dashboard/voice-upload/UploadVoiceForm";

export default function VoiceUploadPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Upload New Voice</h1>
        <p className="text-muted-foreground">Create a new voiceprint by uploading an audio sample.</p>
      </div>
      <UploadVoiceForm />
    </div>
  );
}
