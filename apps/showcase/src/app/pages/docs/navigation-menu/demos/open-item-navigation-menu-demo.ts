import { Component, ViewEncapsulation, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  ScButton,
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuTrigger,
  ScNavigationMenuTriggerIcon,
} from '@semantic-components/ui';
import {
  SiChevronDownIcon,
  SiCircleAlertIcon,
  SiCircleCheckIcon,
  SiCircleDashedIcon,
} from '@semantic-icons/lucide-icons';

/** The open item both ways, [(value)]: its value, or null. */
@Component({
  selector: 'app-open-item-navigation-menu-demo',
  imports: [
    RouterLink,
    RouterLinkActive,
    ScButton,
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    ScNavigationMenuTriggerIcon,
    SiChevronDownIcon,
    SiCircleAlertIcon,
    SiCircleCheckIcon,
    SiCircleDashedIcon,
  ],
  template: `
    <div class="flex flex-col items-center gap-4">
      <div class="flex items-center gap-2">
        <button
          scButton
          variant="outline"
          size="sm"
          (click)="open.set('components')"
        >
          Open Components
        </button>
        <button scButton variant="outline" size="sm" (click)="open.set(null)">
          Close
        </button>
        <p class="text-muted-foreground text-sm">
          Open: {{ open() ?? 'none' }}
        </p>
      </div>
      <nav
        scNavigationMenu
        aria-label="Main, with its open item"
        [(value)]="open"
      >
        <ul scNavigationMenuList>
          <li scNavigationMenuItem value="getting-started">
            <button scNavigationMenuTrigger>
              Getting started
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <div scNavigationMenuContent>
              <ul class="w-96">
                @for (page of gettingStarted; track page.link) {
                  <li>
                    <a scNavigationMenuLink [routerLink]="page.link">
                      <div class="flex flex-col gap-1 text-sm">
                        <div class="leading-none font-medium">
                          {{ page.title }}
                        </div>
                        <div class="text-muted-foreground line-clamp-2">
                          {{ page.text }}
                        </div>
                      </div>
                    </a>
                  </li>
                }
              </ul>
            </div>
          </li>
          <li scNavigationMenuItem value="components" class="hidden md:flex">
            <button scNavigationMenuTrigger>
              Components
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <div scNavigationMenuContent>
              <ul
                class="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
              >
                @for (component of components; track component.link) {
                  <li>
                    <a scNavigationMenuLink [routerLink]="component.link">
                      <div class="flex flex-col gap-1 text-sm">
                        <div class="leading-none font-medium">
                          {{ component.title }}
                        </div>
                        <div class="text-muted-foreground line-clamp-2">
                          {{ component.text }}
                        </div>
                      </div>
                    </a>
                  </li>
                }
              </ul>
            </div>
          </li>
          <li scNavigationMenuItem value="with-icon">
            <button scNavigationMenuTrigger>
              With Icon
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <div scNavigationMenuContent>
              <ul class="grid w-[200px]">
                <li>
                  <a scNavigationMenuLink routerLink="." fragment="backlog">
                    <svg siCircleAlertIcon></svg>
                    Backlog
                  </a>
                  <a scNavigationMenuLink routerLink="." fragment="to-do">
                    <svg siCircleDashedIcon></svg>
                    To Do
                  </a>
                  <a scNavigationMenuLink routerLink="." fragment="done">
                    <svg siCircleCheckIcon></svg>
                    Done
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li scNavigationMenuItem>
            <a
              scNavigationMenuLink
              routerLink="/docs/getting-started"
              routerLinkActive
              #docs="routerLinkActive"
              [active]="docs.isActive"
            >
              Docs
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class OpenItemNavigationMenuDemo {
  readonly open = signal<string | null>(null);

  readonly gettingStarted = [
    {
      link: '/docs/getting-started/introduction',
      title: 'Introduction',
      text: 'Accessible Angular components, styled with Tailwind.',
    },
    {
      link: '/docs/getting-started/prerequisites',
      title: 'Installation',
      text: 'How to install dependencies and structure your app.',
    },
    {
      link: '/docs/components/typography',
      title: 'Typography',
      text: 'Styles for headings, paragraphs, lists…',
    },
  ];

  readonly components = [
    {
      link: '/docs/components/alert-dialog',
      title: 'Alert Dialog',
      text: 'A modal dialog that interrupts with important content and expects a response.',
    },
    {
      link: '/docs/components/preview-card',
      title: 'Preview Card',
      text: 'A preview of the content behind a link.',
    },
    {
      link: '/docs/components/progress',
      title: 'Progress',
      text: 'How far a task has gone, as a bar.',
    },
    {
      link: '/docs/components/scroll-area',
      title: 'Scroll Area',
      text: 'Scrolling, styled the same in every browser.',
    },
    {
      link: '/docs/components/tabs',
      title: 'Tabs',
      text: 'Layered sections of content, shown one at a time.',
    },
    {
      link: '/docs/components/tooltip',
      title: 'Tooltip',
      text: 'A short hint on hover or keyboard focus.',
    },
  ];
}
