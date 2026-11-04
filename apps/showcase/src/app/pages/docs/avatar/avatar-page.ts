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
import { AvatarUsageDemoContainer } from './demos/avatar-usage-demo-container';
import { BadgeAvatarDemoContainer } from './demos/badge-avatar-demo-container';
import { BadgeIconAvatarDemoContainer } from './demos/badge-icon-avatar-demo-container';
import { BasicAvatarDemoContainer } from './demos/basic-avatar-demo-container';
import { DropdownAvatarDemoContainer } from './demos/dropdown-avatar-demo-container';
import { FallbackAvatarDemoContainer } from './demos/fallback-avatar-demo-container';
import { GroupAvatarDemoContainer } from './demos/group-avatar-demo-container';
import { GroupCountAvatarDemoContainer } from './demos/group-count-avatar-demo-container';
import { GroupIconAvatarDemoContainer } from './demos/group-icon-avatar-demo-container';
import { RtlAvatarDemoContainer } from './demos/rtl-avatar-demo-container';
import { SizesAvatarDemoContainer } from './demos/sizes-avatar-demo-container';

@Component({
  selector: 'app-avatar-page',
  imports: [
    Anatomy,
    AvatarUsageDemoContainer,
    BasicAvatarDemoContainer,
    FallbackAvatarDemoContainer,
    BadgeAvatarDemoContainer,
    BadgeIconAvatarDemoContainer,
    GroupAvatarDemoContainer,
    GroupCountAvatarDemoContainer,
    GroupIconAvatarDemoContainer,
    SizesAvatarDemoContainer,
    DropdownAvatarDemoContainer,
    RtlAvatarDemoContainer,
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
        <h1 scHeading>Avatar</h1>
        <p class="text-muted-foreground">
          A person&apos;s picture, with initials when there is none — alone, in
          a group, with a status badge. In the look of the app&apos;s preset.
        </p>
        <app-component-badges path="avatar" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-avatar-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element. The image and the fallback
          fill the avatar, the image on top.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Loading</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            The image is rendered at once and loads in place, so
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >loading="lazy"</code
            >
            and
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >NgOptimizedImage</code
            >
            work. Until it has loaded, and if it fails, it is invisible (<code
              class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >data-loading</code
            >,
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >data-error</code
            >) and the fallback shows through.
          </li>
          <li>
            Hidden with
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >visibility</code
            >, not
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >display: none</code
            >: an element with no box never enters the viewport, and a lazy
            image would never load.
          </li>
          <li>
            Rendered on the server, an image that loads before the app wakes up
            is seen as loaded — its load event has gone by then.
          </li>
          <li>
            Loading, the image is not read: the fallback names the avatar. Give
            the image an
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">alt</code>
            for when it shows.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-basic-avatar-demo-container />
        <app-fallback-avatar-demo-container />
        <app-badge-avatar-demo-container />
        <app-badge-icon-avatar-demo-container />
        <app-group-avatar-demo-container />
        <app-group-count-avatar-demo-container />
        <app-group-icon-avatar-demo-container />
        <app-sizes-avatar-demo-container />
        <app-dropdown-avatar-demo-container />
        <app-rtl-avatar-demo-container />
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
          aria-label="Avatar parts"
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
export default class AvatarPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScAvatar, ScAvatarImage, ScAvatarFallback, ScAvatarBadge,',
      '  ScAvatarGroup, ScAvatarGroupCount,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scAvatarGroup>',
      '  <span scAvatar size="lg">',
      '    <img scAvatarImage src="…" alt="…" />',
      '    <span scAvatarFallback>…</span>',
      '    <span scAvatarBadge></span>',
      '  </span>',
      '  <div scAvatarGroupCount>+3</div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScAvatar',
      selector: 'span[scAvatar]',
      description:
        "The avatar: round, with a thin outline. Input size: 'sm', 'default' or 'lg'. data-image: the image's state.",
    },
    {
      name: 'ScAvatarImage',
      selector: 'img[scAvatarImage]',
      description:
        'The picture, over the fallback; invisible while it loads and if it fails (data-loading, data-error).',
    },
    {
      name: 'ScAvatarFallback',
      selector: 'span[scAvatarFallback]',
      description:
        'Initials or an icon: shown until the image has loaded, or with none.',
    },
    {
      name: 'ScAvatarBadge',
      selector: 'span[scAvatarBadge]',
      description:
        'A dot in the corner (a status, your color), or a small icon; sized by the avatar.',
    },
    {
      name: 'ScAvatarGroup',
      selector: 'div[scAvatarGroup]',
      description:
        'Avatars overlapping, each ringed by the background; mirrored right to left.',
    },
    {
      name: 'ScAvatarGroupCount',
      selector: 'div[scAvatarGroupCount]',
      description:
        "How many more, after the group's avatars: text or an icon, sized by them.",
    },
  ];
}
