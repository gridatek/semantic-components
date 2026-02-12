import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScNavigationMenuDemo } from './navigation-menu-demo';

@Component({
  selector: 'app-navigation-menu-demo-container',
  imports: [DemoContainer, ScNavigationMenuDemo],
  template: `
    <app-demo-container title="Navigation" [code]="code">
      <app-navigation-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuTrigger,
} from '@semantic-components/ui-lab';
import { SiSparklesIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navigation-menu-demo',
  imports: [
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuTrigger,
    SiSparklesIcon,
  ],
  template: \`
    <nav sc-navigation-menu>
      <ul sc-navigation-menu-list>
        <!-- Getting Started -->
        <li sc-navigation-menu-item>
          <button sc-navigation-menu-trigger>Getting Started</button>
          <div sc-navigation-menu-content>
            <ul
              class="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
            >
              <li class="row-span-3">
                <a
                  sc-navigation-menu-link
                  class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                  href="#"
                >
                  <svg si-sparkles-icon class="size-6"></svg>
                  <div class="mb-2 mt-4 text-lg font-medium">SC Components</div>
                  <p class="text-sm leading-tight text-muted-foreground">
                    Beautiful Angular components built with Tailwind CSS.
                  </p>
                </a>
              </li>
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">
                    Introduction
                  </div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    Re-usable components built using Angular and Tailwind CSS.
                  </p>
                </a>
              </li>
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">
                    Installation
                  </div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    How to install dependencies and structure your app.
                  </p>
                </a>
              </li>
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">Typography</div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    Styles for headings, paragraphs, lists, and more.
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <!-- Components -->
        <li sc-navigation-menu-item>
          <button sc-navigation-menu-trigger>Components</button>
          <div sc-navigation-menu-content>
            <ul
              class="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]"
            >
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">
                    Alert Dialog
                  </div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    A modal dialog that interrupts the user with important
                    content.
                  </p>
                </a>
              </li>
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">Hover Card</div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    For sighted users to preview content behind a link.
                  </p>
                </a>
              </li>
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">Progress</div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    Displays an indicator showing completion progress.
                  </p>
                </a>
              </li>
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">
                    Scroll Area
                  </div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    Visually or semantically separates content.
                  </p>
                </a>
              </li>
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">Tabs</div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    A set of layered sections of content.
                  </p>
                </a>
              </li>
              <li>
                <a sc-navigation-menu-link href="#">
                  <div class="text-sm font-medium leading-none">Tooltip</div>
                  <p
                    class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                  >
                    A popup that displays information on hover.
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </li>

        <!-- Simple Link -->
        <li sc-navigation-menu-item>
          <a sc-navigation-menu-link href="#">Documentation</a>
        </li>
      </ul>
    </nav>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuDemo {}`;
}
