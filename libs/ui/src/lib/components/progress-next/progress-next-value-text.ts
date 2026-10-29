import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScProgressNext } from './progress-next';

/**
 * Your value text — "42%", "3 of 5": what screen readers hear as the value
 * (`aria-valuetext`). At the end of a bar's line; in a circle's middle.
 */
@Directive({
  selector: '[scProgressNextValueText]',
  host: {
    'data-slot': 'progress-value',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScProgressNextValueText {
  private readonly progress = inject(ScProgressNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground ms-auto text-sm tabular-nums',
      'group-data-[shape=circle]/progress:text-foreground group-data-[shape=circle]/progress:absolute group-data-[shape=circle]/progress:inset-0 group-data-[shape=circle]/progress:m-0 group-data-[shape=circle]/progress:flex group-data-[shape=circle]/progress:items-center group-data-[shape=circle]/progress:justify-center group-data-[shape=circle]/progress:text-xs group-data-[shape=circle]/progress:font-medium',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const host = this.progress.element;
    // Its text, once drawn, as the progress's value; gone with it.
    afterRenderEffect({
      write: () => {
        this.progress.value();
        const text = element.textContent?.trim();
        if (text) host.setAttribute('aria-valuetext', text);
        else host.removeAttribute('aria-valuetext');
      },
    });
  }
}
