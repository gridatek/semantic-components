import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo],
  template: `
    <footer class="border-t py-8 px-4 md:px-6 lg:px-8">
      <div
        class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <div class="flex items-center gap-2">
          <svg app-logo class="size-5"></svg>
          <span class="font-semibold">Semantic Components</span>
        </div>
        <p class="text-sm text-muted-foreground">
          Built with
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="inline text-red-500"
            aria-label="heart"
          >
            <path
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
            />
          </svg>
          for the Angular community. Open source.
        </p>
      </div>
    </footer>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
