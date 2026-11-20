import { Component, ViewEncapsulation } from '@angular/core';
import { ScTypeset } from '@semantic-components/ui';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-mcp-server-page',
  imports: [TocHeading, ScTypeset],
  template: `
    <div class="space-y-12">
      <div class="space-y-2">
        <h1 scTypeset>MCP Server</h1>
        <p class="text-muted-foreground">
          <code scTypeset>&#64;semantic-components/mcp-server</code>
          — the library&apos;s documentation for AI coding assistants (Claude
          Code, Cursor, Copilot…), over the Model Context Protocol, so they
          write the parts as they are rather than as they guess.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scTypeset appToc>What it serves</h2>
        <p>
          Every component of the library: its selectors, its parts, its exports
          and its README — read from the code and the docs when the package is
          built, so it matches the version you use. And the guides behind the
          library&apos;s design. An assistant asks for them as it writes your
          templates.
        </p>
      </section>

      <section class="space-y-4">
        <h2 scTypeset appToc>Available Tools</h2>
        <ul class="list-disc space-y-2 pl-6">
          <li>
            <strong>list_components</strong>
            — Lists all available components across libraries. Optionally filter
            by library name.
          </li>
          <li>
            <strong>get_component</strong>
            — Returns the full README documentation for a specific component.
          </li>
          <li>
            <strong>search_components</strong>
            — Searches components by keyword across names, exports, and README
            content.
          </li>
          <li>
            <strong>get_guide</strong>
            — Returns a full architectural guide by topic.
          </li>
        </ul>
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export default class McpServerPage {}
