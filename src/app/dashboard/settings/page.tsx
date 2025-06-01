// src/app/dashboard/settings/page.tsx
"use client"; // For Switch interaction

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Languages, Palette, ShieldCheck, AlertTriangle, Save } from "lucide-react";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  // Placeholder state for settings
  const [notifications, setNotifications] = useState({
    emailSummary: true,
    generationComplete: false,
    newFeatures: true,
  });
  const [language, setLanguage] = useState("en");
  const [defaultAccent, setDefaultAccent] = useState("US");

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveChanges = () => {
    // Placeholder for saving settings
    alert("Settings saved (placeholder action)!");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground">Configure your application preferences and account settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5" /> Notification Preferences</CardTitle>
            <CardDescription>Manage how you receive notifications from VoiceForge Studio.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="emailSummary" className="font-medium">Weekly Email Summary</Label>
                <p className="text-xs text-muted-foreground">Get a summary of your activity and new features.</p>
              </div>
              <Switch
                id="emailSummary"
                checked={notifications.emailSummary}
                onCheckedChange={() => handleNotificationChange("emailSummary")}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="generationComplete" className="font-medium">Generation Complete Alerts</Label>
                <p className="text-xs text-muted-foreground">Receive an alert when a long generation task is finished.</p>
              </div>
              <Switch
                id="generationComplete"
                checked={notifications.generationComplete}
                onCheckedChange={() => handleNotificationChange("generationComplete")}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border p-4">
              <div>
                <Label htmlFor="newFeatures" className="font-medium">New Feature Announcements</Label>
                <p className="text-xs text-muted-foreground">Stay updated on the latest additions to VoiceForge.</p>
              </div>
              <Switch
                id="newFeatures"
                checked={notifications.newFeatures}
                onCheckedChange={() => handleNotificationChange("newFeatures")}
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center"><Languages className="mr-2 h-5 w-5" /> Language & Region</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="language">Display Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language"><SelectValue placeholder="Select language" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English (United States)</SelectItem>
                    <SelectItem value="es" disabled>Español (Placeholder)</SelectItem>
                    <SelectItem value="fr" disabled>Français (Placeholder)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="defaultAccent">Default Voice Accent</Label>
                 <Select value={defaultAccent} onValueChange={setDefaultAccent}>
                  <SelectTrigger id="defaultAccent"><SelectValue placeholder="Select default accent" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="US">US English</SelectItem>
                    <SelectItem value="UK">UK English</SelectItem>
                    <SelectItem value="Indian">Indian English</SelectItem>
                    <SelectItem value="Australian">Australian English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5" /> Account Security</CardTitle>
            </CardHeader>
            <CardContent>
                <Button variant="outline" className="w-full" disabled>Enable Two-Factor Authentication</Button>
                <p className="text-xs text-muted-foreground mt-2">This feature is a placeholder.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={handleSaveChanges} disabled> {/* Disabled as it's placeholder */}
          <Save className="mr-2 h-4 w-4" /> Save All Settings
        </Button>
      </div>

      <Card className="mt-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30">
        <CardHeader className="flex flex-row items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1" />
          <div>
            <CardTitle className="text-yellow-700 dark:text-yellow-300">Settings Placeholder</CardTitle>
            <CardDescription className="text-yellow-600 dark:text-yellow-500">
              This settings page is a placeholder. Actual implementation would require backend logic to store and retrieve user preferences.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

    </div>
  );
}
