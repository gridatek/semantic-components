import type { ScCarouselStyles } from '@semantic-components/styles';

// shadcn's carousel in lyra (shadcn-reference/presets/lyra/carousel.tsx): its previous and
// next buttons' corners — none here: the style's button keeps its own — and its dots'.
export const carousel: ScCarouselStyles = {
  button: '',
  // Its dots: as the buttons, square where the style's buttons are.
  dot: 'rounded-none',
};
