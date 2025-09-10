import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { SiCheckIcon, SiXIcon } from '@semantic-icons/lucide-icons';

export interface PasswordRequirement {
  met: boolean;
  text: string;
}

@Component({
  selector: 'ul[sc-input-password-requirements]',
  imports: [SiCheckIcon, SiXIcon],
  template: `
    @for (req of requirements(); track $index) {
      <li class="flex items-center gap-2">
        @if (req.met) {
          <svg class="text-emerald-500" si-check-icon size="16" aria-hidden="true"></svg>
        } @else {
          <svg class="text-emerald-500" si-x-icon size="16" aria-hidden="true"></svg>
        }
        <span class="text-xs" [class]="req.met ? 'text-emerald-500' : 'text-muted-foreground/80'">
          {{ req.text }}
        </span>
        <span class="sr-only">
          {{ req.met ? '- Requirement met' : '- Requirement not met' }}
        </span>
      </li>
    }
  `,
  host: {
    'aria-label': 'Password requirements',
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInputPasswordRequirements {
  readonly requirements = input<PasswordRequirement[]>([]);

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('space-y-1.5', this.classInput()));
}
