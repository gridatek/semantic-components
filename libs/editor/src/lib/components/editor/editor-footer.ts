import {
  Component,
  ChangeDetectionStrategy,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Component({
  selector: 'div[scEditorFooter]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'editor-footer',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScEditorFooter {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn(
      'px-3 py-1.5 border-t text-xs text-muted-foreground bg-muted/30',
      this.classInput(),
    ),
  );
}
