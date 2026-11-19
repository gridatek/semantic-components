import { Component, ViewEncapsulation } from '@angular/core';
import { ScLink, ScTypeset } from '@semantic-components/ui';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-roadmap-page',
  imports: [ScLink, ScTypeset, TocHeading],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>Roadmap</h1>
        <p class="text-muted-foreground">
          Every component brought to the same bar, one at a time: shadcn&apos;s
          look, tested, mobile first, right to left, in light and dark, and
          rendered on the server. Until each is there, it is marked
          Experimental.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>Two lists</h2>
        <p>
          The components shadcn/ui has come first: their look and their parts
          follow shadcn&apos;s, checked class for class, so its examples carry
          over. Then the others — ours, built from shadcn&apos;s tokens and
          patterns, with references from other libraries. About 150 components
          in all; 63 have a shadcn counterpart.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>When a component is done</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            <strong>Styles</strong> — its classes match shadcn&apos;s in all
            eight styles, or follow its tokens where shadcn has none.
          </li>
          <li>
            <strong>Tests</strong> — every demo tested by pointer and keyboard
            in Chromium, Firefox and WebKit; its page passes axe.
          </li>
          <li>
            <strong>Mobile</strong> — it works at 360 px wide, with touch
            targets of 24 px at least.
          </li>
          <li>
            <strong>Right to left</strong> — a demo in Arabic, mirrored, with
            its keys reversed where they move along the line.
          </li>
          <li>
            <strong>Dark</strong> — correct contrast, borders and focus rings in
            dark mode.
          </li>
          <li>
            <strong>Server</strong> — rendered on the server and hydrated
            without a mismatch.
          </li>
          <li>
            <strong>Docs</strong> — its README and page show every part and
            input; the MCP server serves it.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Across the library</h2>
        <ul class="list-disc space-y-2 ps-6">
          <li>
            Less duplication: one part for one thing (a key is always Kbd, a
            separator always Separator), placed by its parent.
          </li>
          <li>
            Your words, always: no text written by a part, so translation is
            yours.
          </li>
          <li>
            Custom styles of your own, once the library is stable: a copy of one
            of ours, or a few changes spread over it.
          </li>
        </ul>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Follow along</h2>
        <p>
          The detailed roadmap — each component with what is done — is in the
          repository:
          <a
            scLink
            href="https://github.com/gridatek/semantic-components/blob/main/docs/roadmap.md"
            target="_blank"
            rel="noopener noreferrer"
            >docs/roadmap.md</a
          >. What changed is in the Changelog.
        </p>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class RoadmapPage {}
