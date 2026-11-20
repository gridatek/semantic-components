import type { ScCarouselStyles } from '@semantic-components/styles';

// shadcn's carousel in rhea (shadcn-reference/presets/rhea/carousel.tsx): its previous and
// next buttons' corners, and its dots'.
export const carousel: ScCarouselStyles = {
  button: 'rounded-2xl',
  // Its dots: as the buttons, square where the style's buttons are.
  dot: 'rounded-2xl',
};
