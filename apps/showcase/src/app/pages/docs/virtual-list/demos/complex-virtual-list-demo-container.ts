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

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-complex-virtual-list-demo',
  imports: [
    CdkVirtualScrollViewport,
    CdkFixedSizeVirtualScroll,
    CdkVirtualForOf,
  ],
  template: \`
    <cdk-virtual-scroll-viewport
      itemSize="72"
      class="h-[360px] rounded-lg border"
    >
      <div
        *cdkVirtualFor="let user of users(); trackBy: trackById"
        class="hover:bg-muted/50 flex h-[72px] items-center gap-4 border-b px-4 transition-colors"
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
    </cdk-virtual-scroll-viewport>
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

  trackById(_index: number, item: User): number {
    return item.id;
  }

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
