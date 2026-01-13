import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, Users, Shield, Sparkles, ArrowLeft } from "lucide-react";

export default function About() {
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
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">About Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Help the Group is a community-driven platform dedicated to connecting cancer patients, survivors, and their families.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl font-semibold">Our Mission</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              We believe no one should face cancer alone. Our mission is to create a supportive, 
              understanding community where individuals affected by cancer can connect, share experiences, 
              and find strength in each other.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Through our unique referral system, we encourage members to invite others who might benefit 
              from our community. This organic growth ensures that our community remains authentic and 
              focused on providing genuine support.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-center text-2xl font-semibold">Our Values</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Heart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-heading font-semibold">Compassion</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We lead with empathy and understanding in every interaction
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-4 font-heading font-semibold">Community</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Together we are stronger than we are alone
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <h3 className="mt-4 font-heading font-semibold">Trust</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your privacy and safety are our top priorities
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 font-heading font-semibold">Hope</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We believe in the power of positivity and resilience
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-semibold">Join Our Community</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Whether you're a patient, survivor, caregiver, or ally, there's a place for you here.
          </p>
          <Link href="/signup">
            <Button className="mt-6" size="lg" data-testid="button-join">
              Get Started
            </Button>
          </Link>
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
