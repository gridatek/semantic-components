import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

// Toolbar Container (Composable)
@Component({
  selector: '[sc-pdf-viewer-toolbar]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'pdf-viewer-toolbar',
    role: 'toolbar',
    '[attr.aria-label]': '"PDF viewer toolbar"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerToolbar {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-2 px-3 py-2 bg-background border-b',
      this.classInput(),
    ),
  );
}
