import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ResumeQuestionnaireDemo } from './resume-questionnaire-demo';

@Component({
  selector: 'app-resume-questionnaire-demo-container',
  imports: [DemoContainer, ResumeQuestionnaireDemo],
  template: `
    <app-demo-container
      title="Resume"
      demoUrl="/demos/questionnaire/resume-questionnaire-demo"
      [code]="code"
    >
      <app-resume-questionnaire-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ResumeQuestionnaireDemoContainer {
  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  form,
  required,
  validate,
} from '@angular/forms/signals';
import {
  ScButton,
  ScInput,
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
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** What was saved last time. */
const saved = () => ({
  change: 'incremental',
  verification: { tests: true, typecheck: true, manual: false },
  notes: 'Keep the existing public API stable.',
});

/** Answers saved last time, back at the question where it stopped; Reset goes back to them. */
@Component({
  selector: 'app-resume-questionnaire-demo',
  imports: [
    JsonPipe,
    FormField,
    FormRoot,
    ScButton,
    ScInput,
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
    SiCheckIcon,
  ],
  template: \`
    <form
      scQuestionnaire
      [formRoot]="survey"
      #questionnaire="scQuestionnaire"
      [(item)]="item"
    >
      <div scQuestionnaireProgress aria-label="Progress">
        Question {{ questionnaire.current() }} of {{ questionnaire.total() }}
      </div>
      <fieldset scQuestionnaireItem name="change" [field]="survey.change">
        <legend scQuestionnaireTitle>What kind of migration is this?</legend>
        <p scQuestionnaireDescription>
          This answer was saved during the previous session.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="incremental"
              [formField]="survey.change"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Incremental migration </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="cutover"
              [formField]="survey.change"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Single cutover </span>
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
        <legend scQuestionnaireTitle>
          How should the migration be verified?
        </legend>
        <p scQuestionnaireDescription>
          These checks were selected during the previous session.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.verification.tests"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Run migration tests </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.verification.typecheck"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Run the typecheck </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.verification.manual"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel>
              Perform a manual smoke test
            </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="notes" [field]="survey.notes">
        <legend scQuestionnaireTitle>
          Anything else the agent should remember?
        </legend>
        <p scQuestionnaireDescription>This note was saved with the draft.</p>
        <input
          scInput
          aria-label="Saved migration note"
          [formField]="survey.notes"
        />
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireSkip>Skip</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Update draft</button>
      </div>
      <button
        scButton
        variant="outline"
        type="button"
        class="self-start"
        (click)="reset()"
      >
        Reset changes
      </button>
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
export class ResumeQuestionnaireDemo {
  private readonly model = signal(saved());
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);
  readonly item = signal('verification');

  reset(): void {
    this.model.set(saved());
    this.item.set('verification');
  }

  readonly survey = form(
    this.model,
    (s) => {
      required(s.change);
      validate(s.verification, ({ value }) =>
        Object.values(value()).some(Boolean)
          ? null
          : { kind: 'required', message: 'Choose at least one check.' },
      );
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}`;
}
