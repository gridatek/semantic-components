import { Component, ViewEncapsulation, signal } from '@angular/core';
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
  selector: 'app-rtl-navigation-menu-demo',
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
  template: `
    <div dir="rtl" lang="ar" class="flex justify-center">
      <nav scNavigationMenu aria-label="الرئيسية">
        <ul scNavigationMenuList>
          <li scNavigationMenuItem value="getting-started">
            <button scNavigationMenuTrigger>
              البداية
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
                      >المكونات الدلالية</span
                    >
                    <span class="text-muted-foreground text-sm leading-tight">
                      مكونات Angular سهلة الوصول.
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
              المكونات
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
              التوثيق
            </a>
          </li>
        </ul>
      </nav>
    </div>
  `,
  host: { class: 'flex w-full justify-center p-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlNavigationMenuDemo {
  readonly guides = [
    { title: 'مقدمة', text: 'مكونات تستوردها وتستخدمها مباشرة.' },
    { title: 'التثبيت', text: 'كيف تثبت المكتبة وتضبط مظهرها.' },
    { title: 'الطباعة', text: 'أنماط العناوين والفقرات والقوائم.' },
  ];
  readonly components = [
    { title: 'نافذة تنبيه', text: 'نافذة تقاطعك بمحتوى مهم.' },
    { title: 'بطاقة معاينة', text: 'معاينة لما وراء الرابط.' },
    { title: 'التقدم', text: 'إلى أين وصلت المهمة.' },
    { title: 'التبويبات', text: 'أقسام من المحتوى، واحد في كل مرة.' },
  ];
  readonly docs = signal(false);
}
