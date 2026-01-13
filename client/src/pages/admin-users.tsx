import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Users, Shield, User, Eye } from "lucide-react";
import type { User as UserType } from "@shared/schema";

export default function AdminUsers() {
  const { toast } = useToast();

  const { data: users, isLoading } = useQuery<UserType[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({ userId, isActive }: { userId: string; isActive: boolean }) => {
      const response = await apiRequest("PATCH", `/api/admin/users/${userId}`, { isActive });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "User updated",
        description: "User status has been updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Update failed",
        description: error.message || "Failed to update user status.",
        variant: "destructive",
      });
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
          <h1 className="font-heading text-2xl font-semibold">Users Management</h1>
          <p className="text-muted-foreground">View and manage all community members. Click on a user to see their referrals.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="font-heading text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              All Users
            </CardTitle>
            <CardDescription>
              {users?.length || 0} registered users in the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : users && users.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full" data-testid="table-all-users">
                  <thead>
                    <tr className="border-b text-left text-sm text-muted-foreground">
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Email</th>
                      <th className="pb-3 font-medium">Role</th>
                      <th className="pb-3 font-medium">Referral Code</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Joined</th>
                      <th className="pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="border-b last:border-0" data-testid={`row-user-${user.id}`}>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                              {user.role === "admin" ? (
                                <Shield className="h-4 w-4 text-primary" />
                              ) : (
                                <User className="h-4 w-4 text-muted-foreground" />
                              )}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-muted-foreground">{user.email}</td>
                        <td className="py-3">
                          <Badge variant={user.role === "admin" ? "default" : "secondary"} className="text-xs">
                            {user.role === "admin" ? "Admin" : "User"}
                          </Badge>
                        </td>
                        <td className="py-3">
                          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
                            {user.referralCode}
                          </code>
                        </td>
                        <td className="py-3">
                          <Badge 
                            className={`text-xs ${user.isActive ? "bg-success/10 text-success border-0" : "bg-muted text-muted-foreground border-0"}`}
                          >
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </td>
                        <td className="py-3 text-muted-foreground">{formatDate(user.joinDate)}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <Link href={`/admin/users/${user.id}`}>
                              <Button
                                variant="ghost"
                                size="sm"
                                data-testid={`button-view-user-${user.id}`}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleStatusMutation.mutate({ 
                                userId: user.id, 
                                isActive: !user.isActive 
                              })}
                              disabled={toggleStatusMutation.isPending || user.role === "admin"}
                              data-testid={`button-toggle-status-${user.id}`}
                            >
                              {user.isActive ? "Deactivate" : "Activate"}
                            </Button>
                          </div>
                        </td>
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
