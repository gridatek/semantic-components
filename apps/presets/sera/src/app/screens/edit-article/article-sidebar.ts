import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { type FieldTree, FormField } from '@angular/forms/signals';
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
import {
  ISSUES,
  MILESTONES,
  countWords,
} from '../article-directory/articles-data';
import { type ArticleModel } from './article-model';

const ISSUE_ITEMS = ISSUES.map((issue) => ({
  value: issue.id,
  label: issue.label,
}));

/** The article's details, its publication milestones, its word count. */
@Component({
  selector: 'app-article-sidebar',
  imports: [
    FormField,
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
              <div scSelect [formField]="fields().issue" [items]="issues">
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
              <input scInput [formField]="fields().author" />
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
                      [formField]="fields().milestones[milestone.id]"
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
                [formField]="fields().note"
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
          <div scProgress [value]="percent()">
            <span scProgressLabel>
              {{ words().toLocaleString('en-US') }} /
              {{ targetWords().toLocaleString('en-US') }} words
            </span>
            <span scProgressValueText>{{ percent() }}%</span>
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
  /** Edit Article's form. */
  readonly fields = input.required<FieldTree<ArticleModel>>();
  /** The length asked for. */
  readonly targetWords = input(2000);

  private readonly issues = ISSUE_ITEMS;
  private readonly milestones = MILESTONES;

  private readonly words = computed(() =>
    countWords(this.fields().body().value()),
  );
  private readonly percent = computed(() =>
    Math.min(100, Math.round((this.words() / this.targetWords()) * 100)),
  );
}
