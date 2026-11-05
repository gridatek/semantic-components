import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DestructiveMenuDemo } from './destructive-menu-demo';

@Component({
  selector: 'app-destructive-menu-demo-container',
  imports: [DemoContainer, DestructiveMenuDemo],
  template: `
    <app-demo-container
      title="Destructive"
      demoUrl="/demos/menu/destructive-menu-demo"
      [code]="code"
    >
      <app-destructive-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiPencilIcon,
  SiShareIcon,
  SiTrashIcon,
} from '@semantic-icons/lucide-icons';

/** variant="destructive": in the destructive color, its icon too. */
@Component({
  selector: 'app-destructive-menu-demo',
  imports: [
    ScButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    SiPencilIcon,
    SiShareIcon,
    SiTrashIcon,
  ],
  template: \`
    <div scMenuProvider>
      <button scButton scMenuTrigger variant="outline">Open</button>
      <ng-template scMenuPortal>
        <div scMenu>
          <ng-template scMenuContent>
            <div scMenuItem value="Edit">
              <svg siPencilIcon></svg>
              Edit
            </div>
            <div scMenuItem value="Share">
              <svg siShareIcon></svg>
              Share
            </div>
            <div scMenuSeparator></div>
            <div scMenuItem value="Delete" variant="destructive">
              <svg siTrashIcon></svg>
              Delete
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveMenuDemo {}`;
}
