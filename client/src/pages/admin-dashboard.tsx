import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, UserCheck, TrendingUp, ArrowUpRight } from "lucide-react";
import type { AdminStats, User } from "@shared/schema";

function StatCard({ title, value, icon, trend }: { title: string; value: string | number; icon: React.ReactNode; trend?: string }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="mt-1 font-heading text-2xl font-semibold">{value}</p>
            {trend && (
              <p className="mt-1 flex items-center text-xs text-success">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-primary/10">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });

  const { data: users, isLoading: usersLoading } = useQuery<User[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <DashboardLayout isAdmin>
      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-semibold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your community and track growth</p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-16 w-full" />
                </CardContent>
              </Card>
            ))
          ) : (
            <>
              <StatCard
                title="Total Users"
                value={stats?.totalUsers ?? 0}
                icon={<Users className="h-6 w-6 text-primary" />}
              />
              <StatCard
                title="Active Users"
                value={stats?.activeUsers ?? 0}
                icon={<UserCheck className="h-6 w-6 text-success" />}
              />
              <StatCard
                title="Total Referrals"
                value={stats?.totalReferrals ?? 0}
                icon={<Users className="h-6 w-6 text-accent" />}
              />
              <StatCard
                title="Daily Growth"
                value={stats?.dailyGrowth ?? 0}
                icon={<TrendingUp className="h-6 w-6 text-primary" />}
                trend="+12% from last week"
              />
            </>
          )}
        </div>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg">Users Management</CardTitle>
            <CardDescription>All registered users in the community</CardDescription>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : users && users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-users">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Referral Count</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b last:border-0" data-testid={`row-user-${user.id}`}>
                        <td className="py-3 font-medium">{user.name}</td>
                        <td className="py-3 text-muted-foreground">{user.email}</td>
                        <td className="py-3">-</td>
                        <td className="py-3">
                          <Badge variant={user.isActive ? "default" : "secondary"} className="text-xs">
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="py-3 text-muted-foreground">{formatDate(user.joinDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <Users className="mx-auto h-12 w-12 opacity-50" />
                <p className="mt-4">No users registered yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
