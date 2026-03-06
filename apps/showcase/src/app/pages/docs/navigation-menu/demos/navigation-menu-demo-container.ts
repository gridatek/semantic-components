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
  host: { class: 'block w-full' },
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
  template: \`
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
                    class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                    href="#"
                  >
                    <svg siSparklesIcon class="size-6"></svg>
                    <div class="mt-4 mb-2 text-lg font-medium">
                      SC Components
                    </div>
                    <p class="text-muted-foreground text-sm leading-tight">
                      Beautiful Angular components built with Tailwind CSS.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">
                      Introduction
                    </div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                    >
                      Re-usable components built using Angular and Tailwind CSS.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">
                      Installation
                    </div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                    >
                      How to install dependencies and structure your app.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">
                      Typography
                    </div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
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
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">
                      Alert Dialog
                    </div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                    >
                      A modal dialog that interrupts the user with important
                      content.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">
                      Hover Card
                    </div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                    >
                      For sighted users to preview content behind a link.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">Progress</div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                    >
                      Displays an indicator showing completion progress.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">
                      Scroll Area
                    </div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                    >
                      Visually or semantically separates content.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">Tabs</div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                    >
                      A set of layered sections of content.
                    </p>
                  </a>
                </li>
                <li>
                  <a scNavigationMenuLink href="#">
                    <div class="text-sm leading-none font-medium">Tooltip</div>
                    <p
                      class="text-muted-foreground line-clamp-2 text-sm leading-snug"
                    >
                      A popup that displays information on hover.
                    </p>
                  </a>
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScNavigationMenuDemo {}`;
}
