import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
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
    <div class="border rounded-lg overflow-hidden">
      <sc-virtual-list
        [items]="users()"
        [itemHeight]="72"
        height="360px"
        [trackByFn]="trackById"
      >
        <ng-template let-user let-index="index">
          <div
            class="flex items-center gap-4 px-4 h-full border-b hover:bg-muted/50 transition-colors"
          >
            <div
              class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
            >
              <span class="text-sm font-medium text-primary">
                {{ getInitials(user.name) }}
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-medium truncate">{{ user.name }}</p>
              <p class="text-sm text-muted-foreground truncate">
                {{ user.email }}
              </p>
            </div>
            <span class="px-2 py-1 text-xs rounded-full bg-muted">
              {{ user.role }}
            </span>
          </div>
        </ng-template>
      </sc-virtual-list>
    </div>
  `,
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

  readonly trackById = (index: number, item: User) => item.id;

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}
