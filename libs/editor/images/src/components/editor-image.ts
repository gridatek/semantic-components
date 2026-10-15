import { ToolbarWidget } from '@angular/aria/toolbar';
import { DOCUMENT, Directive, computed, inject, input } from '@angular/core';
import { SC_EDITOR, ɵassertEditorFeature } from '@semantic-components/editor';
import { bindInput, cn, toggleVariants } from '@semantic-components/ui';
import { ScEditorUploads } from './editor-uploads';

/**
 * Picks images from the device and uploads them with the editor's `[upload]`
 * handler (`scEditorUploads`), then inserts them at the selection (disabled
 * without one).
 * Dropping or pasting an image does the same. Write its icon and name it.
 * Needs `withImages()`.
 */
@Directive({
  selector: 'button[scEditorImage]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '(click)': 'pick()',
  },
})
export class ScEditorImage {
  private readonly editor = inject(SC_EDITOR);
  private readonly document = inject(DOCUMENT);
  private readonly uploads = inject(ScEditorUploads, { optional: true });

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () => this.disabledInput() || !this.editor.editable() || !this.uploads,
  );

  constructor() {
    ɵassertEditorFeature('withImages', 'scEditorImage');
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  /** Opens the device's file picker (the editor's image types, several). */
  protected pick(): void {
    const picker = this.document.createElement('input');
    picker.type = 'file';
    picker.multiple = true;
    picker.accept = (this.uploads?.imageTypes() ?? []).join(',');
    picker.addEventListener('change', () => {
      if (picker.files) this.uploads?.insert(picker.files);
    });
    picker.click();
  }
}
