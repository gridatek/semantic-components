import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** A search field in the sidebar: the Input, at its size. Name it (a label or `aria-label`). */
@Directive({
  selector: 'input[scSidebarInput]',
  host: {
    'data-slot': 'sidebar-input',
    '[class]': 'class()',
  },
})
export class ScSidebarInput {
  private readonly inputStyles = injectPreset().input;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      this.inputStyles,
      'h-8 w-full bg-background shadow-none',
      this.classInput(),
    ),
  );
}
