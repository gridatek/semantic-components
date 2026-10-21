import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDock,
  ScDockIndicator,
  ScDockItem,
  ScDockLabel,
} from '@semantic-components/ui-lab';
import {
  SiCalendarIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** Links in a nav: the current page marked (aria-current), its dot shown. */
@Component({
  selector: 'app-navigation-dock-demo',
  imports: [
    ScDock,
    ScDockItem,
    ScDockLabel,
    ScDockIndicator,
    SiHouseIcon,
    SiInboxIcon,
    SiCalendarIcon,
    SiSettingsIcon,
  ],
  template: `
    <nav scDock aria-label="Sections">
      @for (page of pages; track page.id) {
        <a
          scDockItem
          [href]="'#' + page.id"
          [attr.aria-current]="page.id === current() ? 'page' : null"
          (click)="go($event, page.id)"
        >
          @switch (page.id) {
            @case ('home') {
              <svg siHouseIcon></svg>
            }
            @case ('inbox') {
              <svg siInboxIcon></svg>
            }
            @case ('calendar') {
              <svg siCalendarIcon></svg>
            }
            @case ('settings') {
              <svg siSettingsIcon></svg>
            }
          }
          <span scDockLabel>{{ page.name }}</span>
          @if (page.id === current()) {
            <span scDockIndicator></span>
          }
        </a>
      }
    </nav>
    <p class="text-muted-foreground text-sm">Current: {{ current() }}</p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationDockDemo {
  readonly pages = [
    { id: 'home', name: 'Home' },
    { id: 'inbox', name: 'Inbox' },
    { id: 'calendar', name: 'Calendar' },
    { id: 'settings', name: 'Settings' },
  ];
  readonly current = signal('home');

  go(event: Event, id: string): void {
    event.preventDefault();
    this.current.set(id);
  }
}
