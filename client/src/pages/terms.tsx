import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, ArrowLeft } from "lucide-react";

export default function Terms() {
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
            <h1 className="font-heading">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: January 2026</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using Help the Group, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Help the Group is a community platform designed to connect cancer patients, survivors, 
              and their support networks. Our services include community features, referral tracking, 
              and communication tools.
            </p>

            <h2>3. User Accounts</h2>
            <p>To use certain features, you must create an account. You agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized access</li>
              <li>Be responsible for all activities under your account</li>
            </ul>

            <h2>4. User Conduct</h2>
            <p>When using our platform, you agree not to:</p>
            <ul>
              <li>Harass, abuse, or harm other users</li>
              <li>Post false, misleading, or inappropriate content</li>
              <li>Violate any applicable laws or regulations</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use the platform for commercial purposes without permission</li>
            </ul>

            <h2>5. Referral Program</h2>
            <p>
              Our referral system is designed to help grow our community organically. Users may 
              invite others using their unique referral code. Abuse of the referral system may 
              result in account termination.
            </p>

            <h2>6. Privacy</h2>
            <p>
              Your use of our services is also governed by our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              . Please review it to understand how we collect and use your information.
            </p>

            <h2>7. Intellectual Property</h2>
            <p>
              All content, trademarks, and other intellectual property on our platform are owned 
              by Help the Group or our licensors. You may not use our intellectual property 
              without express permission.
            </p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              Our services are provided "as is" without warranties of any kind. We do not guarantee 
              that our services will be uninterrupted, secure, or error-free.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Help the Group shall not be liable for any 
              indirect, incidental, special, or consequential damages arising from your use of 
              our services.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of 
              significant changes. Continued use of our services constitutes acceptance of 
              modified terms.
            </p>

            <h2>11. Termination</h2>
            <p>
              We may terminate or suspend your account at our discretion, including for violation 
              of these terms. You may also delete your account at any time.
            </p>

            <h2>12. Contact</h2>
            <p>
              For questions about these Terms of Service, please visit our{" "}
              <Link href="/contact" className="text-primary hover:underline">
                contact page
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
