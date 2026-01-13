import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Users, Calendar, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import type { UserStats, ReferralUser } from "@shared/schema";

function StatCard({ title, value, icon, description }: { title: string; value: string | number; icon: React.ReactNode; description?: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 font-heading text-2xl font-semibold">{value}</p>
            {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ReferralLinkCard({ referralCode }: { referralCode: string }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const referralUrl = `${window.location.origin}/signup?ref=${referralCode}`;

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading text-lg">Your Referral Link</CardTitle>
        <CardDescription>Share this link to invite others to join</CardDescription>
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
          Your referral code: <span className="font-mono font-medium text-foreground" data-testid="text-referral-code">{referralCode}</span>
        </p>
      </CardContent>
    </Card>
  );
}

export default function UserDashboard() {
  const [currentUser, setCurrentUser] = useState<{ id: string; name: string; referralCode: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      setCurrentUser(JSON.parse(stored));
    }
  }, []);

  const { data: stats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: ["user-stats", currentUser?.id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${currentUser?.id}/stats`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    enabled: !!currentUser?.id,
  });

  const { data: referrals, isLoading: referralsLoading } = useQuery<ReferralUser[]>({
    queryKey: ["user-referrals", currentUser?.id],
    queryFn: async () => {
      const res = await fetch(`/api/users/${currentUser?.id}/referrals`);
      if (!res.ok) throw new Error("Failed to fetch referrals");
      return res.json();
    },
    enabled: !!currentUser?.id,
  });

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
          <h1 className="font-heading text-2xl font-semibold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {currentUser?.name || "User"}!</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {statsLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <StatCard
                title="Total Referrals"
                value={stats?.totalReferrals ?? 0}
                icon={<Users className="h-6 w-6 text-primary" />}
                description="People who joined using your link"
              />
              <StatCard
                title="Join Date"
                value={stats?.joinDate ? formatDate(stats.joinDate) : "-"}
                icon={<Calendar className="h-6 w-6 text-primary" />}
              />
              <StatCard
                title="Referral Code"
                value={currentUser?.referralCode || "-"}
                icon={<Copy className="h-6 w-6 text-accent" />}
                description="Share this code with others"
              />
            </>
          )}
        </div>

        {/* Referral Link */}
        {currentUser?.referralCode && (
          <ReferralLinkCard referralCode={currentUser.referralCode} />
        )}

        {/* Referrals Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Your Referrals</CardTitle>
            <CardDescription>People who joined using your referral link</CardDescription>
          </CardHeader>
          <CardContent>
            {referralsLoading ? (
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
                        <td className="py-3">{referral.name}</td>
                        <td className="py-3 text-muted-foreground">{referral.email}</td>
                        <td className="py-3 text-muted-foreground">{formatDate(referral.joinDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Users className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-4">No referrals yet</p>
                <p className="text-sm">Share your referral link to invite others!</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
