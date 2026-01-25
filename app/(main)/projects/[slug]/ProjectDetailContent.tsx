'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Container,
    Section,
    Badge,
    Button,
    TrendingUpIcon,
    ArrowLeftIcon,
    ArrowUpRightIcon,
} from '@/components/ui';
import { CTASection } from '@/components/sections';
import { caseStudies } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';
import Image from 'next/image';
import { Project } from '@/lib/projects-data';

interface ProjectDetailContentProps {
    project: Project;
}

export function ProjectDetailContent({ project }: ProjectDetailContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

    return (
        <div ref={containerRef} className="relative">
            {/* Background Decorative Parallax */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
                    style={{ y: prefersReducedMotion ? 0 : y1 }}
                />
                <motion.div
                    className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl"
                    style={{ y: prefersReducedMotion ? 0 : y2 }}
                />
            </div>

            {/* Hero Section */}
            <Section size="minor" background="gradient" className="relative z-10">
                <Container size="wide">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/projects"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-all hover:-translate-x-1 mb-8 group"
                        >
                            <ArrowLeftIcon size={18} className="transition-transform group-hover:scale-110" />
                            <span className="font-medium">All Projects</span>
                        </Link>

                        <div className="max-w-4xl">
                            <Badge variant="primary" className="mb-4">{project.industry}</Badge>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight mb-6 text-balance">
                                {project.title}
                            </h1>

                            <div className="flex flex-wrap gap-x-12 gap-y-6 mt-12 relative">
                                <div className="absolute top-0 left-0 w-12 h-px bg-primary/30" />
                                <div className="pt-4">
                                    <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-1">Client</p>
                                    <p className="text-xl font-bold text-foreground">{project.client}</p>
                                </div>
                                <div className="pt-4">
                                    <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-1">Duration</p>
                                    <p className="text-xl font-bold text-foreground">{project.duration}</p>
                                </div>
                            </div>

                            {/* Results Grid - Efficient & Clear */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-12 pt-8 border-t border-border/50">
                                {project.results.map((result) => (
                                    <div key={result.metric} className="flex flex-col space-y-3">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-md bg-primary/10 flex items-center justify-center">
                                                <TrendingUpIcon size={14} className="text-primary" />
                                            </div>
                                            <p className="text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest leading-none">
                                                {result.metric}
                                            </p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-2xl md:text-3xl font-bold text-foreground tracking-tight leading-none">
                                                {result.after}
                                            </p>
                                            {result.before !== '-' && (
                                                <div className="flex items-center gap-2 text-xs font-medium text-primary/80">
                                                    <span>{result.before}</span>
                                                    <span className="text-muted-foreground/30">→</span>
                                                    <span className="text-primary">{result.after}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </Section>


            {/* Main Content Sections */}
            <Section className="relative z-10 pt-16 md:pt-24">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Visuals / Gallery */}
                        <div className="lg:col-span-12">
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                {project.images.map((img, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={cn(
                                            "relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted group",
                                            idx === 0 && "md:col-span-2 lg:col-span-2 md:aspect-video lg:aspect-video"
                                        )}
                                        whileHover={{ y: -5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${project.title} - screen ${idx + 1}`}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Narrative Content */}
                        <div className="lg:col-span-8 space-y-20">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                            >
                                <h2 className="text-3xl font-bold mb-6 flex items-center gap-4">
                                    <span className="w-8 h-1 bg-primary rounded-full" />
                                    Project Overview
                                </h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {project.description}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <h3 className="text-2xl font-bold mb-6 text-foreground">The Challenge</h3>
                                    <div className="p-8 rounded-2xl bg-muted/30 border border-border/50 relative overflow-hidden group">
                                        <p className="text-muted-foreground leading-relaxed relative z-10">
                                            {project.challenge}
                                        </p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-2xl font-bold mb-6 text-foreground">The Solution</h3>
                                    <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden group">
                                        <p className="text-muted-foreground leading-relaxed relative z-10">
                                            {project.solution}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Sidebar with Testimonial & Contact */}
                        <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-12">
                            {project.testimonial && (
                                <motion.div
                                    className="relative p-8 rounded-2xl bg-card border border-border shadow-xl overflow-hidden"
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                >
                                    <p className="text-lg italic text-foreground relative z-10 mb-6">
                                        {project.testimonial.quote}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                                            {project.testimonial.author.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-foreground">{project.testimonial.author}</p>
                                            <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div className="p-8 rounded-2xl bg-muted/50 border border-border text-center">
                                <h4 className="text-xl font-bold mb-4">Interested in similar results?</h4>
                                <p className="text-sm text-muted-foreground mb-6">
                                    Let's discuss how we can scale your organic growth using the same strategies.
                                </p>
                                <Button size="lg" className="w-full" href="/contact">
                                    Let's Talk
                                    <ArrowUpRightIcon size={20} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            <CTASection
                title="Ready to Scale Your Business?"
                description="Every project is unique, but the goal is always the same: sustainable organic growth. Let's create your success story."
            />
        </div>
    );
}
