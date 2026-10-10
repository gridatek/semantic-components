import { ComboboxPopup, ComboboxWidget } from '@angular/aria/combobox';
import {
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScSelectPortalOutlet } from '../select/select-portal-outlet';
import { ScComboboxListContainer } from './combobox-list-container';
import { SC_COMBOBOX } from './combobox-tokens';

/**
 * The dialog popup of a combobox. Holds the search box and the list.
 * Named after the trigger's `aria-label` unless given its own; Escape
 * closes it.
 *
 * The list template (`scComboboxListContainer`) is rendered after the
 * projected content, inside an `ngComboboxPopup` bound to the search box.
 */
@Component({
  selector: 'div[scComboboxPopup]',
  imports: [ComboboxPopup, ScSelectPortalOutlet],
  hostDirectives: [ComboboxWidget],
  template: `
    <ng-content />
    @if (combobox.search(); as search) {
      <ng-template ngComboboxPopup [combobox]="search" popupType="listbox">
        @if (listContainer(); as listContainer) {
          <ng-container [scSelectPortalOutlet]="listContainer" />
        }
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'combobox-content',
    role: 'dialog',
    '[attr.aria-label]': 'label()',
    '[class]': 'class()',
    '(keydown.escape)': 'combobox.close()',
    'animate.enter': 'animate-in fade-in-0 zoom-in-95 duration-100',
    'animate.leave': 'animate-out fade-out-0 zoom-out-95 duration-100',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxPopup {
  protected readonly combobox = inject(SC_COMBOBOX);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabel = input<string | undefined>(undefined, {
    alias: 'aria-label',
  });

  protected readonly label = computed(
    () => this.ariaLabel() || this.combobox.trigger()?.label || null,
  );

  protected readonly listContainer = contentChild(ScComboboxListContainer);

  protected readonly class = computed(() =>
    cn(
      'bg-popover text-popover-foreground ring-foreground/10 relative z-50 flex max-h-72 w-full min-w-36 flex-col overflow-hidden rounded-lg shadow-md ring-1',
      '*:data-[slot=input-group]:bg-input/30 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:shadow-none',
      this.classInput(),
    ),
  );
}
