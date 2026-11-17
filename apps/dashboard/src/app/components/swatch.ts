import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * A colour to choose, drawn as a dot: a native radio (give a group the same
 * `name`; arrows move between them, as any radios). Its colour is a CSS
 * colour (`var(--chart-2)`); name it (`aria-label`) — the colour alone says
 * nothing to a screen reader. Chosen: a ring around it. The library has none
 * (scRadio draws its own dot): a candidate for it, as a radio variant.
 */
@Directive({
  selector: 'input[appSwatch]',
  host: {
    type: 'radio',
    '[class]': 'class()',
    '[style.background-color]': 'color()',
  },
})
export class Swatch {
  readonly color = input.required<string>({ alias: 'appSwatch' });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'ring-offset-background size-7 shrink-0 cursor-pointer appearance-none rounded-full border transition-shadow outline-none',
      'checked:ring-ring checked:ring-2 checked:ring-offset-2',
      'focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );
}
