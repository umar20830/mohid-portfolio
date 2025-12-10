'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Container, SectionHeading, Badge, AwardIcon, TargetIcon, TrendingUpIcon, GlobeIcon } from '@/components/ui';
import { Scene3D, DepthReveal, FloatingLayer } from './Scene3D';
import { siteConfig, experience, tools, skills } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

const values = [
  { icon: TargetIcon, title: 'Results-Focused', description: 'Every strategy designed with measurable outcomes.' },
  { icon: TrendingUpIcon, title: 'Data-Driven', description: 'Decisions backed by analytics, not assumptions.' },
  { icon: GlobeIcon, title: 'Transparent', description: 'Clear communication at every step.' },
  { icon: AwardIcon, title: 'Always Learning', description: 'Staying ahead of algorithm updates.' },
];

export function ImmersiveAbout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageZ = useTransform(scrollYProgress, [0, 0.4], prefersReducedMotion ? [0, 0] : [-600, 0]);
  const contentZ = useTransform(scrollYProgress, [0.1, 0.5], prefersReducedMotion ? [0, 0] : [-800, 0]);
  const timelineZ = useTransform(scrollYProgress, [0.2, 0.6], prefersReducedMotion ? [0, 0] : [-1000, 0]);

  const springImageZ = useSpring(imageZ, { stiffness: 80, damping: 25 });
  const springContentZ = useSpring(contentZ, { stiffness: 80, damping: 25 });
  const springTimelineZ = useSpring(timelineZ, { stiffness: 80, damping: 25 });

  return (
    <Scene3D id="about" depth={-1800} background="default">
      <div ref={containerRef} className="py-20 md:py-32">
        <Container size="wide">
          <DepthReveal>
            <SectionHeading
              subtitle="About Me"
              title={`Hi, I'm ${siteConfig.name}`}
              description="Professional SEO Specialist passionate about helping businesses achieve sustainable organic growth."
            />
          </DepthReveal>

          {/* Main about content */}
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20"
            style={{ perspective: '2000px' }}
          >
            {/* Image/Visual */}
            <motion.div
              className="relative"
              style={{
                translateZ: springImageZ,
                transformStyle: 'preserve-3d',
              }}
            >
              <FloatingLayer depth={2} className="relative">
                <div className="relative aspect-square max-w-md mx-auto">
                  {/* Background decoration */}
                  <motion.div
                    className="absolute inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl"
                    animate={prefersReducedMotion ? {} : {
                      rotateZ: [0, 2, 0, -2, 0],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  />

                  {/* Main image placeholder */}
                  <div className="absolute inset-0 bg-card border border-border rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <span className="text-[150px] font-bold text-muted-foreground/10">
                        {siteConfig.name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  {/* Floating badges */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 shadow-xl"
                    animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <span className="text-sm font-medium text-foreground">SEO Expert</span>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-xl"
                    animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  >
                    <span className="text-sm font-medium">6+ Years Experience</span>
                  </motion.div>
                </div>
              </FloatingLayer>
            </motion.div>

            {/* Content */}
            <motion.div
              style={{
                translateZ: springContentZ,
                transformStyle: 'preserve-3d',
              }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                Turning Search Visibility Into Business Growth
              </h3>

              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  With over 6 years of experience in search engine optimization, I've helped
                  businesses across various industries achieve remarkable growth in organic
                  traffic and revenue.
                </p>
                <p>
                  My approach combines technical expertise with strategic thinking. I don't just
                  chase rankings—I focus on driving qualified traffic that converts into real
                  business results.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    className="p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <value.icon size={24} className="text-primary mb-2" />
                    <div className="font-medium text-foreground text-sm">{value.title}</div>
                    <div className="text-xs text-muted-foreground">{value.description}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Skills & Experience */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
            style={{
              translateZ: springTimelineZ,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Experience Timeline */}
            <div>
              <DepthReveal direction="left">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <AwardIcon size={24} className="text-primary" />
                  Experience
                </h3>
              </DepthReveal>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-border" />

                <div className="space-y-6">
                  {experience.map((item, index) => (
                    <motion.div
                      key={item.year}
                      className="relative pl-12"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {/* Dot */}
                      <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-card border-2 border-primary flex items-center justify-center z-10">
                        <span className="text-xs font-bold text-primary">{item.year.slice(-2)}</span>
                      </div>

                      {/* Content */}
                      <div className="bg-card border border-border rounded-xl p-4 hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline">{item.year}</Badge>
                          <span className="text-xs text-muted-foreground">{item.company}</span>
                        </div>
                        <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills & Tools */}
            <div>
              <DepthReveal direction="right">
                <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                  <TargetIcon size={24} className="text-primary" />
                  Skills & Tools
                </h3>
              </DepthReveal>

              {/* Skills */}
              <div className="mb-8">
                <h4 className="text-sm font-medium text-muted-foreground mb-3">Core Skills</h4>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 10).map((skill, index) => (
                    <motion.span
                      key={skill}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-sm font-medium',
                        'bg-card border border-border',
                        'hover:border-primary/50 hover:bg-primary/5',
                        'transition-all duration-200'
                      )}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* Tools by category */}
              {['Analytics', 'SEO Tools', 'Technical'].map((category) => {
                const categoryTools = tools.filter((t) => t.category === category);
                if (categoryTools.length === 0) return null;

                return (
                  <div key={category} className="mb-4">
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {categoryTools.map((tool) => (
                        <span
                          key={tool.name}
                          className="px-3 py-1.5 rounded-lg text-sm bg-muted/50 text-muted-foreground"
                        >
                          {tool.name}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </Container>
      </div>
    </Scene3D>
  );
}
