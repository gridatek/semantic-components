import { Component, ViewEncapsulation } from '@angular/core';
import { ScHeading, ScSeparator } from '@semantic-components/ui';
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

@Component({
  selector: 'app-mcp-server-page',
  imports: [
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    TocHeading,
    SiCheckIcon,
    SiCopyIcon,
    ScSeparator,
    ScHeading,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 scHeading>MCP Server</h1>
        <p class="text-muted-foreground">
          Set up the
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm"
            >&#64;semantic-components/mcp-server</code
          >
          package. This provides an MCP server that exposes component
          documentation to AI coding assistants like Claude Code.
        </p>
      </div>

      <section class="space-y-4">
        <h2 scHeading appToc>Setup</h2>
        <p class="text-muted-foreground">
          Add the following to your project's
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">.mcp.json</code>
          at the project root:
        </p>
        <div scCodeBlock>
          <div scCodeBlockHeader>
            <div scCodeBlockTitle>.mcp.json</div>
            <div scCodeBlockActions>
              <button [scCodeBlockCopy]="setupCode" #copy="scCodeBlockCopy">
                @if (copy.copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
          <pre scCodeBlockContent [code]="setupCode" language="json"></pre>
        </div>
        <p class="text-muted-foreground">
          No installation is required.
          <code class="bg-muted rounded px-1.5 py-0.5 text-sm">npx -y</code>
          downloads the package from npm on first use and caches it.
        </p>
      </section>

      <div scSeparator></div>

      <section class="space-y-4">
        <h2 scHeading appToc>Available Tools</h2>
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
