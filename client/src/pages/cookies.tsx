import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, ArrowLeft } from "lucide-react";

export default function Cookies() {
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
            <h1 className="font-heading">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2026</p>

            <h2>What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when 
              you visit a website. They are widely used to make websites work more efficiently and 
              provide information to website owners.
            </p>

            <h2>How We Use Cookies</h2>
            <p>
              Help the Group uses cookies to improve your experience on our platform. We use the 
              following types of cookies:
            </p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core 
              functionality such as:
            </p>
            <ul>
              <li>User authentication and session management</li>
              <li>Security features to protect your account</li>
              <li>Remembering your login status</li>
            </ul>

            <h3>Preference Cookies</h3>
            <p>
              These cookies remember your preferences and settings:
            </p>
            <ul>
              <li>Theme preference (light/dark mode)</li>
              <li>Language settings</li>
              <li>Display preferences</li>
            </ul>

            <h3>Analytics Cookies</h3>
            <p>
              We may use analytics cookies to understand how visitors interact with our website:
            </p>
            <ul>
              <li>Pages visited and time spent on each page</li>
              <li>How you arrived at our site</li>
              <li>Features you use most frequently</li>
            </ul>
            <p>
              This information helps us improve our platform and provide a better experience for 
              our community members.
            </p>

            <h2>Third-Party Cookies</h2>
            <p>
              We do not use third-party advertising cookies. Any third-party cookies on our site 
              are limited to essential services that help us provide our platform.
            </p>

            <h2>Managing Cookies</h2>
            <p>
              Most web browsers allow you to control cookies through their settings. You can:
            </p>
            <ul>
              <li>View what cookies are stored on your device</li>
              <li>Delete cookies individually or all at once</li>
              <li>Block cookies from certain or all websites</li>
              <li>Set preferences for certain types of cookies</li>
            </ul>
            <p>
              Please note that disabling essential cookies may affect the functionality of our 
              platform and you may not be able to access certain features.
            </p>

            <h2>Cookie Duration</h2>
            <p>
              Cookies can be either "session" cookies or "persistent" cookies:
            </p>
            <ul>
              <li>
                <strong>Session cookies</strong> are temporary and are deleted when you close 
                your browser.
              </li>
              <li>
                <strong>Persistent cookies</strong> remain on your device for a set period or 
                until you delete them.
              </li>
            </ul>

            <h2>Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. We will notify you of any 
              changes by posting the new policy on this page and updating the "Last updated" date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at{" "}
              <Link href="/contact" className="text-primary hover:underline">
                our contact page
              </Link>
              .
            </p>

            <h2>Related Policies</h2>
            <p>
              Please also review our{" "}
              <Link href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link href="/terms" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              for more information about how we handle your data.
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
