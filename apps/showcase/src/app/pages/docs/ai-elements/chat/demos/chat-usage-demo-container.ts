import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { ChatUsageDemo } from './chat-usage-demo';

@Component({
  selector: 'app-chat-usage-demo-container',
  imports: [DemoContainer, ChatUsageDemo],
  template: `
    <app-demo-container
      title="Chat"
      demoUrl="/demos/ai-elements/chat-usage-demo"
      [code]="code"
    >
      <app-chat-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatUsageDemoContainer {
  readonly code = `import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  input,
  signal,
} from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuSeparator,
  ScMenuTrigger,
  ScMessage,
  ScMessageContent,
  ScMessageScroller,
  ScMessageScrollerButton,
  ScMessageScrollerContent,
  ScMessageScrollerItem,
  ScMessageScrollerViewport,
  ScTextarea,
  ScTooltip,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiCircleCheckIcon,
  SiGlobeIcon,
  SiLoaderCircleIcon,
  SiMessageCircleDashedIcon,
  SiPaperclipIcon,
  SiPlusIcon,
  SiRotateCwIcon,
  SiTelescopeIcon,
  SiTerminalIcon,
} from '@semantic-icons/lucide-icons';

/** A run of text: plain, inline code or bold. */
interface Span {
  readonly text: string;
  readonly code?: boolean;
  readonly strong?: boolean;
}

/** A block of a reply: a paragraph, a list item, or a code block. */
interface Block {
  readonly kind: 'p' | 'li' | 'code';
  readonly spans: readonly Span[];
}

/** One scripted turn: the question, then the agent's thinking, command and reply. */
interface Turn {
  readonly question: string;
  readonly reasoning?: string;
  readonly command: string;
  readonly output: string;
  readonly runTime: number;
  readonly reply: readonly Block[];
}

interface UserMessage {
  readonly id: string;
  readonly role: 'user';
  readonly text: string;
}

interface AgentMessage {
  readonly id: string;
  readonly role: 'assistant';
  readonly reasoning?: { readonly text: string; readonly running: boolean };
  readonly tool?: {
    readonly command: string;
    readonly output?: string;
  };
  readonly reply: readonly Block[];
}

type ChatMessage = UserMessage | AgentMessage;

const p = (...spans: Span[]): Block => ({ kind: 'p', spans });
const li = (...spans: Span[]): Block => ({ kind: 'li', spans });
const code = (text: string): Block => ({
  kind: 'code',
  spans: [{ text }],
});
const c = (text: string): Span => ({ text, code: true });
const b = (text: string): Span => ({ text, strong: true });
const t = (text: string): Span => ({ text });

const TURNS: readonly Turn[] = [
  {
    question: 'Add a dark mode toggle to the settings page.',
    reasoning:
      'I need to know how themes are set up before I add a toggle. If next-themes is already in the layout, the toggle only has to call setTheme.',
    command: 'rg -l ThemeProvider app',
    output: 'app/layout.tsx',
    runTime: 800,
    reply: [
      p(
        t('next-themes is already set up in '),
        c('app/layout.tsx'),
        t(', so the toggle only has to call '),
        c('setTheme'),
        t('.'),
      ),
      p(b('Changes')),
      li(
        t('Added '),
        c('components/mode-toggle.tsx'),
        t(' with a Light and Dark option.'),
      ),
      li(
        t('Put '),
        c('<ModeToggle />'),
        t(' next to the Appearance heading in '),
        c('app/settings/page.tsx'),
        t('.'),
      ),
      code('const { setTheme } = useTheme()'),
    ],
  },
  {
    question: 'Make it follow the system setting by default.',
    reasoning:
      'The default theme lives on the ThemeProvider. I should check what it is set to now.',
    command: 'rg -n defaultTheme app/layout.tsx',
    output: '12:  <ThemeProvider attribute="class" defaultTheme="light">',
    runTime: 800,
    reply: [
      p(
        t('It was set to '),
        c('light'),
        t('. I updated the '),
        c('ThemeProvider'),
        t(' in '),
        c('app/layout.tsx'),
        t(':'),
      ),
      code(
        '<ThemeProvider attribute="class" defaultTheme="system" enableSystem>',
      ),
      p(
        t(
          'New visitors now get the theme from their OS. The toggle also has a ',
        ),
        b('System'),
        t(' option, so anyone who picked Light or Dark can switch back.'),
      ),
    ],
  },
  {
    question: 'Run the build before I ship it.',
    command: 'pnpm build',
    output:
      '▲ Next.js 16.0.0\\n\\n✓ Compiled successfully in 4.2s\\n✓ Linting and checking validity of types\\n✓ Generating static pages (12/12)',
    runTime: 1600,
    reply: [
      p(t('The build passes, so it is ready to ship.')),
      li(t('Compiled in '), b('4.2s'), t('.')),
      li(t('No lint or type errors.')),
      li(t('Generated all '), b('12'), t(' static pages.')),
    ],
  },
];

const FALLBACK: readonly Block[] = [
  p(t('This demo only knows the scripted turns. Press reset to start over.')),
];

/** The first \`count\` words of a reply; a code block comes whole once reached. */
function cut(blocks: readonly Block[], count: number): Block[] {
  const out: Block[] = [];
  let left = count;
  for (const block of blocks) {
    if (left <= 0) break;
    if (block.kind === 'code') {
      out.push(block);
      left -= 1;
      continue;
    }
    const spans: Span[] = [];
    for (const span of block.spans) {
      if (left <= 0) break;
      const words = span.text.split(/(?<= )/);
      spans.push({ ...span, text: words.slice(0, left).join('') });
      left -= words.length;
    }
    out.push({ ...block, spans });
  }
  return out;
}

/** How many words \`cut\` counts in a reply. */
function size(blocks: readonly Block[]): number {
  return blocks.reduce(
    (n, block) =>
      n +
      (block.kind === 'code'
        ? 1
        : block.spans.reduce((m, s) => m + s.text.split(/(?<= )/).length, 0)),
    0,
  );
}

/** A reasoning row: open while it thinks, closed when done — your click wins. */
@Component({
  selector: 'app-chat-reasoning-row',
  imports: [
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiCircleCheckIcon,
    SiLoaderCircleIcon,
  ],
  template: \`
    <div
      scCollapsible
      scTraceCollapsible
      [open]="choice() ?? running()"
      (openChange)="choice.set($event)"
    >
      <button scCollapsibleTrigger scTraceCollapsibleTrigger>
        <span scTraceLine [status]="running() ? 'running' : undefined">
          <span scTraceIcon>
            @if (running()) {
              <svg siLoaderCircleIcon class="motion-safe:animate-spin"></svg>
            } @else {
              <svg siCircleCheckIcon></svg>
            }
          </span>
          <span scTraceTitle>{{ running() ? 'Thinking' : 'Thought' }}</span>
        </span>
      </button>
      <div scCollapsiblePanel>
        <div scTraceCollapsiblePanelContent class="whitespace-pre-wrap">
          {{ text() }}
        </div>
      </div>
    </div>
  \`,
  host: { class: 'contents' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatReasoningRow {
  readonly text = input('');
  readonly running = input(false);
  protected readonly choice = signal<boolean | null>(null);
}

/** The thread: scripted turns, the next one waiting in the field; send plays it. */
@Component({
  selector: 'app-chat-usage-demo',
  imports: [
    ChatReasoningRow,
    NgTemplateOutlet,
    FormField,
    FormRoot,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCodeBlock,
    ScCodeBlockContent,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuSeparator,
    ScMenuTrigger,
    ScMessage,
    ScMessageContent,
    ScMessageScroller,
    ScMessageScrollerButton,
    ScMessageScrollerContent,
    ScMessageScrollerItem,
    ScMessageScrollerViewport,
    ScTextarea,
    ScTooltip,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiGlobeIcon,
    SiMessageCircleDashedIcon,
    SiPaperclipIcon,
    SiPlusIcon,
    SiRotateCwIcon,
    SiTelescopeIcon,
    SiTerminalIcon,
  ],
  template: \`
    <div class="flex h-150 w-full flex-col gap-4">
      <div class="flex items-start justify-between gap-4 px-6 pt-6">
        <div class="flex flex-col gap-1">
          <div class="font-medium">New Thread</div>
          <div class="text-muted-foreground text-sm">
            Ask the agent to change your code.
          </div>
        </div>
        <div scTooltipProvider>
          <button
            scButton
            scTooltipTrigger
            variant="outline"
            size="icon"
            [disabled]="busy()"
            (click)="reset()"
          >
            <svg siRotateCwIcon></svg>
            <span class="sr-only">Reset conversation</span>
          </button>
          <ng-template scTooltipPortal>
            <div scTooltip>Reset</div>
          </ng-template>
        </div>
      </div>

      <div class="min-h-0 flex-1">
        @if (messages().length === 0) {
          <div scEmpty class="h-full">
            <div scEmptyHeader>
              <div scEmptyMedia variant="icon">
                <svg siMessageCircleDashedIcon></svg>
              </div>
              <h3 scEmptyTitle>What should we build?</h3>
              <div scEmptyDescription>
                The agent can read your code, run commands and make changes.
                Press send to start.
              </div>
            </div>
          </div>
        } @else {
          <div scMessageScroller autoScroll>
            <div scMessageScrollerViewport aria-label="Conversation">
              <div
                scMessageScrollerContent
                class="gap-6 px-6"
                [attr.aria-busy]="busy()"
              >
                @for (message of messages(); track message.id) {
                  @if (message.role === 'user') {
                    <div
                      scMessageScrollerItem
                      [messageId]="message.id"
                      scrollAnchor
                      animate.enter="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4"
                    >
                      <div scMessage alignment="end">
                        <div scMessageContent>
                          <div scBubble alignment="end" variant="muted">
                            <div scBubbleContent>{{ message.text }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  } @else {
                    <div scMessageScrollerItem [messageId]="message.id">
                      <div scMessage>
                        <div scMessageContent class="gap-3">
                          @if (message.reasoning || message.tool) {
                            <div scTrace>
                              @if (message.reasoning; as reasoning) {
                                <app-chat-reasoning-row
                                  [text]="reasoning.text"
                                  [running]="reasoning.running"
                                />
                              }
                              @if (message.tool; as tool) {
                                @if (tool.output) {
                                  <div scCollapsible scTraceCollapsible>
                                    <button
                                      scCollapsibleTrigger
                                      scTraceCollapsibleTrigger
                                    >
                                      <span scTraceLine>
                                        <span scTraceIcon>
                                          <svg siTerminalIcon></svg>
                                        </span>
                                        <span scTraceTitle
                                          >Ran {{ tool.command }}</span
                                        >
                                      </span>
                                    </button>
                                    <div scCollapsiblePanel>
                                      <div scTraceCollapsiblePanelContent>
                                        <div scCodeBlock size="sm">
                                          <pre
                                            scCodeBlockContent
                                            wrap
                                            class="max-h-64"
                                            [code]="tool.output"
                                          ></pre>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                } @else {
                                  <span scTraceLine status="running">
                                    <span scTraceIcon>
                                      <svg siTerminalIcon></svg>
                                    </span>
                                    <span scTraceTitle
                                      >Running {{ tool.command }}</span
                                    >
                                  </span>
                                }
                              }
                            </div>
                          }
                          @if (message.reply.length) {
                            <div class="flex flex-col gap-3">
                              @for (block of message.reply; track $index) {
                                @switch (block.kind) {
                                  @case ('code') {
                                    <div scCodeBlock size="sm">
                                      <pre
                                        scCodeBlockContent
                                        wrap
                                        language="tsx"
                                        [code]="block.spans[0].text"
                                      ></pre>
                                    </div>
                                  }
                                  @case ('li') {
                                    <p class="flex gap-2 ps-1">
                                      <span aria-hidden="true">•</span>
                                      <span>
                                        <ng-container
                                          [ngTemplateOutlet]="spans"
                                          [ngTemplateOutletContext]="{
                                            $implicit: block.spans,
                                          }"
                                        />
                                      </span>
                                    </p>
                                  }
                                  @default {
                                    <p>
                                      <ng-container
                                        [ngTemplateOutlet]="spans"
                                        [ngTemplateOutletContext]="{
                                          $implicit: block.spans,
                                        }"
                                      />
                                    </p>
                                  }
                                }
                              }
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  }
                }
              </div>
            </div>
            <button scMessageScrollerButton>
              <svg siArrowDownIcon></svg>
              <span class="sr-only">Scroll to the latest message</span>
            </button>
          </div>
        }
      </div>

      <form [formRoot]="composer" class="px-6 pb-6">
        <div scInputGroup>
          <textarea
            scTextarea
            class="min-h-14"
            placeholder="Ask the agent..."
            aria-label="Message"
            [formField]="composer.text"
            (keydown.enter)="sendOnEnter($event)"
          ></textarea>
          <div scInputGroupAddon side="bottom" class="pt-1">
            <div scMenuProvider side="top" alignment="start">
              <button
                scInputGroupButton
                scMenuTrigger
                type="button"
                variant="outline"
                size="icon-sm"
              >
                <svg siPlusIcon></svg>
                <span class="sr-only">Add context</span>
              </button>
              <ng-template scMenuPortal>
                <div scMenu class="w-44">
                  <ng-template scMenuContent>
                    <div scMenuItem value="files">
                      <svg siPaperclipIcon></svg>
                      Add Photos &amp; Files
                    </div>
                    <div scMenuSeparator></div>
                    <div scMenuItem value="research">
                      <svg siTelescopeIcon></svg>
                      Deep Research
                    </div>
                    <div scMenuItem value="web">
                      <svg siGlobeIcon></svg>
                      Web Search
                    </div>
                  </ng-template>
                </div>
              </ng-template>
            </div>
            <button
              scInputGroupButton
              type="submit"
              variant="default"
              size="icon-sm"
              class="ms-auto"
              [disabled]="busy()"
            >
              <svg siArrowUpIcon></svg>
              <span class="sr-only">Send</span>
            </button>
          </div>
        </div>
      </form>
    </div>

    <ng-template #spans let-spans>
      @for (span of spans; track $index) {
        @if (span.code) {
          <code class="bg-muted rounded px-1 py-0.5 font-mono text-[0.9em]">{{
            span.text
          }}</code>
        } @else if (span.strong) {
          <strong class="font-semibold">{{ span.text }}</strong>
        } @else {
          <span>{{ span.text }}</span>
        }
      }
    </ng-template>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ChatUsageDemo {
  protected readonly messages = signal<readonly ChatMessage[]>([]);
  protected readonly busy = signal(false);

  private readonly model = signal({ text: TURNS[0].question });
  protected readonly composer = form(this.model, () => undefined, {
    submission: { action: async () => this.send() },
  });

  /** The scripted turns played so far. */
  private played = 0;
  private sent = 0;
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  /** Enter sends; Shift+Enter starts a new line. */
  protected sendOnEnter(event: Event): void {
    const key = event as KeyboardEvent;
    if (key.shiftKey || key.isComposing) return;
    key.preventDefault();
    (key.target as HTMLTextAreaElement).form?.requestSubmit();
  }

  protected reset(): void {
    this.stop();
    this.played = 0;
    this.messages.set([]);
    this.busy.set(false);
    this.model.set({ text: TURNS[0].question });
  }

  private send(): void {
    const text = this.model().text.trim();
    if (!text || this.busy()) return;
    const turn = TURNS[this.played];
    const n = ++this.sent;
    const id = \`reply-\${n}\`;
    this.model.set({ text: '' });
    this.busy.set(true);
    this.messages.update((messages) => [
      ...messages,
      { id: \`ask-\${n}\`, role: 'user', text },
    ]);

    // Your own words, or the script ran out: the fallback reply.
    if (!turn || text !== turn.question) {
      this.at(600, () => this.add({ id, role: 'assistant', reply: [] }));
      this.streamReply(id, FALLBACK, 600, () => this.finish());
      return;
    }
    this.played += 1;
    let time = 600;
    this.at(time, () =>
      this.add({
        id,
        role: 'assistant',
        reasoning: turn.reasoning ? { text: '', running: true } : undefined,
        reply: [],
      }),
    );
    if (turn.reasoning) {
      const words = turn.reasoning.split(' ');
      words.forEach((_, i) => {
        time += 30;
        this.at(time, () =>
          this.update(id, () => ({
            reasoning: { text: words.slice(0, i + 1).join(' '), running: true },
          })),
        );
      });
      time += 100;
      this.at(time, () =>
        this.update(id, (m) => ({
          reasoning: m.reasoning && { ...m.reasoning, running: false },
        })),
      );
      time += 400;
    }
    this.at(time, () =>
      this.update(id, () => ({ tool: { command: turn.command } })),
    );
    time += turn.runTime;
    this.at(time, () =>
      this.update(id, () => ({
        tool: { command: turn.command, output: turn.output },
      })),
    );
    this.streamReply(id, turn.reply, time + 500, () => this.finish());
  }

  /** Writes the reply a word at a time from \`start\`, then calls \`done\`. */
  private streamReply(
    id: string,
    reply: readonly Block[],
    start: number,
    done: () => void,
  ): void {
    let time = start;
    for (let count = 1; count <= size(reply); count++) {
      time += 25;
      this.at(time, () =>
        this.update(id, () => ({ reply: cut(reply, count) })),
      );
    }
    this.at(time, done);
  }

  /** The turn is over: the next scripted question waits in the field. */
  private finish(): void {
    this.busy.set(false);
    this.model.set({ text: TURNS[this.played]?.question ?? '' });
  }

  private add(message: AgentMessage): void {
    this.messages.update((messages) => [...messages, message]);
  }

  private update(
    id: string,
    change: (message: AgentMessage) => Partial<AgentMessage>,
  ): void {
    this.messages.update((messages) =>
      messages.map((message) =>
        message.id === id && message.role === 'assistant'
          ? { ...message, ...change(message) }
          : message,
      ),
    );
  }

  private at(time: number, run: () => void): void {
    this.timers.push(setTimeout(run, time));
  }

  private stop(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}`;
}
