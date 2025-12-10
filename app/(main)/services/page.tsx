import type { Metadata } from 'next';
import { ServicesPageContent } from './ServicesPageContent';

export const metadata: Metadata = {
  title: 'SEO Services',
  description: 'Comprehensive SEO services including Technical SEO, On-Page Optimization, Link Building, Local SEO, E-commerce SEO, and SEO Audits to grow your organic traffic.',
  openGraph: {
    title: 'SEO Services | Mohid Ali',
    description: 'Comprehensive SEO services including Technical SEO, On-Page Optimization, Link Building, Local SEO, E-commerce SEO, and SEO Audits.',
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
