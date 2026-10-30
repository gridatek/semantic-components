import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScKbd,
} from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-kbd-input-group-demo',
  imports: [ScInput, ScInputGroup, ScInputGroupAddon, ScKbd, SiSearchIcon],
  template: `
    <div scInputGroup class="max-w-sm">
      <input scInput placeholder="Search..." aria-label="Search" />
      <div scInputGroupAddon>
        <svg siSearchIcon class="text-muted-foreground"></svg>
      </div>
      <div scInputGroupAddon align="inline-end">
        <kbd scKbd>&#8984;K</kbd>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class KbdInputGroupDemo {}
