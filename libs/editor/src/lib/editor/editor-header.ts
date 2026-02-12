import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-editor-header]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-header',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorHeader {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('px-4 py-3 border-b bg-muted/30', this.classInput()),
  );
}
