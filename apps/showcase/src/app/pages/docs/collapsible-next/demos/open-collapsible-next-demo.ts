import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCollapsibleNext,
  ScCollapsibleNextPanel,
  ScCollapsibleNextTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** [(open)] starting true: shown until its trigger closes it. */
@Component({
  selector: 'app-open-collapsible-next-demo',
  imports: [
    ScButton,
    ScCollapsibleNext,
    ScCollapsibleNextPanel,
    ScCollapsibleNextTrigger,
    SiChevronDownIcon,
  ],
  template: `
    <div scCollapsibleNext [(open)]="open" class="w-full max-w-sm">
      <button
        scButton
        scCollapsibleNextTrigger
        variant="ghost"
        class="w-full justify-between"
      >
        Release notes
        <svg
          siChevronDownIcon
          class="transition-transform in-data-panel-open:rotate-180"
        ></svg>
      </button>
      <div scCollapsibleNextPanel>
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
export class OpenCollapsibleNextDemo {
  protected readonly open = signal(true);
}
