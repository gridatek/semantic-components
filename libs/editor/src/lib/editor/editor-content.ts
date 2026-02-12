import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_EDITOR } from './editor';

@Component({
  selector: 'div[sc-editor-content]',
  template: ``, // Empty - host element is the content div
  host: {
    'data-slot': 'editor-content',
    '[class]': 'class()',
    '[attr.aria-label]': 'ariaLabel()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorContent {
  readonly editor = inject(SC_EDITOR);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly destroyRef = inject(DestroyRef);

  readonly value = model<string>('');
  readonly placeholder = input<string>('Start typing...');
  readonly ariaLabel = input<string>('Rich text editor');
  readonly classInput = input<string>('', { alias: 'class' });

  readonly focus = output<void>();
  readonly blur = output<void>();

  private readonly isFocused = signal(false);
  private isInitialized = false;

  protected readonly class = computed(() =>
    cn(
      'block outline-none overflow-y-auto min-h-[150px] max-h-[400px] p-4 prose prose-sm max-w-none dark:prose-invert',
      this.editor.disabled() && 'pointer-events-none opacity-50',
      this.editor.readonly() && 'cursor-default',
      this.classInput(),
    ),
  );

  constructor() {
    // Watch for external value changes (must be in constructor for injection context)
    effect(() => {
      const newValue = this.value();
      const editorInstance = this.editor.editorInstance();
      if (!editorInstance || !this.isInitialized) return;

      const currentValue = editorInstance.getHTML();

      if (newValue !== currentValue) {
        editorInstance.commands.setContent(newValue);
      }
    });

    afterNextRender(() => {
      const element = this.elementRef.nativeElement;

      // Initialize Tiptap editor through parent directive
      this.editor.initializeEditor(element, this.value(), this.placeholder());

      // Watch for editor content changes
      const editorInstance = this.editor.editorInstance();
      if (editorInstance) {
        editorInstance.on('update', ({ editor }) => {
          const html = editor.getHTML();
          // Clean up empty content
          const cleaned = html === '<p></p>' ? '' : html;

          if (cleaned !== this.value()) {
            this.value.set(cleaned);
          }
        });

        // Handle focus events
        editorInstance.on('focus', () => {
          this.isFocused.set(true);
          this.focus.emit();
        });

        editorInstance.on('blur', () => {
          this.isFocused.set(false);
          this.blur.emit();
        });
      }

      this.isInitialized = true;
    });

    this.destroyRef.onDestroy(() => {
      this.editor.destroyEditor();
    });
  }
}
