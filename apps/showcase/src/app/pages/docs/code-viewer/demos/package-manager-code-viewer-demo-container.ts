import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PackageManagerCodeViewerDemo } from './package-manager-code-viewer-demo';

@Component({
  selector: 'app-package-manager-code-viewer-demo-container',
  imports: [DemoContainer, PackageManagerCodeViewerDemo],
  template: `
    <app-demo-container
      title="Package Manager"
      demoUrl="/demos/code-viewer/package-manager-code-viewer-demo"
      [code]="code"
    >
      <app-package-manager-code-viewer-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageManagerCodeViewerDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import {
  ScButton,
  ScCopyToClipboard,
  ScTab,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-package-manager-code-viewer-demo',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    ScTabs,
    ScTabList,
    ScTab,
    ScTabPanel,
  ],
  template: \`
    <div scTabs class="w-full max-w-lg">
      <div scCodeViewer>
        <div scCodeViewerHeader>
          <div scTabList [selectedTab]="'npm'" variant="line" class="h-auto">
            <button scTab value="npm">npm</button>
            <button scTab value="yarn">yarn</button>
            <button scTab value="pnpm">pnpm</button>
            <button scTab value="bun">bun</button>
          </div>
        </div>

        <div scTabPanel value="npm">
          <div scCodeViewerHeader class="border-t-0">
            <span scCodeViewerLabel>Terminal</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="npmCommand"
              #copyNpm="scCopyToClipboard"
              aria-label="Copy npm command"
            >
              @if (copyNpm.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="npmCommand"
            language="bash"
          ></div>
        </div>

        <div scTabPanel value="yarn">
          <div scCodeViewerHeader class="border-t-0">
            <span scCodeViewerLabel>Terminal</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="yarnCommand"
              #copyYarn="scCopyToClipboard"
              aria-label="Copy yarn command"
            >
              @if (copyYarn.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="yarnCommand"
            language="bash"
          ></div>
        </div>

        <div scTabPanel value="pnpm">
          <div scCodeViewerHeader class="border-t-0">
            <span scCodeViewerLabel>Terminal</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="pnpmCommand"
              #copyPnpm="scCopyToClipboard"
              aria-label="Copy pnpm command"
            >
              @if (copyPnpm.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="pnpmCommand"
            language="bash"
          ></div>
        </div>

        <div scTabPanel value="bun">
          <div scCodeViewerHeader class="border-t-0">
            <span scCodeViewerLabel>Terminal</span>
            <button
              scButton
              variant="ghost"
              size="icon"
              [scCopyToClipboard]="bunCommand"
              #copyBun="scCopyToClipboard"
              aria-label="Copy bun command"
            >
              @if (copyBun.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
            </button>
          </div>
          <div
            scCodeViewerContent
            [code]="bunCommand"
            language="bash"
          ></div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackageManagerCodeViewerDemo {
  readonly npmCommand = 'npm install @semantic-components/code shiki';
  readonly yarnCommand = 'yarn add @semantic-components/code shiki';
  readonly pnpmCommand = 'pnpm add @semantic-components/code shiki';
  readonly bunCommand = 'bun add @semantic-components/code shiki';
}`;
}
