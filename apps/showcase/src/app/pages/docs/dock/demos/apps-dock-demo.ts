import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScDock,
  ScDockBadge,
  ScDockIndicator,
  ScDockItem,
  ScDockLabel,
  ScDockSeparator,
} from '@semantic-components/ui-lab';
import {
  SiCompassIcon,
  SiFolderIcon,
  SiImageIcon,
  SiMailIcon,
  SiMusicIcon,
  SiTerminalIcon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

/** A launcher: the items near the pointer grow, their neighbours move aside. Dots for open apps, a count on Mail, a separator before the bin. From the keyboard, Tab: the focused item grows and shows its name. */
@Component({
  selector: 'app-apps-dock-demo',
  imports: [
    ScDock,
    ScDockItem,
    ScDockLabel,
    ScDockBadge,
    ScDockIndicator,
    ScDockSeparator,
    SiFolderIcon,
    SiCompassIcon,
    SiMailIcon,
    SiImageIcon,
    SiMusicIcon,
    SiTerminalIcon,
    SiTrash2Icon,
  ],
  template: `
    <div
      class="flex h-48 w-full items-end justify-center rounded-lg border bg-gradient-to-b from-sky-100 to-indigo-200 p-4 dark:from-sky-950 dark:to-indigo-950"
    >
      <div scDock role="toolbar" aria-label="Apps">
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
        <div scDockSeparator></div>
        <button scDockItem (click)="launched.set('Bin')">
          <svg siTrash2Icon></svg>
          <span scDockLabel>Bin</span>
        </button>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" aria-live="polite">
      {{ launched() ? launched() + ' opened.' : 'Nothing opened yet.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class AppsDockDemo {
  readonly apps = [
    { name: 'Finder', icon: 'folder', open: true },
    { name: 'Safari', icon: 'compass', open: true },
    { name: 'Mail', icon: 'mail', open: true, badge: 3 },
    { name: 'Photos', icon: 'image', open: false },
    { name: 'Music', icon: 'music', open: false },
    { name: 'Terminal', icon: 'terminal', open: false },
  ];
  readonly launched = signal('');
}
