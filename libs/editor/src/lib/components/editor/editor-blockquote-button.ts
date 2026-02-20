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
  selector: 'button[scEditorBlockquote]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-blockquote',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.aria-pressed]': 'editor.isBlockquote()',
    '[attr.title]': '"Blockquote"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorBlockquoteButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      this.editor.isBlockquote() && 'bg-accent text-accent-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.editor.execCommand('formatBlock', 'blockquote');
  }
}
