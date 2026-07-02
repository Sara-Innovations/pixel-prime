import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Mail, Lock, User as UserIcon, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";
import { Logo } from "@/components/site/logo";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — M.A Computer" }] }),
  component: AuthPage,
});

function AuthPage() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) nav({ to: "/account" });
  }, [loading, user, nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/account`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Account created! Redirecting…");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (r.error) toast.error(r.error.message ?? "Google sign-in failed");
    setBusy(false);
  };

  return (
    <div className="min-h-[calc(100vh-9rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex bg-muted/40 border-r border-border p-12 flex-col justify-between">
        <Logo />
        <div className="max-w-md">
          <h2 className="font-display text-4xl font-bold tracking-tight mb-4">Your gear, your build, your account.</h2>
          <p className="text-muted-foreground">Track orders, save PC builds, manage warranty claims and unlock member-only pricing.</p>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} M.A Computer</p>
      </div>

      <div className="flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><Logo /></div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-2">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            {mode === "signin" ? "Sign in to manage your orders and builds." : "Join M.A Computer in less than a minute."}
          </p>

          <button
            onClick={google}
            disabled={busy}
            className="w-full h-11 rounded-lg border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center gap-3 text-sm font-medium mb-4 disabled:opacity-60"
          >
            <svg className="size-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.15-4.53H2.18v2.84A11 11 0 0 0 12 23Z"/><path fill="#FBBC05" d="M5.85 14.1a6.6 6.6 0 0 1 0-4.2V7.07H2.18a11 11 0 0 0 0 9.87l3.67-2.84Z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.2 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.67 2.84C6.71 7.31 9.14 5.38 12 5.38Z"/></svg>
            Continue with Google
          </button>

          <div className="flex items-center gap-3 my-5 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-3">
            {mode === "signup" && (
              <Field icon={UserIcon} type="text" placeholder="Full name" value={name} onChange={setName} required />
            )}
            <Field icon={Mail} type="email" placeholder="you@email.com" value={email} onChange={setEmail} required />
            <Field icon={Lock} type="password" placeholder="Password (min 8 chars)" value={password} onChange={setPassword} required minLength={8} />

            <button
              type="submit"
              disabled={busy}
              className="w-full h-11 rounded-lg bg-electric text-navy-deep font-semibold text-sm hover:bg-electric-glow transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {busy ? <Loader2 className="size-4 animate-spin" /> : <>{mode === "signin" ? "Sign in" : "Create account"} <ArrowRight className="size-4" /></>}
            </button>
          </form>

          <p className="text-sm text-muted-foreground mt-6 text-center">
            {mode === "signin" ? "New to M.A Computer?" : "Already have an account?"}{" "}
            <button className="text-electric font-medium hover:underline" onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
              {mode === "signin" ? "Create account" : "Sign in"}
            </button>
          </p>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            <Link to="/" className="hover:text-foreground">← Back to store</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon: Icon, type, placeholder, value, onChange, required, minLength,
}: { icon: typeof Mail; type: string; placeholder: string; value: string; onChange: (v: string) => void; required?: boolean; minLength?: number }) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        minLength={minLength}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 pl-10 pr-3 rounded-lg bg-muted/50 border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-electric/40"
      />
    </div>
  );
}
