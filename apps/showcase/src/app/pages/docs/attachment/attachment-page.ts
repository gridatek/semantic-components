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
import { AttachmentUsageDemoContainer } from './demos/attachment-usage-demo-container';
import { GroupAttachmentDemoContainer } from './demos/group-attachment-demo-container';
import { ImageAttachmentDemoContainer } from './demos/image-attachment-demo-container';
import { RtlAttachmentDemoContainer } from './demos/rtl-attachment-demo-container';
import { SizesAttachmentDemoContainer } from './demos/sizes-attachment-demo-container';
import { StatesAttachmentDemoContainer } from './demos/states-attachment-demo-container';
import { TriggerAttachmentDemoContainer } from './demos/trigger-attachment-demo-container';

@Component({
  selector: 'app-attachment-page',
  imports: [
    Anatomy,
    AttachmentUsageDemoContainer,
    ImageAttachmentDemoContainer,
    StatesAttachmentDemoContainer,
    SizesAttachmentDemoContainer,
    GroupAttachmentDemoContainer,
    TriggerAttachmentDemoContainer,
    RtlAttachmentDemoContainer,
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
        <h1 scHeading>Attachment</h1>
        <p class="text-muted-foreground">
          A file and its upload state, on its own or in a scrolling row. In the
          look of the app&apos;s preset.
        </p>
        <app-component-badges path="attachment" />
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Usage</h2>
        <app-attachment-usage-demo-container />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Anatomy</h2>
        <p class="text-muted-foreground">
          Every part is a directive on your element; the icons, images, text and
          names are yours.
        </p>
        <app-anatomy [imports]="anatomy.imports" [markup]="anatomy.markup" />
      </section>

      <section class="space-y-4">
        <h2 scHeading appToc>Accessibility</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Name each action after what it does and to which file — &quot;Remove
            report.pdf&quot;, not &quot;Remove&quot; — in sr-only text.
          </li>
          <li>
            Name the trigger after what it opens — &quot;Preview
            report.pdf&quot;: it fills the card and has no text of its own.
          </li>
          <li>
            A group scrolls sideways: its attachments&apos; buttons and links
            bring it along as they take focus.
          </li>
          <li>
            Say the state in words too, in the description (&quot;Upload
            failed&quot;): its colour and shimmer are not enough. A spinner in
            the media needs its name.
          </li>
        </ul>
      </section>

      <section class="space-y-8">
        <h2 scHeading appToc>Examples</h2>
        <app-image-attachment-demo-container />
        <app-states-attachment-demo-container />
        <app-sizes-attachment-demo-container />
        <app-group-attachment-demo-container />
        <app-trigger-attachment-demo-container />
        <app-rtl-attachment-demo-container />
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
          aria-label="Attachment parts"
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
export default class AttachmentPage {
  protected readonly anatomy = {
    imports: [
      'import {',
      '  ScAttachment, ScAttachmentMedia, ScAttachmentContent, ScAttachmentTitle,',
      '  ScAttachmentDescription, ScAttachmentActions, ScAttachmentAction,',
      '  ScAttachmentTrigger, ScAttachmentGroup,',
      "} from '@semantic-components/ui';",
    ].join('\n'),
    markup: [
      '<div scAttachmentGroup>',
      '  <div scAttachment state="…">',
      '    <div scAttachmentMedia>…</div>',
      '    <div scAttachmentContent>',
      '      <div scAttachmentTitle>…</div>',
      '      <div scAttachmentDescription>…</div>',
      '    </div>',
      '    <div scAttachmentActions>',
      '      <button scAttachmentAction>…</button>',
      '    </div>',
      '    <a scAttachmentTrigger href="…">…</a>',
      '  </div>',
      '</div>',
    ].join('\n'),
  };

  protected readonly parts = [
    {
      name: 'ScAttachment',
      selector: 'div[scAttachment]',
      description:
        "state ('idle', 'uploading', 'processing', 'error', 'done'), size ('default', 'sm', 'xs'), orientation ('horizontal', 'vertical').",
    },
    {
      name: 'ScAttachmentMedia',
      selector: 'div[scAttachmentMedia]',
      description:
        "Your icon or image: variant ('icon', 'image' — your img in it).",
    },
    {
      name: 'ScAttachmentContent, ScAttachmentTitle, ScAttachmentDescription',
      selector: 'div[…]',
      description:
        'The text: the file’s name (shimmering while uploading or processing), and a line about it.',
    },
    {
      name: 'ScAttachmentActions',
      selector: 'div[scAttachmentActions]',
      description: 'The actions, above the trigger.',
    },
    {
      name: 'ScAttachmentAction',
      selector: 'button[scAttachmentAction]',
      description:
        "An action (remove, retry…): the preset's button, variant and size (ghost, icon-xs). Name it.",
    },
    {
      name: 'ScAttachmentTrigger',
      selector: 'a[scAttachmentTrigger], button[scAttachmentTrigger]',
      description:
        'Fills the card, behind the actions: a link or a button (with scDialogTrigger, opens a dialog). Name it.',
    },
    {
      name: 'ScAttachmentGroup',
      selector: 'div[scAttachmentGroup]',
      description: 'A row that scrolls and snaps, its edges fading.',
    },
  ];
}
