import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_EDITOR, ScEditorHeading } from './editor';

@Component({
  selector: 'select[sc-editor-heading]',
  template: `
    <option value="p">Paragraph</option>
    <option value="h1">Heading 1</option>
    <option value="h2">Heading 2</option>
    <option value="h3">Heading 3</option>
    <option value="h4">Heading 4</option>
    <option value="h5">Heading 5</option>
    <option value="h6">Heading 6</option>
  `,
  host: {
    'data-slot': 'editor-heading',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[value]': 'editor.currentHeading()',
    '(change)': 'onChange($event)',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorHeadingSelect {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'appearance-none pl-2 pr-6 py-1 text-sm rounded border-0 bg-transparent hover:bg-accent cursor-pointer',
      this.classInput(),
    ),
  );

  onChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value as ScEditorHeading;
    this.editor.execCommand('formatBlock', value === 'p' ? 'p' : value);
  }
}
