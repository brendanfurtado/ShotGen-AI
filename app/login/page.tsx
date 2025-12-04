import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string; error?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;

  // Check if user is already logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    // Already logged in, redirect to dashboard or specified page
    redirect(params.redirectTo || "/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Welcome to <span className="text-primary">ShotGen</span>
          </h1>
          <p className="text-muted-foreground">
            Sign in to start creating AI-powered shot lists
          </p>
        </div>

        <LoginForm error={params.error} redirectTo={params.redirectTo} />

        <p className="mt-8 text-center text-sm text-muted-foreground">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
