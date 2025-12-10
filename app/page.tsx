'use client';

import {
  ZAxisScroll,
  ZHeroSection,
  ZHighlightsSection,
  ZServicesSection,
  ZCaseStudiesSection,
  ZAboutSection,
  ZContactSection,
  HamburgerMenu,
} from '@/components/immersive';

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
      <HamburgerMenu />
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
