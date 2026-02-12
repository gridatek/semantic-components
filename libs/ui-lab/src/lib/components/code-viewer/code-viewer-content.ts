import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';
import { cn } from '../../utils';

export type ScCodeViewerLanguage =
  | 'angular-ts'
  | 'typescript'
  | 'javascript'
  | 'html'
  | 'css'
  | 'json'
  | 'python'
  | 'bash'
  | 'shell'
  | 'markdown'
  | 'yaml'
  | 'sql'
  | 'go'
  | 'rust'
  | 'java'
  | 'plaintext';

@Component({
  selector: 'div[sc-code-viewer-content]',
  template: `
    @if (highlightedHtml()) {
      <div [class]="contentClass()" [innerHTML]="highlightedHtml()"></div>
    } @else {
      <pre
        class="m-0 p-4 text-sm leading-relaxed font-mono text-foreground"
      ><code>{{ code() }}</code></pre>
    }
  `,
  host: {
    'data-slot': 'code-viewer-content',
    '[class]': 'wrapperClass()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCodeViewerContent {
  readonly code = input.required<string>();
  readonly language = input<ScCodeViewerLanguage>('plaintext');
  readonly showLineNumbers = input(false);
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly sanitizer = inject(DomSanitizer);

  protected readonly highlightedHtml = signal<SafeHtml | null>(null);

  protected readonly wrapperClass = computed(() =>
    cn('overflow-auto', this.classInput()),
  );

  protected readonly contentClass = computed(() =>
    cn(this.showLineNumbers() && 'shiki-line-numbers'),
  );

  constructor() {
    effect(() => {
      const code = this.code();
      const lang = this.language();

      this.highlight(code, lang);
    });
  }

  private async highlight(
    code: string,
    lang: ScCodeViewerLanguage,
  ): Promise<void> {
    try {
      const html = await codeToHtml(code, {
        lang,
        themes: {
          light: 'github-light',
          dark: 'github-dark',
        },
        defaultColor: false,
      });
      this.highlightedHtml.set(this.sanitizer.bypassSecurityTrustHtml(html));
    } catch {
      this.highlightedHtml.set(null);
    }
  }
}
