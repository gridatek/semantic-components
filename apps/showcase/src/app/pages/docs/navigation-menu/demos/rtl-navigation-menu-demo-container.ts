import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlNavigationMenuDemo } from './rtl-navigation-menu-demo';

@Component({
  selector: 'app-rtl-navigation-menu-demo-container',
  imports: [DemoContainer, RtlNavigationMenuDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/navigation-menu/rtl-navigation-menu-demo"
      [code]="code"
    >
      <app-rtl-navigation-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNavigationMenuDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
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
  SiCircleAlertIcon,
  SiCircleCheckIcon,
  SiCircleDashedIcon,
} from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the items from the right, ← and → mirrored, the panels lined up at their trigger's start (its right). */
@Component({
  selector: 'app-rtl-navigation-menu-demo',
  imports: [
    Dir,
    RouterLink,
    RouterLinkActive,
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
  template: \`
    <div dir="rtl" lang="ar" class="flex justify-center">
      <nav scNavigationMenu aria-label="الرئيسية">
        <ul scNavigationMenuList>
          <li scNavigationMenuItem value="getting-started">
            <button scNavigationMenuTrigger>
              البداية
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
              المكونات
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
              مع أيقونة
              <svg siChevronDownIcon scNavigationMenuTriggerIcon></svg>
            </button>
            <div scNavigationMenuContent>
              <ul class="grid w-[200px]">
                <li>
                  <a scNavigationMenuLink routerLink="." fragment="backlog">
                    <svg siCircleAlertIcon></svg>
                    قائمة الانتظار
                  </a>
                  <a scNavigationMenuLink routerLink="." fragment="to-do">
                    <svg siCircleDashedIcon></svg>
                    للقيام
                  </a>
                  <a scNavigationMenuLink routerLink="." fragment="done">
                    <svg siCircleCheckIcon></svg>
                    منجز
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
              التوثيق
            </a>
          </li>
        </ul>
      </nav>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNavigationMenuDemo {
  readonly gettingStarted = [
    {
      link: '/docs/getting-started/introduction',
      title: 'مقدمة',
      text: 'مكونات Angular سهلة الوصول، منسقة بـ Tailwind.',
    },
    {
      link: '/docs/getting-started/prerequisites',
      title: 'التثبيت',
      text: 'كيف تثبت المتطلبات وتنظم تطبيقك.',
    },
    {
      link: '/docs/components/typography',
      title: 'الطباعة',
      text: 'أنماط العناوين والفقرات والقوائم…',
    },
  ];

  readonly components = [
    {
      link: '/docs/components/alert-dialog',
      title: 'حوار التنبيه',
      text: 'حوار يقاطع بمحتوى مهم وينتظر ردًا.',
    },
    {
      link: '/docs/components/preview-card',
      title: 'بطاقة المعاينة',
      text: 'معاينة المحتوى خلف رابط.',
    },
    {
      link: '/docs/components/progress',
      title: 'التقدم',
      text: 'مدى تقدم مهمة، كشريط.',
    },
    {
      link: '/docs/components/scroll-area',
      title: 'منطقة التمرير',
      text: 'تمرير بالشكل نفسه في كل متصفح.',
    },
    {
      link: '/docs/components/tabs',
      title: 'علامات التبويب',
      text: 'أقسام من المحتوى، يظهر واحد منها في كل مرة.',
    },
    {
      link: '/docs/components/tooltip',
      title: 'تلميح',
      text: 'تلميح قصير عند التمرير أو التركيز.',
    },
  ];
}`;
}
