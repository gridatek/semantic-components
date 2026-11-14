import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScFieldGroup,
  ScFieldset,
  ScInput,
  ScLabel,
  ScLegend,
  ScProgress,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScTextarea,
} from '@semantic-components/ui';
import { SiCheckIcon, SiChevronDownIcon } from '@semantic-icons/lucide-icons';

interface Milestone {
  id: string;
  name: string;
  complete: boolean;
}

const MILESTONES: Milestone[] = [
  { id: 'outline', name: 'Outline & Commissioning', complete: true },
  { id: 'first-draft', name: 'First Draft Submitted', complete: true },
  { id: 'review', name: 'Review & Revisions', complete: false },
  { id: 'copy-edit', name: 'Final Copy Edit', complete: false },
  { id: 'layout', name: 'Art Direction & Layout', complete: false },
];

const ISSUES = [
  { label: 'Spring Issue 2024', value: 'spring-2024' },
  { label: 'Summer Issue 2024', value: 'summer-2024' },
  { label: 'Autumn Issue 2024', value: 'autumn-2024' },
  { label: 'Winter Issue 2024', value: 'winter-2024' },
];

/** The article's details, its publication milestones, its word count. */
@Component({
  selector: 'app-article-sidebar',
  imports: [
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldGroup,
    ScFieldset,
    ScInput,
    ScLabel,
    ScLegend,
    ScProgress,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
  ],
  template: `
    <aside class="grid grid-cols-12 gap-(--gap) xl:flex xl:flex-col">
      <div scCard class="col-span-full md:col-span-6 lg:col-span-4">
        <div scCardHeader>
          <h2 scCardTitle>Article Details</h2>
        </div>
        <div scCardBody>
          <div scFieldGroup>
            <div scField>
              <div scSelect [(value)]="issue" [items]="issues">
                <div scSelectLabel>Issue</div>
                <div scSelectTrigger>
                  <span scSelectValue></span>
                  <svg scSelectIcon siChevronDownIcon></svg>
                </div>
                <ng-template scSelectPortal>
                  <div scSelectPopup>
                    <div scSelectList>
                      <div scSelectGroup>
                        @for (item of issues; track item.value) {
                          <div scSelectItem [value]="item.value">
                            <span scSelectItemText>{{ item.label }}</span>
                            <span scSelectItemIndicator
                              ><svg siCheckIcon></svg
                            ></span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
            <div scField>
              <label scLabel>Author</label>
              <input scInput value="Elena Rostova" />
            </div>
          </div>
        </div>
      </div>

      <div scCard class="col-span-full md:col-span-6 lg:col-span-4">
        <div scCardHeader>
          <h2 scCardTitle>Publication Flow</h2>
        </div>
        <div scCardBody>
          <div scFieldGroup>
            <fieldset scFieldset>
              <legend scLegend>Required Milestones</legend>
              <div class="flex flex-col gap-3">
                @for (milestone of milestones; track milestone.id) {
                  <div scField orientation="horizontal">
                    <input
                      scCheckbox
                      [id]="'milestone-' + milestone.id"
                      [name]="milestone.id"
                      [checked]="milestone.complete"
                    />
                    <label scLabel [for]="'milestone-' + milestone.id">
                      {{ milestone.name }}
                    </label>
                  </div>
                }
              </div>
            </fieldset>
            <div scField>
              <label scLabel>Add note for editor</label>
              <textarea
                scTextarea
                placeholder="This article needs to be revised for clarity and accuracy."
              ></textarea>
            </div>
          </div>
        </div>
      </div>

      <div scCard class="col-span-full lg:col-span-4">
        <div scCardHeader>
          <h2 scCardTitle>Word Count</h2>
        </div>
        <div scCardBody>
          <div scProgress [value]="70">
            <span scProgressLabel>1,402 / 2,000 words</span>
            <span scProgressValueText>70%</span>
            <div scProgressTrack><div scProgressRange></div></div>
          </div>
        </div>
      </div>
    </aside>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class ArticleSidebar {
  protected readonly milestones = MILESTONES;
  protected readonly issues = ISSUES;
  protected readonly issue = signal('summer-2024');
}
