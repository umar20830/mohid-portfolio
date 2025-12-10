import type { Metadata } from 'next';
import { AboutPageContent } from './AboutPageContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Mohid Ali, a Professional SEO Specialist from Pakistan with expertise in Technical SEO, Content Strategy, and driving organic growth for businesses worldwide.',
  openGraph: {
    title: 'About | Mohid Ali',
    description: 'Learn about Mohid Ali, a Professional SEO Specialist from Pakistan with expertise in Technical SEO, Content Strategy, and driving organic growth.',
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
