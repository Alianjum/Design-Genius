import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Users, Copy, Check } from "lucide-react";
import type { ReferralUser } from "@shared/schema";

export default function UserReferrals() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ id: string; referralCode: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const { data: referrals, isLoading } = useQuery<ReferralUser[]>({
    queryKey: ["user-referrals", currentUser?.id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${currentUser?.id}/referrals`);
      if (!res.ok) throw new Error("Failed to fetch referrals");
      return res.json();
    },
    enabled: !!currentUser?.id,
  });

  const referralUrl = currentUser?.referralCode 
    ? `${window.location.origin}/signup?ref=${currentUser.referralCode}` 
    : "";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Referral link copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Referrals</h1>
          <p className="text-muted-foreground">Track and manage your referrals</p>
        </div>

        {/* Referral Link Card */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Your Referral Link</CardTitle>
            <CardDescription>Share this link to invite others to join the community</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex-1 rounded-md border bg-muted/50 px-3 py-2 text-sm font-mono truncate" data-testid="text-referral-url">
                {referralUrl}
              </div>
              <Button onClick={handleCopy} variant="outline" data-testid="button-copy-referral">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Your referral code: <span className="font-mono font-medium text-foreground" data-testid="text-referral-code">{currentUser?.referralCode}</span>
            </p>
          </CardContent>
        </Card>

        {/* Referrals Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Your Referrals
            </CardTitle>
            <CardDescription>People who joined using your referral link ({referrals?.length || 0} total)</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : referrals && referrals.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-referrals">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Join Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referrals.map((referral) => (
                      <tr key={referral.id} className="border-b last:border-0" data-testid={`row-referral-${referral.id}`}>
                        <td className="py-3 font-medium">{referral.name}</td>
                        <td className="py-3 text-muted-foreground">{referral.email}</td>
                        <td className="py-3 text-muted-foreground">{formatDate(referral.joinDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-6 text-center text-muted-foreground">
                <Users className="mx-auto h-10 w-10 opacity-50" />
                <p className="mt-3">No referrals yet</p>
                <p className="text-sm">Share your referral link to invite others!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
