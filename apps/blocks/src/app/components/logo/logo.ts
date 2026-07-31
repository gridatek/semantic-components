import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiCommandIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-logo',
  imports: [SiCommandIcon],
  template: `
    <div
      class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg"
    >
      <svg siCommandIcon class="size-4" aria-hidden="true"></svg>
    </div>
    <span class="text-lg tracking-tight">Acme Inc</span>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Logo {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-2.5 font-semibold', this.classInput()),
  );
}
