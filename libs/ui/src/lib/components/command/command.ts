import { type Combobox, ComboboxPopup } from '@angular/aria/combobox';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSelectPortalOutlet } from '../select/select-portal-outlet';
import type { ScCommandItem } from './command-item';
import { ScCommandListContainer } from './command-list-container';
import { SC_COMMAND, type ScCommandContext } from './command-tokens';

/**
 * A searchable list of commands. The input (`scCommandInput`) is an always
 * expanded combobox; the list template (`scCommandListContainer`) is rendered
 * after the projected content, connected to it.
 */
@Component({
  selector: 'div[scCommand]',
  exportAs: 'scCommand',
  imports: [ComboboxPopup, ScSelectPortalOutlet],
  providers: [{ provide: SC_COMMAND, useExisting: ScCommand }],
  template: `
    <ng-content />
    @if (input(); as input) {
      <ng-template ngComboboxPopup [combobox]="input" popupType="listbox">
        @if (listContainer(); as listContainer) {
          <ng-container [scSelectPortalOutlet]="listContainer" />
        }
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'command',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCommand implements ScCommandContext {
  readonly classInput = input<string>('', { alias: 'class' });

  readonly input = signal<Combobox | undefined>(undefined);
  protected readonly listContainer = contentChild(ScCommandListContainer);

  private readonly items = new Map<string, ScCommandItem>();

  protected readonly class = computed(() =>
    cn(
      'flex size-full flex-col overflow-hidden rounded-xl bg-popover p-1 text-popover-foreground',
      this.classInput(),
    ),
  );

  registerItem(item: ScCommandItem): void {
    this.items.set(item.value(), item);
  }

  unregisterItem(item: ScCommandItem): void {
    if (this.items.get(item.value()) === item) this.items.delete(item.value());
  }

  itemFor(value: string): ScCommandItem | undefined {
    return this.items.get(value);
  }
}
