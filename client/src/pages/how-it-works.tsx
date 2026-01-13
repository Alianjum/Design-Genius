import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, ArrowLeft, UserPlus, Users, Mail, Share2 } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      icon: <UserPlus className="h-8 w-8 text-primary" />,
      title: "Join the Community",
      description: "Sign up using a referral link from an existing member, or request an invitation from our team. This ensures our community remains safe and supportive.",
    },
    {
      number: 2,
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Connect with Others",
      description: "Access your personal dashboard to view community resources, track your referrals, and connect with others who understand your journey.",
    },
    {
      number: 3,
      icon: <Share2 className="h-8 w-8 text-success" />,
      title: "Share Your Referral Link",
      description: "Every member receives a unique referral code. Share it with friends, family, or others who might benefit from our supportive community.",
    },
    {
      number: 4,
      icon: <Mail className="h-8 w-8 text-primary" />,
      title: "Send Invitations",
      description: "Use our built-in email system to send personalized invitations to people you'd like to invite. Your referral link is automatically included.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer" data-testid="link-home">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-heading text-lg font-semibold">Help the Group</span>
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/">
              <Button variant="ghost" size="sm" data-testid="button-back-home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">How It Works</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Join our community in four simple steps and start building your support network today.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl space-y-8">
            {steps.map((step, index) => (
              <Card key={step.number} className="overflow-hidden">
                <CardContent className="flex flex-col items-start gap-6 p-6 md:flex-row md:items-center">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-muted">
                    {step.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {step.number}
                      </span>
                      <h3 className="font-heading text-xl font-semibold">{step.title}</h3>
                    </div>
                    <p className="mt-3 text-muted-foreground">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden h-12 w-px bg-border md:block" />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Referral Benefits */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-center text-2xl font-semibold">Why Referrals Matter</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Our referral-based model helps ensure that everyone in our community is connected through trust.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-heading font-semibold">Safe Environment</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Members invited by existing community members help maintain a trusted, supportive space.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-heading font-semibold">Personal Connections</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  When you invite someone, you're helping them find the support they need through your network.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <h3 className="font-heading font-semibold">Growing Together</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Each referral strengthens our community and extends our reach to help more people.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-semibold">Ready to Join?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            If you have a referral code, sign up now. Otherwise, contact us to request an invitation.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" data-testid="button-signup">
                Sign Up Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" data-testid="button-contact">
                Request Invitation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Help the Group. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
