"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend-only simulation
    setIsSubmitted(true);
    
    // Show success toast
    toast({
      title: "Reset link sent!",
      description: `If an account with ${email} exists, a password reset link has been sent.`,
    });
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 fade-in">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link
          href="/company/login"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Login
        </Link>

        <div className="glassmorphic p-8 rounded-2xl border-foreground/10 scale-in">
          {!isSubmitted ? (
            <>
              <h1 className="text-2xl font-bold text-center mb-2">
                Forgot Password
              </h1>
              <p className="text-muted-foreground text-center mb-6">
                Enter your company email and we’ll send a reset link
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Label className="mb-2">Company Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="company@name.com"
                      className="pl-10 glass-input"
                      required
                    />
                  </div>
                </div>

                <Button className="w-full glassmorphic-button-primary">
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success Message */}
              <div className="flex flex-col items-center text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <h2 className="text-xl font-semibold mb-2">
                  Check your email
                </h2>
                <p className="text-muted-foreground text-sm mb-6">
                  If an account with <b>{email}</b> exists, a password reset
                  link has been sent.
                </p>

                <Link
                  href="/login"
                  className="text-sm font-semibold hover:underline"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}