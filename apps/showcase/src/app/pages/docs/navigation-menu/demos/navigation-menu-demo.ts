import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScNavigationMenu,
  ScNavigationMenuContent,
  ScNavigationMenuGrid,
  ScNavigationMenuItem,
  ScNavigationMenuLink,
  ScNavigationMenuList,
  ScNavigationMenuPortal,
  ScNavigationMenuTrigger,
} from '@semantic-components/ui';
import { SiSparklesIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-navigation-menu-demo',
  imports: [
    ScNavigationMenu,
    ScNavigationMenuContent,
    ScNavigationMenuGrid,
    ScNavigationMenuItem,
    ScNavigationMenuLink,
    ScNavigationMenuList,
    ScNavigationMenuPortal,
    ScNavigationMenuTrigger,
    SiSparklesIcon,
  ],
  template: `
    <nav scNavigationMenu>
      <ul scNavigationMenuList>
        <!-- Getting Started -->
        <li scNavigationMenuItem>
          <button scNavigationMenuTrigger>Getting Started</button>
          <ng-template scNavigationMenuPortal>
            <div scNavigationMenuContent>
              <ul
                class="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
              >
                <li class="row-span-3">
                  <a
                    scNavigationMenuLink
                    class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="#"
                  >
                    <svg siSparklesIcon class="size-6"></svg>
                    <div class="mb-2 mt-4 text-lg font-medium">
                      SC Components
                    </div>
                    <p class="text-sm leading-tight text-muted-foreground">
                      Beautiful Angular components built with Tailwind CSS.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
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
                  <a scNavigationMenuLink href="#">
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
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm font-medium leading-none">
                      Typography
                    </div>
                    <p
                      class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                    >
                      Styles for headings, paragraphs, lists, and more.
                    </p>
                  </a>
                </li>
              </ul>
            </div>
          </ng-template>
        </li>

        <!-- Components -->
        <li scNavigationMenuItem>
          <button scNavigationMenuTrigger>Components</button>
          <ng-template scNavigationMenuPortal>
            <div scNavigationMenuContent>
              <ul scNavigationMenuGrid>
                <li>
                  <a scNavigationMenuLink href="#">Alert Dialog</a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">Hover Card</a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">Progress</a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">Scroll Area</a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">Tabs</a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">Tooltip</a>
                </li>
              </ul>
            </div>
          </ng-template>
        </li>

        <!-- Simple Link -->
        <li scNavigationMenuItem>
          <a scNavigationMenuLink href="#">Documentation</a>
        </li>
      </ul>
    </nav>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuDemo {}
