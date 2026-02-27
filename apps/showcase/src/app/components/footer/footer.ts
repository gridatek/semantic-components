import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn, ScLink } from '@semantic-components/ui';
import { SiGithubIcon, SiHeartIcon } from '@semantic-icons/lucide-icons';
import { Logo } from '../logo/logo';

@Component({
  selector: 'app-footer',
  imports: [Logo, ScLink, SiGithubIcon, SiHeartIcon],
  template: `
    <footer class="border-t px-4 py-8 md:px-6 lg:px-8">
      <div
        class="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row"
      >
        <div class="flex items-center gap-2">
          <svg app-logo class="size-5"></svg>
          <span class="font-semibold">Semantic Components</span>
        </div>
        <div class="flex items-center gap-4">
          <p class="text-muted-foreground text-sm">
            Built with
            <svg
              siHeartIcon
              class="inline size-4 fill-red-500 text-red-500"
              aria-label="heart"
            ></svg>
            for the Angular community. Open source.
          </p>
          <a
            scLink
            variant="ghost"
            size="icon"
            href="https://github.com/gridatek/semantic-components"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg siGithubIcon></svg>
          </a>
        </div>
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
