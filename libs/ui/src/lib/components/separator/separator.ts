import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

export type ScSeparatorOrientation = 'horizontal' | 'vertical';

@Directive({
  selector: 'div[scSeparator]',
  host: {
    'data-slot': 'separator',
    '[attr.role]': 'decorative() ? "none" : "separator"',
    '[attr.aria-orientation]': 'decorative() ? null : orientation()',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
    '[attr.data-orientation]': 'orientation()',
    '[class]': 'class()',
  },
})
export class ScSeparator {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScSeparatorOrientation>('horizontal');
  readonly decorative = input<boolean>(true);

  protected readonly class = computed(() =>
    cn(
      'shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px',
      this.classInput(),
    ),
  );
}
