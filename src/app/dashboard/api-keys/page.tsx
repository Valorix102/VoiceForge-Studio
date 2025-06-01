// src/app/dashboard/api-keys/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, PlusCircle, Copy, RefreshCw, AlertTriangle } from "lucide-react";
import Image from "next/image";

export default function ApiKeysPage() {
  // Placeholder data - in a real app, this would come from Firestore
  const apiKey = "vf_mock_xxxxxxxxxxxxxxxxxxxxxxx_yyyyyyyyyy";
  const hasApiKey = true; // Simulate if user has an API key

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">API Keys</h1>
        <p className="text-muted-foreground">Manage your API keys for programmatic access to VoiceForge Studio.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your API Key</CardTitle>
          <CardDescription>
            Use this key to authenticate your requests to the VoiceForge Studio API.
            Keep it secret and secure!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {hasApiKey ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="apiKey">API Key</Label>
                <div className="flex items-center gap-2">
                  <Input id="apiKey" type="text" value={apiKey} readOnly className="font-mono" />
                  <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(apiKey)} title="Copy API Key">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" disabled> {/* Placeholder for regenerate */}
                  <RefreshCw className="mr-2 h-4 w-4" /> Regenerate Key
                </Button>
                 <p className="text-xs text-muted-foreground">Regenerating will invalidate the old key.</p>
              </div>
            </>
          ) : (
            <div className="text-center py-8 border-2 border-dashed border-muted-foreground/30 rounded-lg bg-muted/20">
              <KeyRound className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No API Key Found</h3>
              <p className="text-muted-foreground mb-4">Generate an API key to start using the VoiceForge Studio API.</p>
              <Button disabled> {/* Placeholder for generate */}
                <PlusCircle className="mr-2 h-4 w-4" /> Generate API Key
              </Button>
            </div>
          )}
          
          <div className="pt-6 border-t">
            <h3 className="text-lg font-semibold mb-2">API Usage Guide</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Refer to our <a href="#" className="text-primary underline hover:no-underline">API Documentation</a> for detailed instructions on how to integrate VoiceForge Studio.
            </p>
            <div className="bg-muted/50 p-4 rounded-md">
              <pre className="text-xs text-foreground overflow-x-auto">
                <code>
                  {`POST /synthesize
Host: api.voiceforge.studio
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
  "voice_name": "YourClonedVoice",
  "text": "Hello world from the API!",
  "options": { "pitch": 0.1, "emotion": "calm" }
}`}
                </code>
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
       <Card className="mt-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30">
        <CardHeader className="flex flex-row items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1" />
          <div>
            <CardTitle className="text-yellow-700 dark:text-yellow-300">Important Security Notice</CardTitle>
            <CardDescription className="text-yellow-600 dark:text-yellow-500">
              API key management is a critical feature. The functionality on this page is currently a placeholder.
              In a production environment, ensure robust security measures for key generation, storage, and rotation.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}
