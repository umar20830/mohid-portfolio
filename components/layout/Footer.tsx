'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Container, LinkedInIcon, TwitterIcon, GithubIcon, MailIcon, MapPinIcon } from '@/components/ui';
import { siteConfig, navigation, services } from '@/lib/constants';

const footerLinks = {
  services: services.slice(0, 4).map((s) => ({
    name: s.title,
    href: `/services#${s.id}`,
  })),
  company: [
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/projects' },
    { name: 'Free SEO Audit', href: '/contact' },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', href: siteConfig.social.linkedin, icon: LinkedInIcon },
  { name: 'Twitter', href: siteConfig.social.twitter, icon: TwitterIcon },
  { name: 'GitHub', href: siteConfig.social.github, icon: GithubIcon },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border">
      <Container size="wide">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors"
              >
                <span className="text-primary">&lt;</span>
                {siteConfig.name}
                <span className="text-primary">/&gt;</span>
              </Link>
              <p className="mt-4 text-muted-foreground text-sm leading-relaxed max-w-xs">
                Professional SEO Specialist helping businesses achieve top rankings,
                increase organic traffic, and drive sustainable growth.
              </p>
              <div className="mt-6 space-y-3">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px]"
                >
                  <MailIcon size={18} className="text-primary" />
                  {siteConfig.email}
                </a>
                <div className="flex items-center gap-3 text-sm text-muted-foreground min-h-[44px]">
                  <MapPinIcon size={18} className="text-primary" />
                  {siteConfig.location}
                </div>
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Services</h3>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block py-1 min-h-[44px] flex items-center"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block py-1 min-h-[44px] flex items-center"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Column */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Ready to Grow?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get a free SEO audit and discover opportunities to improve your search rankings.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors min-h-[44px]"
              >
                Get Free Audit
              </Link>
              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors min-h-[44px] flex items-center"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
