import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, required } from '@angular/forms/signals';
import {
  ScKbd,
  ScQuestionnaire,
  ScQuestionnaireActions,
  ScQuestionnaireChoice,
  ScQuestionnaireChoiceIndicator,
  ScQuestionnaireChoiceInput,
  ScQuestionnaireChoiceLabel,
  ScQuestionnaireChoices,
  ScQuestionnaireError,
  ScQuestionnaireItem,
  ScQuestionnaireNext,
  ScQuestionnairePrevious,
  ScQuestionnaireProgress,
  ScQuestionnaireSkip,
  ScQuestionnaireSubmit,
  ScQuestionnaireTitle,
} from '@semantic-components/ui';

@Component({
  selector: 'app-rtl-questionnaire-demo',
  imports: [
    ScKbd,
    Dir,
    FormField,
    FormRoot,
    ScQuestionnaire,
    ScQuestionnaireActions,
    ScQuestionnaireChoice,
    ScQuestionnaireChoiceIndicator,
    ScQuestionnaireChoiceInput,
    ScQuestionnaireChoiceLabel,
    ScQuestionnaireChoices,
    ScQuestionnaireError,
    ScQuestionnaireItem,
    ScQuestionnaireNext,
    ScQuestionnairePrevious,
    ScQuestionnaireProgress,
    ScQuestionnaireSkip,
    ScQuestionnaireSubmit,
    ScQuestionnaireTitle,
  ],
  template: `
    <div dir="rtl" lang="ar">
      <form
        scQuestionnaire
        shortcuts="numbers"
        [formRoot]="survey"
        #questionnaire="scQuestionnaire"
      >
        <div scQuestionnaireProgress aria-label="التقدّم">
          السؤال {{ questionnaire.current() }} من {{ questionnaire.total() }}
        </div>
        <fieldset scQuestionnaireItem name="goal" [field]="survey.goal">
          <legend scQuestionnaireTitle>بماذا نبدأ؟</legend>
          <div scQuestionnaireChoices>
            <label scQuestionnaireChoice #testsChoice="scQuestionnaireChoice">
              <input
                type="radio"
                scQuestionnaireChoiceInput
                value="tests"
                [formField]="survey.goal"
              />
              <span scQuestionnaireChoiceIndicator></span>
              <span scQuestionnaireChoiceLabel> إضافة الاختبارات </span>
              @if (testsChoice.shortcut()) {
                <kbd scKbd aria-hidden="true">{{ testsChoice.shortcut() }}</kbd>
              }
            </label>
            <label scQuestionnaireChoice #docsChoice="scQuestionnaireChoice">
              <input
                type="radio"
                scQuestionnaireChoiceInput
                value="docs"
                [formField]="survey.goal"
              />
              <span scQuestionnaireChoiceIndicator></span>
              <span scQuestionnaireChoiceLabel> كتابة التوثيق </span>
              @if (docsChoice.shortcut()) {
                <kbd scKbd aria-hidden="true">{{ docsChoice.shortcut() }}</kbd>
              }
            </label>
          </div>
          <p scQuestionnaireError>اختر إجابة للمتابعة.</p>
        </fieldset>
        <fieldset scQuestionnaireItem name="when" [field]="survey.when">
          <legend scQuestionnaireTitle>متى؟</legend>
          <div scQuestionnaireChoices>
            <label scQuestionnaireChoice #weekChoice="scQuestionnaireChoice">
              <input
                type="radio"
                scQuestionnaireChoiceInput
                value="week"
                [formField]="survey.when"
              />
              <span scQuestionnaireChoiceIndicator></span>
              <span scQuestionnaireChoiceLabel> هذا الأسبوع </span>
              @if (weekChoice.shortcut()) {
                <kbd scKbd aria-hidden="true">{{ weekChoice.shortcut() }}</kbd>
              }
            </label>
            <label scQuestionnaireChoice #monthChoice="scQuestionnaireChoice">
              <input
                type="radio"
                scQuestionnaireChoiceInput
                value="month"
                [formField]="survey.when"
              />
              <span scQuestionnaireChoiceIndicator></span>
              <span scQuestionnaireChoiceLabel> هذا الشهر </span>
              @if (monthChoice.shortcut()) {
                <kbd scKbd aria-hidden="true">{{ monthChoice.shortcut() }}</kbd>
              }
            </label>
          </div>
          <p scQuestionnaireError>اختر إجابة للمتابعة.</p>
        </fieldset>
        <div scQuestionnaireActions>
          <button scQuestionnairePrevious>السابق</button>
          <button scQuestionnaireSkip>تخطٍّ</button>
          <button scQuestionnaireNext>التالي</button>
          <button scQuestionnaireSubmit>إرسال</button>
        </div>
      </form>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full max-w-md flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlQuestionnaireDemo {
  private readonly model = signal({ goal: '', when: '' });

  private readonly survey = form(this.model, (s) => {
    required(s.goal);
    required(s.when);
  });
}
