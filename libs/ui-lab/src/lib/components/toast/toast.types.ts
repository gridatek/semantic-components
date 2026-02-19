export type ScToastVariant =
  | 'default'
  | 'destructive'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'loading';

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
  state?: 'open' | 'closed';
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
