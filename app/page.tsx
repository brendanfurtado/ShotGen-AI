import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Sparkles, Film, Download } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold text-foreground">
            Shot<span className="text-primary">Gen</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button>Sign In</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary-700">
          <Sparkles className="h-4 w-4" />
          AI-Powered Pre-Production
        </div>
        
        <h1 className="mb-6 text-5xl font-bold leading-tight text-foreground md:text-6xl">
          Transform Scripts into
          <br />
          <span className="text-primary">Visual Shot Lists</span>
        </h1>
        
        <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
          Stop wasting time on manual shot planning. ShotGen uses AI to parse your scripts, 
          generate stunning visual references, and export production-ready shot lists in minutes.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="min-w-[180px] text-base">
            Get Started Free
          </Button>
          <Button size="lg" variant="outline" className="min-w-[180px] text-base">
            Watch Demo
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          No credit card required · 5 free generations
        </p>
      </section>

      {/* How It Works */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              From script to shot list in four simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4">
            {[
              {
                icon: FileText,
                title: "Upload Script",
                description: "Paste your script or upload a PDF/TXT file",
              },
              {
                icon: Sparkles,
                title: "AI Parsing",
                description: "Our AI breaks down your script into scenes",
              },
              {
                icon: Film,
                title: "Generate Shots",
                description: "Get AI-generated images with camera metadata",
              },
              {
                icon: Download,
                title: "Export",
                description: "Download as PDF or Word for your production",
              },
            ].map((step, index) => (
              <Card key={index} className="border-none bg-card shadow-sm">
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <step.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="mb-1 text-sm font-medium text-muted-foreground">
                    Step {index + 1}
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground">
              Built for Creators
            </h2>
            <p className="text-muted-foreground">
              Everything you need to plan your shoot efficiently
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Smart Scene Detection",
                description:
                  "AI automatically identifies scene breaks, locations, and narrative shifts in any script format.",
              },
              {
                title: "Visual References",
                description:
                  "Generate AI images for each shot with customizable styles—photorealistic, illustration, noir, and more.",
              },
              {
                title: "Camera Metadata",
                description:
                  "Each shot includes lens, movement, lighting, and shot type suggestions based on the scene context.",
              },
              {
                title: "Drag & Drop Organization",
                description:
                  "Reorder scenes and shots with intuitive drag-and-drop. Tag shots for easy filtering.",
              },
              {
                title: "Production-Ready Exports",
                description:
                  "Export professional PDF and Word documents with shot thumbnails, metadata, and notes.",
              },
              {
                title: "Content Safety",
                description:
                  "Built-in moderation ensures generated images are appropriate for professional use.",
              },
            ].map((feature, index) => (
              <Card key={index} className="bg-card">
                <CardContent className="pt-6">
                  <h3 className="mb-2 font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            Ready to visualize your story?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Join creators who are saving hours on pre-production with AI-powered shot lists.
          </p>
          <Button size="lg" className="min-w-[200px] text-base">
            Start Creating for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-muted-foreground">
              © 2025 ShotGen. All rights reserved.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}