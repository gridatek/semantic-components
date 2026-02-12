export type ScToastVariant = 'default' | 'destructive';

export interface ScToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ScToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

export interface ScToastConfig {
  title?: string;
  description?: string;
  variant?: ScToastVariant;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}
