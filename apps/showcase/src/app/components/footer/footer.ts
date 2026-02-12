import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
          Built with Angular ARIA and Tailwind CSS. Open source.
        </p>
      </div>
    </footer>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
