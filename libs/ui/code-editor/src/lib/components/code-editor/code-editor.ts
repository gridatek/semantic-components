import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import { indentUnit } from '@codemirror/language';
import { Compartment, EditorState, type Extension } from '@codemirror/state';
import {
  EditorView,
  drawSelection,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  lineNumbers,
  placeholder,
} from '@codemirror/view';
import {
  DestroyRef,
  Directive,
  ElementRef,
  Injector,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  model,
  numberAttribute,
  output,
  untracked,
} from '@angular/core';
import type { FormValueControl } from '@angular/forms/signals';
import { SC_FIELD, cn } from '@semantic-components/ui';
import { SC_CODE_HIGHLIGHTER } from '@semantic-components/ui/code-block';
import { shikiHighlighting } from './shiki-highlighting';

/** CodeMirror in the theme's colors: the code block's look. */
const theme = EditorView.theme({
  '&': { backgroundColor: 'transparent', color: 'var(--foreground)' },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': {
    fontFamily: 'var(--font-mono)',
    lineHeight: '1.625',
  },
  '.cm-content': { padding: '0.5rem 0', caretColor: 'var(--foreground)' },
  '.cm-line': { padding: '0 0.75rem' },
  '.cm-gutters': {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--muted-foreground)',
  },
  '.cm-lineNumbers .cm-gutterElement': { padding: '0 0.25rem 0 0.75rem' },
  '.cm-activeLine': {
    backgroundColor: 'color-mix(in oklch, var(--muted) 60%, transparent)',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'color-mix(in oklch, var(--muted) 60%, transparent)',
    color: 'var(--foreground)',
  },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--foreground)' },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection':
    { backgroundColor: 'color-mix(in oklch, var(--ring) 35%, transparent)' },
  '.cm-placeholder': { color: 'var(--muted-foreground)' },
});

/**
 * Code to edit: CodeMirror, colored by the app's highlighter (Shiki, like a
 * code block) — undo, the keyboard's indentation (Tab, Shift+Tab; Escape
 * then Tab moves on), line numbers, the current line. A `[formField]`
 * (`string`). Put it in a code block for its frame and header; name it by
 * its `scField` or `aria-label`. CodeMirror extensions of yours (a language's
 * structure, search…) go in `extensions`.
 */
@Directive({
  selector: 'div[scCodeEditor]',
  exportAs: 'scCodeEditor',
  host: {
    'data-slot': 'code-editor',
    '[attr.data-invalid]': 'showInvalid() || null',
    '[attr.data-disabled]': 'disabled() || null',
    '[class]': 'class()',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class ScCodeEditor implements FormValueControl<string> {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly highlighter = inject(SC_CODE_HIGHLIGHTER, {
    optional: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly value = model('');
  /** Its language (`typescript`, `json`, `css`…), for highlighting. */
  readonly language = input('plaintext');
  readonly lineNumbers = input(true, { transform: booleanAttribute });
  /** Long lines wrap, instead of scrolling. */
  readonly wrap = input(false, { transform: booleanAttribute });
  /** Spaces per indentation level. */
  readonly tabSize = input(2, { transform: numberAttribute });
  /** Shown while empty. */
  readonly placeholder = input('');
  readonly readonly = input(false, { transform: booleanAttribute });
  readonly disabled = input(false, { transform: booleanAttribute });
  readonly invalid = input(false, { transform: booleanAttribute });
  readonly touched = input(false, { transform: booleanAttribute });
  /** Its name, when no field's label names it. */
  readonly ariaLabel = input('', { alias: 'aria-label' });
  /** More CodeMirror: a language's structure (`javascript()`), search… */
  readonly extensions = input<readonly Extension[]>([]);
  /** Focus left it (Signal Forms marks it touched). */
  readonly touch = output<void>();

  /** The CodeMirror view, once drawn. */
  view: EditorView | undefined;

  protected readonly showInvalid = computed(
    () => this.invalid() && this.touched(),
  );

  protected readonly class = computed(() =>
    cn(
      'block min-h-0 min-w-0 overflow-hidden text-sm data-disabled:opacity-50 [&_.cm-editor]:h-full [&_.cm-editor]:max-h-[inherit] [&_.cm-scroller]:scrollbar-thin',
      this.classInput(),
    ),
  );

  private readonly highlighting = new Compartment();
  private readonly gutter = new Compartment();
  private readonly wrapping = new Compartment();
  private readonly indentation = new Compartment();
  private readonly editing = new Compartment();
  private readonly hint = new Compartment();
  private readonly attributes = new Compartment();
  private readonly custom = new Compartment();

  /** The content's ARIA: its name, description, state. */
  private readonly contentAttributes = computed(() => {
    const label = this.ariaLabel();
    const attributes: Record<string, string> = {
      'aria-multiline': 'true',
    };
    if (label) attributes['aria-label'] = label;
    else if (this.field)
      attributes['aria-labelledby'] = `${this.field.id()}-label`;
    const described = this.field?.descriptionIds().join(' ');
    if (described) attributes['aria-describedby'] = described;
    if (this.showInvalid()) attributes['aria-invalid'] = 'true';
    if (this.readonly()) attributes['aria-readonly'] = 'true';
    if (this.disabled()) attributes['aria-disabled'] = 'true';
    return attributes;
  });

  constructor() {
    const injector = inject(Injector);
    inject(DestroyRef).onDestroy(() => this.view?.destroy());

    afterNextRender(
      () => {
        this.view = new EditorView({
          parent: this.host,
          state: EditorState.create({
            doc: untracked(this.value),
            extensions: [
              theme,
              history(),
              drawSelection(),
              highlightSpecialChars(),
              highlightActiveLine(),
              keymap.of([indentWithTab, ...defaultKeymap, ...historyKeymap]),
              EditorView.updateListener.of((update) => {
                if (update.docChanged)
                  this.value.set(update.state.doc.toString());
              }),
              this.highlighting.of(this.highlight()),
              this.gutter.of(this.gutterExtension()),
              this.wrapping.of(this.wrapExtension()),
              this.indentation.of(this.indentExtension()),
              this.editing.of(this.editingExtension()),
              this.hint.of(this.hintExtension()),
              this.attributes.of(
                EditorView.contentAttributes.of(
                  untracked(this.contentAttributes),
                ),
              ),
              this.custom.of(untracked(this.extensions)),
            ],
          }),
        });
      },
      { injector },
    );

    // The value, from outside: the document follows.
    effect(() => {
      const value = this.value();
      const view = this.view;
      if (!view || view.state.doc.toString() === value) return;
      view.dispatch({
        changes: { from: 0, to: view.state.doc.length, insert: value },
      });
    });
    // The inputs: each reconfigures its part.
    this.reconfigure(this.highlighting, () => this.highlight());
    this.reconfigure(this.gutter, () => this.gutterExtension());
    this.reconfigure(this.wrapping, () => this.wrapExtension());
    this.reconfigure(this.indentation, () => this.indentExtension());
    this.reconfigure(this.editing, () => this.editingExtension());
    this.reconfigure(this.hint, () => this.hintExtension());
    this.reconfigure(this.attributes, () =>
      EditorView.contentAttributes.of(this.contentAttributes()),
    );
    this.reconfigure(this.custom, () => [...this.extensions()]);
  }

  /** Focus in the editor. */
  focus(): void {
    this.view?.focus();
  }

  protected onFocusOut(event: FocusEvent): void {
    const next = event.relatedTarget as Node | null;
    if (!next || !this.host.contains(next)) this.touch.emit();
  }

  private reconfigure(compartment: Compartment, read: () => Extension): void {
    let first = true;
    effect(() => {
      const extension = read();
      if (first) {
        first = false;
        return;
      }
      this.view?.dispatch({ effects: compartment.reconfigure(extension) });
    });
  }

  private highlight(): Extension {
    const language = this.language();
    return this.highlighter
      ? shikiHighlighting(this.highlighter, language)
      : [];
  }

  private gutterExtension(): Extension {
    return this.lineNumbers()
      ? [lineNumbers(), highlightActiveLineGutter()]
      : [];
  }

  private wrapExtension(): Extension {
    return this.wrap() ? EditorView.lineWrapping : [];
  }

  private indentExtension(): Extension {
    const size = this.tabSize();
    return [EditorState.tabSize.of(size), indentUnit.of(' '.repeat(size))];
  }

  private editingExtension(): Extension {
    const off = this.readonly() || this.disabled();
    return [
      EditorState.readOnly.of(off),
      EditorView.editable.of(!this.disabled()),
    ];
  }

  private hintExtension(): Extension {
    const text = this.placeholder();
    return text ? placeholder(text) : [];
  }
}
