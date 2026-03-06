import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ComplexVirtualListDemo } from './complex-virtual-list-demo';

@Component({
  selector: 'app-complex-virtual-list-demo-container',
  imports: [DemoContainer, ComplexVirtualListDemo],
  template: `
    <app-demo-container
      title="Complex Items"
      demoUrl="/demos/virtual-list/complex-virtual-list-demo"
      [code]="code"
    >
      <app-complex-virtual-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexVirtualListDemoContainer {
  readonly code = `import {
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
  template: \`
    <div class="overflow-hidden rounded-lg border">
      <sc-virtual-list
        [items]="users()"
        [itemHeight]="72"
        height="360px"
        [trackByFn]="trackById"
      >
        <ng-template let-user let-index="index">
          <div
            class="hover:bg-muted/50 flex h-full items-center gap-4 border-b px-4 transition-colors"
          >
            <div
              class="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
            >
              <span class="text-primary text-sm font-medium">
                {{ getInitials(user.name) }}
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate font-medium">{{ user.name }}</p>
              <p class="text-muted-foreground truncate text-sm">
                {{ user.email }}
              </p>
            </div>
            <span class="bg-muted rounded-full px-2 py-1 text-xs">
              {{ user.role }}
            </span>
          </div>
        </ng-template>
      </sc-virtual-list>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComplexVirtualListDemo {
  readonly users = signal<User[]>(
    Array.from({ length: 5000 }, (_, i) => ({
      id: i + 1,
      name: \`User \${i + 1}\`,
      email: \`user\${i + 1}@example.com\`,
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
}`;
}
