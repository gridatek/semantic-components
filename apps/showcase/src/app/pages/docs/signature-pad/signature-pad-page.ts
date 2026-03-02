import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicSignaturePadDemoContainer } from './demos/basic-signature-pad-demo-container';
import { ColorsSignaturePadDemoContainer } from './demos/colors-signature-pad-demo-container';
import { DisabledSignaturePadDemoContainer } from './demos/disabled-signature-pad-demo-container';
import { FormSignaturePadDemoContainer } from './demos/form-signature-pad-demo-container';
import { NoControlsSignaturePadDemoContainer } from './demos/no-controls-signature-pad-demo-container';
import { PreviewSignaturePadDemoContainer } from './demos/preview-signature-pad-demo-container';
import { SmallSignaturePadDemoContainer } from './demos/small-signature-pad-demo-container';
import { ThickPenSignaturePadDemoContainer } from './demos/thick-pen-signature-pad-demo-container';

@Component({
  selector: 'app-signature-pad-page',
  imports: [
    BasicSignaturePadDemoContainer,
    ColorsSignaturePadDemoContainer,
    ThickPenSignaturePadDemoContainer,
    NoControlsSignaturePadDemoContainer,
    DisabledSignaturePadDemoContainer,
    SmallSignaturePadDemoContainer,
    PreviewSignaturePadDemoContainer,
    FormSignaturePadDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>SignaturePad</h1>
        <p class="text-muted-foreground">
          Canvas-based signature capture with touch and mouse support.
        </p>
        <app-component-badges path="signature-pad" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-signature-pad-demo-container />
        <app-colors-signature-pad-demo-container />
        <app-thick-pen-signature-pad-demo-container />
        <app-no-controls-signature-pad-demo-container />
        <app-disabled-signature-pad-demo-container />
        <app-small-signature-pad-demo-container />
        <app-preview-signature-pad-demo-container />
        <app-form-signature-pad-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SignaturePadPage {}
