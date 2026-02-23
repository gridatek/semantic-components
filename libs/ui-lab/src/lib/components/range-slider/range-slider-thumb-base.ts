const SHARED_THUMB_CLASSES = [
  'pointer-events-none absolute top-0 h-full w-full cursor-pointer appearance-none bg-transparent',
  'disabled:pointer-events-none disabled:opacity-50',
  '[&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:transition-shadow [&::-webkit-slider-thumb]:-mt-1.5',
  '[&::-webkit-slider-thumb:hover]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
  '[&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:size-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:transition-shadow',
  '[&::-moz-range-thumb:hover]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
  'focus-visible:outline-none [&:focus-visible::-webkit-slider-thumb]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
  '[&:focus-visible::-moz-range-thumb]:shadow-[0_0_0_3px_oklch(from_var(--ring)_l_c_h/0.5)]',
] as const;

export const MIN_THUMB_CLASSES = [
  ...SHARED_THUMB_CLASSES,
  '[&::-webkit-slider-runnable-track]:h-0 [&::-webkit-slider-runnable-track]:bg-transparent',
  '[&::-moz-range-track]:h-0 [&::-moz-range-track]:bg-transparent',
] as const;

export const MAX_THUMB_CLASSES = [
  ...SHARED_THUMB_CLASSES,
  '[&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-[image:linear-gradient(to_right,var(--muted)_var(--min-percent),var(--primary)_var(--min-percent)_var(--max-percent),var(--muted)_var(--max-percent))]',
  '[&::-moz-range-track]:h-1 [&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-[image:linear-gradient(to_right,var(--muted)_var(--min-percent),var(--primary)_var(--min-percent)_var(--max-percent),var(--muted)_var(--max-percent))]',
] as const;
