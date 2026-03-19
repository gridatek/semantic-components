import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicMasonryGridDemo } from './basic-masonry-grid-demo';

@Component({
  selector: 'app-basic-masonry-grid-demo-container',
  imports: [DemoContainer, BasicMasonryGridDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-masonry-grid-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMasonryGridDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScMasonryGrid, ScMasonryItem } from '@semantic-components/ui-lab';

interface DemoItem {
  id: number;
  height: number;
  title: string;
}

@Component({
  selector: 'app-basic-masonry-grid-demo',
  imports: [ScMasonryGrid, ScMasonryItem],
  template: \`
    <div scMasonryGrid [columns]="4" [gap]="16">
      @for (item of items(); track item.id) {
        <div scMasonryItem>
          <div
            class="bg-muted overflow-hidden rounded-lg shadow-sm transition-shadow hover:shadow-md"
            [style.height.px]="item.height"
          >
            <div class="p-4">
              <p class="text-foreground font-medium">{{ item.title }}</p>
              <p class="text-muted-foreground text-sm">
                {{ item.height }}px tall
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicMasonryGridDemo {
  readonly items = signal<DemoItem[]>(
    Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      height: Math.floor(Math.random() * 150) + 100,
      title: \`Item \${i + 1}\`,
    })),
  );
}`;
}
