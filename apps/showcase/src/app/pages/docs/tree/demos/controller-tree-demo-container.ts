import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ControllerTreeDemo } from './controller-tree-demo';

@Component({
  selector: 'app-controller-tree-demo-container',
  imports: [DemoContainer, ControllerTreeDemo],
  template: `
    <app-demo-container
      title="Controller"
      demoUrl="/demos/tree/controller-tree-demo"
      [code]="code"
    >
      <app-controller-tree-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ControllerTreeDemoContainer {
  private readonly code = `import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScFrame,
  ScTree,
  ScTreeGroup,
  ScTreeGroupContent,
  ScTreeItem,
  ScTreeItemIndicator,
  ScTreeItemLabel,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

interface Setting {
  id: string;
  name: string;
  children?: Setting[];
}

const SETTINGS: Setting[] = [
  {
    id: 'account',
    name: 'Account',
    children: [
      { id: 'profile', name: 'Profile' },
      {
        id: 'security',
        name: 'Security',
        children: [
          { id: 'password', name: 'Password' },
          { id: 'two-factor', name: 'Two-factor' },
        ],
      },
    ],
  },
  {
    id: 'notifications',
    name: 'Notifications',
    children: [
      { id: 'email', name: 'Email' },
      { id: 'push', name: 'Push' },
    ],
  },
  { id: 'billing', name: 'Billing' },
];

/** From code, through #tree="scTree": open every branch, close them all, or reveal one item — its ancestors opened, scrolled to and focused. */
@Component({
  selector: 'app-controller-tree-demo',
  imports: [
    NgTemplateOutlet,
    ScButton,
    ScFrame,
    ScTree,
    ScTreeGroup,
    ScTreeGroupContent,
    ScTreeItem,
    ScTreeItemIndicator,
    ScTreeItemLabel,
    SiChevronRightIcon,
  ],
  template: \`
    <div class="flex flex-col items-center gap-3">
      <div class="flex flex-wrap justify-center gap-2">
        <button scButton variant="outline" size="sm" (click)="tree.expandAll()">
          Expand all
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="tree.collapseAll()"
        >
          Collapse all
        </button>
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="findTwoFactor(tree)"
        >
          Find Two-factor
        </button>
      </div>
      <div scFrame class="w-64 p-2">
        <ul
          scTree
          #tree="scTree"
          aria-label="Settings"
          [(expanded)]="expanded"
        >
          <ng-container
            [ngTemplateOutlet]="branch"
            [ngTemplateOutletContext]="{ $implicit: settings }"
            ngTemplateOutletInjector="outlet"
          />
        </ul>
      </div>
    </div>

    <ng-template #branch let-settings>
      @for (setting of settings; track setting.id) {
        <li scTreeItem [value]="setting.id">
          <div scTreeItemLabel>
            <span scTreeItemIndicator><svg siChevronRightIcon></svg></span>
            {{ setting.name }}
          </div>
          @if (setting.children) {
            <ul scTreeGroup>
              <ng-template scTreeGroupContent>
                <ng-container
                  [ngTemplateOutlet]="branch"
                  [ngTemplateOutletContext]="{ $implicit: setting.children }"
                  ngTemplateOutletInjector="outlet"
                />
              </ng-template>
            </ul>
          }
        </li>
      }
    </ng-template>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ControllerTreeDemo {
  private readonly settings = SETTINGS;
  private readonly expanded = signal<string[]>([]);

  /** Its ancestors are in your data: opened, then revealed once rendered. */
  private findTwoFactor(tree: ScTree): void {
    this.expanded.update((open) => [
      ...new Set([...open, 'account', 'security']),
    ]);
    tree.reveal('two-factor');
  }
}`;
}
