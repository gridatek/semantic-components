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
  selector: 'button[scEditorLink]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-link',
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'editor.disabled()',
    '[attr.aria-disabled]': 'editor.disabled() || null',
    '[attr.title]': '"Insert link (Ctrl+K)"',
    '(click)': 'onClick()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorLinkButton {
  readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(buttonVariants({ variant: 'ghost', size: 'icon' }), this.classInput()),
  );

  onClick(): void {
    if (this.editor.disabled() || this.editor.readonly()) return;

    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';

    const url = prompt('Enter URL:', 'https://');
    if (url) {
      if (selectedText) {
        this.editor.execCommand('createLink', url);
      } else {
        const linkText = prompt('Enter link text:', 'Link');
        if (linkText) {
          const link = `<a href="${url}" target="_blank" rel="noopener noreferrer">${linkText}</a>`;
          this.editor.execCommand('insertHTML', link);
        }
      }
    }
  }
}
