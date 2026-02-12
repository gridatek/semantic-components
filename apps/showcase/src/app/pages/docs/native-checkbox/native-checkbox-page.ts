import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicNativeCheckboxDemoContainer } from './demos/basic-native-checkbox-demo-container';
import { IndeterminateNativeCheckboxDemoContainer } from './demos/indeterminate-native-checkbox-demo-container';
import { SignalFormsNativeCheckboxDemoContainer } from './demos/signal-forms-native-checkbox-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-native-checkbox-page',
  imports: [
    BasicNativeCheckboxDemoContainer,
    IndeterminateNativeCheckboxDemoContainer,
    SignalFormsNativeCheckboxDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Native Checkbox</h1>
        <p class="text-muted-foreground">
          A native input checkbox directive that works seamlessly with Angular
          forms and Signal Forms.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-native-checkbox-demo-container />
        <app-indeterminate-native-checkbox-demo-container />
        <app-signal-forms-native-checkbox-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NativeCheckboxPage {
  readonly componentStatus = COMPONENTS.find(
    (c) => c.path === 'native-checkbox',
  )!.status;
}
