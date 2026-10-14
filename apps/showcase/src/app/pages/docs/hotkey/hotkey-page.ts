import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import BasicHotkeyDemoContainer from './demos/basic-hotkey-demo-container';
import { HotkeyUsageDemoContainer } from './demos/hotkey-usage-demo-container';

@Component({
  selector: 'app-hotkey-page',
  imports: [
    TocHeading,
    ComponentBadges,
    ScHeading,
    HotkeyUsageDemoContainer,
    BasicHotkeyDemoContainer,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Hotkey</h1>
        <p class="text-muted-foreground">
          A directive that runs an action on a keyboard shortcut, anywhere on
          the page, and writes the shortcut for the platform (⌘K on a Mac,
          Ctrl+K elsewhere).
        </p>
        <app-component-badges path="hotkey" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-hotkey-usage-demo-container />
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-hotkey-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>How It Works</h2>
        <ul class="text-muted-foreground list-inside list-disc space-y-1">
          <li>
            <code>scHotkey</code>
            takes a combination like
            <code>mod+k</code>
            ,
            <code>alt+shift+n</code>
            :
            <code>mod</code>
            is ⌘ on a Mac and Ctrl elsewhere; the modifiers must match exactly.
          </li>
          <li>
            It listens on the document while the element is shown, prevents the
            browser's own action for the shortcut, and emits
            <code>scHotkeyPressed</code>
            .
          </li>
          <li>
            <code>displayKey()</code>
            (via
            <code>#hotkey="scHotkey"</code>
            ) writes the shortcut for the platform, to show in a
            <code>kbd</code>
            .
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class HotkeyPage {}
