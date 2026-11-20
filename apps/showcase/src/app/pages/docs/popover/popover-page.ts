import { Component, ViewEncapsulation } from '@angular/core';
import { ScKbd, ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AlignmentsPopoverDemoContainer } from './demos/alignments-popover-demo-container';
import { BasicPopoverDemoContainer } from './demos/basic-popover-demo-container';
import { ControlledPopoverDemoContainer } from './demos/controlled-popover-demo-container';
import { HoverPopoverDemoContainer } from './demos/hover-popover-demo-container';
import { ModalPopoverDemoContainer } from './demos/modal-popover-demo-container';
import { PopoverUsageDemoContainer } from './demos/popover-usage-demo-container';
import { RtlPopoverDemoContainer } from './demos/rtl-popover-demo-container';
import { SidesPopoverDemoContainer } from './demos/sides-popover-demo-container';

@Component({
  selector: 'app-popover-page',
  imports: [
    ScKbd,
    PartsTable,
    Anatomy,
    PopoverUsageDemoContainer,
    BasicPopoverDemoContainer,
    AlignmentsPopoverDemoContainer,
    SidesPopoverDemoContainer,
    HoverPopoverDemoContainer,
    ModalPopoverDemoContainer,
    ControlledPopoverDemoContainer,
    RtlPopoverDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Popover</h1>
        <p class="text-muted-foreground">
          Rich content in a panel beside its trigger: a dialog, modal or not,
          opened by a click or a hover. In the look of the app&apos;s style.
        </p>
        <app-component-badges path="popover" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-popover-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          Every part is a directive on your element; the trigger, the title, the
          content and the close button are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A dialog (role=&quot;dialog&quot;), named by its title and described
            by its description; its trigger says it opens one (aria-haspopup,
            aria-expanded).
          </li>
          <li>
            Opening moves focus into it (its first field, or the one marked
            cdkFocusInitial); closing gives it back to the trigger.
            <kbd scKbd>Escape</kbd> or a press outside closes it.
          </li>
          <li>
            Not modal (default): <kbd scKbd>Tab</kbd> out of it closes it and
            goes on from the trigger. trap-focus keeps
            <kbd scKbd>Tab</kbd> inside; modal also stops the page behind.
          </li>
          <li>
            Open on hover is for extra help (an infotip): a click opens it too,
            so touch and keyboard users reach it.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-basic-popover-demo-container />
        <app-alignments-popover-demo-container />
        <app-sides-popover-demo-container />
        <app-hover-popover-demo-container />
        <app-modal-popover-demo-container />
        <app-controlled-popover-demo-container />
        <app-rtl-popover-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code scTypeset>class</code>, merged over the style (cn: a later class
          wins).
        </p>
        <app-parts-table label="Popover parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class PopoverPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScPopoverProvider, ScPopoverTrigger, ScPopoverPortal,',
      '  ScPopover, ScPopoverHeader, ScPopoverTitle,',
      '  ScPopoverDescription, ScPopoverClose,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scPopoverProvider side="…" alignment="…">',
      '  <button scButton scPopoverTrigger>…</button>',
      '  <ng-template scPopoverPortal>',
      '    <div scPopover>',
      '      <div scPopoverHeader>',
      '        <h2 scPopoverTitle>…</h2>',
      '        <p scPopoverDescription>…</p>',
      '      </div>',
      '      …',
      '      <button scPopoverClose>…</button>',
      '    </div>',
      '  </ng-template>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScPopoverProvider',
      selector: 'div[scPopoverProvider], span[scPopoverProvider]',
      description:
        "[(open)], modal (false, 'trap-focus', true), side ('bottom', 'top', 'left', 'right', 'inline-start', 'inline-end'), align ('start', 'center', 'end'), offset (4), origin (another anchor).",
    },
    {
      name: 'ScPopoverTrigger',
      selector: 'button[scPopoverTrigger]',
      description:
        'Your button: toggles it (aria-haspopup, aria-expanded); openOnHover, delay (300), closeDelay (0).',
    },
    {
      name: 'ScPopoverPortal, ScPopover',
      selector: 'ng-template[…], div[scPopover]',
      description:
        'The content, rendered while open; the popover (role="dialog"), named and described, animated.',
    },
    {
      name: 'ScPopoverHeader, ScPopoverTitle, ScPopoverDescription',
      selector: 'div[…], [scPopoverTitle], p[…]',
      description:
        'Its title (it names it; the level is yours) and description.',
    },
    {
      name: 'ScPopoverClose',
      selector: 'button[scPopoverClose]',
      description:
        "Closes it: the style's button, variant and size (ghost, icon-xs). Name it.",
    },
  ];
}
