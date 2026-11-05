import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
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

/** The question shown is yours too: [(item)], by its name. */
@Component({
  selector: 'app-controlled-questionnaire-demo',
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
    ScQuestionnaireError,
    ScQuestionnaireItem,
    ScQuestionnaireNext,
    ScQuestionnairePrevious,
    ScQuestionnaireProgress,
    ScQuestionnaireSubmit,
    ScQuestionnaireTitle,
  ],
  template: `
    <p class="text-muted-foreground text-sm" role="status">
      Current checkpoint: {{ labels[item()] }}
    </p>
    <form
      scQuestionnaire
      [formRoot]="survey"
      #questionnaire="scQuestionnaire"
      [(item)]="item"
    >
      <div scQuestionnaireProgress aria-label="Progress">
        Question {{ questionnaire.current() }} of {{ questionnaire.total() }}
      </div>
      <fieldset scQuestionnaireItem name="scope" [field]="survey.scope">
        <legend scQuestionnaireTitle>What may the agent change?</legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="component"
              [formField]="survey.scope"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Only the target component </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="tests"
              [formField]="survey.scope"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel>
              Component and related tests
            </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="feature"
              [formField]="survey.scope"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> The complete feature area </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="checks" [field]="survey.checks">
        <legend scQuestionnaireTitle>
          Which verification level should it use?
        </legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="targeted"
              [formField]="survey.checks"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Targeted tests </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="package"
              [formField]="survey.checks"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel>
              Package tests and typecheck
            </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="full"
              [formField]="survey.checks"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel>
              Full workspace verification
            </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="output" [field]="survey.output">
        <legend scQuestionnaireTitle>
          What should the agent return when finished?
        </legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="summary"
              [formField]="survey.output"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Concise summary </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="diff"
              [formField]="survey.output"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Summary with changed files </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="handoff"
              [formField]="survey.output"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Detailed handoff </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Save workflow</button>
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
export class ControlledQuestionnaireDemo {
  private readonly model = signal({ scope: '', checks: '', output: '' });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);
  readonly item = signal('scope');
  protected readonly labels: Record<string, string> = {
    scope: 'Change scope',
    checks: 'Verification',
    output: 'Final output',
  };

  readonly survey = form(
    this.model,
    (s) => {
      required(s.scope);
      required(s.checks);
      required(s.output);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}
