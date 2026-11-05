import {
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  signal,
} from '@angular/core';
import type { ScCodeBlockLineVariant } from '@semantic-components/presets';
import { cn, injectPreset } from '@semantic-components/ui';
import { SC_CODE_HIGHLIGHTER, type ScCodeToken } from './code-highlighter';

export type { ScCodeBlockLineVariant } from '@semantic-components/presets';

/**
 * The code (`[code]`), line by line — highlighted in its `language` when the
 * app provides a highlighter, plain until then or without. Scrolls (or wraps,
 * `wrap`); numbered with `lineNumbers` (from `startLine`); lines marked by
 * number: `highlightedLines`, `addedLines`, `removedLines`. Always left to
 * right; focusable, to scroll by keyboard.
 */
@Component({
  selector: 'pre[scCodeBlockContent]',
  // The lines are blocks; whitespace between them would show in the pre.
  // prettier-ignore
  template: `<code data-slot="code-block-code" [class]="codeClass">@for (line of lines(); track $index) {<span data-slot="code-block-line" [attr.data-variant]="variants()[$index]" [class]="lineClass(variants()[$index])"><span data-slot="code-block-line-content" class="min-w-0">@for (token of line; track $index) {<span [style]="token.style" [class]="tokenClass">{{ token.content }}</span>} @empty {{{ newline }}}</span></span>}</code>`,
  host: {
    'data-slot': 'code-block-content',
    dir: 'ltr',
    tabindex: '0',
    '[attr.data-wrap]': 'wrap() || null',
    '[attr.data-numbered]': 'lineNumbers() || null',
    '[style.counter-reset]': '"line " + (startLine() - 1)',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCodeBlockContent {
  private readonly highlighter = inject(SC_CODE_HIGHLIGHTER, {
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly code = input.required<string>();
  /** Its language (`typescript`, `angular-ts`, `css`, `bash`…). */
  readonly language = input('plaintext');
  /** Long lines wrap, instead of scrolling. */
  readonly wrap = input(false, { transform: booleanAttribute });
  readonly lineNumbers = input(false, { transform: booleanAttribute });
  /** The first line's number. */
  readonly startLine = input(1, { transform: numberAttribute });
  /** Lines (from 1) marked as highlighted, added or removed. */
  readonly highlightedLines = input<readonly number[]>([]);
  readonly addedLines = input<readonly number[]>([]);
  readonly removedLines = input<readonly number[]>([]);

  /** An empty line holds a newline, so copying a selection keeps it. */
  protected readonly newline = '\n';

  /** The code without its last newline (it would show as an empty line). */
  private readonly text = computed(() => this.code().replace(/\n$/, ''));

  private readonly highlighted = signal<{
    readonly text: string;
    readonly language: string;
    readonly lines: ScCodeToken[][];
  } | null>(null);

  protected readonly lines = computed<ScCodeToken[][]>(() => {
    const text = this.text();
    const highlighted = this.highlighted();
    if (highlighted?.text === text && highlighted.language === this.language())
      return highlighted.lines;
    return text
      .split('\n')
      .map((line) => (line ? [{ content: line, style: {} }] : []));
  });

  protected readonly variants = computed(() => {
    const marks = new Map<number, ScCodeBlockLineVariant>();
    for (const n of this.highlightedLines()) marks.set(n, 'highlighted');
    for (const n of this.addedLines()) marks.set(n, 'added');
    for (const n of this.removedLines()) marks.set(n, 'removed');
    return this.lines().map((_, i) => marks.get(i + 1) ?? 'default');
  });

  private readonly styles = injectPreset().codeBlock;
  protected readonly codeClass = this.styles.code;
  protected readonly tokenClass =
    'text-(--shiki-light) dark:text-(--shiki-dark)';

  protected readonly class = computed(() =>
    cn(this.styles.content, this.classInput()),
  );

  constructor() {
    // Highlighted when the highlighter answers; the last request wins.
    let request = 0;
    effect(() => {
      const text = this.text();
      const language = this.language();
      const highlighter = this.highlighter;
      if (!highlighter) return;
      const id = ++request;
      highlighter
        .highlight(text, language)
        .then((lines) => {
          if (id === request && lines)
            this.highlighted.set({ text, language, lines });
        })
        .catch(() => undefined);
    });
  }

  protected lineClass(variant: ScCodeBlockLineVariant): string {
    return this.styles.line({ variant });
  }
}
