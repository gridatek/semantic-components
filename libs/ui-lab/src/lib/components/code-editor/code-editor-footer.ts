import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-code-editor-footer]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'code-editor-footer',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCodeEditorFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-between border-t border-border bg-background/50 px-3 py-1.5 text-xs text-muted-foreground',
      this.classInput(),
    ),
  );
}
