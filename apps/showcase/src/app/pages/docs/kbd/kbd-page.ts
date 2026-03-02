import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScHeading } from '@semantic-components/ui';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ArrowKeysKbdDemoContainer } from './demos/arrow-keys-kbd-demo-container';
import { BasicKbdDemoContainer } from './demos/basic-kbd-demo-container';
import { ComplexShortcutsKbdDemoContainer } from './demos/complex-shortcuts-kbd-demo-container';
import { FunctionKeysKbdDemoContainer } from './demos/function-keys-kbd-demo-container';
import { InlineKbdDemoContainer } from './demos/inline-kbd-demo-container';
import { ShortcutsKbdDemoContainer } from './demos/shortcuts-kbd-demo-container';
import { VariantsKbdDemoContainer } from './demos/variants-kbd-demo-container';

@Component({
  selector: 'app-kbd-page',
  imports: [
    BasicKbdDemoContainer,
    ShortcutsKbdDemoContainer,
    VariantsKbdDemoContainer,
    ArrowKeysKbdDemoContainer,
    FunctionKeysKbdDemoContainer,
    InlineKbdDemoContainer,
    ComplexShortcutsKbdDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Kbd</h1>
        <p class="text-muted-foreground">
          A component for displaying keyboard keys and shortcuts.
        </p>
        <app-component-badges path="kbd" />
      </div>

      <section class="space-y-8">
        <h2 scHeading toc>Examples</h2>
        <app-basic-kbd-demo-container />
        <app-shortcuts-kbd-demo-container />
        <app-variants-kbd-demo-container />
        <app-arrow-keys-kbd-demo-container />
        <app-function-keys-kbd-demo-container />
        <app-inline-kbd-demo-container />
        <app-complex-shortcuts-kbd-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class KbdPage {}
