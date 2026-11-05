import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FreeformQuestionnaireDemo } from './freeform-questionnaire-demo';

@Component({
  selector: 'app-freeform-questionnaire-demo-container',
  imports: [DemoContainer, FreeformQuestionnaireDemo],
  template: `
    <app-demo-container
      title="Freeform"
      demoUrl="/demos/questionnaire/freeform-questionnaire-demo"
      [code]="code"
    >
      <app-freeform-questionnaire-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FreeformQuestionnaireDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScInput,
  ScQuestionnaire,
  ScQuestionnaireActions,
  ScQuestionnaireDescription,
  ScQuestionnaireError,
  ScQuestionnaireItem,
  ScQuestionnaireNext,
  ScQuestionnairePrevious,
  ScQuestionnaireProgress,
  ScQuestionnaireSubmit,
  ScQuestionnaireTitle,
  ScTextarea,
} from '@semantic-components/ui';

/** A question answered in words: your scInput or scTextarea with [formField], named — Enter moves on. */
@Component({
  selector: 'app-freeform-questionnaire-demo',
  imports: [
    JsonPipe,
    FormField,
    FormRoot,
    ScInput,
    ScQuestionnaire,
    ScQuestionnaireActions,
    ScQuestionnaireDescription,
    ScQuestionnaireError,
    ScQuestionnaireItem,
    ScQuestionnaireNext,
    ScQuestionnairePrevious,
    ScQuestionnaireProgress,
    ScQuestionnaireSubmit,
    ScQuestionnaireTitle,
    ScTextarea,
  ],
  template: \`
    <form scQuestionnaire [formRoot]="survey" #questionnaire="scQuestionnaire">
      <div scQuestionnaireProgress aria-label="Progress">
        Question {{ questionnaire.current() }} of {{ questionnaire.total() }}
      </div>
      <fieldset scQuestionnaireItem name="approach" [field]="survey.approach">
        <legend scQuestionnaireTitle>
          How should the agent approach this refactor?
        </legend>
        <p scQuestionnaireDescription>
          Write the instruction in your own words.
        </p>
        <textarea
          scTextarea
          aria-label="Refactoring approach"
          [formField]="survey.approach"
        ></textarea>
        <p scQuestionnaireError>Write an answer to continue.</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="deadline" [field]="survey.deadline">
        <legend scQuestionnaireTitle>By when?</legend>
        <p scQuestionnaireDescription>A date or a few words.</p>
        <input scInput aria-label="Deadline" [formField]="survey.deadline" />
        <p scQuestionnaireError>Write an answer to continue.</p>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Use this approach</button>
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
export class FreeformQuestionnaireDemo {
  private readonly model = signal({ approach: '', deadline: '' });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);

  readonly survey = form(
    this.model,
    (s) => {
      required(s.approach);
      required(s.deadline);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}`;
}
