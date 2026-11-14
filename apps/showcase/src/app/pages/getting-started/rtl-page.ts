import { Dir } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScFrame,
  ScHeading,
  ScSeparator,
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { TocHeading } from '../../components/toc/toc-heading';

interface ScCodeSample {
  title: string;
  language: 'typescript' | 'html';
  code: string;
}

/** A right-to-left box, with CDK's Dir: its tooltip opens on the right. */
@Component({
  selector: 'app-rtl-with-dir',
  imports: [
    Dir,
    ScButton,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex justify-center">
      <div scTooltipProvider side="inline-start">
        <button scButton scTooltipTrigger variant="outline">البداية</button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            إضافة إلى المكتبة
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
class RtlWithDir {}

/** The same box without Dir: the tooltip follows the page, on the left. */
@Component({
  selector: 'app-rtl-without-dir',
  imports: [
    ScButton,
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex justify-center">
      <div scTooltipProvider side="inline-start">
        <button scButton scTooltipTrigger variant="outline">البداية</button>
        <ng-template scTooltipPortal>
          <div scTooltip>
            إضافة إلى المكتبة
            <span scTooltipArrow></span>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
class RtlWithoutDir {}

/** Right to left: the page's direction, and CDK's Dir for a box that differs. */
@Component({
  selector: 'app-rtl-page',
  imports: [
    NgTemplateOutlet,
    RtlWithDir,
    RtlWithoutDir,
    ScCodeBlock,
    ScCodeBlockActions,
    ScCodeBlockContent,
    ScCodeBlockCopy,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScFrame,
    ScHeading,
    ScSeparator,
    SiCheckIcon,
    SiCopyIcon,
    TocHeading,
  ],
  template: `
    <ng-template #sample let-s>
      <div scCodeBlock>
        <div scCodeBlockHeader>
          <div scCodeBlockTitle>{{ s.title }}</div>
          <div scCodeBlockActions>
            <button [scCodeBlockCopy]="s.code" #copy="scCodeBlockCopy">
              @if (copy.copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
              <span class="sr-only">Copy to clipboard</span>
            </button>
          </div>
        </div>
        <pre scCodeBlockContent [code]="s.code" [language]="s.language"></pre>
      </div>
    </ng-template>

    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>Right to left</h1>
        <p class="text-muted-foreground">
          The components follow the direction of the page: set it once, on
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&lt;html&gt;</code
          >, and everything flips. Only an app that mixes directions — a
          right-to-left box inside a left-to-right page, or the reverse — needs
          one more thing: CDK's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Dir</code>
          directive on that box.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>One direction</h2>
        <p class="text-muted-foreground">
          An app in Arabic, Hebrew or Persian: the direction goes on the
          document. Nothing else to do — the components read it (through CDK's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >Directionality</code
          >), and the popups, rendered at the end of the page, inherit it.
        </p>
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: html }"
        />
        <p class="text-muted-foreground">
          With our i18n entry, it is done for you: the locale's direction goes
          on
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&lt;html&gt;</code
          >
          when the app starts.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Mixed directions</h2>
        <p class="text-muted-foreground">
          A
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">dir="rtl"</code>
          box in a left-to-right page: CSS flips its layout on its own, but what
          is decided in script — which side
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >inline-start</code
          >
          is, where a popup opens, which arrow key goes to the next item — reads
          CDK's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >Directionality</code
          >, the document's by default. Import
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Dir</code> in the
          component holding the box: on any element with a
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">dir</code>
          attribute, it gives that direction to the components inside.
        </p>
        <ng-container
          [ngTemplateOutlet]="sample"
          [ngTemplateOutletContext]="{ $implicit: mixed }"
        />
        <p class="text-muted-foreground">
          Both boxes below are right to left, and their tooltips open on
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >inline-start</code
          >. Focus the buttons: with
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Dir</code>, the
          tooltip opens on the right; without it, on the left, as in the page
          around it.
        </p>
        <div class="grid gap-4 sm:grid-cols-2">
          <div scFrame class="space-y-4 p-6">
            <h3 class="text-sm font-medium">With Dir</h3>
            <app-rtl-with-dir />
          </div>
          <div scFrame class="space-y-4 p-6">
            <h3 class="text-sm font-medium">Without Dir</h3>
            <app-rtl-without-dir />
          </div>
        </div>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Good to know</h2>
        <ul class="text-muted-foreground list-disc space-y-2 ps-6">
          <li>
            Our right-to-left examples import
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">Dir</code>:
            they are right-to-left boxes in a left-to-right page. Copied into an
            app that is right to left on
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >&lt;html&gt;</code
            >, it can go.
          </li>
          <li>
            Sides and alignments are logical:
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >side="inline-start"</code
            >
            and
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
              >alignment="end"</code
            >
            flip with the direction;
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">left</code>
            and
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">right</code>
            stay put.
          </li>
          <li>
            Set
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">lang</code>
            with
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">dir</code>:
            screen readers pronounce the text in that language.
          </li>
          <li>
            Dates, numbers and the week's first day follow
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">LOCALE_ID</code
            >: provide it on the section's component, as above — every part
            inside reads it, in its overlays too. The parts have no
            <code class="bg-muted rounded px-1.5 py-0.5 text-sm">locale</code>
            input.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RtlPage {
  protected readonly html: ScCodeSample = {
    title: 'index.html',
    language: 'html',
    code: `<html lang="ar" dir="rtl">`,
  };

  protected readonly mixed: ScCodeSample = {
    title: 'quote.ts',
    language: 'typescript',
    code: `import { Dir } from '@angular/cdk/bidi';
import { LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-quote',
  imports: [Dir, ScTooltipProvider, ScTooltipTrigger /* … */],
  // Its dates and numbers in Arabic too: every part inside reads LOCALE_ID.
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar">
      <div scTooltipProvider side="inline-start">…</div>
    </div>
  \`,
})
export class Quote {}`,
  };
}
