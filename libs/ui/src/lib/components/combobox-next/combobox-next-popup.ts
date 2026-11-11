import { ComboboxPopup } from '@angular/aria/combobox';
import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScPortalOutlet } from '../portal-outlet/portal-outlet';
import { ScComboboxNextBase } from './combobox-next-base';
import { ScComboboxNextListContainer } from './combobox-next-list-container';

/**
 * The popup: the list, its empty text, and — when a trigger opens it — the
 * search (then it is a dialog, named as its trigger, closed by Escape). As
 * wide as its field, below it, above without room.
 */
@Component({
  selector: 'div[scComboboxNextPopup]',
  imports: [ComboboxPopup, ScPortalOutlet],
  template: `
    <ng-content />
    @if (root.search(); as search) {
      <ng-template
        ngComboboxPopup
        [combobox]="search.combobox"
        popupType="listbox"
      >
        @if (listContainer(); as listContainer) {
          <ng-container [scPortalOutlet]="listContainer" />
        }
      </ng-template>
    }
  `,
  host: {
    'data-slot': 'combobox-content',
    '[attr.role]': 'withSearch() ? "dialog" : null',
    '[attr.aria-label]': 'withSearch() ? label() : null',
    '[attr.data-side]': 'root.side()',
    '[attr.data-empty]': 'root.rendered().length ? null : ""',
    '[animate.enter]': 'styles.popupEnter',
    '[animate.leave]': 'styles.popupLeave',
    '[class]': 'class()',
    '(mousedown)': 'onMousedown($event)',
    '(keydown.escape)': 'withSearch() && root.close()',
    '(focusout)': 'onFocusout($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScComboboxNextPopup {
  protected readonly styles = injectPreset().combobox;
  protected readonly root = inject(ScComboboxNextBase);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its name as a dialog: its trigger's `aria-label` when not given. */
  readonly ariaLabel = input<string | null>(null, { alias: 'aria-label' });

  protected readonly listContainer = contentChild(ScComboboxNextListContainer);

  /** A trigger opened it: the search is inside. */
  protected readonly withSearch = computed(() => !this.root.field());
  protected readonly label = computed(
    () => this.ariaLabel() ?? this.root.triggerLabel(),
  );

  protected readonly class = computed(() =>
    cn(
      this.styles.popup,
      // The CDK overlay's size: its field's width, the room in the viewport.
      'flex max-h-[inherit] w-full flex-col',
      // The search inside it: within its margins (our input group is w-full).
      '*:data-[slot=input-group]:w-auto *:data-[slot=input-group]:shrink-0',
      this.classInput(),
    ),
  );

  /** Beside the input, a press in the list keeps focus in the input. */
  protected onMousedown(event: Event): void {
    if (!this.withSearch()) event.preventDefault();
  }

  /** With the search inside: focus gone elsewhere closes it. */
  protected onFocusout(event: FocusEvent): void {
    if (!this.withSearch()) return;
    const next = event.relatedTarget as Node | null;
    if (!next || this.element.contains(next)) return;
    if (this.root.triggerElement()?.contains(next)) return;
    this.root.open.set(false);
    this.root.touch.emit();
  }
}
