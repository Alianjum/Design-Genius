import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ThemeToggle } from "@/components/theme-toggle";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowLeft, Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactData) => {
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    form.reset();
  };

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
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Have questions or need support? We're here to help.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Send us a Message</CardTitle>
                <CardDescription>Fill out the form and we'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" data-testid="input-name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" data-testid="input-email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What is this about?" data-testid="input-subject" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us how we can help..."
                              className="min-h-[120px] resize-none"
                              data-testid="input-message"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-submit">
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Email</h3>
                    <p className="mt-1 text-muted-foreground">support@helpthegroup.com</p>
                    <p className="text-sm text-muted-foreground">We respond within 24-48 hours</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10">
                    <Phone className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Phone</h3>
                    <p className="mt-1 text-muted-foreground">1-800-HELP-GRP</p>
                    <p className="text-sm text-muted-foreground">Mon-Fri 9am-5pm EST</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-success/10">
                    <MapPin className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold">Office</h3>
                    <p className="mt-1 text-muted-foreground">123 Support Lane</p>
                    <p className="text-muted-foreground">New York, NY 10001</p>
                  </div>
                </CardContent>
              </Card>
            </div>
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
