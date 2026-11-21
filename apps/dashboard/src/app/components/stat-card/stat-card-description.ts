import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** More about the figure, on a `<dd>` — beside the change: "from last month". */
@Directive({
  selector: '[appStatCardDescription]',
  host: {
    'data-slot': 'stat-card-description',
    '[class]': 'class()',
  },
})
export class AppStatCardDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('text-muted-foreground text-xs', this.classInput()),
  );
}
