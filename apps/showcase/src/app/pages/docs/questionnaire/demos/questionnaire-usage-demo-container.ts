import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { QuestionnaireUsageDemo } from './questionnaire-usage-demo';

@Component({
  selector: 'app-questionnaire-usage-demo-container',
  imports: [UsageCode, QuestionnaireUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-questionnaire-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class QuestionnaireUsageDemoContainer {
  private readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScFrame,
  ScKbd,
  ScQuestionnaire,
  ScQuestionnaireActions,
  ScQuestionnaireChoice,
  ScQuestionnaireChoiceDescription,
  ScQuestionnaireChoiceIndicator,
  ScQuestionnaireChoiceInput,
  ScQuestionnaireChoiceLabel,
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

@Component({
  selector: 'app-questionnaire-usage-demo',
  imports: [
    ScKbd,
    ScFrame,
    JsonPipe,
    FormField,
    FormRoot,
    ScQuestionnaire,
    ScQuestionnaireActions,
    ScQuestionnaireChoice,
    ScQuestionnaireChoiceDescription,
    ScQuestionnaireChoiceIndicator,
    ScQuestionnaireChoiceInput,
    ScQuestionnaireChoiceLabel,
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
      shortcuts="letters"
    >
      <div scQuestionnaireProgress aria-label="Progress">
        Question {{ questionnaire.current() }} of {{ questionnaire.total() }}
      </div>
      <fieldset scQuestionnaireItem name="direction" [field]="survey.direction">
        <legend scQuestionnaireTitle>What should the agent build next?</legend>
        <p scQuestionnaireDescription>
          Choose the direction that matters most.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice #toolCallsChoice="scQuestionnaireChoice">
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="tool-calls"
              [formField]="survey.direction"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel>
              Tool call timeline
              <span scQuestionnaireChoiceDescription
                >Show what the agent ran and what came back.</span
              >
            </span>
            @if (toolCallsChoice.shortcut()) {
              <kbd scKbd aria-hidden="true">{{
                toolCallsChoice.shortcut()
              }}</kbd>
            }
          </label>
          <label scQuestionnaireChoice #approvalsChoice="scQuestionnaireChoice">
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="approvals"
              [formField]="survey.direction"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel>
              Approval checkpoints
              <span scQuestionnaireChoiceDescription
                >Ask before sensitive or destructive actions.</span
              >
            </span>
            @if (approvalsChoice.shortcut()) {
              <kbd scKbd aria-hidden="true">{{
                approvalsChoice.shortcut()
              }}</kbd>
            }
          </label>
          <label scQuestionnaireChoice #handoffsChoice="scQuestionnaireChoice">
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="handoffs"
              [formField]="survey.direction"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel>
              Sub-agent handoffs
              <span scQuestionnaireChoiceDescription
                >Make delegated work and results easier to follow.</span
              >
            </span>
            @if (handoffsChoice.shortcut()) {
              <kbd scKbd aria-hidden="true">{{
                handoffsChoice.shortcut()
              }}</kbd>
            }
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <fieldset scQuestionnaireItem name="signals" [field]="survey.signals">
        <legend scQuestionnaireTitle>
          What should every progress update include?
        </legend>
        <p scQuestionnaireDescription>
          Select all that apply, or skip this question.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice #choice1="scQuestionnaireChoice">
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.signals.progress"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Progress </span>
            @if (choice1.shortcut()) {
              <kbd scKbd aria-hidden="true">{{ choice1.shortcut() }}</kbd>
            }
          </label>
          <label scQuestionnaireChoice #choice2="scQuestionnaireChoice">
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.signals.decisions"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Decisions </span>
            @if (choice2.shortcut()) {
              <kbd scKbd aria-hidden="true">{{ choice2.shortcut() }}</kbd>
            }
          </label>
          <label scQuestionnaireChoice #choice3="scQuestionnaireChoice">
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.signals.risks"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Risks </span>
            @if (choice3.shortcut()) {
              <kbd scKbd aria-hidden="true">{{ choice3.shortcut() }}</kbd>
            }
          </label>
          <label scQuestionnaireChoice #choice4="scQuestionnaireChoice">
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.signals.nextStep"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Next step </span>
            @if (choice4.shortcut()) {
              <kbd scKbd aria-hidden="true">{{ choice4.shortcut() }}</kbd>
            }
          </label>
        </div>
      </fieldset>
      <fieldset scQuestionnaireItem name="timing" [field]="survey.timing">
        <legend scQuestionnaireTitle>When should work begin?</legend>
        <p scQuestionnaireDescription>
          Choose when the agent should begin the work.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice #nowChoice="scQuestionnaireChoice">
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="now"
              [formField]="survey.timing"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Start now </span>
            @if (nowChoice.shortcut()) {
              <kbd scKbd aria-hidden="true">{{ nowChoice.shortcut() }}</kbd>
            }
          </label>
          <label scQuestionnaireChoice #nextCycleChoice="scQuestionnaireChoice">
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="next-cycle"
              [formField]="survey.timing"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Next development cycle </span>
            @if (nextCycleChoice.shortcut()) {
              <kbd scKbd aria-hidden="true">{{
                nextCycleChoice.shortcut()
              }}</kbd>
            }
          </label>
          <label scQuestionnaireChoice #backlogChoice="scQuestionnaireChoice">
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="backlog"
              [formField]="survey.timing"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Add it to the backlog </span>
            @if (backlogChoice.shortcut()) {
              <kbd scKbd aria-hidden="true">{{ backlogChoice.shortcut() }}</kbd>
            }
          </label>
        </div>
        <p scQuestionnaireError>Choose an answer to continue.</p>
      </fieldset>
      <div scQuestionnaireActions>
        <button scQuestionnairePrevious>Previous</button>
        <button scQuestionnaireSkip>Skip</button>
        <button scQuestionnaireNext>Next</button>
        <button scQuestionnaireSubmit>Save plan</button>
      </div>
    </form>
    @if (sent(); as answers) {
      <div scFrame class="bg-muted p-4 text-sm">
        <p class="font-medium">Submitted</p>
        <pre class="mt-2 whitespace-pre-wrap">{{ answers | json }}</pre>
      </div>
    }
  \`,
  host: { class: 'flex w-full max-w-md flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class QuestionnaireUsageDemo {
  private readonly model = signal({
    direction: '',
    signals: {
      progress: false,
      decisions: false,
      risks: false,
      nextStep: false,
    },
    timing: '',
  });
  private readonly sent = signal<ReturnType<typeof this.model> | null>(null);

  private readonly survey = form(
    this.model,
    (s) => {
      required(s.direction);
      required(s.timing);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}`;
}
