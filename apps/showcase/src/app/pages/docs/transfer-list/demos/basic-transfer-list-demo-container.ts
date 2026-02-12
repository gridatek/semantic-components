import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicTransferListDemo } from './basic-transfer-list-demo';

@Component({
  selector: 'app-basic-transfer-list-demo-container',
  imports: [DemoContainer, BasicTransferListDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/transfer-list/basic-transfer-list-demo"
      [code]="code"
    >
      <app-basic-transfer-list-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTransferListDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScTransferList } from '@semantic-components/ui-lab';
import type { TransferListItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-transfer-list-demo',
  imports: [ScTransferList],
  template: \`
    <div class="flex flex-col gap-6">
      <sc-transfer-list
        [(sourceItems)]="sourceItems"
        [(targetItems)]="targetItems"
        sourceTitle="Available"
        targetTitle="Selected"
        (change)="onChange($event)"
      />

      <div class="grid grid-cols-2 gap-4">
        <div class="rounded-lg border bg-card p-4">
          <p class="text-sm font-medium mb-2">
            Source ({{ sourceItems().length }})
          </p>
          <ul class="text-xs text-muted-foreground space-y-1">
            @for (item of sourceItems(); track item.id) {
              <li>{{ item.label }}</li>
            }
          </ul>
        </div>
        <div class="rounded-lg border bg-card p-4">
          <p class="text-sm font-medium mb-2">
            Target ({{ targetItems().length }})
          </p>
          <ul class="text-xs text-muted-foreground space-y-1">
            @for (item of targetItems(); track item.id) {
              <li>{{ item.label }}</li>
            }
          </ul>
        </div>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicTransferListDemo {
  readonly sourceItems = signal<TransferListItem[]>([
    { id: '1', label: 'JavaScript', description: 'Programming language' },
    { id: '2', label: 'TypeScript', description: 'Typed JavaScript' },
    { id: '3', label: 'Python', description: 'General purpose language' },
    { id: '4', label: 'Rust', description: 'Systems programming' },
    { id: '5', label: 'Go', description: 'Google language' },
    { id: '6', label: 'Java', description: 'Enterprise language' },
    { id: '7', label: 'C#', description: 'Microsoft language' },
    { id: '8', label: 'Ruby', description: 'Dynamic language' },
  ]);

  readonly targetItems = signal<TransferListItem[]>([
    { id: '9', label: 'Angular', description: 'Web framework' },
    { id: '10', label: 'React', description: 'UI library' },
  ]);

  onChange(state: {
    source: TransferListItem[];
    target: TransferListItem[];
  }): void {
    console.log('Transfer list changed:', state);
  }
}`;
}
