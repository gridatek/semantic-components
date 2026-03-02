import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="border-t px-4 py-8 md:px-6 lg:px-8">
      <div
        class="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6 lg:px-8"
      >
        <div class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
          </svg>
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
