import { Toolbar } from '@angular/aria/toolbar';
import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-toolbar-separator]',
  host: {
    'data-slot': 'toolbar-separator',
    role: 'separator',
    '[attr.aria-orientation]': 'separatorOrientation()',
    '[attr.data-orientation]': 'separatorOrientation()',
    '[class]': 'class()',
  },
})
export class ScToolbarSeparator {
  private readonly toolbar = inject(Toolbar);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly separatorOrientation = computed(() =>
    this.toolbar.orientation() === 'horizontal' ? 'vertical' : 'horizontal',
  );

  protected readonly class = computed(() => {
    const isVertical = this.separatorOrientation() === 'vertical';
    return cn(
      'shrink-0 bg-border',
      isVertical ? 'mx-1 h-full w-px' : 'my-1 h-px w-full',
      this.classInput(),
    );
  });
}
