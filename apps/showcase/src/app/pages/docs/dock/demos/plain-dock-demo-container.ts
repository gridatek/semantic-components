import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PlainDockDemo } from './plain-dock-demo';

@Component({
  selector: 'app-plain-dock-demo-container',
  imports: [DemoContainer, PlainDockDemo],
  template: `
    <app-demo-container
      title="Plain"
      [code]="code"
      demoUrl="/demos/dock/plain-dock-demo"
    >
      <app-plain-dock-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PlainDockDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDock,
  ScDockBadge,
  ScDockIndicator,
  ScDockItem,
  ScDockLabel,
} from '@semantic-components/ui-lab';
import {
  SiCompassIcon,
  SiFolderIcon,
  SiImageIcon,
  SiMailIcon,
  SiMusicIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** Without magnification: magnification set to 1. Under reduced motion, the dock is always so. */
@Component({
  selector: 'app-plain-dock-demo',
  imports: [
    ScDock,
    ScDockItem,
    ScDockLabel,
    ScDockBadge,
    ScDockIndicator,
    SiFolderIcon,
    SiCompassIcon,
    SiMailIcon,
    SiImageIcon,
    SiMusicIcon,
    SiTerminalIcon,
  ],
  template: \`
    <div scDock [magnification]="1" role="toolbar" aria-label="Apps">
      @for (app of apps; track app.name) {
        <button scDockItem (click)="launched.set(app.name)">
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
          <span scDockLabel>{{ app.name }}</span>
          @if (app.badge) {
            <span scDockBadge
              >{{ app.badge }}<span class="sr-only"> unread</span></span
            >
          }
          @if (app.open) {
            <span scDockIndicator></span>
          }
        </button>
      }
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ launched() ? launched() + ' opened.' : 'Nothing opened yet.' }}
    </p>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class PlainDockDemo {
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
