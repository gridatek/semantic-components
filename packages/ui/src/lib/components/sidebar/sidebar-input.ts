import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** A search field in the sidebar: the Input, at its size. Name it (a label or `aria-label`). */
@Directive({
  selector: 'input[scSidebarInput]',
  host: {
    'data-slot': 'sidebar-input',
    '[class]': 'class()',
  },
})
export class ScSidebarInput {
  private readonly inputStyles = injectStyle().input;
  private readonly sidebarStyles = injectStyle().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.inputStyles, this.sidebarStyles.input, this.classInput()),
  );
}
