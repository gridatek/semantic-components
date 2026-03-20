import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'li[scPasswordRequirementItem]',
  host: {
    'data-slot': 'password-requirement-item',
    '[attr.data-met]': 'met()',
    '[class]': 'class()',
  },
})
export class ScPasswordRequirementItem {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly met = input.required<boolean>();

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-1 [&>svg]:size-3 [&>svg]:shrink-0 data-[met=true]:text-green-600 data-[met=false]:text-muted-foreground',
      this.classInput(),
    ),
  );
}
