// src/app/page.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Blend, LogIn, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background to-blue-100 dark:from-background dark:to-blue-900 p-4">
      <header className="mb-12 text-center">
        <div className="mb-6 flex justify-center">
          <Blend className="h-24 w-24 text-primary" />
        </div>
        <h1 className="text-5xl font-bold text-foreground">
          Welcome to VoiceForge Studio
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Craft your unique voice. Generate expressive speech.
        </p>
      </header>

      <main className="mb-12">
        <Image
          src="https://placehold.co/600x400.png"
          alt="VoiceForge Studio platform showcase"
          width={600}
          height={400}
          className="rounded-lg shadow-2xl"
          data-ai-hint="voice technology interface"
        />
      </main>

      <footer className="text-center">
        {loading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : user ? (
          <Button asChild size="lg">
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-5 w-5" /> Go to Dashboard
            </Link>
          </Button>
        ) : (
          <Button asChild size="lg">
            <Link href="/login">
              <LogIn className="mr-2 h-5 w-5" /> Login / Sign Up
            </Link>
          </Button>
        )}
        <p className="mt-8 text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} VoiceForge Studio. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
