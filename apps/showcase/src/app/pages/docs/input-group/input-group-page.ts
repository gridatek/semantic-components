import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicInputGroupDemoContainer } from './demos/basic-input-group-demo-container';
import { ButtonInputGroupDemoContainer } from './demos/button-input-group-demo-container';
import { TextInputGroupDemoContainer } from './demos/text-input-group-demo-container';
import { KbdInputGroupDemoContainer } from './demos/kbd-input-group-demo-container';
import { SpinnerInputGroupDemoContainer } from './demos/spinner-input-group-demo-container';
import { TextareaInputGroupDemoContainer } from './demos/textarea-input-group-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

@Component({
  selector: 'app-input-group-page',
  imports: [
    BasicInputGroupDemoContainer,
    ButtonInputGroupDemoContainer,
    TextInputGroupDemoContainer,
    KbdInputGroupDemoContainer,
    SpinnerInputGroupDemoContainer,
    TextareaInputGroupDemoContainer,
    TocHeading,
    ComponentBadges,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Input Group</h1>
        <p class="text-muted-foreground">
          A composable input group for combining inputs with addons, buttons,
          and text.
        </p>
        <app-component-badges path="input-group" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-input-group-demo-container />
        <app-button-input-group-demo-container />
        <app-text-input-group-demo-container />
        <app-kbd-input-group-demo-container />
        <app-spinner-input-group-demo-container />
        <app-textarea-input-group-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputGroupPage {}
