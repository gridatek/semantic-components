import {
  Directive,
  HostAttributeToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';

const SLIDER_KEYS = new Set([
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown',
  'Home',
  'End',
  'PageUp',
  'PageDown',
]);

/**
 * Stroke width slider. Named "Line width" unless given an `aria-label`. Inside
 * the toolbar it is its own Tab stop, and its arrow keys change the value
 * instead of moving between toolbar buttons.
 */
@Directive({
  selector: 'input[type="range"][scImageAnnotatorLineWidth]',
  host: {
    'data-slot': 'image-annotator-line-width',
    '[attr.aria-label]': 'label',
    '[value]': 'state.lineWidth()',
    '[class]': 'class()',
    '(input)': 'onInput($event)',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScImageAnnotatorLineWidth {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScImageAnnotatorState);
  protected readonly label =
    inject(new HostAttributeToken('aria-label'), { optional: true }) ??
    'Line width';

  protected readonly class = computed(() =>
    cn(
      'accent-primary h-1 w-20 rounded-full outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );

  protected onInput(event: Event): void {
    this.state.setLineWidth(
      parseInt((event.target as HTMLInputElement).value, 10),
    );
  }

  /** Keep slider keys away from the toolbar's arrow-key navigation. */
  protected onKeydown(event: KeyboardEvent): void {
    if (SLIDER_KEYS.has(event.key)) event.stopPropagation();
  }
}
