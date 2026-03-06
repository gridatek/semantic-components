import { ToolbarWidgetGroup } from '@angular/aria/toolbar';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'div[scToolbarToggleGroup]',
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
    'data-slot': 'toolbar-toggle-group',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScToolbarToggleGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-0.5', this.classInput()),
  );
}
