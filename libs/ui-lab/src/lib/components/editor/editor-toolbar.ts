import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-editor-toolbar]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-toolbar',
    role: 'toolbar',
    '[attr.aria-label]': '"Text formatting"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorToolbar {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'flex flex-wrap items-center gap-1 p-2 border-b bg-muted/30',
      this.classInput(),
    ),
  );
}
