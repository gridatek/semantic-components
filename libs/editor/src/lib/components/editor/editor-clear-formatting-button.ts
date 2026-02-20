import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { SC_EDITOR } from './editor';

@Component({
  selector: 'button[scEditorClearFormatting]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-clear-formatting',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.title]': '"Clear formatting"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorClearFormattingButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    this.editor.execCommand('removeFormat');
  }
}
