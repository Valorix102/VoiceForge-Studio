// src/app/dashboard/profile/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  // In a real app, fetch user data
  const user = {
    name: "Demo User",
    email: "demo@example.com",
    avatarUrl: "https://placehold.co/100x100.png",
    plan: "Pro Plan",
    memberSince: "January 1, 2023",
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">User Profile</h1>
        <p className="text-muted-foreground">Manage your account details and preferences.</p>
      </div>

      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="mx-auto h-24 w-24 mb-4">
            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="profile avatar" />
            <AvatarFallback className="text-3xl">{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user.name} disabled />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" defaultValue={user.email} disabled />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Current Plan</Label>
              <p className="text-sm p-2 border rounded-md bg-muted/50">{user.plan}</p>
            </div>
            <div className="space-y-2">
              <Label>Member Since</Label>
              <p className="text-sm p-2 border rounded-md bg-muted/50">{user.memberSince}</p>
            </div>
          </div>
           <Button variant="outline" className="w-full" disabled>Update Profile (Placeholder)</Button>
           <Button variant="link" className="w-full text-destructive" disabled>Change Password (Placeholder)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
