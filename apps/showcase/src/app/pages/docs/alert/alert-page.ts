import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DefaultAlertDemoContainer } from './demos/default-alert-demo-container';
import { DestructiveAlertDemoContainer } from './demos/destructive-alert-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentBadges } from '../../../components/component-badges/component-badges';

import { ScHeading } from '@semantic-components/ui';

@Component({
  selector: 'app-alert-page',
  imports: [
    DefaultAlertDemoContainer,
    DestructiveAlertDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Alert</h1>
        <p class="text-muted-foreground">
          Displays a callout for important information.
        </p>
        <app-component-badges path="alert" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-default-alert-demo-container />
        <app-destructive-alert-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AlertPage {}
