import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, ArrowLeft } from "lucide-react";

export default function FAQ() {
  const faqCategories = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I join Help the Group?",
          answer: "You can join by using a referral link from an existing member. If you don't have a referral link, you can contact us to request an invitation. This referral-based system helps us maintain a safe and supportive community.",
        },
        {
          question: "Who can join the community?",
          answer: "Help the Group welcomes cancer patients, survivors, caregivers, family members, and anyone affected by cancer. Our community is built on mutual support and understanding.",
        },
        {
          question: "Is there a cost to join?",
          answer: "No, Help the Group is completely free to join and use. Our mission is to provide support to everyone affected by cancer, regardless of their financial situation.",
        },
      ],
    },
    {
      category: "Referral System",
      questions: [
        {
          question: "What is a referral code?",
          answer: "A referral code is a unique 8-character code assigned to each member. When someone signs up using your referral code or link, they become part of your referral network.",
        },
        {
          question: "How do I find my referral link?",
          answer: "Your referral link and code are displayed on your dashboard. You can copy the link directly or use our email invitation feature to share it.",
        },
        {
          question: "Can I invite anyone I want?",
          answer: "Yes, you can invite anyone who might benefit from our community. We encourage you to share with friends, family, colleagues, or anyone you know who has been affected by cancer.",
        },
      ],
    },
    {
      category: "Account & Privacy",
      questions: [
        {
          question: "Is my personal information safe?",
          answer: "Yes, we take your privacy very seriously. We use industry-standard security measures to protect your data. We never share your personal information with third parties without your consent.",
        },
        {
          question: "How do I update my account information?",
          answer: "You can update your account information by logging into your dashboard. If you need to change your email address, please contact our support team.",
        },
        {
          question: "What should I do if I forgot my password?",
          answer: "Click the 'Forgot Password' link on the login page. You'll receive an email with instructions to reset your password.",
        },
        {
          question: "How can I delete my account?",
          answer: "If you wish to delete your account, please contact our support team. We'll guide you through the process and ensure your data is handled according to your wishes.",
        },
      ],
    },
    {
      category: "Email Invitations",
      questions: [
        {
          question: "How do I send email invitations?",
          answer: "Log into your dashboard and navigate to 'Email Invitations'. Enter the email addresses of people you'd like to invite, customize your message, and click send.",
        },
        {
          question: "Can I send invitations to multiple people at once?",
          answer: "Yes, you can enter multiple email addresses separated by commas. Each recipient will receive a personalized invitation with your referral link.",
        },
        {
          question: "Will recipients know I invited them?",
          answer: "Yes, the invitation email will include your name and a personalized message. This helps establish trust and connection from the start.",
        },
      ],
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
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">FAQ</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Find answers to frequently asked questions about Help the Group.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="font-heading text-xl font-semibold mb-4">{category.category}</h2>
                <Accordion type="single" collapsible data-testid={`faq-category-${categoryIndex}`}>
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left font-medium">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-semibold">Still Have Questions?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <Link href="/contact">
            <Button className="mt-6" size="lg" data-testid="button-contact">
              Contact Us
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
