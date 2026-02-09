import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { caseStudies } from '@/lib/constants';
import { ProjectDetailContent } from './ProjectDetailContent';

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.id === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = caseStudies.find((p) => p.id === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailContent project={project} />;
}
