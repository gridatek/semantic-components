# MCP Server

The `@semantic-components/mcp-server` package provides an [MCP (Model Context Protocol)](https://modelcontextprotocol.io/) server that exposes component documentation to AI coding assistants like Claude Code.

When working in a project that consumes `@semantic-components/*`, Claude Code can query the MCP server to discover components, read their documentation, and understand usage patterns — without needing the source code.

## Setup

Add the following to your project's `.mcp.json` (at the project root):

```json
{
  "mcpServers": {
    "semantic-components": {
      "command": "npx",
      "args": ["-y", "@semantic-components/mcp-server"]
    }
  }
}
```

No installation is required. `npx -y` downloads the package from npm on first use and caches it.

## Available Tools

The server exposes 4 tools:

### `list_components`

Lists all available components across libraries. Optionally filter by library name.

**Input:** `library?` — e.g. `"ui"`, `"ui-lab"`, `"carousel"`

**Example output:**

```
## @semantic-components/ui (57 components)

- 📄 **button** — `button[scButton]`
- 📄 **dialog** — `sc-dialog`
- 📄 **calendar** — `sc-calendar`
...
```

### `get_component`

Returns the full README documentation for a specific component, including selector, inputs table, usage examples, and accessibility notes.

**Input:** `name` — e.g. `"button"`, `"dialog"`, `"date-picker"`

### `search_components`

Searches components by keyword across names, exports, and README content. Results are ranked by relevance.

**Input:** `query` — e.g. `"form"`, `"date"`, `"toggle"`

### `get_guide`

Returns a full architectural guide by topic.

**Input:** `topic` — e.g. `"datatable"`

## How It Works

At build time, a manifest generator scans all component directories and `docs/guides/`, collecting README content and export names into a single `manifest.json`. The MCP server bundles this manifest and serves it over stdio using JSON-RPC, which is the standard transport for Claude Code MCP servers.

## Building

The Nx project has two targets:

```bash
# Generate the manifest from component READMEs and docs
npx nx run mcp-server:generate-manifest

# Bundle the server (depends on generate-manifest)
npx nx run mcp-server:build
```

The `build` target automatically runs `generate-manifest` first.
