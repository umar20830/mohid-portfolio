'use client';

import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Container, SectionHeading, Button, MailIcon, MapPinIcon, LinkedInIcon, TwitterIcon } from '@/components/ui';
import { Scene3D, DepthReveal } from './Scene3D';
import { siteConfig } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

const contactInfo = [
  { icon: MailIcon, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { icon: MapPinIcon, label: 'Location', value: siteConfig.location, href: null },
];

const socialLinks = [
  { icon: LinkedInIcon, href: siteConfig.social.linkedin, label: 'LinkedIn' },
  { icon: TwitterIcon, href: siteConfig.social.twitter, label: 'Twitter' },
];

export function ImmersiveContact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    website: '',
    service: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const formZ = useTransform(scrollYProgress, [0.1, 0.4], prefersReducedMotion ? [0, 0] : [-1000, 0]);
  const infoZ = useTransform(scrollYProgress, [0, 0.35], prefersReducedMotion ? [0, 0] : [-800, 0]);

  const springFormZ = useSpring(formZ, { stiffness: 70, damping: 25 });
  const springInfoZ = useSpring(infoZ, { stiffness: 70, damping: 25 });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputClasses = cn(
    'w-full h-11 px-4 rounded-lg',
    'bg-card border border-border',
    'text-foreground placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent',
    'transition-all duration-200',
    'min-h-[44px]'
  );

  return (
    <Scene3D id="contact" depth={-2000} background="muted">
      <div ref={containerRef} className="py-20 md:py-32">
        <Container size="content">
          <DepthReveal>
            <SectionHeading
              subtitle="Get in Touch"
              title="Let's Grow Your Business Together"
              description="Ready to take your search rankings to the next level? Let's discuss your SEO goals."
            />
          </DepthReveal>

          <div
            className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12"
            style={{ perspective: '2000px' }}
          >
            {/* Contact Info */}
            <motion.div
              className="lg:col-span-2"
              style={{
                translateZ: springInfoZ,
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-foreground">
                  Contact Information
                </h3>
                <p className="text-muted-foreground">
                  Have a project in mind? I'd love to hear from you.
                </p>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => (
                    <motion.div
                      key={item.label}
                      className="flex items-center gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon size={20} className="text-primary" />
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">{item.label}</div>
                        {item.href ? (
                          <a href={item.href} className="text-foreground hover:text-primary transition-colors">
                            {item.value}
                          </a>
                        ) : (
                          <div className="text-foreground">{item.value}</div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-6 border-t border-border">
                  <div className="text-sm text-muted-foreground mb-4">Follow me</div>
                  <div className="flex items-center gap-4">
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          'w-11 h-11 rounded-lg',
                          'bg-card border border-border',
                          'flex items-center justify-center',
                          'text-muted-foreground hover:text-foreground',
                          'hover:border-primary/50 hover:bg-primary/5',
                          'transition-all duration-200'
                        )}
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotateZ: 5 }}
                        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                        aria-label={social.label}
                      >
                        <social.icon size={20} />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              className="lg:col-span-3"
              style={{
                translateZ: springFormZ,
                transformStyle: 'preserve-3d',
              }}
            >
              {isSubmitted ? (
                <motion.div
                  className="bg-card border border-border rounded-2xl p-8 text-center"
                  initial={{ opacity: 0, scale: 0.9, z: -200 }}
                  animate={{ opacity: 1, scale: 1, z: 0 }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground mb-6">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormState({ name: '', email: '', company: '', website: '', service: '', message: '' });
                    }}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  className="bg-card border border-border rounded-2xl p-6 lg:p-8 space-y-6"
                  whileHover={prefersReducedMotion ? {} : { translateZ: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formState.company}
                        onChange={handleChange}
                        placeholder="Your Company"
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="website" className="block text-sm font-medium text-foreground mb-2">
                        Website
                      </label>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formState.website}
                        onChange={handleChange}
                        placeholder="https://example.com"
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-foreground mb-2">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formState.service}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select a service</option>
                      <option value="technical-seo">Technical SEO</option>
                      <option value="on-page-seo">On-Page SEO</option>
                      <option value="off-page-seo">Off-Page SEO</option>
                      <option value="local-seo">Local SEO</option>
                      <option value="ecommerce-seo">E-commerce SEO</option>
                      <option value="seo-audit">SEO Audit & Strategy</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      className={cn(inputClasses, 'h-auto py-3 resize-none')}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <MailIcon size={20} />
                      </>
                    )}
                  </Button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </Container>
      </div>
    </Scene3D>
  );
}
