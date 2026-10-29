import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScQuestionnaire,
  ScQuestionnaireActions,
  ScQuestionnaireChoice,
  ScQuestionnaireChoiceIndicator,
  ScQuestionnaireChoiceInput,
  ScQuestionnaireChoiceLabel,
  ScQuestionnaireChoiceShortcut,
  ScQuestionnaireChoices,
  ScQuestionnaireDescription,
  ScQuestionnaireItem,
  ScQuestionnaireNext,
  ScQuestionnairePrevious,
  ScQuestionnaireSkip,
  ScQuestionnaireSubmit,
  ScQuestionnaireTitle,
  ScTextarea,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-multiple-questionnaire-demo',
  imports: [
    JsonPipe,
    FormField,
    FormRoot,
    ScQuestionnaire,
    ScQuestionnaireActions,
    ScQuestionnaireChoice,
    ScQuestionnaireChoiceIndicator,
    ScQuestionnaireChoiceInput,
    ScQuestionnaireChoiceLabel,
    ScQuestionnaireChoiceShortcut,
    ScQuestionnaireChoices,
    ScQuestionnaireDescription,
    ScQuestionnaireItem,
    ScQuestionnaireNext,
    ScQuestionnairePrevious,
    ScQuestionnaireSkip,
    ScQuestionnaireSubmit,
    ScQuestionnaireTitle,
    ScTextarea,
    SiCheckIcon,
  ],
  template: `
    <form scQuestionnaire [formRoot]="survey" class="rounded-xl border p-6">
      <fieldset scQuestionnaireItem name="sources" [field]="survey.sources">
        <legend scQuestionnaireTitle>Which sources should I read?</legend>
        <p scQuestionnaireDescription>
          Select all that apply, or skip this question.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.sources.docs"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> The docs </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.sources.code"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> The code </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.sources.issues"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> The open issues </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
      </fieldset>
      <fieldset scQuestionnaireItem name="notes" [field]="survey.notes">
        <legend scQuestionnaireTitle>Anything else I should know?</legend>
        <textarea
          scTextarea
          rows="3"
          aria-label="Notes"
          [formField]="survey.notes"
        ></textarea>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireSkip>Skip</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Share context</button>
      </div>
    </form>
    @if (sent(); as answers) {
      <div class="bg-muted rounded-md p-4 text-sm">
        <p class="font-medium">Submitted</p>
        <pre class="mt-2 whitespace-pre-wrap">{{ answers | json }}</pre>
      </div>
    }
  `,
  host: { class: 'flex w-full max-w-md flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class MultipleQuestionnaireDemo {
  private readonly model = signal({
    sources: { docs: false, code: false, issues: false },
    notes: '',
  });
  readonly sent = signal<unknown>(null);

  readonly survey = form(this.model, () => undefined, {
    submission: { action: async () => this.sent.set(this.model()) },
  });
}
