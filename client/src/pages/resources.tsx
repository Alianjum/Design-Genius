import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Heart, ArrowLeft, BookOpen, Phone, Globe, FileText, Users, Stethoscope, Brain, HandHeart } from "lucide-react";

export default function Resources() {
  const resourceCategories = [
    {
      title: "Cancer Information",
      description: "Trusted sources for understanding cancer types, treatments, and research",
      icon: <Stethoscope className="h-6 w-6 text-primary" />,
      resources: [
        { name: "American Cancer Society", url: "https://www.cancer.org" },
        { name: "National Cancer Institute", url: "https://www.cancer.gov" },
        { name: "Cancer Research UK", url: "https://www.cancerresearchuk.org" },
      ],
    },
    {
      title: "Emotional Support",
      description: "Resources for mental health and emotional well-being",
      icon: <Brain className="h-6 w-6 text-accent" />,
      resources: [
        { name: "CancerCare Counseling", url: "https://www.cancercare.org" },
        { name: "Cancer Support Community", url: "https://www.cancersupportcommunity.org" },
        { name: "Imerman Angels", url: "https://imermanangels.org" },
      ],
    },
    {
      title: "Financial Assistance",
      description: "Help with medical costs, insurance, and financial planning",
      icon: <HandHeart className="h-6 w-6 text-success" />,
      resources: [
        { name: "Patient Advocate Foundation", url: "https://www.patientadvocate.org" },
        { name: "Cancer Financial Assistance Coalition", url: "https://www.cancerfac.org" },
        { name: "HealthWell Foundation", url: "https://www.healthwellfoundation.org" },
      ],
    },
    {
      title: "Caregiver Support",
      description: "Resources for those caring for loved ones with cancer",
      icon: <Users className="h-6 w-6 text-primary" />,
      resources: [
        { name: "Caregiver Action Network", url: "https://www.caregiveraction.org" },
        { name: "Family Caregiver Alliance", url: "https://www.caregiver.org" },
        { name: "AARP Caregiving", url: "https://www.aarp.org/caregiving" },
      ],
    },
  ];

  const hotlines = [
    { name: "Cancer Hope Network", phone: "1-877-467-3638" },
    { name: "American Cancer Society", phone: "1-800-227-2345" },
    { name: "National Cancer Institute", phone: "1-800-422-6237" },
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
          <h1 className="font-heading text-4xl font-bold tracking-tight md:text-5xl">Resources</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Curated resources to support you and your loved ones through every step of the journey.
          </p>
        </div>
      </section>

      {/* Crisis Hotlines */}
      <section className="border-t bg-primary/5 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              <span className="font-semibold">24/7 Support Lines:</span>
            </div>
            {hotlines.map((hotline) => (
              <div key={hotline.name} className="text-center">
                <p className="text-sm text-muted-foreground">{hotline.name}</p>
                <p className="font-mono font-semibold">{hotline.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {resourceCategories.map((category) => (
              <Card key={category.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                      {category.icon}
                    </div>
                    <div>
                      <CardTitle className="font-heading">{category.title}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {category.resources.map((resource) => (
                      <li key={resource.name}>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          {resource.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Materials */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-center text-2xl font-semibold">Educational Materials</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Free guides and information to help you understand and navigate your journey.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 pt-6">
                <BookOpen className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-heading font-semibold">Newly Diagnosed Guide</h3>
                  <p className="text-sm text-muted-foreground">What to expect and how to prepare</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 pt-6">
                <FileText className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="font-heading font-semibold">Treatment Options</h3>
                  <p className="text-sm text-muted-foreground">Understanding different treatments</p>
                </div>
              </CardContent>
            </Card>
            <Card className="hover-elevate cursor-pointer">
              <CardContent className="flex items-center gap-4 pt-6">
                <Users className="h-8 w-8 text-success" />
                <div>
                  <h3 className="font-heading font-semibold">Survivorship</h3>
                  <p className="text-sm text-muted-foreground">Life after treatment</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-semibold">Need More Help?</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Our community is here to support you. Reach out if you need additional resources.
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
