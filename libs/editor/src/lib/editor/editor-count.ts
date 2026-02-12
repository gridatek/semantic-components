import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-editor-count]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-count',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorCount {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center justify-end gap-4', this.classInput()),
  );
}
