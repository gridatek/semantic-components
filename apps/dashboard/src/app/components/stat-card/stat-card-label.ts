import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** What the figure is: on a `<dt>` — an icon (`appStatCardIcon`) in it, at its end. */
@Directive({
  selector: '[appStatCardLabel]',
  host: {
    'data-slot': 'stat-card-label',
    '[class]': 'class()',
  },
})
export class AppStatCardLabel {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'text-muted-foreground flex basis-full items-center gap-2 font-medium',
      this.classInput(),
    ),
  );
}
