// src/app/dashboard/billing/page.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { List, ListChecks, CreditCard, DownloadCloud, AlertTriangle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function BillingPage() {
  // Placeholder data
  const currentPlan = {
    name: "Pro Plan",
    price: "$29/month",
    voicesLimit: 50,
    generations: "Unlimited",
    features: ["Advanced Voice Customization", "API Access", "Priority Support", "Watermark-free Downloads"],
  };

  const paymentHistory = [
    { id: "inv_1", date: "2024-07-01", amount: "$29.00", status: "Paid" },
    { id: "inv_2", date: "2024-06-01", amount: "$29.00", status: "Paid" },
    { id: "inv_3", date: "2024-05-01", amount: "$29.00", status: "Paid" },
  ];

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription, payment methods, and view invoices.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>You are currently on the {currentPlan.name}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
              <div>
                <h3 className="text-xl font-semibold text-primary">{currentPlan.name}</h3>
                <p className="text-2xl font-bold text-foreground">{currentPlan.price}</p>
              </div>
              <Button variant="outline" disabled>Change Plan</Button>
            </div>
            
            <h4 className="font-medium text-foreground">Plan Details:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center"><ListChecks className="mr-2 h-4 w-4 text-green-500" /> Up to {currentPlan.voicesLimit} cloned voices</li>
              <li className="flex items-center"><ListChecks className="mr-2 h-4 w-4 text-green-500" /> {currentPlan.generations} TTS generations</li>
              {currentPlan.features.map(feature => (
                <li key={feature} className="flex items-center"><ListChecks className="mr-2 h-4 w-4 text-green-500" /> {feature}</li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">Your plan renews on August 1, 2024. <Button variant="link" className="p-0 h-auto text-xs" disabled>Cancel Subscription</Button></p>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Your primary payment method.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-md">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="font-medium">Visa ending in 1234</p>
                <p className="text-xs text-muted-foreground">Expires 12/2025</p>
              </div>
            </div>
            <Button variant="outline" className="w-full" disabled>Update Payment Method</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>View your past invoices and payments.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentHistory.map(item => (
              <div key={item.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-muted/50">
                <div>
                  <p className="font-medium">Invoice {item.id}</p>
                  <p className="text-xs text-muted-foreground">Date: {item.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{item.amount}</p>
                  <Badge variant={item.status === "Paid" ? "default" : "secondary"} className={item.status === "Paid" ? "bg-green-500 hover:bg-green-600" : ""}>
                    {item.status}
                  </Badge>
                </div>
                <Button variant="ghost" size="icon" className="ml-2" disabled title="Download Invoice">
                  <DownloadCloud className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="mt-6 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/30">
        <CardHeader className="flex flex-row items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-yellow-600 dark:text-yellow-400 mt-1" />
          <div>
            <CardTitle className="text-yellow-700 dark:text-yellow-300">Billing System Placeholder</CardTitle>
            <CardDescription className="text-yellow-600 dark:text-yellow-500">
              This billing page is a placeholder. Integration with a payment provider like Stripe is required for full functionality.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

    </div>
  );
}
