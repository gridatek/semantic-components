import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScComboboxChip,
  ScComboboxChipRemove,
  ScComboboxChips,
  ScComboboxInput,
  ScComboboxItem,
  ScComboboxList,
  ScComboboxMultiple,
  ScComboboxPopup,
  ScComboboxPortal,
  ScField,
  ScFieldDescription,
  ScLabel,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Only an email address goes in: the Add item shows only for one; else a word says why (not an item). */
@Component({
  selector: 'app-emails-tags-input-demo',
  imports: [
    ScComboboxChip,
    ScComboboxChipRemove,
    ScComboboxChips,
    ScComboboxInput,
    ScComboboxItem,
    ScComboboxList,
    ScComboboxMultiple,
    ScComboboxPopup,
    ScComboboxPortal,
    ScField,
    ScFieldDescription,
    ScLabel,
    SiXIcon,
  ],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>Invite</label>
      <div
        scCombobox
        multiple
        autoHighlight
        #tags="scCombobox"
        [(value)]="emails"
      >
        <div scComboboxChips>
          @for (email of emails(); track email) {
            <span scComboboxChip [value]="email">
              {{ email }}
              <button scComboboxChipRemove>
                <svg siXIcon></svg>
                <span class="sr-only">Remove {{ email }}</span>
              </button>
            </span>
          }
          <input
            scComboboxInput
            placeholder="name@example.com"
            (beforeinput)="addOnComma($event, tags)"
          />
        </div>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            @if (tags.query().trim() && !typed(tags.query())) {
              <p class="text-muted-foreground px-2 py-1.5 text-sm">
                Not an email address yet.
              </p>
            }
            <div scComboboxList aria-label="Invite">
              @if (typed(tags.query()); as text) {
                <div scComboboxItem [value]="text" [label]="text">
                  Invite “{{ text }}”
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
      <p scFieldDescription>An address, then Enter or a comma.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class EmailsTagsInputDemo {
  private readonly emails = signal<string[]>(['ada@example.com']);

  /** What is typed, as a new address: an email, not one already. */
  private typed(query: string): string | null {
    const text = query.trim();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text) &&
      !this.emails().includes(text)
      ? text
      : null;
  }

  /** A comma adds the text typed, as Enter on the Add item does. */
  private addOnComma(
    event: InputEvent,
    tags: ScComboboxMultiple<string>,
  ): void {
    // On the character typed (beforeinput: after the combobox's own keys,
    // and phone keyboards too).
    if (event.data !== ',') return;
    event.preventDefault();
    const text = this.typed(tags.query());
    // As a pick: the tag added, the text cleared.
    if (text) tags.pick([...tags.selected(), text]);
  }
}
