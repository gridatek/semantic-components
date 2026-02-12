import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicVirtualListDemo } from './basic-virtual-list-demo';

@Component({
  selector: 'app-basic-virtual-list-demo-container',
  imports: [DemoContainer, BasicVirtualListDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/virtual-list/basic-virtual-list-demo"
      [code]="code"
    >
      <app-basic-virtual-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicVirtualListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScVirtualList, type VirtualListRange } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-virtual-list-demo',
  imports: [ScVirtualList],
  template: \`
    <div class="border rounded-lg overflow-hidden">
      <sc-virtual-list
        [items]="items()"
        [itemHeight]="48"
        height="300px"
        (rangeChange)="onRangeChange($event)"
      >
        <ng-template let-item let-index="index">
          <div
            class="flex items-center px-4 h-full border-b hover:bg-muted/50 transition-colors"
          >
            <span class="w-16 text-muted-foreground text-sm">
              {{ index + 1 }}
            </span>
            <span class="flex-1">{{ item }}</span>
          </div>
        </ng-template>
      </sc-virtual-list>
    </div>
    <p class="mt-2 text-sm text-muted-foreground">
      Rendering {{ items().length.toLocaleString() }} items. Visible range:
      {{ visibleRange().start }} - {{ visibleRange().end }}
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicVirtualListDemo {
  readonly visibleRange = signal<VirtualListRange>({ start: 0, end: 0 });

  readonly items = signal<string[]>(
    Array.from(
      { length: 10000 },
      (_, i) => \`Item \${i + 1} - Lorem ipsum dolor sit amet\`,
    ),
  );

  onRangeChange(range: VirtualListRange): void {
    this.visibleRange.set(range);
  }
}`;
}
