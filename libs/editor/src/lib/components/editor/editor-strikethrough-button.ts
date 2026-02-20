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
  selector: 'button[scEditorStrikethrough]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-strikethrough',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.aria-pressed]': 'editor.isStrikethrough()',
    '[attr.title]': '"Strikethrough"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorStrikethroughButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: 'ghost', size: 'icon' }),
      this.editor.isStrikethrough() && 'bg-accent text-accent-foreground',
      this.classInput(),
    ),
  );

  onClick(): void {
    this.editor.execCommand('strikethrough');
  }
}
