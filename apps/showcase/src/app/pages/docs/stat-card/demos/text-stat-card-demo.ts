import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScStatCard,
  ScStatCardDescription,
  ScStatCardIcon,
  ScStatCardLabel,
  ScStatCardValue,
} from '@semantic-components/ui-lab';
import { SiServerIcon } from '@semantic-icons/lucide-icons';

/** Not every figure is a number: without a value, the card shows your text. */
@Component({
  selector: 'app-text-stat-card-demo',
  imports: [
    ScStatCard,
    ScStatCardLabel,
    ScStatCardValue,
    ScStatCardDescription,
    ScStatCardIcon,
    SiServerIcon,
  ],
  template: `
    <dl scStatCard class="w-64">
      <dt scStatCardLabel>Status <svg siServerIcon scStatCardIcon></svg></dt>
      <dd scStatCardValue>All systems normal</dd>
      <dd scStatCardDescription>checked a minute ago</dd>
    </dl>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TextStatCardDemo {}
