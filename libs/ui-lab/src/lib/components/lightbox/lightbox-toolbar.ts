import { Toolbar } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[scLightboxToolbar]',
  hostDirectives: [
    {
      directive: Toolbar,
      inputs: ['orientation'],
    },
  ],
  host: {
    '[class]': 'class()',
  },
})
export class ScLightboxToolbar {
  protected readonly toolbar = inject(Toolbar);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-center gap-2 bg-black/50 px-4 py-3',
      this.classInput(),
    ),
  );
}
