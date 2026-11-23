import type { ScCarouselStyles } from '@semantic-components/styles';

// shadcn's carousel in luma (shadcn-reference/presets/luma/carousel.tsx): its previous and
// next buttons' corners, and its indicators'.
export const carousel: ScCarouselStyles = {
  button: 'rounded-full',
  // Its indicators: as the buttons, square where the style's buttons are.
  indicator: 'rounded-full',
};
