import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "@/pages/landing";
import Login from "@/pages/login";
import Signup from "@/pages/signup";
import UserDashboard from "@/pages/user-dashboard";
import UserReferrals from "@/pages/user-referrals";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminUsers from "@/pages/admin-users";
import AdminUserDetail from "@/pages/admin-user-detail";
import EmailInvitations from "@/pages/email-invitations";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import HowItWorks from "@/pages/how-it-works";
import Resources from "@/pages/resources";
import Support from "@/pages/support";
import FAQ from "@/pages/faq";
import Privacy from "@/pages/privacy";
import Terms from "@/pages/terms";
import Cookies from "@/pages/cookies";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/dashboard" component={UserDashboard} />
      <Route path="/dashboard/referrals" component={UserReferrals} />
      <Route path="/dashboard/email">
        {() => <EmailInvitations isAdmin={false} />}
      </Route>
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/users" component={AdminUsers} />
      <Route path="/admin/users/:id" component={AdminUserDetail} />
      <Route path="/admin/email">
        {() => <EmailInvitations isAdmin={true} />}
      </Route>
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/resources" component={Resources} />
      <Route path="/support" component={Support} />
      <Route path="/faq" component={FAQ} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route path="/cookies" component={Cookies} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
