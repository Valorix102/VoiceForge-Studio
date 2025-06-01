// src/components/auth/LoginForm.tsx
"use client";

import { useFormState, useFormStatus } from "react-dom";
import { signInWithEmail, signUpWithEmail, setGoogleAuthCookie } from "@/actions/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, ChromeIcon, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";

function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}

export function LoginForm() {
  const router = useRouter();
  const [signInState, signInAction] = useFormState(signInWithEmail, { error: null, success: false });
  const [signUpState, signUpAction] = useFormState(signUpWithEmail, { error: null, success: false });
  const [googleError, setGoogleError] = useState<string | null>(null);

  useEffect(() => {
    if (signInState.success || signUpState.success) {
      router.push("/dashboard");
      router.refresh(); // Important to re-trigger middleware and auth state
    }
  }, [signInState.success, signUpState.success, router]);

  const handleGoogleSignIn = async () => {
    setGoogleError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const cookieResult = await setGoogleAuthCookie(idToken);
      if (cookieResult.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setGoogleError(cookieResult.error || "Failed to set Google auth cookie.");
      }
    } catch (error: any) {
      setGoogleError(error.message || "Google Sign-In failed.");
    }
  };


  return (
    <Tabs defaultValue="signin" className="w-full max-w-md">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signin">Sign In</TabsTrigger>
        <TabsTrigger value="signup">Sign Up</TabsTrigger>
      </TabsList>
      <TabsContent value="signin">
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Access your VoiceForge Studio account.</CardDescription>
          </CardHeader>
          <form action={signInAction}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signin">Email</Label>
                <Input id="email-signin" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signin">Password</Label>
                <Input id="password-signin" name="password" type="password" required />
              </div>
              {signInState.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{signInState.error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <SubmitButton>Sign In</SubmitButton>
            </CardFooter>
          </form>
          <div className="px-6 pb-6">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <ChromeIcon className="mr-2 h-4 w-4" /> Sign in with Google
            </Button>
            {googleError && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Google Sign-In Error</AlertTitle>
                  <AlertDescription>{googleError}</AlertDescription>
                </Alert>
              )}
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Create a new VoiceForge Studio account.</CardDescription>
          </CardHeader>
          <form action={signUpAction}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input id="email-signup" name="email" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Password</Label>
                <Input id="password-signup" name="password" type="password" required />
              </div>
              {signUpState.error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{signUpState.error}</AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <SubmitButton>Sign Up</SubmitButton>
            </CardFooter>
          </form>
          <div className="px-6 pb-6">
             <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              <ChromeIcon className="mr-2 h-4 w-4" /> Sign up with Google
            </Button>
            {googleError && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Google Sign-Up Error</AlertTitle>
                <AlertDescription>{googleError}</AlertDescription>
              </Alert>
            )}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
