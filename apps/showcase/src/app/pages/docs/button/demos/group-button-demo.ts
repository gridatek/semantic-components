import { Component, ViewEncapsulation } from '@angular/core';
import { ScButton, ScButtonGroup } from '@semantic-components/ui';
import {
  SiArchiveIcon,
  SiClockIcon,
  SiFlagIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-group-button-demo',
  imports: [ScButton, ScButtonGroup, SiArchiveIcon, SiClockIcon, SiFlagIcon],
  template: `
    <div scButtonGroup aria-label="Message actions">
      <button scButton variant="outline">
        <svg siArchiveIcon data-icon="inline-start"></svg>
        Archive
      </button>
      <button scButton variant="outline">
        <svg siFlagIcon data-icon="inline-start"></svg>
        Report
      </button>
      <button scButton variant="outline">
        <svg siClockIcon data-icon="inline-start"></svg>
        Snooze
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupButtonDemo {}
