import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR, type ScEditorHeading } from './editor';

const HEADING_OPTIONS: { value: ScEditorHeading; label: string }[] = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
];

@Directive({
  selector: '[scEditorHeadingMenu]',
  exportAs: 'scEditorHeadingMenu',
  hostDirectives: [{ directive: ToolbarWidget, inputs: ['value'] }],
  host: {
    'data-slot': 'editor-heading-menu',
    '[class]': 'class()',
  },
})
export class ScEditorHeadingMenu {
  readonly editor = inject(SC_EDITOR);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('contents', this.classInput()));

  readonly headingOptions = HEADING_OPTIONS;

  readonly currentHeadingLabel = computed(() => {
    const current = this.editor.currentHeading();
    return (
      HEADING_OPTIONS.find((o) => o.value === current)?.label ?? 'Paragraph'
    );
  });

  onItemSelected(value: string): void {
    this.editor.execCommand('formatBlock', value as ScEditorHeading);
  }
}
