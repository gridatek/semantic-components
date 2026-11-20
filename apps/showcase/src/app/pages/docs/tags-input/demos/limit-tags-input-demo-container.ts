import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LimitTagsInputDemo } from './limit-tags-input-demo';

@Component({
  selector: 'app-limit-tags-input-demo-container',
  imports: [DemoContainer, LimitTagsInputDemo],
  template: `
    <app-demo-container
      title="At most three"
      demoUrl="/demos/tags-input/limit-tags-input-demo"
      [code]="code"
    >
      <app-limit-tags-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitTagsInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
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
  scComboboxMatches,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** Three tags at most: once full, nothing more is offered, and a word says so. */
@Component({
  selector: 'app-limit-tags-input-demo',
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
  template: \`
    <div scField class="w-full max-w-sm">
      <label scLabel>Topics</label>
      <div
        scCombobox
        multiple
        autoHighlight
        #tags="scCombobox"
        [(value)]="topics"
      >
        <div scComboboxChips>
          @for (topic of topics(); track topic) {
            <span scComboboxChip [value]="topic">
              {{ topic }}
              <button scComboboxChipRemove>
                <svg siXIcon></svg>
                <span class="sr-only">Remove {{ topic }}</span>
              </button>
            </span>
          }
          <input
            scComboboxInput
            placeholder="Add a topic"
            (beforeinput)="addOnComma($event, tags)"
          />
        </div>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            @if (full()) {
              <p class="text-muted-foreground px-2 py-1.5 text-sm">
                Three topics at most — remove one first.
              </p>
            }
            <div scComboboxList aria-label="Topics">
              @if (typed(tags.query()); as text) {
                <div scComboboxItem [value]="text" [label]="text">
                  Add “{{ text }}”
                </div>
              }
              @if (!full()) {
                @for (topic of matching(tags.query()); track topic) {
                  <div scComboboxItem [value]="topic">{{ topic }}</div>
                }
              }
            </div>
          </div>
        </ng-template>
      </div>
      <p scFieldDescription>{{ topics().length }} of 3.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class LimitTagsInputDemo {
  private readonly topics = signal<string[]>(['Design']);
  private readonly suggestions = [
    'Design',
    'Engineering',
    'Marketing',
    'Product',
    'Sales',
    'Support',
  ];
  private readonly full = computed(() => this.topics().length >= 3);

  /** What is typed, as a new topic: not empty, not one already, room left. */
  private typed(query: string): string | null {
    const text = query.trim();
    return text && !this.full() && !this.topics().includes(text) ? text : null;
  }

  private matching(query: string): string[] {
    return this.suggestions.filter(
      (topic) =>
        !this.topics().includes(topic) &&
        topic !== query.trim() &&
        scComboboxMatches(topic, query),
    );
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
}`;
}
