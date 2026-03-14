import { ToolbarWidget } from '@angular/aria/toolbar';
import {
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_EDITOR, ScEditorHeading } from './editor';

const HEADING_OPTIONS: { value: string; label: string }[] = [
  { value: 'p', label: 'Paragraph' },
  { value: 'h1', label: 'Heading 1' },
  { value: 'h2', label: 'Heading 2' },
  { value: 'h3', label: 'Heading 3' },
  { value: 'h4', label: 'Heading 4' },
  { value: 'h5', label: 'Heading 5' },
  { value: 'h6', label: 'Heading 6' },
];

@Directive({
  selector: 'select[scEditorHeading]',
  hostDirectives: [{ directive: ToolbarWidget, inputs: ['value'] }],
  host: {
    'data-slot': 'editor-heading',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '[value]': 'editor.currentHeading()',
    '(change)': 'onChange($event)',
  },
})
export class ScEditorHeadingSelect {
  readonly editor = inject(SC_EDITOR);
  private readonly elementRef = inject(ElementRef<HTMLSelectElement>);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() =>
    cn(
      'appearance-none pl-2 pr-6 py-1 text-sm rounded border-0 bg-transparent hover:bg-accent cursor-pointer',
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () => this.disabledInput() || this.editor.disabled(),
  );

  constructor() {
    afterNextRender(() => {
      const select = this.elementRef.nativeElement;
      for (const { value, label } of HEADING_OPTIONS) {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        select.appendChild(option);
      }
    });
  }

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as ScEditorHeading;
    this.editor.execCommand('formatBlock', value === 'p' ? 'p' : value);
  }
}
