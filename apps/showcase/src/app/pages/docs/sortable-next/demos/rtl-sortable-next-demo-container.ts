import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlSortableNextDemo } from './rtl-sortable-next-demo';

@Component({
  selector: 'app-rtl-sortable-next-demo-container',
  imports: [DemoContainer, RtlSortableNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/sortable-next/rtl-sortable-next-demo"
    >
      <app-rtl-sortable-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSortableNextDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';
import {
  ScSortableNext,
  type ScSortableNextAnnouncement,
  ScSortableNextItem,
} from '@semantic-components/ui';

interface Item {
  readonly id: string;
  readonly label: string;
}

/** In a right-to-left page: the row runs from the right, and ← → move a lifted item as the text reads. */
@Component({
  selector: 'app-rtl-sortable-next-demo',
  imports: [Dir, ScSortableNext, ScSortableNextItem],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full flex-col items-center gap-3">
      <p id="rtl-sortable-help" class="sr-only">
        المسافة ترفع عنصرًا، والأسهم ← → تحركه، والمسافة تضعه، وEscape يعيده.
      </p>
      <ul
        scSortableNext
        #list="scSortableNext"
        orientation="horizontal"
        [(value)]="items"
        [announce]="announce"
        aria-label="الخطوات"
        class="w-full max-w-xl"
      >
        @for (item of list.items(); track item.id) {
          <li
            [scSortableNextItem]="item"
            aria-describedby="rtl-sortable-help"
            class="shrink-0"
          >
            {{ item.label }}
          </li>
        }
      </ul>
      <p class="text-muted-foreground text-sm" data-testid="rtl-order">
        {{ joined() }}
      </p>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlSortableNextDemo {
  private readonly items = signal<Item[]>([
    { id: 's1', label: 'التخطيط' },
    { id: 's2', label: 'التصميم' },
    { id: 's3', label: 'البناء' },
    { id: 's4', label: 'الاختبار' },
    { id: 's5', label: 'الإطلاق' },
  ]);
  private readonly joined = computed(() =>
    this.items()
      .map((item) => item.label)
      .join('، '),
  );
  /** What a keyboard move says, step by step. */
  private readonly announce = ({
    type,
    item,
    position,
    count,
  }: ScSortableNextAnnouncement<Item>) =>
    ({
      lift: \`رُفع \${item.label}، \${position} من \${count}.\`,
      move: \`\${item.label}: \${position} من \${count}.\`,
      drop: \`وُضع \${item.label} في \${position} من \${count}.\`,
      cancel: \`عاد \${item.label} إلى \${position} من \${count}.\`,
    })[type];
}`;
}
