import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VerticalDockNextDemo } from './vertical-dock-next-demo';

@Component({
  selector: 'app-vertical-dock-next-demo-container',
  imports: [DemoContainer, VerticalDockNextDemo],
  template: `
    <app-demo-container
      title="Vertical"
      [code]="code"
      demoUrl="/demos/dock-next/vertical-dock-next-demo"
    >
      <app-vertical-dock-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalDockNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDockNext,
  ScDockNextBadge,
  ScDockNextIndicator,
  ScDockNextItem,
  ScDockNextLabel,
} from '@semantic-components/ui-lab';
import {
  SiCompassIcon,
  SiFolderIcon,
  SiImageIcon,
  SiMailIcon,
  SiMusicIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** On a side: items grow outward, their labels beside them. */
@Component({
  selector: 'app-vertical-dock-next-demo',
  imports: [
    ScDockNext,
    ScDockNextItem,
    ScDockNextLabel,
    ScDockNextBadge,
    ScDockNextIndicator,
    SiFolderIcon,
    SiCompassIcon,
    SiMailIcon,
    SiImageIcon,
    SiMusicIcon,
    SiTerminalIcon,
  ],
  template: \`
    <div
      class="flex h-[28rem] w-full items-center rounded-lg border bg-gradient-to-r from-emerald-100 to-teal-200 p-4 dark:from-emerald-950 dark:to-teal-950"
    >
      <div scDockNext orientation="vertical" role="toolbar" aria-label="Apps">
        @for (app of apps; track app.name) {
          <button scDockNextItem (click)="launched.set(app.name)">
            @switch (app.icon) {
              @case ('folder') {
                <svg siFolderIcon></svg>
              }
              @case ('compass') {
                <svg siCompassIcon></svg>
              }
              @case ('mail') {
                <svg siMailIcon></svg>
              }
              @case ('image') {
                <svg siImageIcon></svg>
              }
              @case ('music') {
                <svg siMusicIcon></svg>
              }
              @case ('terminal') {
                <svg siTerminalIcon></svg>
              }
            }
            <span scDockNextLabel>{{ app.name }}</span>
            @if (app.badge) {
              <span scDockNextBadge
                >{{ app.badge }}<span class="sr-only"> unread</span></span
              >
            }
            @if (app.open) {
              <span scDockNextIndicator></span>
            }
          </button>
        }
      </div>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ launched() ? launched() + ' opened.' : 'Nothing opened yet.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class VerticalDockNextDemo {
  readonly apps = [
    { name: 'Finder', icon: 'folder', open: true },
    { name: 'Safari', icon: 'compass', open: true },
    { name: 'Mail', icon: 'mail', open: true, badge: 3 },
    { name: 'Photos', icon: 'image', open: false },
    { name: 'Music', icon: 'music', open: false },
    { name: 'Terminal', icon: 'terminal', open: false },
  ];
  readonly launched = signal('');
}`;
}
