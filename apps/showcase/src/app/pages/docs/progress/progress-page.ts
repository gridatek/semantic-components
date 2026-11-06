import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScHeading,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
} from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { TocHeading } from '../../../components/toc/toc-heading';
import { BasicProgressDemoContainer } from './demos/basic-progress-demo-container';
import { CircleProgressDemoContainer } from './demos/circle-progress-demo-container';
import { ControlledProgressDemoContainer } from './demos/controlled-progress-demo-container';
import { DownloadProgressDemoContainer } from './demos/download-progress-demo-container';
import { IndeterminateProgressDemoContainer } from './demos/indeterminate-progress-demo-container';
import { ProgressUsageDemoContainer } from './demos/progress-usage-demo-container';
import { RtlProgressDemoContainer } from './demos/rtl-progress-demo-container';
import { StepsProgressDemoContainer } from './demos/steps-progress-demo-container';

@Component({
  selector: 'app-progress-page',
  imports: [
    Anatomy,
    ProgressUsageDemoContainer,
    BasicProgressDemoContainer,
    ControlledProgressDemoContainer,
    CircleProgressDemoContainer,
    IndeterminateProgressDemoContainer,
    DownloadProgressDemoContainer,
    StepsProgressDemoContainer,
    RtlProgressDemoContainer,
    TocHeading,
    ComponentBadges,
    ScHeading,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Progress</h1>
        <p class="text-muted-foreground">
          How far a task has gone, as a bar or a circle. In the look of the
          app&apos;s preset.
        </p>
        <app-component-badges path="progress" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-progress-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the label and the value as
          text are yours. A bar has a track and a range; a circle, an svg.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            A progressbar (role=&quot;progressbar&quot;, aria-valuenow, -min,
            -max), named by its label — or aria-label without one.
          </li>
          <li>
            The value as text is read too (aria-valuetext): &quot;3 of 5
            steps&quot;, not only a number.
          </li>
          <li>
            Without a value it is indeterminate: no aria-valuenow, and its
            movement stops for people who ask for less motion.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-progress-demo-container />
        <app-controlled-progress-demo-container />
        <app-circle-progress-demo-container />
        <app-indeterminate-progress-demo-container />
        <app-download-progress-demo-container />
        <app-steps-progress-demo-container />
        <app-rtl-progress-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>API reference</h2>
        <p class="text-muted-foreground">
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the preset (cn: a later class wins).
        </p>
        <div
          scTableContainer
          tabindex="0"
          role="region"
          aria-label="Progress parts"
        >
          <table scTable>
            <thead scTableHeader>
              <tr scTableRow>
                <th scTableHeaderCell>Part</th>
                <th scTableHeaderCell>Selector</th>
                <th scTableHeaderCell>Description</th>
              </tr>
            </thead>
            <tbody scTableBody>
              @for (part of parts; track part.name) {
                <tr scTableRow>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.name }}</code>
                  </td>
                  <td scTableCell>
                    <code class="font-mono text-sm">{{ part.selector }}</code>
                  </td>
                  <td
                    scTableCell
                    class="text-muted-foreground whitespace-normal"
                  >
                    {{ part.description }}
                  </td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class ProgressPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScProgress, ScProgressLabel, ScProgressValueText,',
      '  ScProgressTrack, ScProgressRange, ScProgressCircle,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scProgress [value]="…">',
      '  <span scProgressLabel>…</span>',
      '  <span scProgressValueText>…</span>',
      '  <div scProgressTrack><div scProgressRange></div></div>',
      '</div>',
      '',
      '<div scProgress [value]="…" aria-label="…">',
      '  <svg scProgressCircle></svg>',
      '  <span scProgressValueText>…</span>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScProgress',
      selector: 'div[scProgress]',
      description:
        'value (none: indeterminate), min, max; role="progressbar"; data-state, data-shape.',
    },
    {
      name: 'ScProgressLabel, ScProgressValueText',
      selector: '[scProgressLabel], [scProgressValueText]',
      description:
        "Its name (aria-labelledby), and its value as text (aria-valuetext), in the preset's look; centred in a circle.",
    },
    {
      name: 'ScProgressTrack, ScProgressRange',
      selector: 'div[scProgressTrack], div[scProgressRange]',
      description:
        "A bar: the track in the preset's look, the range as far as the value; sliding while indeterminate.",
    },
    {
      name: 'ScProgressCircle',
      selector: 'svg[scProgressCircle]',
      description:
        'A circle: the track and an arc from the top, clockwise (mirrored right to left); thickness, spin.',
    },
  ];
}
