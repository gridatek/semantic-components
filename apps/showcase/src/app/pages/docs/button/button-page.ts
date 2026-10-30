import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AsLinkButtonDemoContainer } from './demos/as-link-button-demo-container';
import { ButtonUsageDemoContainer } from './demos/button-usage-demo-container';
import { DefaultButtonDemoContainer } from './demos/default-button-demo-container';
import { DestructiveButtonDemoContainer } from './demos/destructive-button-demo-container';
import { DisabledButtonDemoContainer } from './demos/disabled-button-demo-container';
import { GhostButtonDemoContainer } from './demos/ghost-button-demo-container';
import { GroupButtonDemoContainer } from './demos/group-button-demo-container';
import { IconButtonDemoContainer } from './demos/icon-button-demo-container';
import { LinkButtonDemoContainer } from './demos/link-button-demo-container';
import { OutlineButtonDemoContainer } from './demos/outline-button-demo-container';
import { RoundedButtonDemoContainer } from './demos/rounded-button-demo-container';
import { RtlButtonDemoContainer } from './demos/rtl-button-demo-container';
import { SecondaryButtonDemoContainer } from './demos/secondary-button-demo-container';
import { SizeButtonDemoContainer } from './demos/size-button-demo-container';
import { SpinnerButtonDemoContainer } from './demos/spinner-button-demo-container';
import { WithIconButtonDemoContainer } from './demos/with-icon-button-demo-container';

@Component({
  selector: 'app-button-page',
  imports: [
    ButtonUsageDemoContainer,
    SizeButtonDemoContainer,
    DefaultButtonDemoContainer,
    OutlineButtonDemoContainer,
    SecondaryButtonDemoContainer,
    GhostButtonDemoContainer,
    DestructiveButtonDemoContainer,
    LinkButtonDemoContainer,
    IconButtonDemoContainer,
    WithIconButtonDemoContainer,
    RoundedButtonDemoContainer,
    SpinnerButtonDemoContainer,
    GroupButtonDemoContainer,
    AsLinkButtonDemoContainer,
    DisabledButtonDemoContainer,
    RtlButtonDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Button</h1>
        <p class="text-muted-foreground">
          Displays a button or a component that looks like a button.
        </p>
        <app-component-badges path="button" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-button-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Cursor</h2>
        <p class="text-muted-foreground">
          Buttons keep the default cursor, as native buttons and Tailwind do: a
          pointer is for links. To show one on buttons anyway, add to your
          global styles:
          <code class="bg-muted rounded px-1 py-0.5 font-mono text-sm"
            >button:not(:disabled) &#123; cursor: pointer; &#125;</code
          >.
        </p>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-size-button-demo-container />
        <app-default-button-demo-container />
        <app-outline-button-demo-container />
        <app-secondary-button-demo-container />
        <app-ghost-button-demo-container />
        <app-destructive-button-demo-container />
        <app-link-button-demo-container />
        <app-icon-button-demo-container />
        <app-with-icon-button-demo-container />
        <app-rounded-button-demo-container />
        <app-spinner-button-demo-container />
        <app-group-button-demo-container />
        <app-as-link-button-demo-container />
        <app-disabled-button-demo-container />
        <app-rtl-button-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ButtonPage {}
