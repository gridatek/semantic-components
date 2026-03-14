import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicCopyToClipboardDemoContainer } from './demos/basic-copy-to-clipboard-demo-container';
import { CopyToClipboardUsageDemoContainer } from './demos/copy-to-clipboard-usage-demo-container';

@Component({
  selector: 'app-copy-to-clipboard-page',
  imports: [
    BasicCopyToClipboardDemoContainer,
    CopyToClipboardUsageDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Copy to Clipboard</h1>
        <p class="text-muted-foreground">
          A composable directive for copying text to the clipboard with visual
          feedback.
        </p>
        <app-component-badges path="copy-to-clipboard" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-copy-to-clipboard-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-copy-to-clipboard-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CopyToClipboardPage {}
