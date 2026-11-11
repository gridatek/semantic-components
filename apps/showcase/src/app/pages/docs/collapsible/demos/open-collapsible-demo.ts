import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** [(open)] starting true: shown until its trigger closes it. */
@Component({
  selector: 'app-open-collapsible-demo',
  imports: [
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    SiChevronDownIcon,
  ],
  template: `
    <div scCollapsible [(open)]="open" class="w-full max-w-sm">
      <button
        scButton
        scCollapsibleTrigger
        variant="ghost"
        class="w-full justify-between"
      >
        Release notes
        <svg
          siChevronDownIcon
          class="transition-transform in-data-panel-open:rotate-180"
        ></svg>
      </button>
      <div scCollapsiblePanel>
        <p class="text-muted-foreground p-2.5 text-sm">
          Version 2 adds dark mode and a faster search.
        </p>
      </div>
      <p class="text-muted-foreground px-2.5 text-xs">Open: {{ open() }}</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OpenCollapsibleDemo {
  protected readonly open = signal(true);
}
