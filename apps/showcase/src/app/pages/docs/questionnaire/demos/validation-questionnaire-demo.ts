import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  required,
  validate,
} from '@angular/forms/signals';
import {
  ScFrame,
  ScQuestionnaire,
  ScQuestionnaireActions,
  ScQuestionnaireChoice,
  ScQuestionnaireChoiceIndicator,
  ScQuestionnaireChoiceInput,
  ScQuestionnaireChoiceLabel,
  ScQuestionnaireChoiceShortcut,
  ScQuestionnaireChoices,
  ScQuestionnaireError,
  ScQuestionnaireItem,
  ScQuestionnaireNext,
  ScQuestionnairePrevious,
  ScQuestionnaireProgress,
  ScQuestionnaireSubmit,
  ScQuestionnaireTitle,
} from '@semantic-components/ui';

/** A rule across answers, in the schema: Submit goes back to the question left wrong, its message shown. */
@Component({
  selector: 'app-validation-questionnaire-demo',
  imports: [
    ScFrame,
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
    ScQuestionnaireError,
    ScQuestionnaireItem,
    ScQuestionnaireNext,
    ScQuestionnairePrevious,
    ScQuestionnaireProgress,
    ScQuestionnaireSubmit,
    ScQuestionnaireTitle,
  ],
  template: `
    <form scQuestionnaire [formRoot]="survey" #questionnaire="scQuestionnaire">
      <div scQuestionnaireProgress aria-label="Progress">
        Question {{ questionnaire.current() }} of {{ questionnaire.total() }}
      </div>
      <fieldset scQuestionnaireItem name="detail" [field]="survey.detail">
        <legend scQuestionnaireTitle>
          How much detail should the answer include?
        </legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="summary"
              [formField]="survey.detail"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> A short summary </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="complete"
              [formField]="survey.detail"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> A complete answer </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>{{ survey.detail().errors()[0]?.message }}</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="audience" [field]="survey.audience">
        <legend scQuestionnaireTitle>Who will read it?</legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="team"
              [formField]="survey.audience"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> The team </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="public"
              [formField]="survey.audience"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> The public </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>{{ survey.audience().errors()[0]?.message }}</p>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Configure</button>
      </div>
    </form>
    @if (sent(); as answers) {
      <div scFrame class="bg-muted p-4 text-sm">
        <p class="font-medium">Submitted</p>
        <pre class="mt-2 whitespace-pre-wrap">{{ answers | json }}</pre>
      </div>
    }
  `,
  host: { class: 'flex w-full max-w-md flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class ValidationQuestionnaireDemo {
  private readonly model = signal({ detail: '', audience: '' });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);

  readonly survey = form(
    this.model,
    (s) => {
      required(s.detail, { message: 'Choose an answer to continue.' });
      required(s.audience, { message: 'Choose an answer to continue.' });
      // Public answers need context.
      validate(s.detail, ({ value, valueOf }) =>
        valueOf(s.audience) === 'public' && value() === 'summary'
          ? {
              kind: 'context',
              message:
                'Public answers need enough context. Choose a complete answer.',
            }
          : null,
      );
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}
