import { Toolbar } from '@angular/aria/toolbar';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-toolbar]',
  hostDirectives: [
    {
      directive: Toolbar,
      inputs: ['orientation', 'disabled', 'wrap', 'values', 'softDisabled'],
      outputs: ['valuesChange'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'toolbar',
    '[attr.data-orientation]': 'toolbar.orientation()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScToolbar {
  protected readonly toolbar = inject(Toolbar);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'inline-flex items-center gap-1 rounded-lg border bg-background p-1',
      this.toolbar.orientation() === 'vertical' && 'flex-col',
      this.classInput(),
    ),
  );
}
