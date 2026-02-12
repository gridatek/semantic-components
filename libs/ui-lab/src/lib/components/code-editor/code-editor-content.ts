import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { codeToHtml } from 'shiki';
import { cn } from '../../utils';

export type ScCodeEditorLanguage =
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

const EXTENSION_MAP: Record<string, ScCodeEditorLanguage> = {
  js: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  jsx: 'javascript',
  ts: 'typescript',
  mts: 'typescript',
  cts: 'typescript',
  tsx: 'typescript',
  html: 'html',
  htm: 'html',
  css: 'css',
  scss: 'css',
  sass: 'css',
  less: 'css',
  json: 'json',
  py: 'python',
  pyw: 'python',
  sh: 'bash',
  bash: 'bash',
  zsh: 'shell',
  sql: 'sql',
  md: 'markdown',
  markdown: 'markdown',
  yaml: 'yaml',
  yml: 'yaml',
  go: 'go',
  rs: 'rust',
  java: 'java',
  txt: 'plaintext',
};

export function detectLanguage(
  code: string,
  filename?: string,
): ScCodeEditorLanguage {
  if (filename) {
    const ext = filename.split('.').pop()?.toLowerCase();
    if (ext && EXTENSION_MAP[ext]) {
      return EXTENSION_MAP[ext];
    }
  }

  // Try to detect from content
  if (
    code.includes('<!DOCTYPE') ||
    code.includes('<html') ||
    /<\w+[^>]*>/.test(code)
  ) {
    return 'html';
  }
  if (/^\s*\{[\s\S]*\}\s*$/.test(code) || /^\s*\[[\s\S]*\]\s*$/.test(code)) {
    try {
      JSON.parse(code);
      return 'json';
    } catch {
      // Not JSON
    }
  }
  if (/^(import|export|const|let|var|function|class)\s/.test(code)) {
    if (
      /:\s*(string|number|boolean|any|void|never)\b/.test(code) ||
      /interface\s+\w+/.test(code)
    ) {
      return 'typescript';
    }
    return 'javascript';
  }
  if (
    /^(def|class|import|from|if __name__)\s/.test(code) ||
    /:\s*$/.test(code.split('\n')[0])
  ) {
    return 'python';
  }
  if (/^(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP)\s/i.test(code)) {
    return 'sql';
  }
  if (/^#\s/.test(code) || /^\*\*.*\*\*$/.test(code)) {
    return 'markdown';
  }
  if (/^#!/.test(code)) {
    return 'bash';
  }

  return 'plaintext';
}

@Component({
  selector: 'div[sc-code-editor-content]',
  template: `
    <!-- Line numbers -->
    @if (showLineNumbers()) {
      <div
        class="sc-code-editor-content__line-numbers flex-shrink-0 select-none border-r border-border py-3 pl-3 pr-3 text-right"
        [style.min-width.ch]="lineNumberWidth()"
        aria-hidden="true"
      >
        @for (line of lines(); track $index) {
          <div
            class="font-mono text-sm leading-relaxed"
            [class.sc-code-editor-content__line-numbers--active]="
              activeLine() === $index + 1
            "
          >
            {{ $index + 1 }}
          </div>
        }
      </div>
    }

    <!-- Code area -->
    <div class="relative min-w-0 flex-1">
      <!-- Highlighted code (display layer) -->
      <div
        class="pointer-events-none absolute inset-0 overflow-hidden"
        [class.word-wrap-enabled]="wordWrap()"
        aria-hidden="true"
      >
        @if (highlightedHtml()) {
          <div [innerHTML]="highlightedHtml()"></div>
        } @else {
          <pre
            class="m-0 p-3 font-mono text-sm leading-relaxed"
          ><code>{{ displayCode() }}</code></pre>
        }
      </div>

      <!-- Textarea (input layer) -->
      <textarea
        #textarea
        [value]="value()"
        (input)="onInput($event)"
        (keydown)="onKeydown($event)"
        (scroll)="onScroll($event)"
        (focus)="onFocus()"
        (blur)="onBlur()"
        (click)="updateActiveLine($event)"
        (keyup)="updateActiveLine($event)"
        [disabled]="disabled()"
        [readonly]="readonly()"
        [placeholder]="placeholder()"
        [attr.aria-label]="ariaLabel() || 'Code editor'"
        [attr.aria-describedby]="ariaDescribedby()"
        autocomplete="off"
        autocorrect="off"
        autocapitalize="off"
        spellcheck="false"
        [class]="textareaClass()"
        [style]="textareaStyle()"
      ></textarea>
    </div>
  `,
  styles: `
    .sc-code-editor-content__line-numbers {
      color: oklch(from var(--muted-foreground) l c h / 0.5);
    }

    .sc-code-editor-content__line-numbers--active {
      color: var(--foreground);
    }

    /* Transparent background for editor overlay effect */
    [sc-code-editor-content] pre.shiki,
    [sc-code-editor-content] pre.shiki span {
      background-color: transparent !important;
    }

    /* Word wrap support */
    [sc-code-editor-content] .word-wrap-enabled pre.shiki {
      white-space: pre-wrap;
      word-break: break-all;
    }

    /* Caret color */
    [sc-code-editor-content] textarea {
      caret-color: var(--primary);
    }
  `,
  host: {
    'data-slot': 'code-editor-content',
    '[class]': 'wrapperClass()',
    '(click)': 'focusTextarea()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCodeEditorContent {
  // Two-way binding for value
  readonly value = model<string>('');

  // Inputs
  readonly language = input<ScCodeEditorLanguage>('plaintext');
  readonly filename = input<string>('');
  readonly placeholder = input<string>('');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly showLineNumbers = input(true);
  readonly tabSize = input(2);
  readonly insertSpaces = input(true);
  readonly wordWrap = input(false);
  readonly autoDetectLanguage = input(false);
  readonly ariaLabel = input<string>('');
  readonly ariaDescribedby = input<string>('');
  readonly classInput = input<string>('', { alias: 'class' });

  // Outputs
  readonly valueChange = output<string>();
  readonly languageDetected = output<ScCodeEditorLanguage>();
  readonly cursorChange = output<{ line: number; column: number }>();

  // Internal state
  readonly activeLine = signal(1);
  readonly activeColumn = signal(1);
  readonly isFocused = signal(false);
  protected readonly highlightedHtml = signal<SafeHtml | null>(null);
  private scrollTop = 0;
  private scrollLeft = 0;

  private readonly sanitizer = inject(DomSanitizer);
  private readonly textarea =
    viewChild.required<ElementRef<HTMLTextAreaElement>>('textarea');

  protected readonly lines = computed(() => {
    const code = this.value() || '';
    return code.split('\n');
  });

  protected readonly lineNumberWidth = computed(() => {
    return Math.max(2, String(this.lines().length).length + 1);
  });

  protected readonly displayCode = computed(() => {
    const code = this.value() || '';
    return code.endsWith('\n') ? code : code + '\n';
  });

  protected readonly effectiveLanguage = computed(() => {
    if (this.autoDetectLanguage() && this.value()) {
      return detectLanguage(this.value(), this.filename());
    }
    return this.language();
  });

  protected readonly wrapperClass = computed(() =>
    cn('relative flex overflow-hidden', this.classInput()),
  );

  protected readonly textareaClass = computed(() =>
    cn(
      'relative m-0 w-full resize-none p-3',
      'border-none bg-transparent text-transparent caret-current outline-none',
      'font-mono text-sm leading-relaxed',
      this.disabled() && 'cursor-not-allowed',
    ),
  );

  protected readonly textareaStyle = computed(() => ({
    whiteSpace: this.wordWrap() ? 'pre-wrap' : 'pre',
    wordBreak: this.wordWrap() ? 'break-all' : 'normal',
    overflowWrap: this.wordWrap() ? 'break-word' : 'normal',
  }));

  constructor() {
    // Effect to trigger Shiki highlighting
    effect(() => {
      const code = this.displayCode();
      const lang = this.effectiveLanguage();

      this.highlight(code, lang);
    });

    // Effect for language detection notification
    effect(() => {
      if (this.autoDetectLanguage() && this.value()) {
        const detected = detectLanguage(this.value(), this.filename());
        this.languageDetected.emit(detected);
      }
    });
  }

  private async highlight(
    code: string,
    lang: ScCodeEditorLanguage,
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

  focusTextarea(): void {
    if (!this.disabled() && !this.readonly()) {
      this.textarea().nativeElement.focus();
    }
  }

  protected onInput(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.value.set(target.value);
    this.valueChange.emit(target.value);
    this.updateCursorPosition(target);
  }

  protected onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLTextAreaElement;

    // Handle Tab key
    if (event.key === 'Tab') {
      event.preventDefault();
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const value = target.value;

      const indent = this.insertSpaces() ? ' '.repeat(this.tabSize()) : '\t';

      if (event.shiftKey) {
        // Outdent
        const lineStart = value.lastIndexOf('\n', start - 1) + 1;
        const lineContent = value.slice(lineStart, start);
        const indentMatch = lineContent.match(/^(\t| {1,})/);

        if (indentMatch) {
          const removeLength = Math.min(
            indentMatch[1].length,
            this.insertSpaces() ? this.tabSize() : 1,
          );
          const newValue =
            value.slice(0, lineStart) + value.slice(lineStart + removeLength);

          this.value.set(newValue);
          this.valueChange.emit(newValue);

          // Restore cursor position
          setTimeout(() => {
            target.selectionStart = target.selectionEnd = start - removeLength;
          });
        }
      } else {
        // Indent
        const newValue = value.slice(0, start) + indent + value.slice(end);
        this.value.set(newValue);
        this.valueChange.emit(newValue);

        // Move cursor after indent
        setTimeout(() => {
          target.selectionStart = target.selectionEnd = start + indent.length;
        });
      }
    }

    // Handle Enter for auto-indent
    if (event.key === 'Enter' && !event.shiftKey) {
      const start = target.selectionStart;
      const value = target.value;

      // Find the current line's indentation
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const lineContent = value.slice(lineStart, start);
      const indentMatch = lineContent.match(/^(\s*)/);
      const currentIndent = indentMatch ? indentMatch[1] : '';

      // Check if we need extra indent (after { or :)
      const charBefore = value[start - 1];
      const extraIndent =
        charBefore === '{' || charBefore === ':' || charBefore === '['
          ? this.insertSpaces()
            ? ' '.repeat(this.tabSize())
            : '\t'
          : '';

      event.preventDefault();
      const newValue =
        value.slice(0, start) +
        '\n' +
        currentIndent +
        extraIndent +
        value.slice(start);

      this.value.set(newValue);
      this.valueChange.emit(newValue);

      setTimeout(() => {
        const newPos = start + 1 + currentIndent.length + extraIndent.length;
        target.selectionStart = target.selectionEnd = newPos;
        this.updateCursorPosition(target);
      });
    }

    // Handle closing brackets
    if (event.key === '}' || event.key === ']' || event.key === ')') {
      const start = target.selectionStart;
      const value = target.value;
      const lineStart = value.lastIndexOf('\n', start - 1) + 1;
      const beforeCursor = value.slice(lineStart, start);

      // If line is only whitespace, reduce indent
      if (/^\s+$/.test(beforeCursor)) {
        const reduceBy = this.insertSpaces() ? this.tabSize() : 1;
        const newIndent = beforeCursor.slice(
          0,
          Math.max(0, beforeCursor.length - reduceBy),
        );

        event.preventDefault();
        const newValue =
          value.slice(0, lineStart) +
          newIndent +
          event.key +
          value.slice(start);

        this.value.set(newValue);
        this.valueChange.emit(newValue);

        setTimeout(() => {
          target.selectionStart = target.selectionEnd =
            lineStart + newIndent.length + 1;
        });
      }
    }
  }

  protected onScroll(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.scrollTop = target.scrollTop;
    this.scrollLeft = target.scrollLeft;

    // Sync scroll with the display layer
    const displayLayer = target.previousElementSibling as HTMLElement;
    if (displayLayer) {
      displayLayer.scrollTop = this.scrollTop;
      displayLayer.scrollLeft = this.scrollLeft;
    }
  }

  protected onFocus(): void {
    this.isFocused.set(true);
  }

  protected onBlur(): void {
    this.isFocused.set(false);
  }

  protected updateActiveLine(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.updateCursorPosition(target);
  }

  private updateCursorPosition(textarea: HTMLTextAreaElement): void {
    const value = textarea.value;
    const pos = textarea.selectionStart;

    // Calculate line and column
    const textBeforeCursor = value.slice(0, pos);
    const lines = textBeforeCursor.split('\n');
    const line = lines.length;
    const column = lines[lines.length - 1].length + 1;

    this.activeLine.set(line);
    this.activeColumn.set(column);
    this.cursorChange.emit({ line, column });
  }
}
