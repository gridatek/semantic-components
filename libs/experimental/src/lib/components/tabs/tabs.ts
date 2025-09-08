import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  afterNextRender,
  computed,
  contentChildren,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScTab } from './tab';
import { ScTabsHeader } from './tabs-header';

@Component({
  selector: 'sc-tabs',
  imports: [NgTemplateOutlet, ScTabsHeader],
  template: `
    <div [class]="tabsHeaderClass()" sc-tabs-header>
      @for (tab of tabs(); track tab) {
        <button
          class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
          [attr.data-state]="tab.active() ? 'active' : ''"
          (click)="selectTab(tab)"
        >
          <ng-container [ngTemplateOutlet]="tab.label()" />
        </button>
      } @empty {
        <p>There are no tabs.</p>
      }
    </div>

    <ng-content />
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTabs {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() => cn('', this.classInput()));

  readonly tabsHeaderClass = input<string>('');

  readonly tabs = contentChildren(ScTab, { descendants: true });

  constructor() {
    afterNextRender(() => {
      // get all active tabs
      const activeTabs = this.tabs().filter((tab) => tab.active());

      if (activeTabs.length > 1) {
        throw new Error('Only one tab can be active');
      }

      // if there is no active tab set, activate the first
      if (activeTabs.length === 0) {
        this.selectTab(this.tabs()[0]);
      }
    });
  }

  selectTab(tab: ScTab) {
    // deactivate all tabs
    this.tabs().forEach((tab) => tab.active.set(false));

    // activate the tab the user has clicked on.
    tab.active.set(true);
  }
}
