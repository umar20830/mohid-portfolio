'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { navigation, siteConfig } from '@/lib/constants';

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  // Initialize theme from localStorage or system preference
  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      document.documentElement.classList.toggle('dark', stored === 'dark');
      document.documentElement.classList.toggle('light', stored === 'light');
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    document.documentElement.classList.toggle('light', newTheme === 'light');
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Top Bar with Hamburger and Theme Toggle */}
      <div className="fixed top-6 left-6 right-6 z-[100] flex items-center justify-between pointer-events-none">
        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'w-12 h-12 rounded-full pointer-events-auto',
            'bg-card/90 backdrop-blur-sm border border-border',
            'flex items-center justify-center',
            'hover:border-primary/50 transition-colors duration-200',
            'shadow-lg'
          )}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          <div className="relative w-5 h-4">
            <span
              className={cn(
                'absolute left-0 w-5 h-0.5 bg-foreground rounded-full transition-all duration-300',
                isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              )}
            />
            <span
              className={cn(
                'absolute left-0 top-1/2 -translate-y-1/2 w-5 h-0.5 bg-foreground rounded-full transition-all duration-300',
                isOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
              )}
            />
            <span
              className={cn(
                'absolute left-0 w-5 h-0.5 bg-foreground rounded-full transition-all duration-300',
                isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
              )}
            />
          </div>
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className={cn(
            'w-12 h-12 rounded-full pointer-events-auto',
            'bg-card/90 backdrop-blur-sm border border-border',
            'flex items-center justify-center',
            'hover:border-primary/50 transition-colors duration-200',
            'shadow-lg'
          )}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            // Sun icon
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            // Moon icon
            <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>

      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-[90] bg-background/60 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => setIsOpen(false)}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[95] w-full sm:w-[380px]',
          'bg-card border-l border-border shadow-2xl',
          'transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="h-full flex flex-col p-8 pt-24">
          {/* Theme Toggle in Menu */}
          <div className="mb-6 pb-6 border-b border-border">
            <p className="text-sm text-muted-foreground mb-3">Theme</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setTheme('light');
                  localStorage.setItem('theme', 'light');
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }}
                className={cn(
                  'flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2',
                  'transition-colors duration-200',
                  theme === 'light'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Light
              </button>
              <button
                onClick={() => {
                  setTheme('dark');
                  localStorage.setItem('theme', 'dark');
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }}
                className={cn(
                  'flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2',
                  'transition-colors duration-200',
                  theme === 'dark'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
                Dark
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'block py-4 px-4 rounded-xl text-2xl font-medium',
                      'text-foreground hover:text-primary',
                      'hover:bg-muted/50 transition-colors duration-200'
                    )}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">Get in touch</p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="block text-lg text-foreground hover:text-primary transition-colors mb-6"
            >
              {siteConfig.email}
            </a>

            {/* Social */}
            <div className="flex gap-4">
              {Object.entries(siteConfig.social).map(([name, url]) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-10 h-10 rounded-full bg-muted flex items-center justify-center',
                    'text-muted-foreground hover:text-primary hover:bg-primary/10',
                    'transition-colors duration-200'
                  )}
                >
                  <SocialIcon name={name} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-6 text-sm text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </div>
        </div>
      </div>
    </>
  );
}

function SocialIcon({ name }: { name: string }) {
  switch (name.toLowerCase()) {
    case 'twitter':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case 'github':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    default:
      return null;
  }
}
