import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScTransferList,
  ScTransferListActions,
  ScTransferListCount,
  ScTransferListHeader,
  ScTransferListItem,
  ScTransferListItems,
  ScTransferListSearch,
  ScTransferListSelectAll,
  ScTransferListSource,
  ScTransferListTarget,
} from '@semantic-components/ui-lab';
import type { TransferListItem } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-transfer-list-demo',
  imports: [
    ScTransferList,
    ScTransferListSource,
    ScTransferListTarget,
    ScTransferListHeader,
    ScTransferListSelectAll,
    ScTransferListCount,
    ScTransferListSearch,
    ScTransferListItems,
    ScTransferListItem,
    ScTransferListActions,
  ],
  template: `
    <div class="flex flex-col gap-6">
      <div
        scTransferList
        [(sourceItems)]="sourceItems"
        [(targetItems)]="targetItems"
        (transferChange)="onChange($event)"
      >
        <div scTransferListSource #source="scTransferListSource">
          <div scTransferListHeader>
            <label class="flex items-center gap-2">
              <input type="checkbox" scTransferListSelectAll />
              <span class="font-medium">Available</span>
            </label>
            <span scTransferListCount></span>
          </div>
          <div class="border-b p-2">
            <input scTransferListSearch placeholder="Search..." />
          </div>
          <div scTransferListItems>
            @for (item of source.filteredItems(); track item.id) {
              <label scTransferListItem [item]="item">
                <div class="truncate">{{ item.label }}</div>
                @if (item.description) {
                  <div class="text-muted-foreground truncate text-xs">
                    {{ item.description }}
                  </div>
                }
              </label>
            } @empty {
              <div class="text-muted-foreground p-4 text-center text-sm">
                No items
              </div>
            }
          </div>
        </div>

        <div scTransferListActions></div>

        <div scTransferListTarget #target="scTransferListTarget">
          <div scTransferListHeader>
            <label class="flex items-center gap-2">
              <input type="checkbox" scTransferListSelectAll />
              <span class="font-medium">Selected</span>
            </label>
            <span scTransferListCount></span>
          </div>
          <div class="border-b p-2">
            <input scTransferListSearch placeholder="Search..." />
          </div>
          <div scTransferListItems>
            @for (item of target.filteredItems(); track item.id) {
              <label scTransferListItem [item]="item">
                <div class="truncate">{{ item.label }}</div>
                @if (item.description) {
                  <div class="text-muted-foreground truncate text-xs">
                    {{ item.description }}
                  </div>
                }
              </label>
            } @empty {
              <div class="text-muted-foreground p-4 text-center text-sm">
                No items
              </div>
            }
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="bg-card rounded-lg border p-4">
          <p class="mb-2 text-sm font-medium">
            Source ({{ sourceItems().length }})
          </p>
          <ul class="text-muted-foreground space-y-1 text-xs">
            @for (item of sourceItems(); track item.id) {
              <li>{{ item.label }}</li>
            }
          </ul>
        </div>
        <div class="bg-card rounded-lg border p-4">
          <p class="mb-2 text-sm font-medium">
            Target ({{ targetItems().length }})
          </p>
          <ul class="text-muted-foreground space-y-1 text-xs">
            @for (item of targetItems(); track item.id) {
              <li>{{ item.label }}</li>
            }
          </ul>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
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
}
