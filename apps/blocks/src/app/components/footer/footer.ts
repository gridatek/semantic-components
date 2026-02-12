import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer class="border-t py-8 px-4 md:px-6 lg:px-8">
      <div
        class="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4"
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
        <p class="text-sm text-muted-foreground">
          Built with Angular and Tailwind CSS. Open source.
        </p>
      </div>
    </footer>
  `,
  host: {
    'data-slot': 'footer',
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
