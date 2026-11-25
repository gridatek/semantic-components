/** A docs page: its name, its path and, to search by, what it is. */
export interface DocsPage {
  readonly name: string;
  readonly path: string;
  readonly description?: string;
}

/** Overview: the library and installing it. */
export const overviewPages: readonly DocsPage[] = [
  { name: 'Introduction', path: '/docs/overview/introduction' },
  {
    name: 'Credits',
    path: '/docs/overview/credits',
    description: 'The projects we build on',
  },
  { name: 'Get started', path: '/docs/overview/get-started' },
  { name: 'Components', path: '/docs/overview/components' },
  {
    name: 'Roadmap',
    path: '/docs/overview/roadmap',
    description: 'Where the library is going',
  },
  {
    name: 'Changelog',
    path: '/docs/overview/changelog',
    description: 'What changed',
  },
];

/** The three packages, one page each. */
export const packagePages: readonly DocsPage[] = [
  {
    name: 'UI',
    path: '/docs/packages/ui',
    description: 'The components and their entry points',
  },
  {
    name: 'Styles',
    path: '/docs/packages/styles',
    description: 'shadcn/ui’s eight styles',
  },
  {
    name: 'MCP Server',
    path: '/docs/packages/mcp-server',
    description: 'The docs for AI coding assistants',
  },
];

/** Guides: how to do things well with the library. */
export const guidePages: readonly DocsPage[] = [
  {
    name: 'Theming',
    path: '/docs/guides/theming',
    description: 'Styles, theme variables, dark mode',
  },
  { name: 'Custom style', path: '/docs/overview/custom-style' },
  { name: 'Scrollbar', path: '/docs/guides/scrollbar' },
  { name: 'Typeset', path: '/docs/guides/typeset' },
  {
    name: 'Forms',
    path: '/docs/guides/forms',
    description: 'Signal Forms, fields, errors',
  },
  {
    name: 'Accessibility',
    path: '/docs/guides/accessibility',
    description: 'WCAG AA, keyboard, focus, names',
  },
  { name: 'Internationalization', path: '/docs/overview/i18n' },
  { name: 'Right to left', path: '/docs/overview/rtl' },
  {
    name: 'Server-side rendering',
    path: '/docs/guides/ssr',
    description: 'SSR, hydration, saved choices',
  },
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
