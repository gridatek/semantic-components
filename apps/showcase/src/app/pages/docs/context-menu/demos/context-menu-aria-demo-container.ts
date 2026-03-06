import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ContextMenuAriaDemo } from './context-menu-aria-demo';

@Component({
  selector: 'app-context-menu-aria-demo-container',
  imports: [DemoContainer, ContextMenuAriaDemo],
  template: `
    <app-demo-container
      title="Angular Aria"
      [code]="code"
      demoUrl="/demos/context-menu/context-menu-aria-demo"
    >
      <app-context-menu-aria-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuAriaDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import { Menu, MenuContent, MenuItem } from '@angular/aria/menu';

@Component({
  selector: 'app-context-menu-aria-demo',
  imports: [Menu, MenuContent, MenuItem],
  template: \`
    <div
      class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      (contextmenu)="open($event)"
    >
      Right click here
    </div>

    <div
      ng-menu
      class="bg-popover text-popover-foreground fixed z-50 min-w-32 w-60 rounded-lg p-1 shadow-md ring-1 ring-foreground/10 invisible"
      (focusout)="close($event)"
    >
      <ng-template ngMenuContent>
        <div ng-menu-item value="Back" class="...">
          <span class="flex-1">Back</span>
          <span class="ml-auto text-xs text-muted-foreground">⌘[</span>
        </div>
        <div ng-menu-item value="Reload" class="...">
          <span class="flex-1">Reload</span>
          <span class="ml-auto text-xs text-muted-foreground">⌘R</span>
        </div>
        ...
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuAriaDemo {
  private readonly menu = viewChild.required(Menu);

  open(event: MouseEvent) {
    event.preventDefault();
    const menu = this.menu();
    menu._pattern.closeAll();
    menu.element.style.visibility = 'visible';
    menu.element.style.top = \\\`\\\${event.clientY}px\\\`;
    menu.element.style.left = \\\`\\\${event.clientX}px\\\`;
    setTimeout(() => menu._pattern.first());
  }

  close(event: FocusEvent) {
    const menu = this.menu();
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (!menu.element.contains(relatedTarget)) {
      menu.close();
      menu.element.style.visibility = 'hidden';
    }
  }
}`;
}
