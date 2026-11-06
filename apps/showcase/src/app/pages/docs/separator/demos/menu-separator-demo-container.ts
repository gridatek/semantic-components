import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { MenuSeparatorDemo } from './menu-separator-demo';

@Component({
  selector: 'app-menu-separator-demo-container',
  imports: [DemoContainer, MenuSeparatorDemo],
  template: `
    <app-demo-container
      title="Menu"
      demoUrl="/demos/separator/menu-separator-demo"
      [code]="code"
    >
      <app-menu-separator-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuSeparatorDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';

/** Vertical lines between columns; the last column and its line only from md up. */
@Component({
  selector: 'app-menu-separator-demo',
  imports: [ScSeparator],
  template: \`
    <div class="flex items-center gap-2 text-sm md:gap-4">
      <div class="flex flex-col gap-1">
        <span class="font-medium">Settings</span>
        <span class="text-muted-foreground text-xs">Manage preferences</span>
      </div>
      <div scSeparator orientation="vertical"></div>
      <div class="flex flex-col gap-1">
        <span class="font-medium">Account</span>
        <span class="text-muted-foreground text-xs"
          >Profile &amp; security</span
        >
      </div>
      <div scSeparator orientation="vertical" class="hidden md:block"></div>
      <div class="hidden flex-col gap-1 md:flex">
        <span class="font-medium">Help</span>
        <span class="text-muted-foreground text-xs">Support &amp; docs</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MenuSeparatorDemo {}`;
}
