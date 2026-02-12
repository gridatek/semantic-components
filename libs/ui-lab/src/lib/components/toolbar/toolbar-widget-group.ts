import { ToolbarWidgetGroup } from '@angular/aria/toolbar';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[sc-toolbar-widget-group]',
  hostDirectives: [
    {
      directive: ToolbarWidgetGroup,
      inputs: ['disabled', 'multi'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'toolbar-widget-group',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScToolbarWidgetGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-1', this.classInput()),
  );
}
