import { JsonPipe } from '@angular/common';
import {
  Component,
  ViewEncapsulation,
  computed,
  signal,
  viewChild,
} from '@angular/core';
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

/** The progress is yours to draw: a step per question, from current() and total(). */
@Component({
  selector: 'app-progress-questionnaire-demo',
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
    <form scQuestionnaire [formRoot]="survey" #questionnaire="scQuestionnaire">
      <div scQuestionnaireProgress aria-label="Progress" class="w-full">
        <div class="mb-2 flex gap-1.5" aria-hidden="true">
          @for (step of steps(); track step) {
            <span
              class="h-1.5 flex-1 rounded-full"
              [class]="
                step <= questionnaire.current() ? 'bg-primary' : 'bg-muted'
              "
            ></span>
          }
        </div>
        Checkpoint {{ questionnaire.current() }} of {{ questionnaire.total() }}
      </div>
      <fieldset scQuestionnaireItem name="scope" [field]="survey.scope">
        <legend scQuestionnaireTitle>How big is the pull request?</legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="small"
              [formField]="survey.scope"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> A small, focused change </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="large"
              [formField]="survey.scope"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> A larger change </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="strategy" [field]="survey.strategy">
        <legend scQuestionnaireTitle>How should commits be organized?</legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="squash"
              [formField]="survey.strategy"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> One squashed commit </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="steps"
              [formField]="survey.strategy"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> A commit per step </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="tests" [field]="survey.tests">
        <legend scQuestionnaireTitle>Which tests come with it?</legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="unit"
              [formField]="survey.tests"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Unit tests </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="e2e"
              [formField]="survey.tests"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Unit and end-to-end tests </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="delivery" [field]="survey.delivery">
        <legend scQuestionnaireTitle>How should the work be delivered?</legend>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="draft"
              [formField]="survey.delivery"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> A draft pull request </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="ready"
              [formField]="survey.delivery"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Ready for review </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Plan the pull request</button>
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
export class ProgressQuestionnaireDemo {
  private readonly model = signal({
    scope: '',
    strategy: '',
    tests: '',
    delivery: '',
  });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);
  private readonly questionnaire = viewChild.required(ScQuestionnaire);
  /** A step per question: 1 to total. */
  protected readonly steps = computed(() =>
    Array.from({ length: this.questionnaire().total() }, (_, i) => i + 1),
  );

  readonly survey = form(
    this.model,
    (s) => {
      required(s.scope);
      required(s.strategy);
      required(s.tests);
      required(s.delivery);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}
