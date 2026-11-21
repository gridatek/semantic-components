import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';

/** Your icon, in the label: at its end. */
@Directive({
  selector: '[appStatCardIcon]',
  host: {
    'data-slot': 'stat-card-icon',
    '[class]': 'class()',
  },
})
export class AppStatCardIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('text-muted-foreground ms-auto size-4 shrink-0', this.classInput()),
  );
}
