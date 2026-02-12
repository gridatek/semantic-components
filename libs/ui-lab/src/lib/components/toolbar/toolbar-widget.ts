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

@Component({
  selector: 'button[sc-toolbar-widget]',
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
      'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors',
      'h-9 min-w-9 px-2.5',
      'hover:bg-muted hover:text-muted-foreground',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      this.classInput(),
    ),
  );
}
