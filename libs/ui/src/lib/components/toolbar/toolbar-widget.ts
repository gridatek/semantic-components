import { ToolbarWidget } from '@angular/aria/toolbar';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { toggleVariants } from '../toggle/toggle';

@Component({
  selector: 'button[scToolbarWidget]',
  hostDirectives: [
    {
      directive: ToolbarWidget,
      inputs: ['value', 'disabled'],
    },
  ],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'toolbar-widget',
    type: 'button',
    '[attr.data-state]': 'widget.selected() ? "on" : "off"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScToolbarWidget {
  protected readonly widget = inject(ToolbarWidget);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      toggleVariants({ variant: 'default', size: 'default' }),
      'data-[state=on]:bg-muted',
      this.classInput(),
    ),
  );
}
