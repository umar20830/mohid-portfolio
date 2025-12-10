import { cn } from '@/lib/utils';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'content' | 'wide' | 'full';
}

export function Container({ children, className, size = 'content' }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        {
          'max-w-screen-lg': size === 'content',
          'max-w-screen-xl': size === 'wide',
          'max-w-screen-2xl': size === 'full',
        },
        className
      )}
    >
      {children}
    </div>
  );
}
