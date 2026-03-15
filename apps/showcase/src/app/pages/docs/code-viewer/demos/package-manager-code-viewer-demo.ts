import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
} from '@semantic-components/code';
import {
  ScButton,
  ScCopyToClipboard,
  ScTab,
  ScTabList,
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
        <div scCodeViewerContent [code]="command()" language="bash"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageManagerCodeViewerDemo {
  readonly selected = signal('pnpm');

  private readonly commands: Record<string, string> = {
    npm: 'npm install @semantic-components/code shiki',
    yarn: 'yarn add @semantic-components/code shiki',
    pnpm: 'pnpm add @semantic-components/code shiki',
    bun: 'bun add @semantic-components/code shiki',
  };

  readonly command = computed(() => this.commands[this.selected()]);
}
