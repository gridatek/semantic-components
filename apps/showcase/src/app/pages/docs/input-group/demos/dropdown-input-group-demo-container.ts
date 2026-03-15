import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DropdownInputGroupDemo } from './dropdown-input-group-demo';

@Component({
  selector: 'app-dropdown-input-group-demo-container',
  imports: [DemoContainer, DropdownInputGroupDemo],
  template: `
    <app-demo-container
      title="Dropdown"
      demoUrl="/demos/input-group/dropdown-input-group-demo"
      [code]="code"
    >
      <app-dropdown-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownInputGroupDemoContainer {
  readonly code = `import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-dropdown-input-group-demo',
  imports: [
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScButton,
    ScMenuProvider,
    ScMenuTrigger,
    ScMenuPortal,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    SiEllipsisIcon,
    SiChevronDownIcon,
    CdkOverlayOrigin,
  ],
  template: \`
    <div class="grid w-full max-w-sm gap-4">
      <div scInputGroup cdkOverlayOrigin #group1="cdkOverlayOrigin">
        <input scInput placeholder="Enter file name" />
        <div scInputGroupAddon align="inline-end">
          <div scMenuProvider align="end" [origin]="group1">
            <button
              scButton
              scMenuTrigger
              variant="ghost"
              size="icon-xs"
              aria-label="More"
            >
              <svg siEllipsisIcon></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="Settings">Settings</div>
                  <div scMenuItem value="Copy path">Copy path</div>
                  <div scMenuItem value="Open location">Open location</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scInputGroup cdkOverlayOrigin #group2="cdkOverlayOrigin">
        <input scInput placeholder="Enter search query" />
        <div scInputGroupAddon align="inline-end">
          <div scMenuProvider align="end" [origin]="group2">
            <button
              scButton
              scMenuTrigger
              variant="ghost"
              size="xs"
              class="pr-1.5! text-xs"
            >
              Search In...
              <svg siChevronDownIcon class="size-3"></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu>
                <ng-template scMenuContent>
                  <div scMenuItem value="Documentation">Documentation</div>
                  <div scMenuItem value="Blog Posts">Blog Posts</div>
                  <div scMenuItem value="Changelog">Changelog</div>
                </ng-template>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownInputGroupDemo {}`;
}
