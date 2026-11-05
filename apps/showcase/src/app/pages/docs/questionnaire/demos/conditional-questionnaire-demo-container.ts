import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ConditionalQuestionnaireDemo } from './conditional-questionnaire-demo';

@Component({
  selector: 'app-conditional-questionnaire-demo-container',
  imports: [DemoContainer, ConditionalQuestionnaireDemo],
  template: `
    <app-demo-container
      title="Conditional"
      demoUrl="/demos/questionnaire/conditional-questionnaire-demo"
      [code]="code"
    >
      <app-conditional-questionnaire-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ConditionalQuestionnaireDemoContainer {
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

/** A question asked only for some answers: in an @if on the earlier answer, required only then. */
@Component({
  selector: 'app-conditional-questionnaire-demo',
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
      <fieldset scQuestionnaireItem name="runtime" [field]="survey.runtime">
        <legend scQuestionnaireTitle>Where should the agent run?</legend>
        <p scQuestionnaireDescription>
          Cloud runs add an environment question.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="local"
              [formField]="survey.runtime"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> On this machine </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="cloud"
              [formField]="survey.runtime"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> In the cloud </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      @if (survey.runtime().value() === 'cloud') {
        <fieldset
          scQuestionnaireItem
          name="environment"
          [field]="survey.environment"
        >
          <legend scQuestionnaireTitle>
            Which cloud environment should it use?
          </legend>
          <div scQuestionnaireChoices>
            <label scQuestionnaireChoice>
              <input
                type="radio"
                scQuestionnaireChoiceInput
                value="staging"
                [formField]="survey.environment"
              />
              <span scQuestionnaireChoiceIndicator></span>
              <span scQuestionnaireChoiceLabel> Staging </span>
              <kbd scQuestionnaireChoiceShortcut></kbd>
            </label>
            <label scQuestionnaireChoice>
              <input
                type="radio"
                scQuestionnaireChoiceInput
                value="production"
                [formField]="survey.environment"
              />
              <span scQuestionnaireChoiceIndicator></span>
              <span scQuestionnaireChoiceLabel> Production </span>
              <kbd scQuestionnaireChoiceShortcut></kbd>
            </label>
          </div>
          <p scQuestionnaireError>Choose an answer to continue.</p>
        </fieldset>
      }
      <fieldset scQuestionnaireItem name="approval" [field]="survey.approval">
        <legend scQuestionnaireTitle>
          When should the agent request approval?
        </legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="always"
              [formField]="survey.approval"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Before every change </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="risky"
              [formField]="survey.approval"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Before risky changes only </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Save execution plan</button>
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
export class ConditionalQuestionnaireDemo {
  private readonly model = signal({
    runtime: 'local',
    environment: '',
    approval: '',
  });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);

  readonly survey = form(
    this.model,
    (s) => {
      required(s.runtime);
      required(s.environment, {
        when: ({ valueOf }) => valueOf(s.runtime) === 'cloud',
      });
      required(s.approval);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}`;
}
