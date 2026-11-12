import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

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
  private readonly sidebarStyles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.inputStyles, this.sidebarStyles.input, this.classInput()),
  );
}
