import {
  Directive,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { cn } from 'cn';
import { SC_EDITOR, type ScEditor, type ScEditorChainCommand } from './editor';
import { ɵeditorControl } from './editor-control';
import { SC_EDITOR_FEATURES } from './editor-features';

/**
 * The editor's commands, by name — core's, and a feature's once its entry
 * point is imported (it adds its own: `align-center` with
 * `@semantic-components/ui/editor/align`). A feature entry extends it:
 *
 * ```ts
 * declare module '@semantic-components/ui/editor' {
 *   interface ScEditorCommands {
 *     'align-center': true;
 *   }
 * }
 * ```
 */
export interface ScEditorCommands {
  bold: true;
  italic: true;
  underline: true;
  strikethrough: true;
  code: true;
  'bullet-list': true;
  'ordered-list': true;
  'task-list': true;
  quote: true;
  'code-block': true;
  'horizontal-rule': true;
  'clear-formatting': true;
  undo: true;
  redo: true;
}

/** A command's name: core's, or an imported feature's. */
export type ScEditorCommandName = keyof ScEditorCommands;

/** What a command does, for `scEditorCommand` to run and show. */
export interface ScEditorCommandDefinition {
  /** Runs it, on the focused document. */
  readonly run: ScEditorChainCommand;
  /** On at the selection (a mark, a block…); without: never pressed. */
  readonly active?: (editor: ScEditor) => boolean;
  /** Whether it can run now (Undo: something to undo); without: always. */
  readonly can?: ScEditorChainCommand;
}

/** Core's commands. */
const CORE_COMMANDS: Readonly<Record<string, ScEditorCommandDefinition>> = {
  bold: {
    run: (chain) => chain.toggleBold(),
    active: (editor) => editor.isActive('bold'),
  },
  italic: {
    run: (chain) => chain.toggleItalic(),
    active: (editor) => editor.isActive('italic'),
  },
  underline: {
    run: (chain) => chain.toggleUnderline(),
    active: (editor) => editor.isActive('underline'),
  },
  strikethrough: {
    run: (chain) => chain.toggleStrike(),
    active: (editor) => editor.isActive('strike'),
  },
  code: {
    run: (chain) => chain.toggleCode(),
    active: (editor) => editor.isActive('code'),
  },
  'bullet-list': {
    run: (chain) => chain.toggleBulletList(),
    active: (editor) => editor.isActive('bulletList'),
  },
  'ordered-list': {
    run: (chain) => chain.toggleOrderedList(),
    active: (editor) => editor.isActive('orderedList'),
  },
  'task-list': {
    run: (chain) => chain.toggleTaskList(),
    active: (editor) => editor.isActive('taskList'),
  },
  quote: {
    run: (chain) => chain.toggleBlockquote(),
    active: (editor) => editor.isActive('blockquote'),
  },
  'code-block': {
    run: (chain) => chain.toggleCodeBlock(),
    active: (editor) => editor.isActive('codeBlock'),
  },
  'horizontal-rule': { run: (chain) => chain.setHorizontalRule() },
  'clear-formatting': { run: (chain) => chain.clearNodes().unsetAllMarks() },
  undo: { run: (chain) => chain.undo(), can: (chain) => chain.undo() },
  redo: { run: (chain) => chain.redo(), can: (chain) => chain.redo() },
};

/** The feature that brings a command that isn't core's: for the dev warning. */
const FEATURE_OF: Readonly<Record<string, string>> = {
  'align-left': 'withAlign',
  'align-center': 'withAlign',
  'align-right': 'withAlign',
  'align-justify': 'withAlign',
  superscript: 'withScripts',
  subscript: 'withScripts',
};

const warned = new Set<string>();

/**
 * Runs one of the editor's commands — `scEditorCommand="bold"` — on any
 * button. Behaviour only: its look is the part beside it, `scToggle` in a
 * toolbar (every command the same size) or `scButton`, and
 * `scToolbarWidget` in a toolbar. It feeds them its state: pressed as the
 * document says (a mark, a block, an alignment — off for one that runs once:
 * Undo, a rule), disabled when the editor isn't editable or it can't run
 * (nothing to undo). A feature's commands need it provided
 * (`align-center`: `withAlign()`). Write its icon and name it.
 */
@Directive({
  selector: 'button[scEditorCommand]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScEditorCommand {
  private readonly editor = inject(SC_EDITOR);
  private readonly features = inject(SC_EDITOR_FEATURES);

  /** The command it runs. */
  readonly command = input.required<ScEditorCommandName>({
    alias: 'scEditorCommand',
  });
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  private readonly class = computed(() => cn(this.classInput()));

  /** Its definition: core's, or a provided feature's. */
  private readonly definition = computed<ScEditorCommandDefinition | null>(
    () => {
      const name = this.command();
      return (
        CORE_COMMANDS[name] ??
        this.features.find((feature) => feature.commands?.[name])?.commands?.[
          name
        ] ??
        null
      );
    },
  );

  private readonly disabled = computed(() => {
    const definition = this.definition();
    if (this.disabledInput() || !definition || !this.editor.editable())
      return true;
    const can = definition.can;
    return !!can && !this.editor.can(can);
  });

  constructor() {
    ɵeditorControl({
      disabled: this.disabled,
      pressed: computed(() => {
        const active = this.definition()?.active;
        return !!active && active(this.editor);
      }),
    });
    // In development: a feature's command without its feature.
    effect(() => {
      if (typeof ngDevMode === 'undefined' || !ngDevMode) return;
      const name = this.command();
      if (this.definition()) return;
      const message = `scEditorCommand="${name}" needs ${FEATURE_OF[name] ?? 'its feature'}() in provideEditor(…).`;
      untracked(() => {
        if (warned.has(message)) return;
        warned.add(message);
        console.warn(message);
      });
    });
  }

  private onClick(): void {
    const definition = this.definition();
    if (definition && !this.disabled()) this.editor.run(definition.run);
  }
}
