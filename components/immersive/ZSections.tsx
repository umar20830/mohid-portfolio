'use client';

import { Container, Button, ArrowRightIcon, TrendingUpIcon, CheckCircleIcon } from '@/components/ui';
import { siteConfig, stats, services, caseStudies, skills } from '@/lib/constants';
import { cn } from '@/lib/utils';

// Hero Section - No animations, pure CSS
export function ZHeroSection() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/10 rounded-full blur-[80px]" />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Available for new projects</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tight">
            <span className="block">I Help Brands</span>
            <span className="block mt-2 text-gradient">Dominate Search</span>
            <span className="block mt-2">Rankings</span>
          </h1>

          {/* Description */}
          <p className="mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Professional SEO Specialist from {siteConfig.location}, delivering data-driven
            strategies that boost organic traffic and generate measurable ROI.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Start Your SEO Journey
              <ArrowRightIcon size={20} />
            </Button>
            <Button variant="outline" size="lg" href="/projects">
              View Case Studies
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

// Highlights Section
export function ZHighlightsSection() {
  const highlights = [
    { title: 'Technical SEO', description: 'Site architecture, Core Web Vitals, crawlability optimization' },
    { title: 'Content Strategy', description: 'Keyword research, content planning, semantic optimization' },
    { title: 'Link Building', description: 'White-hat outreach, digital PR, authority building' },
    { title: 'Analytics & Reporting', description: 'Custom dashboards, ROI tracking, actionable insights' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <Container size="wide" className="relative z-10">
        <div className="text-center mb-12">
          <span className="text-primary font-medium">What I Do</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
            SEO Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {highlights.map((item) => (
            <div
              key={item.title}
              className={cn(
                'p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border',
                'hover:border-primary/50 transition-colors duration-200'
              )}
            >
              <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

// Services Section
export function ZServicesSection() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="text-center mb-10">
          <span className="text-primary font-medium">Services</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
            How I Can Help
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.slice(0, 6).map((service) => (
            <div
              key={service.id}
              className={cn(
                'p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border',
                'hover:border-primary/50 transition-colors duration-200'
              )}
            >
              <h3 className="text-lg font-semibold text-foreground mb-3">{service.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <CheckCircleIcon size={16} className="text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

// Case Studies Section
export function ZCaseStudiesSection() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <Container size="wide" className="relative z-10">
        <div className="text-center mb-10">
          <span className="text-primary font-medium">Results</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground">
            Case Studies
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {caseStudies.slice(0, 2).map((study) => (
            <div
              key={study.id}
              className={cn(
                'p-6 rounded-2xl bg-card/80 backdrop-blur-sm border border-border',
                'hover:border-primary/50 transition-colors duration-200'
              )}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                  {study.industry}
                </span>
                <span className="text-sm text-muted-foreground">{study.duration}</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{study.title}</h3>
              <p className="text-muted-foreground mb-6">{study.description}</p>

              <div className="grid grid-cols-2 gap-4">
                {study.results.slice(0, 2).map((result) => (
                  <div key={result.metric} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <TrendingUpIcon size={16} className="text-accent" />
                      <span className="font-bold text-accent">{result.change}</span>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">{result.metric}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

// About Section
export function ZAboutSection() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <Container size="wide" className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Visual */}
          <div className="relative">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl" />
              <div className="absolute inset-0 bg-card border border-border rounded-3xl flex items-center justify-center">
                <span className="text-8xl font-bold text-muted-foreground/10">
                  {siteConfig.name.charAt(0)}
                </span>
              </div>
              <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 shadow-lg">
                <span className="text-sm font-medium">SEO Expert</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-lg">
                <span className="text-sm font-medium">6+ Years</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-primary font-medium">About Me</span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold text-foreground mb-6">
              Hi, I'm {siteConfig.name}
            </h2>
            <p className="text-muted-foreground mb-6">
              With over 6 years of experience in SEO, I've helped businesses across various
              industries achieve remarkable growth in organic traffic and revenue.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {skills.slice(0, 8).map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-muted rounded-lg text-sm text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>

            <Button variant="primary" href="/about">
              Learn More <ArrowRightIcon size={18} />
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

// Contact Section
export function ZContactSection() {
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />

      <Container size="content" className="relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-primary font-medium">Get In Touch</span>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Work Together
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Ready to improve your search rankings and drive organic growth?
            Let's discuss your project.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Get Free Consultation
              <ArrowRightIcon size={20} />
            </Button>
            <Button variant="outline" size="lg" href={`mailto:${siteConfig.email}`}>
              {siteConfig.email}
            </Button>
          </div>

          {/* Social Links */}
          <div className="mt-12 flex items-center justify-center gap-6">
            {Object.entries(siteConfig.social).map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors capitalize"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
