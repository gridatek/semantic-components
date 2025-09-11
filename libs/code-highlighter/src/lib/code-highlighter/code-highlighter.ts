import { ClipboardModule } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { ScButton, ScTheme } from '@semantic-components/ui';
import { cn } from '@semantic-components/utils';
import { SiCopyIcon } from '@semantic-icons/lucide-icons';

import { ShikiService } from './shiki.service';
import { LangType, ThemeType } from './types';

@Component({
  selector: 'sc-code-highlighter',
  imports: [ClipboardModule, SiCopyIcon, ScButton],
  template: `
    <div [innerHTML]="highlightedCode()"></div>

    <button class="absolute top-2 right-2" [cdkCopyToClipboard]="code()" sc-button variant="ghost">
      <svg class="h-4 w-4" si-copy-icon></svg>
    </button>
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCodeHighlighter {
  private readonly themeService = inject(ScTheme);
  private readonly shikiService = inject(ShikiService);
  private readonly sanitizer = inject(DomSanitizer);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('block relative overflow-hidden', this.classInput()),
  );

  readonly code = input.required<string>();

  readonly language = input.required<LangType>();

  readonly themeInput = input<ThemeType | undefined>(undefined, {
    alias: 'theme',
  });

  readonly theme = computed<ThemeType>(() => {
    if (this.themeInput()) {
      return this.themeInput()!;
    }

    if (this.themeService.isDarkMode()) {
      return 'github-dark';
    }

    return 'github-light';
  });

  protected readonly highlightedCode = signal<SafeHtml>('');

  constructor() {
    effect(async () => {
      const highlighted = await this.shikiService.highlightCode(
        this.code(),
        this.language(),
        this.theme(),
      );
      this.highlightedCode.set(this.sanitizer.bypassSecurityTrustHtml(highlighted));
    });
  }
}
