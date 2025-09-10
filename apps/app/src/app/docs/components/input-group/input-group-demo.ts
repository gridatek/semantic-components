import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScInput, ScInputGroup } from '@semantic-components/ui';
import { SiMailIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-input-group-demo',
  imports: [ScInput, ScInputGroup, SiSearchIcon, SiMailIcon],
  template: `
    <div class="space-y-4">
      <!-- Basic with left icon -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium">With left icon</h4>
        <sc-input-group>
          <svg si-search-icon data-slot="icon"></svg>
          <input sc-input placeholder="Search..." data-slot="control" />
        </sc-input-group>
      </div>

      <!-- Basic with right icon -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium">With right icon</h4>
        <sc-input-group>
          <input sc-input placeholder="Enter email" data-slot="control" />
          <svg si-mail-icon data-slot="icon"></svg>
        </sc-input-group>
      </div>

      <!-- With both icons -->
      <div class="space-y-2">
        <h4 class="text-sm font-medium">With both icons</h4>
        <sc-input-group>
          <svg si-search-icon data-slot="icon"></svg>
          <input sc-input placeholder="Search emails..." data-slot="control" />
          <svg si-mail-icon data-slot="icon"></svg>
        </sc-input-group>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupDemo {}
