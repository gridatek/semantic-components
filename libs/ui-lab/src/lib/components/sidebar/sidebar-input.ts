import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'input[scSidebarInput]',
  host: {
    'data-slot': 'sidebar-input',
    '[class]': 'class()',
  },
})
export class ScSidebarInput {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
      this.classInput(),
    ),
  );
}
