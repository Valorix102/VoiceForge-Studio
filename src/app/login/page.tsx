// src/app/login/page.tsx
import { LoginForm } from "@/components/auth/LoginForm";
import { Blend } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mb-8 flex flex-col items-center text-center">
        <Blend className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl font-bold text-foreground">VoiceForge Studio</h1>
        <p className="text-muted-foreground">Sign in or create an account to continue</p>
      </div>
      <LoginForm />
    </div>
  );
}
