import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScVirtualList } from '@semantic-components/ui-lab';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-complex-virtual-list-demo',
  imports: [ScVirtualList],
  template: `
    <div
      scVirtualList
      #vl="scVirtualList"
      class="h-[360px] overflow-auto rounded-lg border"
      [items]="users()"
      [itemHeight]="72"
      height="360px"
    >
      <div [style.height.px]="vl.totalHeight()" class="relative">
        <div
          [style.transform]="'translateY(' + vl.offsetY() + 'px)'"
          class="absolute inset-x-0 top-0"
        >
          @for (item of vl.visibleItems(); track item.data.id) {
            <div
              [style.height.px]="72"
              class="hover:bg-muted/50 flex items-center gap-4 border-b px-4 transition-colors"
            >
              <div
                class="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
              >
                <span class="text-primary text-sm font-medium">
                  {{ getInitials(item.data.name) }}
                </span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate font-medium">{{ item.data.name }}</p>
                <p class="text-muted-foreground truncate text-sm">
                  {{ item.data.email }}
                </p>
              </div>
              <span class="bg-muted rounded-full px-2 py-1 text-xs">
                {{ item.data.role }}
              </span>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexVirtualListDemo {
  readonly users = signal<User[]>(
    Array.from({ length: 5000 }, (_, i) => ({
      id: i + 1,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Editor', 'Viewer', 'Guest'][i % 4],
    })),
  );

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
