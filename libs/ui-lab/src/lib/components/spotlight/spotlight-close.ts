import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScSpotlightState } from './spotlight-state';

@Directive({
  selector: 'button[scSpotlightClose]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'state.close()',
  },
})
export class ScSpotlightClose {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly state = inject(ScSpotlightState);

  protected readonly class = computed(() =>
    cn(
      'bg-background/90 hover:bg-background text-foreground absolute top-4 end-4 z-10 rounded-full p-2 shadow-lg',
      this.classInput(),
    ),
  );
}
