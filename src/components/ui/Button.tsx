import { forwardRef } from 'react';
import { clsx } from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
          {
            // Primary - Blue gradient with white icons
            'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700 hover:shadow-xl focus-visible:ring-blue-500': variant === 'primary',
            
            // Secondary - Light background with dark icons
            'bg-white/20 backdrop-blur-sm text-gray-700 dark:text-gray-200 border border-white/30 dark:border-gray-600/30 hover:bg-white/30 dark:hover:bg-gray-800/30 shadow-md hover:shadow-lg': variant === 'secondary',
            
            // Outline - Border with contrasting text
            'border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 bg-white/10 backdrop-blur-sm hover:bg-gray-50/50 dark:hover:bg-gray-800/50 shadow-sm hover:shadow-md': variant === 'outline',
            
            // Ghost - Subtle background with contrasting text
            'text-gray-700 dark:text-gray-200 hover:bg-white/20 dark:hover:bg-gray-800/20 backdrop-blur-sm': variant === 'ghost',
            
            // Sizes
            'h-8 px-3 text-sm': size === 'sm',
            'h-10 px-4': size === 'md',
            'h-12 px-8 text-lg': size === 'lg',
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';