'use client';

import { motion } from 'framer-motion';
import { Container, Section, Badge } from '@/components/ui';
import { ContactForm } from '@/components/sections';

const faqs = [
  {
    question: 'How long does it take to see SEO results?',
    answer: 'SEO is a long-term strategy. Typically, you can expect to see initial improvements within 3-6 months, with more significant results appearing after 6-12 months of consistent effort.',
  },
  {
    question: 'Do you offer one-time SEO audits?',
    answer: 'Yes! I offer comprehensive SEO audits that provide actionable insights and recommendations. This is a great option if you want to understand your current SEO status before committing to ongoing services.',
  },
  {
    question: 'What industries do you work with?',
    answer: 'I work with businesses across various industries including e-commerce, SaaS, healthcare, finance, local businesses, and more. Each strategy is customized to your specific industry and goals.',
  },
  {
    question: 'How do you report on progress?',
    answer: 'I provide monthly detailed reports covering keyword rankings, organic traffic, technical improvements, and other KPIs. We also have regular calls to discuss progress and strategy adjustments.',
  },
];

export function ContactPageContent() {
  return (
    <>
      {/* Hero Section */}
      <Section size="minor" background="gradient">
        <Container size="wide">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">Contact</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Let's Start a{' '}
              <span className="text-gradient">Conversation</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Have a project in mind or want to learn more about my services?
              I'd love to hear from you.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <ContactForm />

      {/* FAQ Section */}
      <Section size="major" background="muted">
        <Container size="content">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Quick answers to common questions about my SEO services.
            </p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {faq.question}
                </h3>
                <p className="text-muted-foreground">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
