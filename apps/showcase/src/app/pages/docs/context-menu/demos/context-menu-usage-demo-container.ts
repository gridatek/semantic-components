import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { ContextMenuUsageDemo } from './context-menu-usage-demo';

@Component({
  selector: 'app-context-menu-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    ContextMenuUsageDemo,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code" language="angular-ts"></pre>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-context-menu-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ContextMenuUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScContextMenu,
  ScContextMenuProvider,
  ScContextMenuTrigger,
  ScMenu,
  ScMenuCheckboxItem,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItem,
  ScMenuItemIndicator,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuSeparator,
  ScMenuShortcut,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-context-menu-usage-demo',
  imports: [
    ScContextMenuProvider,
    ScContextMenuTrigger,
    ScContextMenu,
    ScMenu,
    ScMenuCheckboxItem,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItem,
    ScMenuItemIndicator,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuSeparator,
    ScMenuShortcut,
    SiCheckIcon,
    SiChevronRightIcon,
  ],
  template: \`
    <div scContextMenuProvider class="w-full max-w-xs">
      <div
        scContextMenuTrigger
        class="flex aspect-video w-full items-center justify-center rounded-xl border border-dashed text-sm"
      >
        <span class="hidden pointer-fine:inline-block">Right click here</span>
        <span class="hidden pointer-coarse:inline-block">Long press here</span>
      </div>
      <div scContextMenu>
        <div scMenu class="w-48">
          <ng-template scMenuContent>
            <div scMenuGroup>
              <div scMenuItem value="Back">
                Back
                <span scMenuShortcut>⌘[</span>
              </div>
              <div scMenuItem value="Forward" [disabled]="true">
                Forward
                <span scMenuShortcut>⌘]</span>
              </div>
              <div scMenuItem value="Reload">
                Reload
                <span scMenuShortcut>⌘R</span>
              </div>
              <div scMenuItem value="More Tools">
                More Tools
                <svg siChevronRightIcon></svg>
                <ng-template scMenuPortal>
                  <div scMenu class="w-44">
                    <ng-template scMenuContent>
                      <div scMenuGroup>
                        <div scMenuItem value="Save Page...">Save Page...</div>
                        <div scMenuItem value="Create Shortcut...">
                          Create Shortcut...
                        </div>
                        <div scMenuItem value="Name Window...">
                          Name Window...
                        </div>
                      </div>
                      <div scMenuSeparator></div>
                      <div scMenuGroup>
                        <div scMenuItem value="Developer Tools">
                          Developer Tools
                        </div>
                      </div>
                      <div scMenuSeparator></div>
                      <div scMenuGroup>
                        <div scMenuItem value="Delete" variant="destructive">
                          Delete
                        </div>
                      </div>
                    </ng-template>
                  </div>
                </ng-template>
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuCheckboxItem [(checked)]="bookmarks">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Show Bookmarks
              </div>
              <div scMenuCheckboxItem [(checked)]="fullUrls">
                <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                Show Full URLs
              </div>
            </div>
            <div scMenuSeparator></div>
            <div scMenuGroup>
              <div scMenuRadioGroup [(value)]="person">
                <div scMenuLabel>People</div>
                <div scMenuRadioItem value="pedro">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Pedro Duarte
                </div>
                <div scMenuRadioItem value="colm">
                  <span scMenuItemIndicator><svg siCheckIcon></svg></span>
                  Colm Tuite
                </div>
              </div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ContextMenuUsageDemo {
  protected readonly bookmarks = signal(true);
  protected readonly fullUrls = signal(false);
  protected readonly person = signal('pedro');
}`;
}
