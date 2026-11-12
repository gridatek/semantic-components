import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/** The page beside the sidebar (`main`); with the `inset` variant, a raised card. */
@Directive({
  selector: 'main[scSidebarNextInset]',
  host: {
    'data-slot': 'sidebar-inset',
    '[class]': 'class()',
  },
})
export class ScSidebarNextInset {
  private readonly styles = injectPreset().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.inset, this.classInput()),
  );
}
