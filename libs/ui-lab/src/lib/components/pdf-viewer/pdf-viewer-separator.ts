import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[sc-pdf-viewer-separator]',
  template: ``,
  host: {
    'data-slot': 'pdf-viewer-separator',
    role: 'separator',
    '[attr.aria-orientation]': '"vertical"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('w-px h-6 bg-border', this.classInput()),
  );
}
