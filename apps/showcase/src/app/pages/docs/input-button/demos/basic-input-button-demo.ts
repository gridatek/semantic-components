import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScInputButton, ScKbd } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-input-button-demo',
  imports: [ScInputButton, ScKbd, SiSearchIcon],
  template: `
    <button scInputButton class="max-w-sm">
      <svg siSearchIcon class="size-4 shrink-0"></svg>
      <span class="flex-1 text-start">Search...</span>
      <kbd scKbd>&#8984;J</kbd>
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputButtonDemo {}
