import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSidebar,
  ScSidebarBody,
  ScSidebarGroup,
  ScSidebarGroupContent,
  ScSidebarGroupLabel,
  ScSidebarInset,
  ScSidebarMenu,
  ScSidebarMenuButton,
  ScSidebarMenuItem,
  ScSidebarProvider,
  ScSidebarTrigger,
} from '@semantic-components/ui';
import { SiPanelRightIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-floating-sidebar-demo',
  imports: [
    ScSidebar,
    ScSidebarBody,
    ScSidebarGroup,
    ScSidebarGroupContent,
    ScSidebarGroupLabel,
    ScSidebarInset,
    ScSidebarMenu,
    ScSidebarMenuButton,
    ScSidebarMenuItem,
    ScSidebarProvider,
    ScSidebarTrigger,
    SiPanelRightIcon,
  ],
  template: `
    <div scSidebarProvider [cookie]="null">
      <main scSidebarInset aria-label="Floating example content">
        <header class="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <h2 class="text-sm font-medium">Floating, on the right</h2>
          <button scSidebarTrigger class="ms-auto">
            <svg siPanelRightIcon></svg>
            <span class="sr-only">Toggle table of contents</span>
          </button>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <div class="bg-muted/50 min-h-64 flex-1 rounded-xl"></div>
        </div>
      </main>

      <div scSidebar side="right" variant="floating" aria-label="On this page">
        <div scSidebarBody>
          <div scSidebarGroup>
            <div scSidebarGroupLabel>On this page</div>
            <div scSidebarGroupContent>
              <ul scSidebarMenu>
                @for (section of sections; track section) {
                  <li scSidebarMenuItem>
                    <a scSidebarMenuButton href="#">
                      <span>{{ section }}</span>
                    </a>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class FloatingSidebarDemo {
  readonly sections = ['Overview', 'Installation', 'Usage', 'API Reference'];
}
