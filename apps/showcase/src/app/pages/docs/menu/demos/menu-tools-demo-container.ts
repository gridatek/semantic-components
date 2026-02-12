import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MenuToolsDemo } from './menu-tools-demo';

@Component({
  selector: 'app-menu-tools-demo-container',
  imports: [DemoContainer, MenuToolsDemo],
  template: `
    <app-demo-container
      title="With Submenu"
      demoUrl="/demos/menu/menu-tools-demo"
      [code]="code"
    >
      <app-menu-tools-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuToolsDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMenu,
  ScMenuItem,
  ScMenuPortal,
  ScMenuSeparator,
  ScMenuSubProvider,
  ScMenuSub,
  ScMenuSubIcon,
  ScMenuSubPortal,
  ScMenuSubTrigger,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-menu-tools-demo',
  imports: [
    ScMenu,
    ScMenuItem,
    ScMenuPortal,
    ScMenuSeparator,
    ScMenuSubProvider,
    ScMenuSub,
    ScMenuSubIcon,
    ScMenuSubPortal,
    ScMenuSubTrigger,
    ScMenuProvider,
    ScMenuTrigger,
  ],
  template: \`
    <div sc-menu-provider>
      <button sc-menu-trigger>Options</button>
      <div sc-menu-portal>
        <div sc-menu class="w-56">
          <div sc-menu-item value="Back">
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            <span class="flex-1">Back</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘[
            </span>
          </div>
          <div sc-menu-item value="Forward" aria-disabled="true">
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="m12 5 7 7-7 7" />
              <path d="M5 12h14" />
            </svg>
            <span class="flex-1">Forward</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘]
            </span>
          </div>
          <div sc-menu-item value="Reload">
            <svg
              class="text-muted-foreground size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 16h5v5" />
            </svg>
            <span class="flex-1">Reload</span>
            <span class="ml-auto text-xs tracking-widest text-muted-foreground">
              ⌘R
            </span>
          </div>
          <div sc-menu-separator></div>
          <div sc-menu-sub-provider>
            <div sc-menu-sub-trigger value="More Tools">
              <svg
                class="text-muted-foreground size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                />
              </svg>
              <span class="flex-1">More Tools</span>
              <svg
                sc-menu-sub-icon
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
            <div sc-menu-sub-portal>
              <div sc-menu-sub>
                <div sc-menu-item value="Save Page As...">
                  <span class="flex-1">Save Page As...</span>
                  <span
                    class="ml-auto text-xs tracking-widest text-muted-foreground"
                  >
                    ⌘S
                  </span>
                </div>
                <div sc-menu-item value="Create Shortcut...">
                  <span class="flex-1">Create Shortcut...</span>
                </div>
                <div sc-menu-item value="Name Window...">
                  <span class="flex-1">Name Window...</span>
                </div>
                <div sc-menu-separator></div>
                <div sc-menu-item value="Developer Tools">
                  <span class="flex-1">Developer Tools</span>
                  <span
                    class="ml-auto text-xs tracking-widest text-muted-foreground"
                  >
                    ⌘⌥I
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div sc-menu-separator></div>
          <div sc-menu-item value="Show Full URLs">
            <span class="flex-1">Show Full URLs</span>
          </div>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuToolsDemo {}`;
}
