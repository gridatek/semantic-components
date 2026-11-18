import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';

/** How much of the tile each button corner takes (its 160 grid). */
const CORNERS: Record<string, number> = {
  none: 0,
  sm: 20,
  md: 28,
  lg: 36,
  xl: 44,
  '2xl': 52,
  '3xl': 64,
  '4xl': 80,
  full: 80,
};

/**
 * The logo: "SC" on a tile in the theme's primary colors. The tile is the
 * app's style's icon button — its size and its corners (a square in lyra and
 * sera, a circle in maia and luma) — so it stands as tall as the buttons
 * beside it, Get Started's height. A `size-*` of yours wins.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'svg[app-logo]',
  template: `
    <svg:path
      class="stroke-primary-foreground"
      [attr.transform]="letters"
      fill="none"
      stroke-width="18"
      d="M69.5 50V38a32.25 33 0 0 0-64.5 0c0 20 15 30 32.5 42S69.5 102 69.5 122a32.25 33 0 0 1-64.5 0v-12M173 50V38a32.25 33 0 0 0-64.5 0v84a32.25 33 0 0 0 64.5 0v-12"
    />
  `,
  host: {
    xmlns: 'http://www.w3.org/2000/svg',
    viewBox: '0 0 160 160',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Logo {
  readonly classInput = input<string>('', { alias: 'class' });

  /** The style's icon button: its size and corner classes (set at start). */
  private readonly tile = injectStyle()
    .button({ size: 'icon' })
    .split(/\s+/)
    .filter((c) => /^(size|rounded)-/.test(c));

  private readonly class = computed(() =>
    cn('bg-primary shrink-0', this.tile, this.classInput()),
  );

  /**
   * The letters fill the room the corners leave them: larger in a square,
   * smaller in a circle — centred either way. (Their box, before scaling, is
   * 168 × 150 around 89, 80.)
   */
  private readonly letters = (() => {
    const rounded = this.tile.find((c) => c.startsWith('rounded-'));
    const corners = CORNERS[rounded?.slice('rounded-'.length) ?? 'lg'] ?? 36;
    const scale = 0.66 - 0.0018 * corners;
    const x = 80 - 89 * scale;
    const y = 80 - 80 * scale;
    return `translate(${x.toFixed(2)} ${y.toFixed(2)}) scale(${scale.toFixed(3)})`;
  })();
}
