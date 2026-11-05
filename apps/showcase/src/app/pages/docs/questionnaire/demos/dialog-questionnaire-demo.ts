import { JsonPipe } from '@angular/common';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScButton,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
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

/** In a Dialog: Cancel is the dialog’s close; sending the answers closes it through [(open)]. */
@Component({
  selector: 'app-dialog-questionnaire-demo',
  imports: [
    JsonPipe,
    FormField,
    FormRoot,
    ScButton,
    ScDialog,
    ScDialogClose,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
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
    <div scDialogProvider [(open)]="open">
      <button scButton variant="outline" scDialogTrigger>
        Answer the agent
      </button>
      <ng-template scDialogPortal>
        <div scDialog>
          <div scDialogHeader>
            <h2 scDialogTitle>The agent has two questions</h2>
            <p scDialogDescription>Answer them so it can go on.</p>
          </div>
          <form
            scQuestionnaire
            [formRoot]="survey"
            #questionnaire="scQuestionnaire"
          >
            <div scQuestionnaireProgress aria-label="Progress">
              Question {{ questionnaire.current() }} of
              {{ questionnaire.total() }}
            </div>
            <fieldset scQuestionnaireItem name="scope" [field]="survey.scope">
              <legend scQuestionnaireTitle>Which files are in scope?</legend>
              <div scQuestionnaireChoices>
                <label scQuestionnaireChoice>
                  <input
                    type="radio"
                    scQuestionnaireChoiceInput
                    value="folder"
                    [formField]="survey.scope"
                  />
                  <span scQuestionnaireChoiceIndicator></span>
                  <span scQuestionnaireChoiceLabel> Only this folder </span>
                  <kbd scQuestionnaireChoiceShortcut></kbd>
                </label>
                <label scQuestionnaireChoice>
                  <input
                    type="radio"
                    scQuestionnaireChoiceInput
                    value="workspace"
                    [formField]="survey.scope"
                  />
                  <span scQuestionnaireChoiceIndicator></span>
                  <span scQuestionnaireChoiceLabel> The whole workspace </span>
                  <kbd scQuestionnaireChoiceShortcut></kbd>
                </label>
              </div>
              <p scQuestionnaireError>Choose an answer to continue.</p>
            </fieldset>
            <fieldset scQuestionnaireItem name="tests" [field]="survey.tests">
              <legend scQuestionnaireTitle>
                How much verification is needed?
              </legend>
              <div scQuestionnaireChoices>
                <label scQuestionnaireChoice>
                  <input
                    type="radio"
                    scQuestionnaireChoiceInput
                    value="quick"
                    [formField]="survey.tests"
                  />
                  <span scQuestionnaireChoiceIndicator></span>
                  <span scQuestionnaireChoiceLabel> A quick check </span>
                  <kbd scQuestionnaireChoiceShortcut></kbd>
                </label>
                <label scQuestionnaireChoice>
                  <input
                    type="radio"
                    scQuestionnaireChoiceInput
                    value="full"
                    [formField]="survey.tests"
                  />
                  <span scQuestionnaireChoiceIndicator></span>
                  <span scQuestionnaireChoiceLabel> The full test suite </span>
                  <kbd scQuestionnaireChoiceShortcut></kbd>
                </label>
              </div>
              <p scQuestionnaireError>Choose an answer to continue.</p>
            </fieldset>
            <div scDialogFooter>
              <button scDialogClose variant="outline" size="default">
                Cancel
              </button>
              <div scQuestionnaireActions>
                <button scQuestionnairePrevious>Previous</button>
                <button scQuestionnaireNext>Next</button>
                <button scQuestionnaireSubmit>Send answers</button>
              </div>
            </div>
          </form>
        </div>
      </ng-template>
    </div>
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
export class DialogQuestionnaireDemo {
  private readonly model = signal({ scope: '', tests: '' });
  readonly sent = signal<ReturnType<typeof this.model> | null>(null);
  readonly open = signal(false);

  readonly survey = form(
    this.model,
    (s) => {
      required(s.scope);
      required(s.tests);
    },
    {
      submission: {
        action: async () => {
          this.sent.set(this.model());
          this.open.set(false);
        },
      },
    },
  );
}
