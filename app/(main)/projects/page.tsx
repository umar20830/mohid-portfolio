import type { Metadata } from 'next';
import { ProjectsPageContent } from './ProjectsPageContent';

export const metadata: Metadata = {
  title: 'Projects & Case Studies',
  description: 'Explore detailed SEO case studies showcasing real results: increased organic traffic, improved keyword rankings, and measurable business growth.',
  openGraph: {
    title: 'Projects & Case Studies | Mohid Ali',
    description: 'Explore detailed SEO case studies showcasing real results: increased organic traffic, improved keyword rankings, and measurable business growth.',
  },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
