import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

export const SC_RADIO = 'SC_RADIO';

@Directive({
  selector: 'input[type="radio"][sc-radio]',
  host: {
    'data-slot': 'radio',
    '[class]': 'class()',
  },
  exportAs: SC_RADIO,
})
export class ScRadio {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'relative',
      'appearance-none',
      'aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      "[&::before]:content-['']",
      '[&::before]:absolute [&::before]:top-1/2 [&::before]:left-1/2 [&::before]:-translate-x-1/2 [&::before]:-translate-y-1/2 [&::before]:size-2.5 [&::before]:rounded-full [&::before]:bg-primary [&::before]:opacity-0 [&::before]:transform [&::before]:scale-0 [&::before]:transition-all [&::before]:duration-200',
      'checked:[&::before]:opacity-100 checked:[&::before]:scale-100',
      this.classInput(),
    ),
  );
}
