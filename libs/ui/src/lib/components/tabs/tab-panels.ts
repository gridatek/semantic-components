import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';

import { cn } from '@semantic-components/utils';

import { ScTabPanelContent } from './tab-panel-content';
import { ScTabsService } from './tabs.service';

@Component({
  selector: 'div[sc-tab-panels]',
  imports: [NgTemplateOutlet],
  template: `
    @for (tabPanelContent of tabPanelContents(); track tabPanelContent.tabId()) {
      @if (tabPanelContent.tabId() === activeTabId()) {
        <div
          [attr.id]="'tab-panel-' + tabPanelContent.tabId()"
          [attr.aria-labelledby]="'tab-' + tabPanelContent.tabId()"
          tabindex="0"
          role="tabpanel"
        >
          <ng-container [ngTemplateOutlet]="tabPanelContent.templateRef" />
        </div>
      }
    }
  `,
  host: {
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTabPanels {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.classInput(),
    ),
  );

  private readonly scTabsService = inject(ScTabsService);

  protected readonly activeTabId = computed(() => this.scTabsService.activeTab()?.id);

  protected readonly tabPanelContents = contentChildren(ScTabPanelContent);
}
