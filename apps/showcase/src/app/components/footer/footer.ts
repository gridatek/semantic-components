import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from 'cn';

/** The site's footer, as shadcn's: one line — who it is for, where the code is. */
@Component({
  selector: 'app-footer',
  template: `
    <footer class="px-4 py-6 md:px-6 lg:px-8">
      <p class="text-muted-foreground text-center text-sm text-balance">
        Built for the Angular community. The source code is available on
        <a
          href="https://github.com/gridatek/semantic-components"
          target="_blank"
          rel="noopener noreferrer"
          class="text-foreground font-medium underline underline-offset-4"
          >GitHub</a
        >.
      </p>
    </footer>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class Footer {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
