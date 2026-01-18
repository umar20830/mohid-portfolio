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
import { useReducedMotion } from '@/hooks';

interface ProjectDetailContentProps {
    project: typeof caseStudies[0];
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
                                {project.industry.includes('E-commerce') && (
                                    <div className="pt-4">
                                        <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-1">Focus</p>
                                        <p className="text-xl font-bold text-foreground">ROI Growth</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </Container>
            </Section>

            {/* Results Bar - Premium Overlay */}
            <div className="relative z-20 -mt-12">
                <Container size="wide">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 bg-card border border-border rounded-2xl p-6 md:p-10 shadow-2xl"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {project.results.map((result) => (
                            <div key={result.metric} className="text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                    <TrendingUpIcon size={20} className="text-primary" />
                                    <span className="text-3xl md:text-4xl font-bold text-primary tabular-nums">
                                        {result.change}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-foreground uppercase tracking-tight">{result.metric}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    From {result.before} to {result.after}
                                </p>
                            </div>
                        ))}
                    </motion.div>
                </Container>
            </div>

            {/* Main Content Sections */}
            <Section className="relative z-10 pt-16 md:pt-24">
                <Container size="wide">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                        {/* Visual/Image Placeholder */}
                        <div className="lg:col-span-12">
                            <motion.div
                                className="relative aspect-[21/9] rounded-3xl overflow-hidden bg-muted group"
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/5">
                                    <motion.div
                                        className="text-[150px] md:text-[250px] text-primary/10 font-black italic"
                                        whileHover={{ scale: 1.05, rotate: -2 }}
                                        transition={{ type: 'spring', stiffness: 100 }}
                                    >
                                        {project.client.charAt(0)}
                                    </motion.div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
                                <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none" />
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
                                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <TrendingUpIcon size={64} className="rotate-180" />
                                        </div>
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
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <TrendingUpIcon size={64} />
                                        </div>
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
                                    <div className="absolute top-4 left-4 text-6xl text-primary/10 font-serif leading-none">"</div>
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
