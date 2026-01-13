import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, User, Mail, Calendar, Users, Shield } from "lucide-react";
import type { User as UserType, ReferralUser, UserStats } from "@shared/schema";

export default function AdminUserDetail() {
  const params = useParams();
  const userId = params.id;

  const { data: user, isLoading: userLoading } = useQuery<Omit<UserType, 'password'>>({
    queryKey: ["admin-user", userId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${userId}`);
      if (!res.ok) throw new Error("Failed to fetch user");
      return res.json();
    },
    enabled: !!userId,
  });

  const { data: stats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: ["admin-user-stats", userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/stats`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
    enabled: !!userId,
  });

  const { data: referrals, isLoading: referralsLoading } = useQuery<ReferralUser[]>({
    queryKey: ["admin-user-referrals", userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}/referrals`);
      if (!res.ok) throw new Error("Failed to fetch referrals");
      return res.json();
    },
    enabled: !!userId,
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const isLoading = userLoading || statsLoading || referralsLoading;

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin/users">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-heading text-2xl font-semibold">User Details</h1>
            <p className="text-muted-foreground">View user information and referrals</p>
          </div>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : user ? (
          <>
            {/* User Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    {user.role === "admin" ? (
                      <Shield className="h-5 w-5 text-primary" />
                    ) : (
                      <User className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  {user.name}
                  {user.role === "admin" && (
                    <Badge className="ml-2">Admin</Badge>
                  )}
                </CardTitle>
                <CardDescription>Member since {formatDate(user.joinDate)}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Join Date</p>
                      <p className="font-medium">{formatDate(user.joinDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Referrals</p>
                      <p className="font-medium">{stats?.totalReferrals ?? 0}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-md border p-3">
                    <div className={`h-3 w-3 rounded-full ${user.isActive ? "bg-success" : "bg-muted-foreground"}`} />
                    <div>
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-medium">{user.isActive ? "Active" : "Inactive"}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 rounded-md bg-muted/50 p-3">
                  <p className="text-xs text-muted-foreground">Referral Code</p>
                  <code className="font-mono text-lg font-medium">{user.referralCode}</code>
                </div>
              </CardContent>
            </Card>

            {/* Referrals Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Referrals ({referrals?.length || 0})
                </CardTitle>
                <CardDescription>People who joined using this user's referral link</CardDescription>
              </CardHeader>
              <CardContent>
                {referrals && referrals.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full" data-testid="table-user-referrals">
                      <thead>
                        <tr className="border-b text-left text-sm text-muted-foreground">
                          <th className="pb-3 font-medium">Name</th>
                          <th className="pb-3 font-medium">Email</th>
                          <th className="pb-3 font-medium">Join Date</th>
                          <th className="pb-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {referrals.map((referral) => (
                          <tr key={referral.id} className="border-b last:border-0" data-testid={`row-referral-${referral.id}`}>
                            <td className="py-3 font-medium">{referral.name}</td>
                            <td className="py-3 text-muted-foreground">{referral.email}</td>
                            <td className="py-3 text-muted-foreground">{formatDate(referral.joinDate)}</td>
                            <td className="py-3">
                              <Link href={`/admin/users/${referral.id}`}>
                                <Button variant="ghost" size="sm" data-testid={`button-view-${referral.id}`}>
                                  View
                                </Button>
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    <Users className="mx-auto h-12 w-12 opacity-50" />
                    <p className="mt-4">No referrals yet</p>
                    <p className="text-sm">This user hasn't referred anyone</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="py-8 text-center text-muted-foreground">
              <User className="mx-auto h-12 w-12 opacity-50" />
              <p className="mt-4">User not found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
