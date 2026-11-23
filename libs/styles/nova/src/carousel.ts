import type { ScCarouselStyles } from '@semantic-components/styles';

// shadcn's carousel in nova (shadcn-reference/presets/nova/carousel.tsx): its previous and
// next buttons' corners, and its indicators'.
export const carousel: ScCarouselStyles = {
  button: 'rounded-full',
  // Its indicators: as the buttons, square where the style's buttons are.
  indicator: 'rounded-full',
};
