import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AvatarEmptyDemoContainer } from './demos/avatar-empty-demo-container';
import { AvatarGroupEmptyDemoContainer } from './demos/avatar-group-empty-demo-container';
import { BackgroundEmptyDemoContainer } from './demos/background-empty-demo-container';
import { CardEmptyDemoContainer } from './demos/card-empty-demo-container';
import { EmptyUsageDemoContainer } from './demos/empty-usage-demo-container';
import { InputGroupEmptyDemoContainer } from './demos/input-group-empty-demo-container';
import { OutlineEmptyDemoContainer } from './demos/outline-empty-demo-container';
import { RtlEmptyDemoContainer } from './demos/rtl-empty-demo-container';

@Component({
  selector: 'app-empty-page',
  imports: [
    PartsTable,
    Anatomy,
    EmptyUsageDemoContainer,
    OutlineEmptyDemoContainer,
    BackgroundEmptyDemoContainer,
    AvatarEmptyDemoContainer,
    AvatarGroupEmptyDemoContainer,
    InputGroupEmptyDemoContainer,
    CardEmptyDemoContainer,
    RtlEmptyDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scTypeset>Empty</h1>
        <p class="text-muted-foreground">
          What to show where there is nothing yet: what is empty, why, and what
          to do. In the look of the app&apos;s style.
        </p>
        <app-component-badges path="empty" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-empty-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the icon, the words and the
          actions are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Make the title a heading (h2–h6, at the page&apos;s level), so it
            can be found by heading.
          </li>
          <li>
            The media is decorative: the title and the description say it.
          </li>
          <li>The actions are real buttons and links, named by their text.</li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-outline-empty-demo-container />
        <app-background-empty-demo-container />
        <app-avatar-empty-demo-container />
        <app-avatar-group-empty-demo-container />
        <app-input-group-empty-demo-container />
        <app-card-empty-demo-container />
        <app-rtl-empty-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Empty parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class EmptyPage {
  private readonly anatomy = {
    imports: [
      'import {',
      '  ScEmpty, ScEmptyHeader, ScEmptyMedia, ScEmptyTitle,',
      '  ScEmptyDescription, ScEmptyBody,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scEmpty>',
      '  <div scEmptyHeader>',
      '    <div scEmptyMedia variant="icon">…</div>',
      '    <h2 scEmptyTitle>…</h2>',
      '    <div scEmptyDescription>…</div>',
      '  </div>',
      '  <div scEmptyBody>…</div>',
      '</div>',
    ].join('\n'),
  };

  private readonly parts = [
    {
      name: 'ScEmpty, ScEmptyHeader',
      selector: 'div[…]',
      description:
        'The empty state, centred (add border for a dashed outline); its header.',
    },
    {
      name: 'ScEmptyMedia',
      selector: 'div[scEmptyMedia]',
      description:
        "variant ('default', 'icon' — framed): your icon, avatar or image.",
    },
    {
      name: 'ScEmptyTitle',
      selector: 'div[scEmptyTitle], h2–h6[scEmptyTitle]',
      description: 'What is empty — best a heading.',
    },
    {
      name: 'ScEmptyDescription, ScEmptyBody',
      selector: 'div[…]',
      description: 'Why, and what to do; the actions below.',
    },
  ];
}
