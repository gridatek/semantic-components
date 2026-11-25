import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

/** The page beside the sidebar (`main`); with the `inset` variant, a raised card. */
@Directive({
  selector: 'main[scSidebarInset]',
  host: {
    'data-slot': 'sidebar-inset',
    '[class]': 'class()',
  },
})
export class ScSidebarInset {
  private readonly styles = injectStyle().sidebar;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(this.styles.inset, this.classInput()),
  );
}
