import { Component, ViewEncapsulation } from '@angular/core';
import { ScInputButton, ScKbd } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-button-usage-demo',
  imports: [ScInputButton, ScKbd, SiSearchIcon],
  template: `
    <button scInputButton class="max-w-sm">
      <svg siSearchIcon></svg>
      <span class="flex-1">Search...</span>
      <kbd scKbd>⌘<span class="sr-only"> Command</span>J</kbd>
    </button>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputButtonUsageDemo {}
