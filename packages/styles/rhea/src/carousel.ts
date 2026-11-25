import type { ScCarouselStyles } from '@semantic-components/styles';

// shadcn's carousel in rhea (shadcn-reference/presets/rhea/carousel.tsx): its previous and
// next buttons' corners, and its indicators'.
export const carousel: ScCarouselStyles = {
  button: 'rounded-2xl',
  // Its indicators: as the buttons, square where the style's buttons are.
  indicator: 'rounded-2xl',
};
