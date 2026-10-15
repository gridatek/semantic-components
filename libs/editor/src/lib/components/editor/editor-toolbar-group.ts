import { ToolbarWidgetGroup } from '@angular/aria/toolbar';
import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'div[scEditorToolbarGroup]',
  hostDirectives: [ToolbarWidgetGroup],
  host: {
    '[class]': 'class()',
  },
})
export class ScEditorToolbarGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() =>
    cn('flex shrink-0 items-center gap-0.5', this.classInput()),
  );
}
