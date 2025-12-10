'use client';

import { forwardRef } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  asChild?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, href, ...props }, ref) => {
    const baseStyles = cn(
      'inline-flex items-center justify-center font-medium transition-all duration-200',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
      'disabled:opacity-50 disabled:pointer-events-none',
      'min-w-[44px] min-h-[44px] gap-2 rounded-lg',
      {
        // Variants
        'bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-lg':
          variant === 'primary',
        'bg-secondary text-secondary-foreground hover:bg-secondary/80':
          variant === 'secondary',
        'border-2 border-border bg-transparent hover:bg-muted hover:border-foreground':
          variant === 'outline',
        'bg-transparent hover:bg-muted': variant === 'ghost',
        // Sizes
        'h-9 px-4 text-sm': size === 'sm',
        'h-11 px-5 text-base': size === 'md',
        'h-13 px-6 text-lg': size === 'lg',
      },
      className
    );

    if (href) {
      return (
        <motion.a
          href={href}
          className={baseStyles}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {children}
        </motion.a>
      );
    }

    return (
      <motion.button
        ref={ref}
        className={baseStyles}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
