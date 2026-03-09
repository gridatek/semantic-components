import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { NativeDialogDemoContainer } from './demos/native-dialog-demo-container';

@Component({
  selector: 'app-native-dialog-page',
  imports: [NativeDialogDemoContainer, TocHeading, ComponentBadges, ScHeading],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Native Dialog</h1>
        <p class="text-muted-foreground">
          A modal dialog built on the native HTML dialog element with built-in
          backdrop, focus trapping, and keyboard handling.
        </p>
        <app-component-badges path="native-dialog" />
      </div>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-native-dialog-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NativeDialogPage {}
