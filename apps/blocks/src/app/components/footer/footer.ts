import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SiMountainIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-footer',
  imports: [SiMountainIcon],
  template: `
    <footer class="border-t px-4 py-8 md:px-6 lg:px-8">
      <div
        class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8"
      >
        <div class="flex items-center gap-2">
          <svg siMountainIcon class="size-5" aria-hidden="true"></svg>
          <span class="font-semibold">Acme Inc</span>
        </div>
        <p class="text-muted-foreground text-sm">
          Built with Angular and Tailwind CSS. Open source.
        </p>
      </div>
    </footer>
  `,
  host: {
    'data-slot': 'footer',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
