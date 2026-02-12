export interface SplitButtonAction {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  destructive?: boolean;
}

export type SplitButtonVariant =
  | 'default'
  | 'secondary'
  | 'outline'
  | 'destructive';
export type SplitButtonSize = 'sm' | 'md' | 'lg';
