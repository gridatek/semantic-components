import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NavigationDockNextDemo } from './navigation-dock-next-demo';

@Component({
  selector: 'app-navigation-dock-next-demo-container',
  imports: [DemoContainer, NavigationDockNextDemo],
  template: `
    <app-demo-container
      title="Navigation"
      [code]="code"
      demoUrl="/demos/dock-next/navigation-dock-next-demo"
    >
      <app-navigation-dock-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationDockNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDockNext,
  ScDockNextIndicator,
  ScDockNextItem,
  ScDockNextLabel,
} from '@semantic-components/ui-lab';
import {
  SiCalendarIcon,
  SiHouseIcon,
  SiInboxIcon,
  SiSettingsIcon,
} from '@semantic-icons/lucide-icons';

/** Links in a nav: the current page marked (aria-current), its dot shown. */
@Component({
  selector: 'app-navigation-dock-next-demo',
  imports: [
    ScDockNext,
    ScDockNextItem,
    ScDockNextLabel,
    ScDockNextIndicator,
    SiHouseIcon,
    SiInboxIcon,
    SiCalendarIcon,
    SiSettingsIcon,
  ],
  template: \`
    <nav scDockNext aria-label="Sections">
      @for (page of pages; track page.id) {
        <a
          scDockNextItem
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
          <span scDockNextLabel>{{ page.name }}</span>
          @if (page.id === current()) {
            <span scDockNextIndicator></span>
          }
        </a>
      }
    </nav>
    <p class="text-muted-foreground text-sm">Current: {{ current() }}</p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationDockNextDemo {
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
}`;
}
