import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { BasicFieldDemoContainer } from './demos/basic-field-demo-container';
import { HorizontalFieldDemoContainer } from './demos/horizontal-field-demo-container';
import { ErrorFieldDemoContainer } from './demos/error-field-demo-container';
import { FieldsetDemoContainer } from './demos/fieldset-demo-container';
import { SeparatorFieldDemoContainer } from './demos/separator-field-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-field-page',
  imports: [
    BasicFieldDemoContainer,
    HorizontalFieldDemoContainer,
    ErrorFieldDemoContainer,
    FieldsetDemoContainer,
    SeparatorFieldDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Field</h1>
        <p class="text-muted-foreground">
          A flexible field composition system for building accessible forms with
          labels, descriptions, errors, and various layout orientations.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>
      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-field-demo-container />
        <app-horizontal-field-demo-container />
        <app-error-field-demo-container />
        <app-fieldset-demo-container />
        <app-separator-field-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class FieldPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'field')!.status;
}
