import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CustomHeightVirtualListDemo } from './custom-height-virtual-list-demo';

@Component({
  selector: 'app-custom-height-virtual-list-demo-container',
  imports: [DemoContainer, CustomHeightVirtualListDemo],
  template: `
    <app-demo-container
      title="Custom Height"
      demoUrl="/demos/virtual-list/custom-height-virtual-list-demo"
      [code]="code"
    >
      <app-custom-height-virtual-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomHeightVirtualListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScVirtualList } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-height-virtual-list-demo',
  imports: [ScVirtualList],
  template: \`
    <div class="overflow-hidden rounded-lg border">
      <sc-virtual-list [items]="items()" [itemHeight]="36" height="200px">
        <ng-template let-item let-index="index">
          <div
            class="hover:bg-muted/50 flex h-full items-center border-b px-4 text-sm transition-colors"
          >
            <span class="text-muted-foreground w-12">{{ index + 1 }}</span>
            <span class="flex-1">{{ item }}</span>
          </div>
        </ng-template>
      </sc-virtual-list>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomHeightVirtualListDemo {
  readonly items = signal<string[]>(
    Array.from(
      { length: 500 },
      (_, i) => \`Item \${i + 1} - Lorem ipsum dolor sit amet\`,
    ),
  );
}`;
}
