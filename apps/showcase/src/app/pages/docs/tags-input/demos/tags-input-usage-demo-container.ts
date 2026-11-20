import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { TagsInputUsageDemo } from './tags-input-usage-demo';

@Component({
  selector: 'app-tags-input-usage-demo-container',
  imports: [DemoContainer, TagsInputUsageDemo],
  template: `
    <app-demo-container
      title="Usage"
      demoUrl="/demos/tags-input/tags-input-usage-demo"
      [code]="code"
    >
      <app-tags-input-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class TagsInputUsageDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
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

/**
 * Tags from a Combobox: several values as chips, and an Add item for what is
 * typed — Base UI's "Creatable". Enter or a comma adds a tag; the
 * suggestions are there to pick from.
 */
@Component({
  selector: 'app-tags-input-usage-demo',
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
      <label scLabel>Skills</label>
      <div
        scCombobox
        multiple
        autoHighlight
        #tags="scCombobox"
        [(value)]="skills"
      >
        <div scComboboxChips>
          @for (skill of skills(); track skill) {
            <span scComboboxChip [value]="skill">
              {{ skill }}
              <button scComboboxChipRemove>
                <svg siXIcon></svg>
                <span class="sr-only">Remove {{ skill }}</span>
              </button>
            </span>
          }
          <input
            scComboboxInput
            placeholder="Add a skill"
            (beforeinput)="addOnComma($event, tags)"
          />
        </div>
        <ng-template scComboboxPortal>
          <div scComboboxPopup>
            <div scComboboxList aria-label="Skills">
              @if (typed(tags.query()); as text) {
                <div scComboboxItem [value]="text" [label]="text">
                  Add “{{ text }}”
                </div>
              }
              @for (skill of matching(tags.query()); track skill) {
                <div scComboboxItem [value]="skill">{{ skill }}</div>
              }
            </div>
          </div>
        </ng-template>
      </div>
      <p scFieldDescription>Enter or a comma adds a tag.</p>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TagsInputUsageDemo {
  private readonly skills = signal(['Angular', 'TypeScript']);
  private readonly suggestions = [
    'Accessibility',
    'Angular',
    'CSS',
    'Node.js',
    'RxJS',
    'Signals',
    'Tailwind CSS',
    'Testing',
    'TypeScript',
  ];

  /** What is typed, as a new tag: not empty, not a tag already. */
  private typed(query: string): string | null {
    const text = query.trim();
    return text && !this.skills().includes(text) ? text : null;
  }

  /** The suggestions left: matching, not tags already, not the text itself. */
  private matching(query: string): string[] {
    return this.suggestions.filter(
      (skill) =>
        !this.skills().includes(skill) &&
        skill !== query.trim() &&
        scComboboxMatches(skill, query),
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
