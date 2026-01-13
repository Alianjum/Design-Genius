import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, ArrowLeft, Mail, Phone, MessageCircle, HelpCircle, BookOpen, Users } from "lucide-react";

export default function Support() {
  const faqs = [
    {
      question: "How do I join Help the Group?",
      answer: "You can join by using a referral link from an existing member. If you don't have a referral link, you can contact us to request an invitation. This referral-based system helps us maintain a safe and supportive community.",
    },
    {
      question: "What is a referral code and how do I use it?",
      answer: "A referral code is a unique 8-character code assigned to each member. When someone signs up using your referral code or link, they become part of your referral network. You can find your referral code and shareable link in your dashboard.",
    },
    {
      question: "How do I invite others to join?",
      answer: "You can invite others by sharing your unique referral link (found in your dashboard) or by using our built-in email invitation feature. Go to 'Email Invitations' in your dashboard to send personalized invitations.",
    },
    {
      question: "Is my personal information safe?",
      answer: "Yes, we take your privacy very seriously. We use industry-standard security measures to protect your data. We never share your personal information with third parties without your consent. Please review our Privacy Policy for more details.",
    },
    {
      question: "Can I use the platform if I'm a caregiver, not a patient?",
      answer: "Absolutely! Help the Group welcomes patients, survivors, caregivers, family members, and anyone touched by cancer. Our community is built on mutual support and understanding.",
    },
    {
      question: "How do I update my account information?",
      answer: "You can update your account information by logging into your dashboard. If you need to change your email address or have other account-related issues, please contact our support team.",
    },
    {
      question: "What should I do if I forgot my password?",
      answer: "If you've forgotten your password, click the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password.",
    },
    {
      question: "How can I deactivate or delete my account?",
      answer: "If you wish to deactivate or delete your account, please contact our support team. We'll guide you through the process and ensure your data is handled according to your wishes.",
    },
  ];

  const supportOptions = [
    {
      icon: <Mail className="h-6 w-6 text-primary" />,
      title: "Email Support",
      description: "Get help via email within 24-48 hours",
      action: "support@helpthegroup.com",
      link: "mailto:support@helpthegroup.com",
    },
    {
      icon: <Phone className="h-6 w-6 text-accent" />,
      title: "Phone Support",
      description: "Mon-Fri, 9am-5pm EST",
      action: "1-800-HELP-GRP",
      link: "tel:1-800-435-7477",
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-success" />,
      title: "Contact Form",
      description: "Send us a detailed message",
      action: "Contact Us",
      link: "/contact",
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
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Help Center</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Find answers to common questions and get the support you need.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="border-t bg-muted/30 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/how-it-works">
              <Button variant="outline" data-testid="link-how-it-works">
                <BookOpen className="mr-2 h-4 w-4" />
                How It Works
              </Button>
            </Link>
            <Link href="/resources">
              <Button variant="outline" data-testid="link-resources">
                <Users className="mr-2 h-4 w-4" />
                Resources
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" data-testid="link-contact">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-center text-2xl font-semibold">Get in Touch</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
            Choose the support option that works best for you.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {supportOptions.map((option) => (
              <Card key={option.title}>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    {option.icon}
                  </div>
                  <h3 className="mt-4 font-heading font-semibold">{option.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{option.description}</p>
                  {option.link.startsWith("/") ? (
                    <Link href={option.link}>
                      <Button variant="outline" className="mt-4" data-testid={`button-${option.title.toLowerCase().replace(" ", "-")}`}>
                        {option.action}
                      </Button>
                    </Link>
                  ) : (
                    <a href={option.link}>
                      <Button variant="outline" className="mt-4" data-testid={`button-${option.title.toLowerCase().replace(" ", "-")}`}>
                        {option.action}
                      </Button>
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-center gap-3">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h2 className="font-heading text-2xl font-semibold">Frequently Asked Questions</h2>
            </div>
            <p className="mt-4 text-center text-muted-foreground">
              Quick answers to the most common questions about Help the Group.
            </p>
            <Accordion type="single" collapsible className="mt-8" data-testid="faq-accordion">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium" data-testid={`faq-question-${index}`}>
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground" data-testid={`faq-answer-${index}`}>
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Still Need Help */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-semibold">Still Need Help?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link href="/contact">
            <Button className="mt-6" size="lg" data-testid="button-contact-support">
              Contact Support
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
