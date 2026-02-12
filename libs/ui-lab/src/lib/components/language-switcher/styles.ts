export type LanguageSwitcherVariant = 'default' | 'outline' | 'ghost';
export type LanguageSwitcherSize = 'default' | 'sm' | 'lg' | 'icon';

export const variantStyles: Record<LanguageSwitcherVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  outline:
    'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
};

export const sizeStyles: Record<LanguageSwitcherSize, string> = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'size-10',
};
