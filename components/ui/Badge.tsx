import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        {
          'bg-muted text-muted-foreground': variant === 'default',
          'bg-primary text-primary-foreground': variant === 'primary',
          'bg-secondary text-secondary-foreground': variant === 'secondary',
          'bg-accent text-accent-foreground': variant === 'accent',
          'border border-border bg-transparent': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
