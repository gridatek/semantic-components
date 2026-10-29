import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicQuestionnaireDemoContainer } from './demos/basic-questionnaire-demo-container';
import { MultipleQuestionnaireDemoContainer } from './demos/multiple-questionnaire-demo-container';
import { RtlQuestionnaireDemoContainer } from './demos/rtl-questionnaire-demo-container';
import { ShortcutsQuestionnaireDemoContainer } from './demos/shortcuts-questionnaire-demo-container';

@Component({
  selector: 'app-questionnaire-page',
  imports: [
    BasicQuestionnaireDemoContainer,
    MultipleQuestionnaireDemoContainer,
    ShortcutsQuestionnaireDemoContainer,
    RtlQuestionnaireDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Questionnaire</h1>
        <p class="text-muted-foreground">
          Questions one at a time, on your Signal Form: each answer checked
          against your schema before moving on, optional ones skipped, the last
          one submitting. Choices are cards around native radios and checkboxes;
          letters or numbers pick them, Enter moves on.
        </p>
        <app-component-badges path="questionnaire" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-questionnaire-demo-container />
        <app-multiple-questionnaire-demo-container />
        <app-shortcuts-questionnaire-demo-container />
        <app-rtl-questionnaire-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class QuestionnairePage {}
