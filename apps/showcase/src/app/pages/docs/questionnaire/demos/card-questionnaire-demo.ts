import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScCard,
  ScCardAction,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
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
} from '@semantic-components/ui';

/** In a Card: each question named by its card title (aria-labelledby), the buttons in the footer. */
@Component({
  selector: 'app-card-questionnaire-demo',
  imports: [
    ScFrame,
    JsonPipe,
    FormField,
    FormRoot,
    ScCard,
    ScCardAction,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
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
  ],
  template: `
    <form
      scQuestionnaire
      [formRoot]="survey"
      #questionnaire="scQuestionnaire"
      shortcuts="numbers"
    >
      <div scCard>
        <fieldset
          scQuestionnaireItem
          name="task"
          [field]="survey.task"
          aria-labelledby="card-task-title"
        >
          <div scCardHeader>
            <h3 scCardTitle id="card-task-title">
              What should the agent work on?
            </h3>
            <p scCardDescription>Choose the task to handle next.</p>
            <div scCardAction>
              <div scQuestionnaireProgress aria-label="Progress">
                {{ questionnaire.current() }} / {{ questionnaire.total() }}
              </div>
            </div>
          </div>
          <div scCardContent>
            <div scQuestionnaireChoices>
              <label scQuestionnaireChoice>
                <input
                  type="radio"
                  scQuestionnaireChoiceInput
                  value="triage"
                  [formField]="survey.task"
                />
                <span scQuestionnaireChoiceIndicator></span>
                <span scQuestionnaireChoiceLabel> Triage new issues </span>
                <kbd scQuestionnaireChoiceShortcut></kbd>
              </label>
              <label scQuestionnaireChoice>
                <input
                  type="radio"
                  scQuestionnaireChoiceInput
                  value="docs"
                  [formField]="survey.task"
                />
                <span scQuestionnaireChoiceIndicator></span>
                <span scQuestionnaireChoiceLabel> Update the docs </span>
                <kbd scQuestionnaireChoiceShortcut></kbd>
              </label>
              <label scQuestionnaireChoice>
                <input
                  type="radio"
                  scQuestionnaireChoiceInput
                  value="deps"
                  [formField]="survey.task"
                />
                <span scQuestionnaireChoiceIndicator></span>
                <span scQuestionnaireChoiceLabel> Upgrade dependencies </span>
                <kbd scQuestionnaireChoiceShortcut></kbd>
              </label>
            </div>
            <p scQuestionnaireError>Choose an answer to continue.</p>
          </div>
        </fieldset>
        <fieldset
          scQuestionnaireItem
          name="output"
          [field]="survey.output"
          aria-labelledby="card-output-title"
        >
          <div scCardHeader>
            <h3 scCardTitle id="card-output-title">
              What should the final handoff include?
            </h3>
            <p scCardDescription>Pick the level of detail needed for review.</p>
            <div scCardAction>
              <div scQuestionnaireProgress aria-label="Progress">
                {{ questionnaire.current() }} / {{ questionnaire.total() }}
              </div>
            </div>
          </div>
          <div scCardContent>
            <div scQuestionnaireChoices>
              <label scQuestionnaireChoice>
                <input
                  type="radio"
                  scQuestionnaireChoiceInput
                  value="summary"
                  [formField]="survey.output"
                />
                <span scQuestionnaireChoiceIndicator></span>
                <span scQuestionnaireChoiceLabel> A summary </span>
                <kbd scQuestionnaireChoiceShortcut></kbd>
              </label>
              <label scQuestionnaireChoice>
                <input
                  type="radio"
                  scQuestionnaireChoiceInput
                  value="files"
                  [formField]="survey.output"
                />
                <span scQuestionnaireChoiceIndicator></span>
                <span scQuestionnaireChoiceLabel>
                  A summary and the changed files
                </span>
                <kbd scQuestionnaireChoiceShortcut></kbd>
              </label>
            </div>
            <p scQuestionnaireError>Choose an answer to continue.</p>
          </div>
        </fieldset>
        <div scCardFooter>
          <div scQuestionnaireActions class="w-full">
            <button scQuestionnairePrevious>Previous</button>
            <button scQuestionnaireNext>Next</button>
            <button scQuestionnaireSubmit>Create task</button>
          </div>
        </div>
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
export class CardQuestionnaireDemo {
  private readonly model = signal({ task: '', output: '' });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);

  readonly survey = form(
    this.model,
    (s) => {
      required(s.task);
      required(s.output);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}
