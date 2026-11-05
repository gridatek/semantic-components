import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AnimatedQuestionnaireDemoContainer } from './demos/animated-questionnaire-demo-container';
import { CardQuestionnaireDemoContainer } from './demos/card-questionnaire-demo-container';
import { ConditionalQuestionnaireDemoContainer } from './demos/conditional-questionnaire-demo-container';
import { ControlledQuestionnaireDemoContainer } from './demos/controlled-questionnaire-demo-container';
import { DialogQuestionnaireDemoContainer } from './demos/dialog-questionnaire-demo-container';
import { FreeformQuestionnaireDemoContainer } from './demos/freeform-questionnaire-demo-container';
import { MultipleQuestionnaireDemoContainer } from './demos/multiple-questionnaire-demo-container';
import { NavigationStateQuestionnaireDemoContainer } from './demos/navigation-state-questionnaire-demo-container';
import { ProgressQuestionnaireDemoContainer } from './demos/progress-questionnaire-demo-container';
import { QuestionnaireUsageDemoContainer } from './demos/questionnaire-usage-demo-container';
import { ResumeQuestionnaireDemoContainer } from './demos/resume-questionnaire-demo-container';
import { RtlQuestionnaireDemoContainer } from './demos/rtl-questionnaire-demo-container';
import { ShortcutsQuestionnaireDemoContainer } from './demos/shortcuts-questionnaire-demo-container';
import { SkipQuestionnaireDemoContainer } from './demos/skip-questionnaire-demo-container';
import { ValidationQuestionnaireDemoContainer } from './demos/validation-questionnaire-demo-container';

@Component({
  selector: 'app-questionnaire-page',
  imports: [
    Anatomy,
    QuestionnaireUsageDemoContainer,
    MultipleQuestionnaireDemoContainer,
    FreeformQuestionnaireDemoContainer,
    SkipQuestionnaireDemoContainer,
    ShortcutsQuestionnaireDemoContainer,
    ValidationQuestionnaireDemoContainer,
    ControlledQuestionnaireDemoContainer,
    ResumeQuestionnaireDemoContainer,
    ConditionalQuestionnaireDemoContainer,
    NavigationStateQuestionnaireDemoContainer,
    ProgressQuestionnaireDemoContainer,
    AnimatedQuestionnaireDemoContainer,
    CardQuestionnaireDemoContainer,
    DialogQuestionnaireDemoContainer,
    RtlQuestionnaireDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Questionnaire</h1>
        <p class="text-muted-foreground">
          Questions one at a time, on your Signal Form: each answer checked
          against your schema before moving on, optional ones skipped, the last
          one submitting. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="questionnaire" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-questionnaire-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the questions, the choices
          and every word are yours. Your Signal Form holds the answers, its
          schema the rules.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Keyboard</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Enter on a chosen answer (or a filled text field) moves on — or
            submits on the last question; Ctrl/⌘+Enter from anywhere in it.
          </li>
          <li>
            ArrowUp and ArrowDown between the answers; ArrowLeft and ArrowRight
            outside them: back, and forward once answered — mirrored in
            right-to-left.
          </li>
          <li>
            With shortcuts, a letter or a number picks a choice, outside text
            fields.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Each question is a named group (a fieldset and its legend, or
            aria-labelledby in a card); its description and — once tried wrong —
            its error are read with it.
          </li>
          <li>
            Moving on focuses the new question; a wrong answer, the answer. The
            questions not shown are hidden and inert.
          </li>
          <li>
            Name the progress (aria-label) and write its text: screen readers
            hear it as the progressbar&apos;s value.
          </li>
          <li>
            A free answer needs a name — a label or aria-label: a placeholder
            isn&apos;t one.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-multiple-questionnaire-demo-container />
        <app-freeform-questionnaire-demo-container />
        <app-skip-questionnaire-demo-container />
        <app-shortcuts-questionnaire-demo-container />
        <app-validation-questionnaire-demo-container />
        <app-controlled-questionnaire-demo-container />
        <app-resume-questionnaire-demo-container />
        <app-conditional-questionnaire-demo-container />
        <app-navigation-state-questionnaire-demo-container />
        <app-progress-questionnaire-demo-container />
        <app-animated-questionnaire-demo-container />
        <app-card-questionnaire-demo-container />
        <app-dialog-questionnaire-demo-container />
        <app-rtl-questionnaire-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Questionnaire parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class QuestionnairePage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScQuestionnaire, ScQuestionnaireProgress, ScQuestionnaireItem,',
      '  ScQuestionnaireTitle, ScQuestionnaireDescription, ScQuestionnaireChoices,',
      '  ScQuestionnaireChoice, ScQuestionnaireChoiceInput,',
      '  ScQuestionnaireChoiceIndicator, ScQuestionnaireChoiceLabel,',
      '  ScQuestionnaireChoiceDescription, ScQuestionnaireChoiceShortcut,',
      '  ScQuestionnaireError, ScQuestionnaireActions, ScQuestionnairePrevious,',
      '  ScQuestionnaireSkip, ScQuestionnaireNext, ScQuestionnaireSubmit,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<form scQuestionnaire [formRoot]="survey">',
      '  <div scQuestionnaireProgress aria-label="…">…</div>',
      '  <fieldset scQuestionnaireItem name="…" [field]="survey.…">',
      '    <legend scQuestionnaireTitle>…</legend>',
      '    <p scQuestionnaireDescription>…</p>',
      '    <div scQuestionnaireChoices>',
      '      <label scQuestionnaireChoice>',
      '        <input type="radio" scQuestionnaireChoiceInput value="…" [formField]="survey.…" />',
      '        <span scQuestionnaireChoiceIndicator></span>',
      '        <span scQuestionnaireChoiceLabel>',
      '          …',
      '          <span scQuestionnaireChoiceDescription>…</span>',
      '        </span>',
      '        <kbd scQuestionnaireChoiceShortcut></kbd>',
      '      </label>',
      '    </div>',
      '    <p scQuestionnaireError>…</p>',
      '  </fieldset>',
      '  <div scQuestionnaireActions>',
      '    <button scQuestionnairePrevious>…</button>',
      '    <button scQuestionnaireSkip>…</button>',
      '    <button scQuestionnaireNext>…</button>',
      '    <button scQuestionnaireSubmit>…</button>',
      '  </div>',
      '</form>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScQuestionnaire',
      selector: 'form[scQuestionnaire]',
      description:
        "With your [formRoot]. [(item)], the question shown, by name; shortcuts ('letters', 'numbers'). Through exportAs: current(), total(), first(), last(), active(), previous(), next(), skip(), advance().",
    },
    {
      name: 'ScQuestionnaireProgress',
      selector: 'div[scQuestionnaireProgress]',
      description:
        'A progressbar: name it, write its text (its value for screen readers).',
    },
    {
      name: 'ScQuestionnaireItem',
      selector: 'fieldset[scQuestionnaireItem]',
      description:
        'A question: name, field (its answer, required and valid as your schema says). Hidden and inert when not shown; data-status answered or unanswered.',
    },
    {
      name: 'ScQuestionnaireTitle, ScQuestionnaireDescription',
      selector: 'legend[…], p[…]',
      description: 'The question, and what to read with it.',
    },
    {
      name: 'ScQuestionnaireChoices, ScQuestionnaireChoice',
      selector: 'div[…], label[scQuestionnaireChoice]',
      description: 'The choices, in a column; a choice’s card, picked whole.',
    },
    {
      name: 'ScQuestionnaireChoiceInput',
      selector: 'input[scQuestionnaireChoiceInput]',
      description:
        'type radio (one answer, its value) or checkbox (several, each a boolean), with your [formField]: over the card, unseen.',
    },
    {
      name: 'ScQuestionnaireChoiceIndicator, ScQuestionnaireChoiceLabel, ScQuestionnaireChoiceDescription',
      selector: 'span[…]',
      description:
        'A radio’s dot, or your check icon for a checkbox; the choice’s text, and more about it.',
    },
    {
      name: 'ScQuestionnaireChoiceShortcut',
      selector: 'kbd[scQuestionnaireChoiceShortcut]',
      description: 'Its key, written for you; hidden without shortcuts.',
    },
    {
      name: 'ScQuestionnaireError',
      selector: 'p[scQuestionnaireError]',
      description:
        'Your words: shown and announced once the question is tried wrong.',
    },
    {
      name: 'ScQuestionnaireActions',
      selector: 'div[scQuestionnaireActions]',
      description: 'The buttons’ row.',
    },
    {
      name: 'ScQuestionnairePrevious, ScQuestionnaireSkip, ScQuestionnaireNext, ScQuestionnaireSubmit',
      selector: 'button[…]',
      description:
        'The preset’s button, variant and size. Each shows when it applies: Previous from the second question, Skip on an optional one, Next before the last, Submit on it.',
    },
  ];
}
