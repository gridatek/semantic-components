import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SC_EDITOR,
  ɵassertEditorFeature,
} from '@semantic-components/ui/editor';

/**
 * A highlight swatch, in your highlight popover: highlights the selection in
 * `color` (any CSS colour — the editor's styles have
 * `var(--editor-highlight-yellow)`, `-green`, `-blue`, `-purple`, `-red`,
 * light and dark), or removes it when it's on. Name it (the colour's name).
 */
@Directive({
  selector: 'button[scEditorHighlightColor]',
  host: {
    type: 'button',
    'data-slot': 'editor-highlight-color',
    '[class]': 'class()',
    '[style.background-color]': 'color()',
    '[disabled]': 'disabled()',
    '[attr.aria-pressed]': 'pressed()',
    '(click)': 'onClick()',
  },
})
export class ScEditorHighlightColor {
  private readonly editor = inject(SC_EDITOR);

  readonly color = input.required<string>({ alias: 'scEditorHighlightColor' });
  readonly classInput = input<string>('', { alias: 'class' });

  /** The highlight colour at the selection, or ''. */
  private readonly current = computed(() => {
    this.editor.contentVersion();
    const color = this.editor.editorInstance()?.getAttributes('highlight')[
      'color'
    ];
    return typeof color === 'string' ? color : '';
  });

  protected readonly pressed = computed(() => this.current() === this.color());

  protected readonly disabled = computed(() => !this.editor.editable());

  protected readonly class = computed(() =>
    cn(
      'size-7 shrink-0 rounded-full border border-black/10 outline-none transition-shadow dark:border-white/10',
      'hover:ring-2 hover:ring-ring/50 focus-visible:ring-[3px] focus-visible:ring-ring/50',
      'aria-pressed:ring-2 aria-pressed:ring-ring aria-pressed:ring-offset-2 aria-pressed:ring-offset-background',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵassertEditorFeature('withHighlight', 'scEditorHighlightColor');
  }

  protected onClick(): void {
    const color = this.color();
    this.editor.run((chain) =>
      this.pressed() ? chain.unsetHighlight() : chain.setHighlight({ color }),
    );
  }
}
