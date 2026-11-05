import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { StandaloneMenuDemo } from './standalone-menu-demo';

@Component({
  selector: 'app-standalone-menu-demo-container',
  imports: [DemoContainer, StandaloneMenuDemo],
  template: `
    <app-demo-container
      title="Standalone"
      demoUrl="/demos/menu/standalone-menu-demo"
      [code]="code"
    >
      <app-standalone-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class StandaloneMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
} from '@semantic-components/ui';
import {
  SiChevronRightIcon,
  SiClipboardPasteIcon,
  SiCopyIcon,
  SiScissorsIcon,
  SiShareIcon,
  SiTrashIcon,
} from '@semantic-icons/lucide-icons';

/**
 * A menu shown on the page, with no trigger: one tab stop, the arrows inside,
 * a submenu beside it.
 * Its name is yours (aria-label); itemSelected gives the chosen item's value.
 */
@Component({
  selector: 'app-standalone-menu-demo',
  imports: [
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    SiChevronRightIcon,
    SiClipboardPasteIcon,
    SiCopyIcon,
    SiScissorsIcon,
    SiShareIcon,
    SiTrashIcon,
  ],
  template: \`
    <div class="flex flex-col items-center gap-4">
      <div
        scMenu
        aria-label="Edit"
        class="w-48"
        (itemSelected)="chosen.set($event)"
      >
        <ng-template scMenuContent>
          <div scMenuItem value="Cut">
            <svg siScissorsIcon></svg>
            Cut
          </div>
          <div scMenuItem value="Copy">
            <svg siCopyIcon></svg>
            Copy
          </div>
          <div scMenuItem value="Paste">
            <svg siClipboardPasteIcon></svg>
            Paste
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Share">
            <svg siShareIcon></svg>
            Share
            <svg siChevronRightIcon></svg>
            <ng-template scMenuPortal>
              <div scMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="Email">Email</div>
                  <div scMenuItem value="Message">Message</div>
                  <div scMenuItem value="Copy link">Copy link</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
          <div scMenuSeparator></div>
          <div scMenuItem value="Delete" variant="destructive">
            <svg siTrashIcon></svg>
            Delete
          </div>
        </ng-template>
      </div>
      <p class="bg-muted w-48 rounded-md p-4 text-sm">
        Chosen: {{ chosen() ?? 'nothing yet' }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class StandaloneMenuDemo {
  protected readonly chosen = signal<string | null>(null);
}`;
}
