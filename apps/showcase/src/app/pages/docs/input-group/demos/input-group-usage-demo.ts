import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-group-usage-demo',
  imports: [ScInput, ScInputGroup, ScInputGroupAddon, SiSearchIcon],
  template: `
    <div scInputGroup class="max-w-sm">
      <input scInput placeholder="Search..." aria-label="Search" />
      <div scInputGroupAddon>
        <svg siSearchIcon></svg>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InputGroupUsageDemo {}
