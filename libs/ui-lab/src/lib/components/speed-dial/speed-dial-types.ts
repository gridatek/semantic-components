export type SpeedDialDirection = 'up' | 'down' | 'left' | 'right';

export interface SpeedDialAction {
  id: string;
  icon: string;
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
}

export interface SpeedDialActionClickEvent {
  action: SpeedDialAction;
  index: number;
}
