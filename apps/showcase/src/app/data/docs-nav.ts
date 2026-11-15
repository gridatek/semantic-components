/** A docs page: its name, its path and, to search by, what it is. */
export interface DocsPage {
  readonly name: string;
  readonly path: string;
  readonly description?: string;
}

/** The docs' first group: the library and its catalogue. */
export const introductionPages: readonly DocsPage[] = [
  { name: 'Introduction', path: '/docs/getting-started/introduction' },
  { name: 'Components', path: '/docs/components' },
];

/** Setting it up. */
export const installationPages: readonly DocsPage[] = [
  { name: 'Prerequisites', path: '/docs/getting-started/prerequisites' },
  { name: 'UI', path: '/docs/getting-started/ui' },
  { name: 'Presets', path: '/docs/getting-started/presets' },
  { name: 'Custom preset', path: '/docs/getting-started/custom-preset' },
  { name: 'Internationalization', path: '/docs/getting-started/i18n' },
  { name: 'Right to left', path: '/docs/getting-started/rtl' },
  { name: 'MCP Server', path: '/docs/getting-started/mcp-server' },
];

/** shadcn's AI Elements: patterns built from the components. */
export const aiElementPages: readonly DocsPage[] = [
  { name: 'Chain of Thought', path: 'chain-of-thought' },
  { name: 'Chat', path: 'chat' },
  { name: 'Checkpoint', path: 'checkpoint' },
  { name: 'Confirmation', path: 'confirmation' },
  { name: 'Context', path: 'context' },
  { name: 'File Tree', path: 'file-tree' },
  { name: 'Inline Citation', path: 'inline-citation' },
  { name: 'Message', path: 'message' },
  { name: 'Model Selector', path: 'model-selector' },
  { name: 'Plan', path: 'plan' },
  { name: 'Prompt Input', path: 'prompt-input' },
  { name: 'Queue', path: 'queue' },
  { name: 'Reasoning', path: 'reasoning' },
  { name: 'Sources', path: 'sources' },
  { name: 'Stack Trace', path: 'stack-trace' },
  { name: 'Subagent', path: 'subagent' },
  { name: 'Suggestion', path: 'suggestion' },
  { name: 'Task', path: 'task' },
  { name: 'Terminal', path: 'terminal' },
  { name: 'Test Results', path: 'test-results' },
  { name: 'Tool', path: 'tool' },
].map((page) => ({ ...page, path: '/docs/ai-elements/' + page.path }));
