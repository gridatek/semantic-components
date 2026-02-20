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
  selector: 'button[scEditorNumberedList]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-numbered-list',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.aria-pressed]': 'editor.isOrderedList()',
    '[attr.title]': '"Numbered list"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorNumberedListButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      this.editor.isOrderedList() && 'bg-accent text-accent-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.editor.execCommand('insertOrderedList');
  }
}
