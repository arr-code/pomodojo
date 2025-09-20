import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass';
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'rounded-2xl shadow-lg',
          {
            'bg-white/5 backdrop-blur-sm border border-white/10': variant === 'glass',
            'bg-white border border-gray-200 dark:bg-gray-950 dark:border-gray-800': variant === 'default',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('flex flex-col space-y-1.5 p-6 pb-4', className)}
        {...props}
      />
    );
  }
);
CardHeader.displayName = 'CardHeader';

export const CardContent = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('p-6 pt-0', className)}
        {...props}
      />
    );
  }
);
CardContent.displayName = 'CardContent';