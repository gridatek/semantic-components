import { ToolbarWidgetGroup } from '@angular/aria/toolbar';
import { Component, ViewEncapsulation, computed, input } from '@angular/core';
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
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScToolbarToggleGroup {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-0.5', this.classInput()),
  );
}
