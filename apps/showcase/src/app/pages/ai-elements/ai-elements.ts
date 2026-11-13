import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScFrame,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemTitle,
  ScLink,
} from '@semantic-components/ui';
import { ChatUsageDemo } from '../docs/ai-elements/chat/demos/chat-usage-demo';

/** AI Elements: shadcn's patterns for agentic interfaces, built with the library. */
@Component({
  selector: 'app-ai-elements',
  imports: [
    ChatUsageDemo,
    RouterLink,
    ScFrame,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemTitle,
    ScLink,
  ],
  template: `
    <section
      class="flex flex-col items-center gap-2 px-6 py-8 text-center md:py-16 lg:py-20 xl:gap-4"
    >
      <h1
        class="text-primary max-w-4xl text-3xl leading-tight font-semibold tracking-tight text-balance lg:leading-[1.1] xl:text-5xl xl:tracking-tighter"
      >
        AI Elements
      </h1>
      <p class="text-foreground max-w-2xl text-base text-balance sm:text-lg">
        Patterns for agentic interfaces — reasoning, tool calls, plans, sources
        — built from the components. Copy them into your app: there is no
        package to install, and the code is yours.
      </p>
      <div class="flex flex-wrap justify-center gap-2 pt-2">
        <a
          scLink
          variant="button"
          size="sm"
          routerLink="/docs/ai-elements/chat"
        >
          Start with Chat
        </a>
        <a scLink variant="ghost" size="sm" href="#patterns">
          Browse the patterns
        </a>
      </div>
    </section>

    <section
      class="mx-auto w-full max-w-3xl px-4 pb-12"
      aria-labelledby="example-title"
    >
      <h2 id="example-title" class="sr-only">Example</h2>
      <div scFrame class="bg-card overflow-hidden">
        <app-chat-usage-demo />
      </div>
      <p class="text-muted-foreground pt-3 text-center text-sm">
        A thread built with the
        <a scLink routerLink="/docs/components/message-scroller"
          >Message Scroller</a
        >, the <a scLink routerLink="/docs/components/message">Message</a> and
        the <a scLink routerLink="/docs/components/trace">Trace</a>. Press send.
      </p>
    </section>

    <section
      id="patterns"
      class="mx-auto w-full max-w-6xl scroll-mt-20 px-4 pb-16"
      aria-labelledby="patterns-title"
    >
      <h2
        id="patterns-title"
        class="pb-2 text-2xl font-semibold tracking-tight"
      >
        Patterns
      </h2>
      <p class="text-muted-foreground max-w-2xl pb-6">
        A chat is a list of message turns in a scroller. The steps an agent
        takes inside a turn — reasoning, tools, plans — are built on the Trace,
        so every step has the same shape.
      </p>
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        @for (pattern of patterns; track pattern.path) {
          <a
            scItem
            variant="outline"
            class="items-start"
            [routerLink]="'/docs/ai-elements/' + pattern.path"
          >
            <div scItemBody>
              <div scItemTitle>{{ pattern.name }}</div>
              <p scItemDescription class="line-clamp-none">
                {{ pattern.description }}
              </p>
            </div>
          </a>
        }
      </div>
    </section>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class AiElements {
  protected readonly patterns = [
    {
      name: 'Chain of Thought',
      path: 'chain-of-thought',
      description: 'A summary that expands into the steps an agent took.',
    },
    {
      name: 'Chat',
      path: 'chat',
      description:
        'The thread. The Message Scroller keeps your place while the reply streams.',
    },
    {
      name: 'Checkpoint',
      path: 'checkpoint',
      description: 'A point in the conversation you can return to.',
    },
    {
      name: 'Confirmation',
      path: 'confirmation',
      description: 'A prompt to approve or deny a tool before it runs.',
    },
    {
      name: 'Context',
      path: 'context',
      description: 'How much of the context window the conversation has used.',
    },
    {
      name: 'File Tree',
      path: 'file-tree',
      description: 'The files the agent changed, as a folder tree.',
    },
    {
      name: 'Inline Citation',
      path: 'inline-citation',
      description: 'A source in the sentence that opens on hover.',
    },
    {
      name: 'Message',
      path: 'message',
      description:
        "One turn. The person's message, and the agent's reply with its actions.",
    },
    {
      name: 'Model Selector',
      path: 'model-selector',
      description:
        'Two menus. One picks the model the agent runs, the other how hard it thinks.',
    },
    {
      name: 'Plan',
      path: 'plan',
      description: 'The steps the agent plans to take, and how far it has got.',
    },
    {
      name: 'Prompt Input',
      path: 'prompt-input',
      description: 'A message field with attachments and a send button.',
    },
    {
      name: 'Queue',
      path: 'queue',
      description:
        "The agent's todo list, split into what is left and what is done.",
    },
    {
      name: 'Reasoning',
      path: 'reasoning',
      description: "The agent's thinking as it streams.",
    },
    {
      name: 'Sources',
      path: 'sources',
      description: 'The links the agent used for a reply.',
    },
    {
      name: 'Stack Trace',
      path: 'stack-trace',
      description: 'A failed tool call and its stack frames.',
    },
    {
      name: 'Subagent',
      path: 'subagent',
      description: 'A subagent run, with its tool calls and result.',
    },
    {
      name: 'Suggestion',
      path: 'suggestion',
      description: 'A short prompt you can send to the agent in one click.',
    },
    {
      name: 'Task',
      path: 'task',
      description: 'The steps the agent takes, as it takes them.',
    },
    {
      name: 'Terminal',
      path: 'terminal',
      description: 'A command the agent runs, with its output as it streams.',
    },
    {
      name: 'Test Results',
      path: 'test-results',
      description: 'A test run by the agent, with its suites and failures.',
    },
    {
      name: 'Tool',
      path: 'tool',
      description: 'A tool call the agent makes, from input to output.',
    },
  ];
}
