import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

/** The page beside the sidebar (`main`); with the `inset` variant, a raised card. */
@Directive({
  selector: 'main[scSidebarInset]',
  host: {
    'data-slot': 'sidebar-inset',
    '[class]': 'class()',
  },
})
export class ScSidebarInset {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'relative flex w-full flex-1 flex-col bg-background md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ms-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow-sm md:peer-data-[variant=inset]:peer-data-[state=collapsed]:ms-2',
      this.classInput(),
    ),
  );
}
