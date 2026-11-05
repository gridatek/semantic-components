import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SkipQuestionnaireDemo } from './skip-questionnaire-demo';

@Component({
  selector: 'app-skip-questionnaire-demo-container',
  imports: [DemoContainer, SkipQuestionnaireDemo],
  template: `
    <app-demo-container
      title="Skip"
      demoUrl="/demos/questionnaire/skip-questionnaire-demo"
      [code]="code"
    >
      <app-skip-questionnaire-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SkipQuestionnaireDemoContainer {
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
  ScQuestionnaireSkip,
  ScQuestionnaireSubmit,
  ScQuestionnaireTitle,
} from '@semantic-components/ui';

/** A question the schema doesn’t require: Skip passes it unanswered. */
@Component({
  selector: 'app-skip-questionnaire-demo',
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
    ScQuestionnaireSkip,
    ScQuestionnaireSubmit,
    ScQuestionnaireTitle,
  ],
  template: \`
    <form scQuestionnaire [formRoot]="survey" #questionnaire="scQuestionnaire">
      <div scQuestionnaireProgress aria-label="Progress">
        Question {{ questionnaire.current() }} of {{ questionnaire.total() }}
      </div>
      <fieldset scQuestionnaireItem name="task" [field]="survey.task">
        <legend scQuestionnaireTitle>What kind of change is this?</legend>
        <p scQuestionnaireDescription>
          Choose the category that best describes the work.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="feature"
              [formField]="survey.task"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> New feature </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="fix"
              [formField]="survey.task"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Bug fix </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="refactor"
              [formField]="survey.task"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Refactor </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset
        scQuestionnaireItem
        name="constraint"
        [field]="survey.constraint"
      >
        <legend scQuestionnaireTitle>
          Are there any implementation constraints?
        </legend>
        <p scQuestionnaireDescription>
          Answer if needed, or skip this question.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="no-dependencies"
              [formField]="survey.constraint"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Do not add dependencies </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="no-migrations"
              [formField]="survey.constraint"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Do not change the database </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="preserve-api"
              [formField]="survey.constraint"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Preserve the public API </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
      </fieldset>
      <fieldset scQuestionnaireItem name="review" [field]="survey.review">
        <legend scQuestionnaireTitle>How should the work be reviewed?</legend>
        <p scQuestionnaireDescription>
          Choose the checks to complete before handoff.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="tests"
              [formField]="survey.review"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Run the test suite </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="diff"
              [formField]="survey.review"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Review the final diff </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="both"
              [formField]="survey.review"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Tests and diff review </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireSkip>Skip</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Submit brief</button>
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
export class SkipQuestionnaireDemo {
  private readonly model = signal({ task: '', constraint: '', review: '' });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);

  readonly survey = form(
    this.model,
    (s) => {
      required(s.task);
      required(s.review);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}`;
}
