import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { Anatomy } from '../../../components/anatomy/anatomy';
import { ComponentBadges } from '../../../components/component-badges/component-badges';
import { PartsTable } from '../../../components/parts-table/parts-table';
import { TocHeading } from '../../../components/toc/toc-heading';
import { AvatarSkeletonDemoContainer } from './demos/avatar-skeleton-demo-container';
import { CardSkeletonDemoContainer } from './demos/card-skeleton-demo-container';
import { FormSkeletonDemoContainer } from './demos/form-skeleton-demo-container';
import { RtlSkeletonDemoContainer } from './demos/rtl-skeleton-demo-container';
import { SkeletonUsageDemoContainer } from './demos/skeleton-usage-demo-container';
import { TableSkeletonDemoContainer } from './demos/table-skeleton-demo-container';
import { TextSkeletonDemoContainer } from './demos/text-skeleton-demo-container';

@Component({
  selector: 'app-skeleton-page',
  imports: [
    PartsTable,
    Anatomy,
    SkeletonUsageDemoContainer,
    AvatarSkeletonDemoContainer,
    CardSkeletonDemoContainer,
    TextSkeletonDemoContainer,
    FormSkeletonDemoContainer,
    TableSkeletonDemoContainer,
    RtlSkeletonDemoContainer,
    TocHeading,
    ComponentBadges,
    ScTypeset,
  ],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Skeleton</h1>
        <p class="text-muted-foreground">
          A placeholder while content loads. In the look of the app&apos;s
          style.
        </p>
        <app-component-badges path="skeleton" />
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Usage</h2>
        <app-skeleton-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Anatomy</h2>
        <p>
          A directive on your div; its size and shape are yours (h-4 w-48,
          rounded-full…), its look the style&apos;s.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Accessibility</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            A skeleton is empty and silent. Say the region is loading with
            aria-busy=&quot;true&quot; on it, and remove it when the content
            arrives.
          </li>
          <li>
            It stops pulsing when the user asks for less motion
            (prefers-reduced-motion).
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scTypeset appToc>Examples</h2>
        <app-avatar-skeleton-demo-container />
        <app-card-skeleton-demo-container />
        <app-text-skeleton-demo-container />
        <app-form-skeleton-demo-container />
        <app-table-skeleton-demo-container />
        <app-rtl-skeleton-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>API reference</h2>
        <p>
          Each part takes
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">class</code>,
          merged over the style (cn: a later class wins).
        </p>
        <app-parts-table label="Skeleton parts" [parts]="parts" />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class SkeletonPage {
  private readonly anatomy = {
    imports: "import { ScSkeleton } from '@semantic-components/ui';",
    markup: '<div scSkeleton class="h-4 w-48"></div>',
  };

  private readonly parts = [
    {
      name: 'ScSkeleton',
      selector: 'div[scSkeleton]',
      description:
        "The placeholder: a pulsing muted block in the style's look, still with reduced motion. Size and shape in your class.",
    },
  ];
}
