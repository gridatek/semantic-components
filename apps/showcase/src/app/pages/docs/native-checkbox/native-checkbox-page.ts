import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicNativeCheckboxDemoContainer } from './demos/basic-native-checkbox-demo-container';
import { IndeterminateNativeCheckboxDemoContainer } from './demos/indeterminate-native-checkbox-demo-container';
import { SignalFormsNativeCheckboxDemoContainer } from './demos/signal-forms-native-checkbox-demo-container';

@Component({
  selector: 'app-native-checkbox-page',
  imports: [
    BasicNativeCheckboxDemoContainer,
    IndeterminateNativeCheckboxDemoContainer,
    SignalFormsNativeCheckboxDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Native Checkbox</h1>
        <p class="text-muted-foreground">
          A native input checkbox directive that works seamlessly with Angular
          forms and Signal Forms.
        </p>
        <app-component-badges path="native-checkbox" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-native-checkbox-demo-container />
        <app-indeterminate-native-checkbox-demo-container />
        <app-signal-forms-native-checkbox-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NativeCheckboxPage {}
