import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import manifest from './data/manifest.json' with { type: 'json' };

type Manifest = typeof manifest;
type Library = Manifest['libraries'][number];
type Component = Library['components'][number];

export function createServer(): McpServer {
  const server = new McpServer({
    name: 'semantic-components',
    version: manifest.version,
  });

  server.tool(
    'list_components',
    'List all available components across Semantic Components libraries. Optionally filter by library name.',
    {
      library: z
        .string()
        .optional()
        .describe('Filter by library, e.g. "ui", "ui-lab", "carousel"'),
    },
    async ({ library }) => {
      let libs = manifest.libraries;

      if (library) {
        libs = libs.filter(
          (l) =>
            l.name.includes(library) ||
            l.name === `@semantic-components/${library}`,
        );
      }

      const lines: string[] = [];

      for (const lib of libs) {
        lines.push(`## ${lib.name} (${lib.components.length} components)\n`);

        for (const comp of lib.components) {
          const selectorHint = extractSelector(comp.readme);
          const readmeFlag = comp.readme ? '📄' : '  ';
          lines.push(
            `- ${readmeFlag} **${comp.name}**${selectorHint ? ` — \`${selectorHint}\`` : ''}`,
          );
        }

        lines.push('');
      }

      return {
        content: [{ type: 'text', text: lines.join('\n') }],
      };
    },
  );

  server.tool(
    'get_component',
    'Get full documentation for a specific component by name. Returns README content, exports, and which library it belongs to.',
    {
      name: z
        .string()
        .describe('Component name, e.g. "button", "dialog", "date-picker"'),
    },
    async ({ name }) => {
      const normalized = name.toLowerCase().replace(/\s+/g, '-');
      const results: { library: string; component: Component }[] = [];

      for (const lib of manifest.libraries) {
        const found = lib.components.find((c) => c.name === normalized);
        if (found) {
          results.push({ library: lib.name, component: found });
        }
      }

      if (results.length === 0) {
        // Try fuzzy match
        for (const lib of manifest.libraries) {
          for (const comp of lib.components) {
            if (
              comp.name.includes(normalized) ||
              normalized.includes(comp.name)
            ) {
              results.push({ library: lib.name, component: comp });
            }
          }
        }
      }

      if (results.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `No component found matching "${name}". Use list_components to see all available components.`,
            },
          ],
        };
      }

      const parts: string[] = [];

      for (const { library, component } of results) {
        parts.push(`# ${component.name} (${library})\n`);

        if (component.exports.length > 0) {
          parts.push(
            `**Exports:** ${component.exports.map((e) => `\`${e}\``).join(', ')}\n`,
          );
        }

        if (component.readme) {
          parts.push(component.readme);
        } else {
          parts.push('_No README available for this component._');
        }

        parts.push('\n---\n');
      }

      return {
        content: [{ type: 'text', text: parts.join('\n') }],
      };
    },
  );

  server.tool(
    'search_components',
    'Search for components by keyword. Searches component names, README content, and export names.',
    {
      query: z
        .string()
        .describe('Search keyword, e.g. "form", "date", "toggle"'),
    },
    async ({ query }) => {
      const q = query.toLowerCase();
      const matches: {
        library: string;
        component: Component;
        score: number;
      }[] = [];

      for (const lib of manifest.libraries) {
        for (const comp of lib.components) {
          let score = 0;

          // Name match (highest weight)
          if (comp.name === q) score += 100;
          else if (comp.name.includes(q)) score += 50;

          // Export match
          if (comp.exports.some((e) => e.toLowerCase().includes(q)))
            score += 30;

          // README content match
          if (comp.readme?.toLowerCase().includes(q)) {
            score += 10;
            // Bonus for multiple mentions
            const count = (
              comp.readme
                .toLowerCase()
                .match(new RegExp(escapeRegex(q), 'g')) || []
            ).length;
            score += Math.min(count, 10);
          }

          if (score > 0) {
            matches.push({ library: lib.name, component: comp, score });
          }
        }
      }

      matches.sort((a, b) => b.score - a.score);

      if (matches.length === 0) {
        return {
          content: [
            {
              type: 'text',
              text: `No components found matching "${query}". Try a different keyword or use list_components to browse.`,
            },
          ],
        };
      }

      const lines = [
        `## Search results for "${query}" (${matches.length} matches)\n`,
      ];

      for (const { library, component } of matches.slice(0, 20)) {
        const selectorHint = extractSelector(component.readme);
        const libShort = library.replace('@semantic-components/', '');
        lines.push(
          `- **${component.name}** (${libShort})${selectorHint ? ` — \`${selectorHint}\`` : ''}`,
        );
      }

      if (matches.length > 20) {
        lines.push(
          `\n_...and ${matches.length - 20} more. Refine your search for better results._`,
        );
      }

      return {
        content: [{ type: 'text', text: lines.join('\n') }],
      };
    },
  );

  server.tool(
    'get_guide',
    'Get a documentation guide by topic. Guides cover architecture patterns, component design principles, forms, testing, and more.',
    {
      topic: z
        .string()
        .describe(
          'Guide topic, e.g. "composable-architecture", "forms", "testing"',
        ),
    },
    async ({ topic }) => {
      const normalized = topic.toLowerCase().replace(/\s+/g, '-');

      // Exact match first
      let guide = manifest.guides.find((g) => g.name === normalized);

      // Fuzzy match
      if (!guide) {
        guide = manifest.guides.find(
          (g) =>
            g.name.includes(normalized) ||
            g.title.toLowerCase().includes(topic.toLowerCase()),
        );
      }

      if (!guide) {
        const available = manifest.guides
          .map((g) => `- **${g.name}** — ${g.title}`)
          .join('\n');
        return {
          content: [
            {
              type: 'text',
              text: `No guide found matching "${topic}".\n\n## Available guides:\n${available}`,
            },
          ],
        };
      }

      return {
        content: [{ type: 'text', text: guide.content }],
      };
    },
  );

  return server;
}

function extractSelector(readme: string | null): string | null {
  if (!readme) return null;
  const match = readme.match(/\*\*Selector:\*\*\s*`([^`]+)`/);
  return match ? match[1] : null;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
