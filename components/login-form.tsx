"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const router = useRouter();
  
  // 1. Added toggling state & fields
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Stop standard page reloads
    setLoading(true);
    setErrorMsg("");

    try {
      if (isSignUp) {
        // --- SIGN UP REGISTRATION ---
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.error || "Failed to register account.");
        }

        // Auto-login after registration
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });
      } else {
        // --- STANDARD LOGIN ---
        const result = await signIn("credentials", {
          redirect: false, 
          email,
          password,
        });

        if (result?.error) {
          setErrorMsg("Invalid email or password. Please try again.");
          setLoading(false);
          return;
        }
      }

      router.push("/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("Authentication failure:", error);
      setErrorMsg(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-6", className)} {...props}>
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">
            {isSignUp ? "Create an account" : "Login to your account"}
          </h1>
          <p className="text-sm text-balance text-muted-foreground">
            {isSignUp ? "Enter your details below to sign up" : "Enter your email below to login to your account"}
          </p>
        </div>

        {/* Live UI Inline Error Alert Banner */}
        {errorMsg && (
          <div className="p-3 text-xs font-medium bg-rose-50 border border-rose-100 text-rose-700 rounded-xl">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* CONDITIONAL USERNAME FIELD */}
        {isSignUp && (
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              type="text"
              placeholder="Your Username"
              required={isSignUp}
              disabled={loading}
              value={name}
              onChange={(e) => setname(e.target.value)}
              className="bg-background"
            />
          </Field>
        )}

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            disabled={loading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background"
          />
        </Field>
        <Field>
          <div className="flex items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
          
          </div>
          <Input
            id="password"
            type="password"
            required
            disabled={loading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background"
          />
        </Field>
        <Field>
          <Button className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900" type="submit" disabled={loading}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
          </Button>
        </Field>
        <FieldSeparator>Or continue with</FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}{" "}
            <button 
              type="button"
              onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); setErrorMsg(""); }} 
              className="underline underline-offset-4 font-medium text-foreground"
            >
              {isSignUp ? "Login" : "Sign up"}
            </button>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}