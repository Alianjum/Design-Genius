import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Users, UserPlus, Heart, Shield, MessageCircle, TrendingUp } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-heading text-xl font-semibold">Help the Group</span>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/about">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">About</span>
              </Link>
              <Link href="/how-it-works">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">How It Works</span>
              </Link>
              <Link href="/resources">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Resources</span>
              </Link>
              <Link href="/support">
                <span className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">Support</span>
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="ghost" data-testid="button-login">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button data-testid="button-join-community-header">
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              You Are{" "}
              <span className="text-primary">Not Alone</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              A supportive community for cancer patients and survivors. Connect with others who understand your journey, share experiences, and find strength together.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/signup">
                <Button size="lg" className="min-w-[200px]" data-testid="button-join-community-hero">
                  Join Community
                </Button>
              </Link>
              <Link href="/how-it-works">
                <Button variant="outline" size="lg" className="min-w-[200px]" data-testid="button-learn-more">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join our community in three simple steps
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-visible">
              <div className="absolute -top-5 left-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary text-lg font-semibold text-primary-foreground">
                  1
                </div>
              </div>
              <CardContent className="pt-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Join the Community</h3>
                <p className="mt-2 text-muted-foreground">
                  Sign up with a referral code from a member or join directly. Become part of our supportive network.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-visible">
              <div className="absolute -top-5 left-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-accent text-lg font-semibold text-accent-foreground">
                  2
                </div>
              </div>
              <CardContent className="pt-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-accent/10">
                  <UserPlus className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Invite Others</h3>
                <p className="mt-2 text-muted-foreground">
                  Share your unique referral link with friends and family who might benefit from our community.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-visible sm:col-span-2 lg:col-span-1">
              <div className="absolute -top-5 left-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-success text-lg font-semibold text-success-foreground">
                  3
                </div>
              </div>
              <CardContent className="pt-10">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-success/10">
                  <Heart className="h-6 w-6 text-success" />
                </div>
                <h3 className="font-heading text-xl font-semibold">Support & Grow Together</h3>
                <p className="mt-2 text-muted-foreground">
                  Build meaningful connections, share experiences, and find strength in our growing community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-heading text-3xl font-semibold sm:text-4xl">
                A Safe Space for Healing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We understand that the cancer journey can feel isolating. Our community provides a safe, supportive environment where you can connect with others who truly understand what you're going through.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Private & Secure</h3>
                    <p className="text-sm text-muted-foreground">Your privacy is our priority. All conversations stay within the community.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10">
                    <MessageCircle className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Peer Support</h3>
                    <p className="text-sm text-muted-foreground">Connect with others who share similar experiences and challenges.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-success/10">
                    <TrendingUp className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Growing Community</h3>
                    <p className="text-sm text-muted-foreground">Join thousands of members finding hope and support together.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 via-accent/20 to-success/20 p-8">
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <Heart className="h-16 w-16 text-primary mb-4" />
                  <p className="font-heading text-2xl font-semibold">Together We Are Stronger</p>
                  <p className="mt-2 text-muted-foreground">Building connections that heal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                  <Heart className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-heading font-semibold">Help the Group</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Supporting cancer patients and survivors through community and connection.
              </p>
            </div>
            <div>
              <h4 className="font-heading font-semibold">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about">
                    <span className="hover:text-foreground transition-colors cursor-pointer">About Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/how-it-works">
                    <span className="hover:text-foreground transition-colors cursor-pointer">How It Works</span>
                  </Link>
                </li>
                <li>
                  <Link href="/resources">
                    <span className="hover:text-foreground transition-colors cursor-pointer">Resources</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold">Support</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/support">
                    <span className="hover:text-foreground transition-colors cursor-pointer">Help Center</span>
                  </Link>
                </li>
                <li>
                  <Link href="/contact">
                    <span className="hover:text-foreground transition-colors cursor-pointer">Contact Us</span>
                  </Link>
                </li>
                <li>
                  <Link href="/faq">
                    <span className="hover:text-foreground transition-colors cursor-pointer">FAQ</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold">Legal</h4>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy">
                    <span className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</span>
                  </Link>
                </li>
                <li>
                  <Link href="/terms">
                    <span className="hover:text-foreground transition-colors cursor-pointer">Terms of Service</span>
                  </Link>
                </li>
                <li>
                  <Link href="/cookies">
                    <span className="hover:text-foreground transition-colors cursor-pointer">Cookie Policy</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} Help the Group. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
