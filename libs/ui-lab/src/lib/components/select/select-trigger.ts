import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  forwardRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';
import { cn } from '@semantic-components/ui';

import { ScSelectInput } from './select-input';
import { ScSelectIcon } from './select-icon';

@Component({
  selector: 'div[scSelectTrigger]',
  imports: [ScSelectInput, ScSelectIcon, SiChevronDownIcon],
  template: `
    <ng-content />
    <input
      scSelectInput
      [attr.aria-label]="ariaLabel()"
      [placeholder]="placeholder()"
    />
    <svg scSelectIcon siChevronDownIcon aria-hidden="true"></svg>
  `,
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'select-trigger',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSelectTrigger {
  readonly overlayOrigin = inject(CdkOverlayOrigin);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabel = input<string>('', { alias: 'aria-label' });

  private readonly select = inject(forwardRef(() => ScSelect));
  readonly placeholder = computed(() => this.select.placeholder());

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 dark:hover:bg-input/50 focus-visible:border-ring focus-visible:ring-ring/50 flex h-8 w-fit items-center justify-between gap-1.5 rounded-lg border bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors select-none outline-none focus-visible:ring-3 has-[[aria-disabled=true]]:cursor-not-allowed has-[[aria-disabled=true]]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5',
      this.classInput(),
    ),
  );
}

// Lazy import to avoid circular dependency
import { ScSelect } from './select';
