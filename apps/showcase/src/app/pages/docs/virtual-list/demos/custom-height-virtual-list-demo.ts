import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScVirtualList } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-custom-height-virtual-list-demo',
  imports: [ScVirtualList],
  template: `
    <div class="border rounded-lg overflow-hidden">
      <sc-virtual-list [items]="items()" [itemHeight]="36" height="200px">
        <ng-template let-item let-index="index">
          <div
            class="flex items-center px-4 h-full border-b text-sm hover:bg-muted/50 transition-colors"
          >
            <span class="w-12 text-muted-foreground">{{ index + 1 }}</span>
            <span class="flex-1">{{ item }}</span>
          </div>
        </ng-template>
      </sc-virtual-list>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomHeightVirtualListDemo {
  readonly items = signal<string[]>(
    Array.from(
      { length: 500 },
      (_, i) => `Item ${i + 1} - Lorem ipsum dolor sit amet`,
    ),
  );
}
