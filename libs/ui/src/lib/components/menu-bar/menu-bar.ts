import { MenuBar } from '@angular/aria/menu';
import { Directive, computed, input, signal } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scMenuBar]',
  hostDirectives: [MenuBar],
  host: {
    '[class]': 'class()',
    '(focusin)': 'onFocusIn()',
  },
})
export class ScMenuBar {
  readonly classInput = input<string>('', { alias: 'class' });

  rendered = signal(false);

  protected readonly class = computed(() =>
    cn(
      'flex h-8 items-center gap-0.5 rounded-lg border p-[3px]',
      this.classInput(),
    ),
  );

  onFocusIn() {
    this.rendered.set(true);
  }
}
