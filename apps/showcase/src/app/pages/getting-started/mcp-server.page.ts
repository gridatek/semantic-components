import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScSeparator } from '@semantic-components/ui';
import { ScHeading } from '@semantic-components/ui';
import { ScCopyButton } from '@semantic-components/ui-lab';
import { TocHeading } from '../../components/toc/toc-heading';

@Component({
  selector: 'app-mcp-server-page',
  imports: [
    TocHeading,
    ScCodeViewer,
    ScCodeViewerContent,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCopyButton,
    ScSeparator,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>MCP Server</h1>
        <p class="text-muted-foreground">
          Set up the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">
            &#64;semantic-components/mcp-server
          </code>
          package. This provides an MCP server that exposes component
          documentation to AI coding assistants like Claude Code.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading toc>Setup</h2>
        <p class="text-muted-foreground">
          Add the following to your project's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">.mcp.json</code>
          at the project root:
        </p>
        <div scCodeViewer>
          <div scCodeViewerHeader>
            <span scCodeViewerLabel>.mcp.json</span>
            <button scCopyButton [value]="setupCode"></button>
          </div>
          <div scCodeViewerContent [code]="setupCode" language="json"></div>
        </div>
        <p class="text-muted-foreground">
          No installation is required.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">npx -y</code>
          downloads the package from npm on first use and caches it.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading toc>Available Tools</h2>
        <ul class="text-muted-foreground list-disc space-y-2 pl-6">
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class McpServerPage {
  readonly setupCode = `{
  "mcpServers": {
    "semantic-components": {
      "command": "npx",
      "args": ["-y", "@semantic-components/mcp-server"]
    }
  }
}`;
}
