import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DisabledTreeDemo } from './disabled-tree-demo';

@Component({
  selector: 'app-disabled-tree-demo-container',
  imports: [DemoContainer, DisabledTreeDemo],
  template: `
    <app-demo-container
      title="Disabled"
      demoUrl="/demos/tree/disabled-tree-demo"
      [code]="code"
    >
      <app-disabled-tree-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTreeDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScFrame,
  ScLabel,
  ScSwitch,
  ScTree,
  ScTreeGroup,
  ScTreeGroupContent,
  ScTreeItem,
  ScTreeItemIndicator,
  ScTreeItemLabel,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

/** Disabled items: an item, or a whole branch. They stay focusable — found and read — unless focusableWhenDisabled is off: then the keys skip them. */
@Component({
  selector: 'app-disabled-tree-demo',
  imports: [
    ScField,
    ScFrame,
    ScLabel,
    ScSwitch,
    ScTree,
    ScTreeGroup,
    ScTreeGroupContent,
    ScTreeItem,
    ScTreeItemIndicator,
    ScTreeItemLabel,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div scField orientation="horizontal">
        <input scSwitch id="tree-focusable" [(checked)]="focusable" />
        <label scLabel for="tree-focusable">
          Disabled items take the focus
        </label>
      </div>
      <div scFrame class="w-64 p-2">
        <ul
          scTree
          aria-label="Plans"
          [focusableWhenDisabled]="focusable()"
          [(expanded)]="expanded"
        >
          <li scTreeItem value="current">
            <div scTreeItemLabel>
              <span scTreeItemIndicator>
                <svg siChevronRightIcon></svg>
              </span>
              Current plans
            </div>
            <ul scTreeGroup>
              <ng-template scTreeGroupContent>
                <li scTreeItem value="free">
                  <div scTreeItemLabel>
                    <span scTreeItemIndicator>
                      <svg siChevronRightIcon></svg>
                    </span>
                    Free
                  </div>
                </li>
                <li scTreeItem value="pro">
                  <div scTreeItemLabel>
                    <span scTreeItemIndicator>
                      <svg siChevronRightIcon></svg>
                    </span>
                    Pro
                  </div>
                </li>
                <li scTreeItem value="enterprise" disabled>
                  <div scTreeItemLabel>
                    <span scTreeItemIndicator>
                      <svg siChevronRightIcon></svg>
                    </span>
                    Enterprise
                  </div>
                </li>
              </ng-template>
            </ul>
          </li>
          <li scTreeItem value="legacy" disabled>
            <div scTreeItemLabel>
              <span scTreeItemIndicator>
                <svg siChevronRightIcon></svg>
              </span>
              Legacy plans
            </div>
            <ul scTreeGroup>
              <ng-template scTreeGroupContent>
                <li scTreeItem value="basic">
                  <div scTreeItemLabel>Basic</div>
                </li>
              </ng-template>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledTreeDemo {
  private readonly focusable = signal(true);
  private readonly expanded = signal(['current']);
}`;
}
