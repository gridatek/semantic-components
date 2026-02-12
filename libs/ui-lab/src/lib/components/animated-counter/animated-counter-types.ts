export type AnimatedCounterEasing =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut';

export interface AnimatedCounterOptions {
  duration?: number;
  easing?: AnimatedCounterEasing;
  decimalPlaces?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
}

export const DEFAULT_COUNTER_OPTIONS: Required<AnimatedCounterOptions> = {
  duration: 1000,
  easing: 'easeOut',
  decimalPlaces: 0,
  separator: ',',
  prefix: '',
  suffix: '',
};
