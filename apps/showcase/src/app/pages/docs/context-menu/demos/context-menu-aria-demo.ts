import { Menu, MenuContent, MenuItem } from '@angular/aria/menu';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'app-context-menu-aria-demo',
  imports: [Menu, MenuContent, MenuItem],
  template: `
    <div
      class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      (contextmenu)="open($event)"
    >
      Right click here
    </div>

    <div
      ngMenu
      class="bg-popover text-popover-foreground ring-foreground/10 invisible fixed z-50 w-60 min-w-32 rounded-lg p-1 shadow-md ring-1"
      (focusout)="close($event)"
    >
      <ng-template ngMenuContent>
        <div
          ngMenuItem
          value="Back"
          class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none"
        >
          <span class="flex-1">Back</span>
          <span class="text-muted-foreground ml-auto text-xs">⌘[</span>
        </div>
        <div
          ngMenuItem
          value="Forward"
          [disabled]="true"
          class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm opacity-50 outline-hidden select-none"
        >
          <span class="flex-1">Forward</span>
          <span class="text-muted-foreground ml-auto text-xs">⌘]</span>
        </div>
        <div
          ngMenuItem
          value="Reload"
          class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none"
        >
          <span class="flex-1">Reload</span>
          <span class="text-muted-foreground ml-auto text-xs">⌘R</span>
        </div>

        <div
          role="separator"
          aria-orientation="horizontal"
          class="bg-border -mx-1 my-1 h-px"
        ></div>

        <div
          ngMenuItem
          value="Save Page As"
          class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none"
        >
          <span class="flex-1">Save Page As...</span>
          <span class="text-muted-foreground ml-auto text-xs">⇧⌘S</span>
        </div>
        <div
          ngMenuItem
          value="Create Shortcut"
          class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none"
        >
          <span class="flex-1">Create Shortcut...</span>
        </div>
        <div
          ngMenuItem
          value="Name Window"
          class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none"
        >
          <span class="flex-1">Name Window...</span>
        </div>

        <div
          role="separator"
          aria-orientation="horizontal"
          class="bg-border -mx-1 my-1 h-px"
        ></div>

        <div
          ngMenuItem
          value="Show Bookmarks Bar"
          class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none"
        >
          <span class="flex-1">Show Bookmarks Bar</span>
          <span class="text-muted-foreground ml-auto text-xs">⇧⌘B</span>
        </div>
        <div
          ngMenuItem
          value="Show Full URLs"
          class="data-[active=true]:bg-accent data-[active=true]:text-accent-foreground relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none"
        >
          <span class="flex-1">Show Full URLs</span>
        </div>
      </ng-template>
    </div>
  `,
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
    menu.element.style.top = `${event.clientY}px`;
    menu.element.style.left = `${event.clientX}px`;
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
}
