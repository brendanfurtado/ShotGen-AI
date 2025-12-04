import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "@/lib/auth/actions";
import type { UserProfile } from "@/lib/types";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single<UserProfile>();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold text-foreground">
            Shot<span className="text-primary">Gen</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              {user.user_metadata?.avatar_url && (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt={user.user_metadata.full_name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-muted-foreground">
                {user.user_metadata?.full_name || user.email}
              </span>
            </div>
            <form action={signOut}>
              <Button type="submit" variant="outline" size="sm">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            Welcome back, {user.user_metadata?.full_name?.split(" ")[0] || "there"}!
          </h1>
          <p className="text-muted-foreground">
            Start creating AI-powered shot lists for your projects
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Credits Remaining</CardDescription>
              <CardTitle className="text-3xl text-primary">
                {profile?.credits_remaining || 0}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                of {profile?.credits_total || 5} total credits
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Subscription Tier</CardDescription>
              <CardTitle className="text-2xl capitalize">
                {profile?.subscription_tier || "Free"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                {profile?.subscription_tier === "free"
                  ? "1 project limit"
                  : "Unlimited projects"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Account Status</CardDescription>
              <CardTitle className="text-2xl">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Member since {new Date(user.created_at).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Projects Section */}
        <Card>
          <CardHeader>
            <CardTitle>Your Projects</CardTitle>
            <CardDescription>
              Create and manage your shot list projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed border-border p-12 text-center">
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No projects yet
              </h3>
              <p className="mb-4 max-w-sm text-sm text-muted-foreground">
                Get started by creating your first project. Upload a script and
                let AI generate your shot list.
              </p>
              <Button disabled>
                Create New Project
                <span className="ml-2 text-xs opacity-75">(Coming Soon)</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
