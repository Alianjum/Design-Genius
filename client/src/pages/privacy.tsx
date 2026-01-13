import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, ArrowLeft } from "lucide-react";

export default function Privacy() {
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

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl prose dark:prose-invert">
            <h1 className="font-heading">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2026</p>

            <h2>1. Information We Collect</h2>
            <p>
              When you join Help the Group, we collect information you provide directly to us, including:
            </p>
            <ul>
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Referral information</li>
              <li>Communications you send to us</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Understand how our community uses our platform</li>
            </ul>

            <h2>3. Information Sharing</h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy or as required by law.
            </p>

            <h2>4. Data Security</h2>
            <p>
              We take reasonable measures to help protect your personal information from loss, theft, 
              misuse, and unauthorized access. However, no security system is impenetrable.
            </p>

            <h2>5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of communications</li>
            </ul>

            <h2>6. Cookies</h2>
            <p>
              We use cookies and similar technologies to remember your preferences and provide a 
              better experience on our platform.
            </p>

            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under 18. We do not knowingly collect 
              personal information from children.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes 
              by posting the new policy on this page.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <Link href="/contact" className="text-primary hover:underline">
                our contact page
              </Link>
              .
            </p>
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
