import type { Metadata } from 'next';
import { ContactPageContent } from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch for SEO consultation and services. Let\'s discuss how to improve your search rankings and drive organic growth for your business.',
  openGraph: {
    title: 'Contact | Mohid Ali',
    description: 'Get in touch for SEO consultation and services. Let\'s discuss how to improve your search rankings and drive organic growth.',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
