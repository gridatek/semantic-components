import { Toolbar } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';

@Directive({
  selector: 'div[scToolbarSeparator]',
  host: {
    role: 'separator',
    '[attr.aria-orientation]': 'separatorOrientation()',
    '[attr.data-orientation]': 'separatorOrientation()',
    '[class]': 'class()',
  },
})
export class ScToolbarSeparator {
  private readonly toolbar = inject(Toolbar);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly separatorOrientation = computed(() =>
    this.toolbar.orientation() === 'horizontal' ? 'vertical' : 'horizontal',
  );

  private readonly class = computed(() => {
    const isVertical = this.separatorOrientation() === 'vertical';
    return cn(
      'shrink-0 bg-border',
      // As tall as its row: a wrapping toolbar has no set height for h-full.
      isVertical ? 'mx-1 w-px self-stretch' : 'my-1 h-px w-full',
      this.classInput(),
    );
  });
}
