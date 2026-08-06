import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
} from '@semantic-components/code';
import {
  ScButton,
  ScCopyToClipboard,
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-package-manager-code-viewer-demo',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    SiTerminalIcon,
    ScTabs,
    ScTabList,
    ScTab,
    ScTabPanel,
    ScTabContent,
  ],
  template: `
    <div scTabs class="w-full max-w-lg">
      <div scCodeViewer>
        <div scCodeViewerHeader>
          <svg siTerminalIcon class="text-muted-foreground size-4"></svg>
          <div
            scTabList
            [selectedTab]="'pnpm'"
            (selectedTabChange)="$event && selected.set($event)"
            variant="line"
            class="h-auto"
          >
            <button scTab value="pnpm">pnpm</button>
            <button scTab value="npm">npm</button>
            <button scTab value="yarn">yarn</button>
            <button scTab value="bun">bun</button>
          </div>
          <button
            scButton
            variant="ghost"
            size="icon"
            class="ml-auto"
            [scCopyToClipboard]="command()"
            #copy="scCopyToClipboard"
            aria-label="Copy install command"
          >
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
          </button>
        </div>
        @for (entry of commands; track entry.id) {
          <div scTabPanel [value]="entry.id">
            <ng-template scTabContent>
              <div
                scCodeViewerContent
                [code]="entry.command"
                language="bash"
              ></div>
            </ng-template>
          </div>
        }
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PackageManagerCodeViewerDemo {
  readonly selected = signal('pnpm');

  protected readonly commands = [
    { id: 'pnpm', command: 'pnpm add @semantic-components/code shiki' },
    { id: 'npm', command: 'npm install @semantic-components/code shiki' },
    { id: 'yarn', command: 'yarn add @semantic-components/code shiki' },
    { id: 'bun', command: 'bun add @semantic-components/code shiki' },
  ];

  readonly command = computed(
    () =>
      this.commands.find((entry) => entry.id === this.selected())?.command ??
      '',
  );
}
