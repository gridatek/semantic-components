import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicInputButtonDemoContainer } from './demos/basic-input-button-demo-container';

@Component({
  selector: 'app-input-button-page',
  imports: [
    BasicInputButtonDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Input Button</h1>
        <p class="text-muted-foreground">
          A button styled to look like an input field. Useful as a trigger for
          search dialogs, command palettes, or any action that visually
          resembles an input.
        </p>
        <app-component-badges path="input-button" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-input-button-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InputButtonPage {}
