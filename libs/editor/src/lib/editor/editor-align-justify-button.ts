import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_EDITOR } from './editor';

@Component({
  selector: 'button[sc-editor-align-justify]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-align-justify',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-pressed]': 'editor.alignment() === "justify"',
    '[attr.title]': '"Justify"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorAlignJustifyButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'p-1.5 rounded hover:bg-accent disabled:opacity-50 [&_svg]:size-4',
      this.editor.alignment() === 'justify' &&
        'bg-accent text-accent-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.editor.execCommand('justifyFull');
  }
}
