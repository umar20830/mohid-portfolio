'use client';

import {
  ZAxisScroll,
  ZHeroSection,
  ZHighlightsSection,
  ZServicesSection,
  ZCaseStudiesSection,
  ZAboutSection,
  ZContactSection,
} from '@/components/immersive';
import { Navbar } from '@/components/layout';

const sectionLabels = [
  'Hero',
  'What I Do',
  'Services',
  'Case Studies',
  'About',
  'Contact',
];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <ZAxisScroll sectionLabels={sectionLabels}>
        <ZHeroSection />
        <ZHighlightsSection />
        <ZServicesSection />
        <ZCaseStudiesSection />
        <ZAboutSection />
        <ZContactSection />
      </ZAxisScroll>
    </>
  );
}
