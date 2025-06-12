// src/actions/authActions.ts
"use server";

import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { z } from "zod";
import { cookies } from "next/headers";

const emailPasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function signUpWithEmail(prevState: any, formData: FormData) {
  const result = emailPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { error: "Invalid email or password.", success: false };
  }
  const { email, password } = result.data;
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    cookies().set("firebaseIdToken", idToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return { success: true, error: null };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}

export async function signInWithEmail(prevState: any, formData: FormData) {
  const result = emailPasswordSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    return { error: "Invalid email or password.", success: false };
  }
  const { email, password } = result.data;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    cookies().set("firebaseIdToken", idToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return { success: true, error: null };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}

export async function signInWithGoogle() {
  // This action is a bit tricky because signInWithPopup is client-side.
  // Typically, you'd handle this on the client and then send the idToken to a server action/API route to set the cookie.
  // For simplicity in this server action context, we'll acknowledge this limitation.
  // The actual popup would be initiated on the client.
  // This function is more of a conceptual placeholder if one were to try and manage it fully server-side (which isn't standard for popups).
  return { error: "Google Sign-In should be primarily handled on the client-side." , success: false};
}

// Call this function from the client after Google Sign-In to set the session cookie
export async function setGoogleAuthCookie(idToken: string) {
  try {
    cookies().set("firebaseIdToken", idToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return { success: true, error: null };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}


export async function signOut() {
  try {
    // await firebaseSignOut(auth); // Signing out client-side Firebase state is done on client
    cookies().delete("firebaseIdToken");
    return { success: true, error: null };
  } catch (error: any) {
    return { error: error.message, success: false };
  }
}
