import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { sendEmailSchema, type SendEmailData, type EmailLog } from "@shared/schema";
import { Send, Mail, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";

interface EmailInvitationsProps {
  isAdmin?: boolean;
}

export default function EmailInvitations({ isAdmin = false }: EmailInvitationsProps) {
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<{ id: string; referralCode: string; role: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const referralUrl = currentUser?.referralCode 
    ? `${window.location.origin}/signup?ref=${currentUser.referralCode}` 
    : "{{REFERRAL_URL}}";

  const defaultMessage = `Hello,

I'd like to invite you to join Help the Group, a supportive community for cancer patients and survivors.

Join us using my personal referral link: ${referralUrl}

Together, we can find strength and support on this journey.

Best regards`;

  const form = useForm<SendEmailData>({
    resolver: zodResolver(sendEmailSchema),
    defaultValues: {
      emails: "",
      subject: "You're invited to join Help the Group",
      message: defaultMessage,
    },
  });

  const { data: emailLogs, isLoading: logsLoading } = useQuery<EmailLog[]>({
    queryKey: ["email-logs", currentUser?.id],
    queryFn: async () => {
      const res = await fetch(`/api/emails/${currentUser?.id}`);
      if (!res.ok) throw new Error("Failed to fetch email logs");
      return res.json();
    },
    enabled: !!currentUser?.id,
  });

  const sendEmailMutation = useMutation({
    mutationFn: async (data: SendEmailData) => {
      const response = await apiRequest("POST", "/api/emails/send", {
        ...data,
        senderId: currentUser?.id,
        senderRole: isAdmin ? "Admin" : "User",
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Emails sent!",
        description: "Your invitations have been sent successfully.",
      });
      form.reset({
        emails: "",
        subject: "You're invited to join Help the Group",
        message: defaultMessage,
      });
      queryClient.invalidateQueries({ queryKey: ["email-logs", currentUser?.id] });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to send emails",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SendEmailData) => {
    sendEmailMutation.mutate(data);
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "sent":
        return <Badge className="bg-success/10 text-success border-0">Sent</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <DashboardLayout isAdmin={isAdmin}>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Email Invitations</h1>
          <p className="text-muted-foreground">Send email invitations to grow the community</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Send Email Form */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Invitations
              </CardTitle>
              <CardDescription>
                Enter email addresses to send invitations with your referral link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="emails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Addresses</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email1@example.com, email2@example.com"
                            data-testid="input-emails"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Separate multiple emails with commas
                        </FormDescription>
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
                          <Input
                            placeholder="Email subject"
                            data-testid="input-subject"
                            {...field}
                          />
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
                            placeholder="Your message..."
                            className="min-h-[200px] resize-none"
                            data-testid="input-message"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your referral URL will be included in the message
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={sendEmailMutation.isPending}
                    data-testid="button-send-emails"
                  >
                    {sendEmailMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Emails
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Email Logs */}
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-lg flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Logs
              </CardTitle>
              <CardDescription>
                History of sent email invitations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {logsLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : emailLogs && emailLogs.length > 0 ? (
                <div className="space-y-3 max-h-[500px] overflow-y-auto" data-testid="list-email-logs">
                  {emailLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start gap-3 rounded-md border p-3"
                      data-testid={`log-email-${log.id}`}
                    >
                      {getStatusIcon(log.status)}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{log.recipientEmail}</p>
                        <p className="text-sm text-muted-foreground truncate">{log.subject}</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{formatDate(log.sentAt)}</span>
                          <span className="text-border">|</span>
                          <span>{log.senderRole}</span>
                        </div>
                      </div>
                      {getStatusBadge(log.status)}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-muted-foreground">
                  <Mail className="mx-auto h-12 w-12 opacity-50" />
                  <p className="mt-4">No emails sent yet</p>
                  <p className="text-sm">Send your first invitation to get started</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
