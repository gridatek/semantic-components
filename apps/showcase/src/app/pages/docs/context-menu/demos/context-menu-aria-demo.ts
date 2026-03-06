import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  viewChild,
} from '@angular/core';
import {
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-context-menu-aria-demo',
  imports: [ScMenu, ScMenuContent, ScMenuItem, ScMenuSeparator],
  template: `
    <div
      class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      (contextmenu)="open($event)"
    >
      Right click here
    </div>

    <div scMenu class="invisible fixed" (focusout)="close($event)">
      <ng-template scMenuContent>
        <div scMenuItem value="Back">
          <span class="flex-1">Back</span>
          <span class="text-muted-foreground ml-auto text-xs">⌘[</span>
        </div>
        <div scMenuItem value="Forward" [disabled]="true">
          <span class="flex-1">Forward</span>
          <span class="text-muted-foreground ml-auto text-xs">⌘]</span>
        </div>
        <div scMenuItem value="Reload">
          <span class="flex-1">Reload</span>
          <span class="text-muted-foreground ml-auto text-xs">⌘R</span>
        </div>

        <div scMenuSeparator></div>

        <div scMenuItem value="Save Page As">
          <span class="flex-1">Save Page As...</span>
          <span class="text-muted-foreground ml-auto text-xs">⇧⌘S</span>
        </div>
        <div scMenuItem value="Create Shortcut">
          <span class="flex-1">Create Shortcut...</span>
        </div>
        <div scMenuItem value="Name Window">
          <span class="flex-1">Name Window...</span>
        </div>

        <div scMenuSeparator></div>

        <div scMenuItem value="Show Bookmarks Bar">
          <span class="flex-1">Show Bookmarks Bar</span>
          <span class="text-muted-foreground ml-auto text-xs">⇧⌘B</span>
        </div>
        <div scMenuItem value="Show Full URLs">
          <span class="flex-1">Show Full URLs</span>
        </div>
      </ng-template>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuAriaDemo {
  private readonly scMenu = viewChild.required(ScMenu);

  open(event: MouseEvent) {
    event.preventDefault();
    const menu = this.scMenu().menu;
    menu._pattern.closeAll();
    menu.element.style.visibility = 'visible';
    menu.element.style.top = `${event.clientY}px`;
    menu.element.style.left = `${event.clientX}px`;
    setTimeout(() => menu._pattern.first());
  }

  close(event: FocusEvent) {
    const menu = this.scMenu().menu;
    const relatedTarget = event.relatedTarget as HTMLElement | null;
    if (!menu.element.contains(relatedTarget)) {
      menu.close();
      menu.element.style.visibility = 'hidden';
    }
  }
}
