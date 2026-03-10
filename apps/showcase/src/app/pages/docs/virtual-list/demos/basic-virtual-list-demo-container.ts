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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicVirtualListDemoContainer {
  readonly code = `import {
  CdkFixedSizeVirtualScroll,
  CdkVirtualForOf,
  CdkVirtualScrollViewport,
} from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-basic-virtual-list-demo',
  imports: [
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  template: \`
    <cdk-virtual-scroll-viewport
      itemSize="48"
      class="h-[300px] rounded-lg border"
    >
      <div
        *cdkVirtualFor="let item of items(); let i = index"
        class="hover:bg-muted/50 flex h-12 items-center border-b px-4 transition-colors"
      >
        <span class="text-muted-foreground w-16 text-sm">{{ i + 1 }}</span>
        <span class="flex-1">{{ item }}</span>
      </div>
    </cdk-virtual-scroll-viewport>
    <p class="text-muted-foreground mt-2 text-sm">
      Rendering {{ items().length.toLocaleString() }} items
    </p>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicVirtualListDemo {
  readonly items = signal<string[]>(
    Array.from(
      { length: 10000 },
      (_, i) => \`Item \${i + 1} - Lorem ipsum dolor sit amet\`,
    ),
  );
}`;
}
