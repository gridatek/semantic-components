import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';

@Component({
  selector: 'app-basic-navigation-menu-demo-container',
  imports: [DemoContainer],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/navigation-menu/basic-navigation-menu-demo"
      framed
      [frameHeight]="420"
      [code]="code"
    />
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicNavigationMenuDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
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
  SiSparklesIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-navigation-menu-demo',
  imports: [
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    ScNavigationMenuTriggerIcon,
    SiChevronDownIcon,
    SiSparklesIcon,
  ],
  template: \`
    <nav scNavigationMenu aria-label="Main">
      <ul scNavigationMenuList>
        <li scNavigationMenuItem value="getting-started">
          <button scNavigationMenuTrigger>
            Getting started
            <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
          </button>
          <div scNavigationMenuContent>
            <ul class="grid w-96 gap-1 md:w-[28rem] md:grid-cols-[.75fr_1fr]">
              <li class="row-span-3">
                <a
                  scNavigationMenuLink
                  href="#"
                  class="from-muted/50 to-muted h-full flex-col items-start justify-end bg-linear-to-b p-4"
                  (click)="$event.preventDefault()"
                >
                  <svg siSparklesIcon class="size-6"></svg>
                  <span class="mt-2 text-base font-medium"
                    >Semantic Components</span
                  >
                  <span class="text-muted-foreground text-sm leading-tight">
                    Accessible Angular components, styled with Tailwind.
                  </span>
                </a>
              </li>
              @for (page of guides; track page.title) {
                <li>
                  <a
                    scNavigationMenuLink
                    href="#"
                    class="flex-col items-start gap-1"
                    (click)="$event.preventDefault()"
                  >
                    <span class="font-medium">{{ page.title }}</span>
                    <span class="text-muted-foreground line-clamp-2">
                      {{ page.text }}
                    </span>
                  </a>
                </li>
              }
            </ul>
          </div>
        </li>
        <li scNavigationMenuItem value="components">
          <button scNavigationMenuTrigger>
            Components
            <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
          </button>
          <div scNavigationMenuContent>
            <ul class="grid w-96 gap-1 md:w-[32rem] md:grid-cols-2">
              @for (component of components; track component.title) {
                <li>
                  <a
                    scNavigationMenuLink
                    href="#"
                    class="flex-col items-start gap-1"
                    (click)="$event.preventDefault()"
                  >
                    <span class="font-medium">{{ component.title }}</span>
                    <span class="text-muted-foreground line-clamp-2">
                      {{ component.text }}
                    </span>
                  </a>
                </li>
              }
            </ul>
          </div>
        </li>
        <li scNavigationMenuItem>
          <a
            scNavigationMenuLink
            href="#"
            [active]="docs()"
            (click)="$event.preventDefault(); docs.set(true)"
          >
            Docs
          </a>
        </li>
      </ul>
    </nav>
  \`,
  host: { class: 'flex w-full justify-center p-4' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicNavigationMenuDemo {
  readonly guides = [
    {
      title: 'Introduction',
      text: 'Components you import and use as they are.',
    },
    {
      title: 'Installation',
      text: 'How to install the library and set up its theme.',
    },
    {
      title: 'Typography',
      text: 'Styles for headings, paragraphs, lists and more.',
    },
  ];
  readonly components = [
    {
      title: 'Alert Dialog',
      text: 'A modal dialog that interrupts with important content.',
    },
    { title: 'Hover Card', text: 'A preview of the content behind a link.' },
    { title: 'Progress', text: 'How far a task has gone.' },
    {
      title: 'Scroll Area',
      text: 'Scrolling, styled the same in every browser.',
    },
    { title: 'Tabs', text: 'Layered sections of content, one at a time.' },
    { title: 'Tooltip', text: 'A short hint on hover or focus.' },
  ];
  /** The page shown, in this demo: the Docs link marks it. */
  readonly docs = signal(false);
}`;
}
