// src/app/dashboard/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, UploadCloud, Mic2, PlayCircle, History, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function DashboardPage() {
  const quickAccessItems = [
    { title: "Upload New Voice", description: "Start by uploading an audio sample to clone a voice.", href: "/dashboard/voice-upload", icon: UploadCloud },
    { title: "Manage Voices", description: "View, edit, and customize your cloned voices.", href: "/dashboard/voices", icon: Mic2 },
    { title: "Generate Speech", description: "Create speech from text using your voices.", href: "/dashboard/generate-speech", icon: PlayCircle },
    { title: "View History", description: "Check your past voice generations.", href: "/dashboard/generations", icon: History },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to VoiceForge Studio! Manage your voice cloning and speech generation here.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {quickAccessItems.map((item) => (
          <Card key={item.title} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
              <item.icon className="h-6 w-6 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={item.href}>
                  Go to {item.title.split(" ")[0]} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
            <CardDescription>Overview of your latest actions.</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Placeholder for recent activity feed */}
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 p-3 bg-muted/50 rounded-md">
                  <Image src={`https://placehold.co/40x40.png`} alt="Activity icon" width={40} height={40} className="rounded-full" data-ai-hint="abstract icon" />
                  <div>
                    <p className="text-sm font-medium">Generated speech for "Project X"</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="link" className="mt-4 px-0">View all activity</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Voice Cloning Guide</CardTitle>
            <CardDescription>Quick tips to get the best voice clones.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm"><strong className="text-primary">Clean Audio:</strong> Ensure your uploaded samples are clear and free of background noise.</p>
            <p className="text-sm"><strong className="text-primary">Duration:</strong> Aim for 30 seconds to 5 minutes of varied speech.</p>
            <p className="text-sm"><strong className="text-primary">Consistency:</strong> Maintain a consistent tone and pace in your sample.</p>
            <Button variant="default" className="mt-4">
              Learn More
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
