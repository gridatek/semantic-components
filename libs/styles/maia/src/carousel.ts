import type { ScCarouselStyles } from '@semantic-components/styles';

// shadcn's carousel in maia (shadcn-reference/presets/maia/carousel.tsx): its previous and
// next buttons' corners, and its dots'.
export const carousel: ScCarouselStyles = {
  button: 'rounded-full',
  // Its dots: as the buttons, square where the style's buttons are.
  dot: 'rounded-full',
};
