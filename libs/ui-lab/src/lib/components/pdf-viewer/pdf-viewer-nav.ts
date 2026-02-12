import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: '[sc-pdf-viewer-nav]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-nav',
    role: 'group',
    '[attr.aria-label]': '"Page navigation"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerNav {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1', this.classInput()),
  );
}
