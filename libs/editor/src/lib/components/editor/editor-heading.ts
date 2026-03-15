import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn, toggleVariants } from '@semantic-components/ui';
import { SC_EDITOR, type ScEditorHeadingLevel } from './editor';

const HEADING_OPTIONS: { value: ScEditorHeadingLevel; label: string }[] = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
];

@Directive({
  selector: 'button[scEditorHeading]',
  exportAs: 'scEditorHeading',
  hostDirectives: [{ directive: ToolbarWidget, inputs: ['value'] }],
  host: {
    'data-slot': 'editor-heading',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
  },
})
export class ScEditorHeading {
  readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () => this.disabledInput() || this.editor.disabled(),
  );

  readonly headingOptions = HEADING_OPTIONS;

  readonly currentHeadingLabel = computed(() => {
    const current = this.editor.currentHeading();
    return (
      HEADING_OPTIONS.find((o) => o.value === current)?.label ?? 'Paragraph'
    );
  });

  onItemSelected(value: string): void {
    this.editor.execCommand('formatBlock', value as ScEditorHeadingLevel);
  }
}
