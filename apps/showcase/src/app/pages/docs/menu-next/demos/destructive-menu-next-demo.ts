import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScMenuNext,
  ScMenuNextContent,
  ScMenuNextItem,
  ScMenuNextPortal,
  ScMenuNextProvider,
  ScMenuNextSeparator,
  ScMenuNextTrigger,
} from '@semantic-components/ui';
import {
  SiPencilIcon,
  SiShareIcon,
  SiTrashIcon,
} from '@semantic-icons/lucide-icons';

/** variant="destructive": in the destructive color, its icon too. */
@Component({
  selector: 'app-destructive-menu-next-demo',
  imports: [
    ScButton,
    ScMenuNext,
    ScMenuNextContent,
    ScMenuNextItem,
    ScMenuNextPortal,
    ScMenuNextProvider,
    ScMenuNextSeparator,
    ScMenuNextTrigger,
    SiPencilIcon,
    SiShareIcon,
    SiTrashIcon,
  ],
  template: `
    <div scMenuNextProvider>
      <button scButton scMenuNextTrigger variant="outline">Open</button>
      <ng-template scMenuNextPortal>
        <div scMenuNext>
          <ng-template scMenuNextContent>
            <div scMenuNextItem value="Edit">
              <svg siPencilIcon></svg>
              Edit
            </div>
            <div scMenuNextItem value="Share">
              <svg siShareIcon></svg>
              Share
            </div>
            <div scMenuNextSeparator></div>
            <div scMenuNextItem value="Delete" variant="destructive">
              <svg siTrashIcon></svg>
              Delete
            </div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DestructiveMenuNextDemo {}
