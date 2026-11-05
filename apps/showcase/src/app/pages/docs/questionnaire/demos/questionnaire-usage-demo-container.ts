import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { DevOnly } from '../../../../components/dev-only/dev-only';
import { ConfigService } from '../../../../services/config-service';
import { QuestionnaireUsageDemo } from './questionnaire-usage-demo';

@Component({
  selector: 'app-questionnaire-usage-demo-container',
  imports: [
    DevOnly,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    SiCheckIcon,
    SiCopyIcon,
    QuestionnaireUsageDemo,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>angular-ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="code" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy to clipboard</span>
          </button>
        </div>
      </div>
      <pre scCodeBlockContent [code]="code" language="angular-ts"></pre>
    </div>

    @if (devMode()) {
      <app-dev-only>
        <app-questionnaire-usage-demo />
      </app-dev-only>
    }
  `,
  host: { class: 'block w-full space-y-4' },
  encapsulation: ViewEncapsulation.None,
})
export class QuestionnaireUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScQuestionnaire,
  ScQuestionnaireActions,
  ScQuestionnaireChoice,
  ScQuestionnaireChoiceDescription,
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

@Component({
  selector: 'app-questionnaire-usage-demo',
  imports: [
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
          <label scQuestionnaireChoice>
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
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
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
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
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
            <kbd scQuestionnaireChoiceShortcut></kbd>
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
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.signals.progress"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Progress </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.signals.decisions"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Decisions </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.signals.risks"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Risks </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="checkbox"
              scQuestionnaireChoiceInput
              [formField]="survey.signals.nextStep"
            />
            <span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>
            <span scQuestionnaireChoiceLabel> Next step </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
        </div>
      </fieldset>
      <fieldset scQuestionnaireItem name="timing" [field]="survey.timing">
        <legend scQuestionnaireTitle>When should work begin?</legend>
        <p scQuestionnaireDescription>
          Choose when the agent should begin the work.
        </p>
        <div scQuestionnaireChoices>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="now"
              [formField]="survey.timing"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Start now </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="next-cycle"
              [formField]="survey.timing"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Next development cycle </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
          </label>
          <label scQuestionnaireChoice>
            <input
              type="radio"
              scQuestionnaireChoiceInput
              value="backlog"
              [formField]="survey.timing"
            />
            <span scQuestionnaireChoiceIndicator></span>
            <span scQuestionnaireChoiceLabel> Add it to the backlog </span>
            <kbd scQuestionnaireChoiceShortcut></kbd>
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
      <div class="bg-muted rounded-md p-4 text-sm">
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
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);

  readonly survey = form(
    this.model,
    (s) => {
      required(s.direction);
      required(s.timing);
    },
    { submission: { action: async () => this.sent.set(this.model()) } },
  );
}`;
}
