import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { NavigationStateQuestionnaireDemo } from './navigation-state-questionnaire-demo';

@Component({
  selector: 'app-navigation-state-questionnaire-demo-container',
  imports: [DemoContainer, NavigationStateQuestionnaireDemo],
  template: `
    <app-demo-container
      title="Navigation state"
      demoUrl="/demos/questionnaire/navigation-state-questionnaire-demo"
      [code]="code"
    >
      <app-navigation-state-questionnaire-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationStateQuestionnaireDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
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
  ScQuestionnaireDescription,
  ScQuestionnaireError,
  ScQuestionnaireItem,
  ScQuestionnaireNext,
  ScQuestionnairePrevious,
  ScQuestionnaireProgress,
  ScQuestionnaireSubmit,
  ScQuestionnaireTitle,
} from '@semantic-components/ui';

/** Each question’s state, through the questionnaire: here Next and Submit disabled until answered. */
@Component({
  selector: 'app-navigation-state-questionnaire-demo',
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
    ScQuestionnaireError,
    ScQuestionnaireItem,
    ScQuestionnaireNext,
    ScQuestionnairePrevious,
    ScQuestionnaireProgress,
    ScQuestionnaireSubmit,
    ScQuestionnaireTitle,
  ],
  template: \`
    <form scQuestionnaire [formRoot]="survey" #questionnaire="scQuestionnaire">
      <div scQuestionnaireProgress aria-label="Progress">
        Question {{ questionnaire.current() }} of {{ questionnaire.total() }}
      </div>
      <fieldset
        scQuestionnaireItem
        name="permission"
        [field]="survey.permission"
      >
        <legend scQuestionnaireTitle>What may the agent modify?</legend>
        <p scQuestionnaireDescription>
          Next stays disabled until an answer is chosen.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="read"
              [formField]="survey.permission"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Read files only </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="edit"
              [formField]="survey.permission"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel>
              Edit files in the workspace
            </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset
        scQuestionnaireItem
        name="verification"
        [field]="survey.verification"
      >
        <legend scQuestionnaireTitle>What must pass before completion?</legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="tests"
              [formField]="survey.verification"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Tests </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="all"
              [formField]="survey.verification"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel>
              Tests, types, and visual QA
            </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button
          scQuestionnaireNext
          variant="secondary"
          [disabled]="!questionnaire.active()?.answered()"
        >
          Next
        </button>
        <button
          scQuestionnaireSubmit
          [disabled]="!questionnaire.active()?.answered()"
        >
          Save permissions
        </button>
      </div>
    </form>
    @if (sent(); as answers) {
      <div class="bg-muted rounded-md p-4 text-sm">
        <p class="font-medium">Submitted</p>
        <pre class="mt-2 whitespace-pre-wrap">{{ answers | json }}</pre>
      </div>
    }
  \`,
  host: { class: 'flex w-full max-w-md flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class NavigationStateQuestionnaireDemo {
  private readonly model = signal({ permission: '', verification: '' });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);

  readonly survey = form(
    this.model,
    (s) => {
      required(s.permission);
      required(s.verification);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}`;
}
