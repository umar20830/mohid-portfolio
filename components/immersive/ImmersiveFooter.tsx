'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Container, LinkedInIcon, TwitterIcon, GithubIcon, MailIcon, MapPinIcon } from '@/components/ui';
import { DepthReveal } from './Scene3D';
import { siteConfig, services } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';

const footerLinks = {
  services: services.slice(0, 4).map((s) => ({ name: s.title, href: `#services` })),
  company: [
    { name: 'About', href: '#about' },
    { name: 'Case Studies', href: '#case-studies' },
    { name: 'Contact', href: '#contact' },
  ],
};

const socialLinks = [
  { name: 'LinkedIn', href: siteConfig.social.linkedin, icon: LinkedInIcon },
  { name: 'Twitter', href: siteConfig.social.twitter, icon: TwitterIcon },
  { name: 'GitHub', href: siteConfig.social.github, icon: GithubIcon },
];

export function ImmersiveFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const currentYear = new Date().getFullYear();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const footerZ = useTransform(scrollYProgress, [0, 0.5], prefersReducedMotion ? [0, 0] : [-500, 0]);
  const footerOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const springFooterZ = useSpring(footerZ, { stiffness: 80, damping: 25 });

  return (
    <motion.footer
      ref={containerRef}
      className="relative bg-background border-t border-border"
      style={{
        perspective: '1500px',
        translateZ: springFooterZ,
        opacity: footerOpacity,
      }}
    >
      <Container size="wide">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <DepthReveal delay={0} direction="left">
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
                  Professional SEO Specialist helping businesses achieve top rankings
                  and drive sustainable organic growth.
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
            </DepthReveal>

            {/* Services Column */}
            <DepthReveal delay={100}>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Services</h3>
                <ul className="space-y-2">
                  {footerLinks.services.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block py-1 min-h-[44px] flex items-center"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </DepthReveal>

            {/* Company Column */}
            <DepthReveal delay={200}>
              <div>
                <h3 className="font-semibold text-foreground mb-4">Navigate</h3>
                <ul className="space-y-2">
                  {footerLinks.company.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-block py-1 min-h-[44px] flex items-center"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </DepthReveal>

            {/* CTA Column */}
            <DepthReveal delay={300} direction="right">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Ready to Grow?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get a free SEO audit and discover opportunities to improve your search rankings.
                </p>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center h-11 px-5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors min-h-[44px]"
                >
                  Get Free Audit
                </a>
                {/* Social Links */}
                <div className="flex items-center gap-4 mt-6">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                      aria-label={social.name}
                    >
                      <social.icon size={20} />
                    </motion.a>
                  ))}
                </div>
              </div>
            </DepthReveal>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Crafted with passion for SEO excellence
          </p>
        </div>
      </Container>
    </motion.footer>
  );
}
