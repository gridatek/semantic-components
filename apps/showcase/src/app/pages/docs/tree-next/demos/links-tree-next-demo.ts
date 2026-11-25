import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScTreeNext,
  ScTreeNextGroup,
  ScTreeNextGroupContent,
  ScTreeNextItem,
  ScTreeNextItemIndicator,
  ScTreeNextItemLabel,
} from '@semantic-components/ui';
import { SiChevronRightIcon } from '@semantic-icons/lucide-icons';

interface Page {
  id: string;
  title: string;
  children?: Page[];
}

const PAGES: Page[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    children: [
      { id: 'introduction', title: 'Introduction' },
      { id: 'installation', title: 'Installation' },
    ],
  },
  {
    id: 'components',
    title: 'Components',
    children: [
      { id: 'button', title: 'Button' },
      { id: 'card', title: 'Card' },
      { id: 'dialog', title: 'Dialog' },
    ],
  },
  {
    id: 'guides',
    title: 'Guides',
    children: [
      { id: 'theming', title: 'Theming' },
      { id: 'dark-mode', title: 'Dark mode' },
    ],
  },
];

/** A docs sidebar: its pages are links, the one shown is current (aria-current="page"). Enter or a click follows a link — here, they change the page shown. */
@Component({
  selector: 'app-links-tree-next-demo',
  imports: [
    NgTemplateOutlet,
    ScFrame,
    ScTreeNext,
    ScTreeNextGroup,
    ScTreeNextGroupContent,
    ScTreeNextItem,
    ScTreeNextItemIndicator,
    ScTreeNextItemLabel,
    SiChevronRightIcon,
  ],
  template: `
    <div class="flex flex-col items-center gap-3">
      <nav aria-label="Docs" scFrame class="w-64 p-2">
        <ul
          scTreeNext
          aria-label="Docs pages"
          mode="none"
          [current]="current()"
          [(expanded)]="expanded"
        >
          <ng-container
            [ngTemplateOutlet]="branch"
            [ngTemplateOutletContext]="{ $implicit: pages }"
            ngTemplateOutletInjector="outlet"
          />
        </ul>
      </nav>
      <p class="text-muted-foreground text-sm" aria-live="polite">
        Showing: {{ current() }}
      </p>
    </div>

    <ng-template #branch let-pages>
      @for (page of pages; track page.id) {
        <li scTreeNextItem [value]="page.id">
          @if (page.children) {
            <div scTreeNextItemLabel>
              <span scTreeNextItemIndicator>
                <svg siChevronRightIcon></svg>
              </span>
              {{ page.title }}
            </div>
            <ul scTreeNextGroup>
              <ng-template scTreeNextGroupContent>
                <ng-container
                  [ngTemplateOutlet]="branch"
                  [ngTemplateOutletContext]="{ $implicit: page.children }"
                  ngTemplateOutletInjector="outlet"
                />
              </ng-template>
            </ul>
          } @else {
            <a
              scTreeNextItemLabel
              [href]="'#' + page.id"
              (click)="show($event, page.id)"
            >
              <span scTreeNextItemIndicator>
                <svg siChevronRightIcon></svg>
              </span>
              {{ page.title }}
            </a>
          }
        </li>
      }
    </ng-template>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LinksTreeNextDemo {
  private readonly pages = PAGES;
  private readonly current = signal('installation');
  private readonly expanded = signal(['getting-started']);

  /** Your router would navigate; the demo shows the page in place. */
  private show(event: Event, id: string): void {
    event.preventDefault();
    this.current.set(id);
  }
}
