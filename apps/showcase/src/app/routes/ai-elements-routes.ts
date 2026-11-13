import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

/** shadcn's AI Elements: patterns built from the components, a page each. */
export const aiElementsRoutes: Route[] = [
  {
    path: 'docs/ai-elements',
    component: DocsLayout,
    children: [
      {
        path: '',
        redirectTo: 'chain-of-thought',
        pathMatch: 'full',
      },
      {
        path: 'reasoning',
        title: 'Reasoning - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/reasoning/reasoning-page'),
      },
      {
        path: 'chain-of-thought',
        title: 'Chain of Thought - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/chain-of-thought/chain-of-thought-page'),
      },
      {
        path: 'chat',
        title: 'Chat - Semantic Components',
        loadComponent: () => import('../pages/docs/ai-elements/chat/chat-page'),
      },
      {
        path: 'checkpoint',
        title: 'Checkpoint - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/checkpoint/checkpoint-page'),
      },
      {
        path: 'confirmation',
        title: 'Confirmation - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/confirmation/confirmation-page'),
      },
      {
        path: 'context',
        title: 'Context - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/context/context-page'),
      },
      {
        path: 'file-tree',
        title: 'File Tree - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/file-tree/file-tree-page'),
      },
      {
        path: 'inline-citation',
        title: 'Inline Citation - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/inline-citation/inline-citation-page'),
      },
      {
        path: 'message',
        title: 'Message - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/message/message-page'),
      },
      {
        path: 'model-selector',
        title: 'Model Selector - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/model-selector/model-selector-page'),
      },
      {
        path: 'plan',
        title: 'Plan - Semantic Components',
        loadComponent: () => import('../pages/docs/ai-elements/plan/plan-page'),
      },
      {
        path: 'prompt-input',
        title: 'Prompt Input - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/prompt-input/prompt-input-page'),
      },
      {
        path: 'queue',
        title: 'Queue - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/queue/queue-page'),
      },
      {
        path: 'sources',
        title: 'Sources - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/sources/sources-page'),
      },
      {
        path: 'stack-trace',
        title: 'Stack Trace - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/stack-trace/stack-trace-page'),
      },
      {
        path: 'subagent',
        title: 'Subagent - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/subagent/subagent-page'),
      },
      {
        path: 'suggestion',
        title: 'Suggestion - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/suggestion/suggestion-page'),
      },
      {
        path: 'task',
        title: 'Task - Semantic Components',
        loadComponent: () => import('../pages/docs/ai-elements/task/task-page'),
      },
      {
        path: 'terminal',
        title: 'Terminal - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/terminal/terminal-page'),
      },
      {
        path: 'test-results',
        title: 'Test Results - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/test-results/test-results-page'),
      },
      {
        path: 'tool',
        title: 'Tool - Semantic Components',
        loadComponent: () => import('../pages/docs/ai-elements/tool/tool-page'),
      },
    ],
  },
];
