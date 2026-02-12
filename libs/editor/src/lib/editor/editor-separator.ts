import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-editor-separator]',
  template: ``,
  host: {
    'data-slot': 'editor-separator',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('w-px h-6 bg-border mx-1', this.classInput()),
  );
}
