import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScHeading, ScLink } from '@semantic-components/ui';
import { Anatomy } from '../../../../components/anatomy/anatomy';
import { TocHeading } from '../../../../components/toc/toc-heading';
import { ModelSelectorUsageDemoContainer } from './demos/model-selector-usage-demo-container';
import { RtlModelSelectorDemoContainer } from './demos/rtl-model-selector-demo-container';

/** shadcn's Model Selector pattern: the model, and how hard it thinks. */
@Component({
  selector: 'app-model-selector-page',
  imports: [
    Anatomy,
    ModelSelectorUsageDemoContainer,
    RouterLink,
    RtlModelSelectorDemoContainer,
    ScHeading,
    ScLink,
    TocHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Model Selector</h1>
        <p class="text-muted-foreground">
          Two menus: one picks the model the agent runs, the other picks how
          hard it thinks.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-model-selector-usage-demo-container />
        <p class="text-muted-foreground">
          Two <a scLink routerLink="/docs/components/menu">Menus</a> with radio
          items, their triggers buttons in the
          <a scLink routerLink="/docs/components/input-group">Input Group</a>
          of a
          <a scLink routerLink="/docs/ai-elements/prompt-input">Prompt Input</a
          >. Choosing closes the menu (<code
            class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >closeOnClick</code
          >); the trigger shows the choice, its name says what it is
          (&quot;Model: GPT-5&quot;, the word in hidden text).
        </p>
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Sending</h2>
        <p class="text-muted-foreground">
          Send the model and the effort with the message; the server maps them
          to a model and its provider&apos;s options.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-rtl-model-selector-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          See the <a scLink routerLink="/docs/components/menu">Menu</a> and the
          <a scLink routerLink="/docs/components/input-group">Input Group</a>.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ModelSelectorPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScMenuProvider, ScMenuTrigger, ScMenuPortal, ScMenu, ScMenuContent,',
      '  ScMenuGroup, ScMenuLabel, ScMenuRadioGroup, ScMenuRadioItem, ScMenuItemIndicator,',
      '  ScInputGroup, ScInputGroupAddon, ScInputGroupButton, ScTextarea,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scInputGroup>',
      '  <textarea scTextarea aria-label="Message"></textarea>',
      '  <div scInputGroupAddon side="bottom">',
      '    <div scMenuProvider alignment="start">',
      '      <button scInputGroupButton scMenuTrigger size="sm" variant="outline">',
      '        <span class="sr-only">Model: </span>GPT-5',
      '        <svg siChevronDownIcon></svg>',
      '      </button>',
      '      <ng-template scMenuPortal>',
      '        <div scMenu>',
      '          <ng-template scMenuContent>',
      '            <div scMenuRadioGroup [value]="model()" (valueChange)="model.set($event)">',
      '              <div scMenuRadioItem closeOnClick value="gpt-5">',
      '                <span scMenuItemIndicator><svg siCheckIcon></svg></span>',
      '                GPT-5',
      '              </div>',
      '              …',
      '            </div>',
      '          </ng-template>',
      '        </div>',
      '      </ng-template>',
      '    </div>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };
}
