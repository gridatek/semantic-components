import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScMessage,
  ScMessageContent,
  ScMessageScroller,
  ScMessageScrollerButton,
  ScMessageScrollerContent,
  ScMessageScrollerItem,
  ScMessageScrollerViewport,
  ScTextarea,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsibleIcon,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceDescription,
  ScTraceIcon,
  ScTraceLine,
  type ScTraceLineStatus,
  ScTraceTitle,
} from '@semantic-components/ui';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiBrainIcon,
  SiChevronRightIcon,
  SiFileTextIcon,
  SiLoaderCircleIcon,
  SiSearchIcon,
} from '@semantic-icons/lucide-icons';
import { Logo } from '../../components/logo/logo';

interface ChatStep {
  readonly kind: 'search' | 'read';
  readonly title: string;
  readonly status?: ScTraceLineStatus;
  readonly detail?: string;
  /** What it found: the step opens on it. */
  readonly output?: string;
}

/** The agent's thinking: open while it runs, unless the person chose. */
interface ChatReasoning {
  readonly text: string;
  readonly running: boolean;
  readonly choice?: boolean;
}

interface ChatMessage {
  readonly id: string;
  readonly role: 'user' | 'assistant';
  readonly text: string;
  readonly reasoning?: ChatReasoning;
  readonly steps?: readonly ChatStep[];
}

/** The time between two words of a streamed reply (ms). */
const WORD_TIME = 50;

@Component({
  selector: 'app-chat',
  imports: [
    FormField,
    FormRoot,
    RouterLink,
    Logo,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScMessage,
    ScMessageContent,
    ScMessageScroller,
    ScMessageScrollerButton,
    ScMessageScrollerContent,
    ScMessageScrollerItem,
    ScMessageScrollerViewport,
    ScTextarea,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleIcon,
    ScTraceCollapsibleTrigger,
    ScTraceDescription,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiBrainIcon,
    SiChevronRightIcon,
    SiFileTextIcon,
    SiLoaderCircleIcon,
    SiSearchIcon,
  ],
  template: `
    <div class="bg-background flex h-dvh flex-col">
      <header class="flex items-center gap-3 border-b px-4 py-3">
        <a routerLink="/" class="rounded-md">
          <app-logo />
        </a>
        <h1 class="text-base font-semibold" i18n="@@chat.title">Assistant</h1>
      </header>

      <main class="mx-auto flex min-h-0 w-full max-w-2xl flex-1 flex-col">
        <div class="min-h-0 flex-1">
          <div scMessageScroller autoScroll>
            <div
              scMessageScrollerViewport
              aria-label="Conversation"
              i18n-aria-label="@@chat.conversation"
            >
              <div
                scMessageScrollerContent
                class="px-4 py-6"
                [attr.aria-busy]="streaming()"
              >
                @for (message of messages(); track message.id) {
                  <div
                    scMessageScrollerItem
                    [messageId]="message.id"
                    [scrollAnchor]="message.role === 'user'"
                  >
                    <div
                      scMessage
                      [alignment]="message.role === 'user' ? 'end' : 'start'"
                    >
                      <div scMessageContent class="gap-3">
                        @if (message.reasoning || message.steps?.length) {
                          <div scTrace>
                            @if (message.reasoning; as reasoning) {
                              @if (reasoning.text) {
                                <div
                                  scCollapsible
                                  scTraceCollapsible
                                  [open]="reasoning.choice ?? reasoning.running"
                                  (openChange)="
                                    updateReasoning(message.id, {
                                      choice: $event,
                                    })
                                  "
                                >
                                  <button
                                    scCollapsibleTrigger
                                    scTraceCollapsibleTrigger
                                  >
                                    <span
                                      scTraceLine
                                      [status]="
                                        reasoning.running
                                          ? 'running'
                                          : undefined
                                      "
                                    >
                                      <span scTraceIcon>
                                        <svg siBrainIcon></svg>
                                      </span>
                                      <span scTraceTitle>{{
                                        reasoning.running ? thinking : thought
                                      }}</span>
                                    </span>
                                    <span scTraceCollapsibleIcon>
                                      <svg siChevronRightIcon></svg>
                                    </span>
                                  </button>
                                  <div scCollapsiblePanel>
                                    <div scTraceCollapsiblePanelContent>
                                      {{ reasoning.text }}
                                    </div>
                                  </div>
                                </div>
                              } @else {
                                <span scTraceLine status="running">
                                  <span scTraceIcon>
                                    <svg siBrainIcon></svg>
                                  </span>
                                  <span scTraceTitle>{{ thinking }}</span>
                                </span>
                              }
                            }
                            @for (step of message.steps; track $index) {
                              @if (step.output) {
                                <div scCollapsible scTraceCollapsible>
                                  <button
                                    scCollapsibleTrigger
                                    scTraceCollapsibleTrigger
                                  >
                                    <span scTraceLine [status]="step.status">
                                      <span scTraceIcon>
                                        <svg siFileTextIcon></svg>
                                      </span>
                                      <span scTraceTitle>{{ step.title }}</span>
                                    </span>
                                    <span scTraceCollapsibleIcon>
                                      <svg siChevronRightIcon></svg>
                                    </span>
                                  </button>
                                  <div scCollapsiblePanel>
                                    <div scTraceCollapsiblePanelContent>
                                      {{ step.output }}
                                    </div>
                                  </div>
                                </div>
                              } @else {
                                <span scTraceLine [status]="step.status">
                                  <span scTraceIcon>
                                    @if (step.status === 'running') {
                                      <svg
                                        siLoaderCircleIcon
                                        class="motion-safe:animate-spin"
                                      ></svg>
                                    } @else if (step.kind === 'search') {
                                      <svg siSearchIcon></svg>
                                    } @else {
                                      <svg siFileTextIcon></svg>
                                    }
                                  </span>
                                  <span scTraceTitle>{{ step.title }}</span>
                                  @if (step.detail) {
                                    <span scTraceDescription>
                                      {{ step.detail }}
                                    </span>
                                  }
                                </span>
                              }
                            }
                          </div>
                        }
                        @if (message.text) {
                          <div
                            scBubble
                            [alignment]="
                              message.role === 'user' ? 'end' : 'start'
                            "
                            [variant]="
                              message.role === 'user' ? 'default' : 'muted'
                            "
                          >
                            <div scBubbleContent>{{ message.text }}</div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
            <button scMessageScrollerButton>
              <svg siArrowDownIcon></svg>
              <span class="sr-only" i18n="@@chat.latest">
                Scroll to the latest message
              </span>
            </button>
          </div>
        </div>

        <form [formRoot]="composer" class="relative px-4 pb-4">
          <label for="chat-message" class="sr-only" i18n="@@chat.message">
            Message
          </label>
          <textarea
            id="chat-message"
            scTextarea
            rows="2"
            class="resize-none pe-12"
            placeholder="Ask about the components…"
            i18n-placeholder="@@chat.placeholder"
            [formField]="composer.text"
            (keydown.enter)="sendOnEnter($event)"
          ></textarea>
          <button
            scButton
            type="submit"
            size="icon-sm"
            class="absolute end-6 bottom-6"
            [disabled]="streaming()"
          >
            <svg siArrowUpIcon></svg>
            <span class="sr-only" i18n="@@chat.send">Send</span>
          </button>
        </form>
      </main>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class ChatPage {
  private readonly destroyRef = inject(DestroyRef);
  private timer: ReturnType<typeof setTimeout> | undefined;
  private sent = 0;

  /** The reasoning line's title, while it thinks and once done. */
  protected readonly thinking = $localize`:@@chat.thinking:Thinking`;
  protected readonly thought = $localize`:@@chat.thought:Thought`;

  readonly messages = signal<readonly ChatMessage[]>([
    {
      id: 'q1',
      role: 'user',
      text: $localize`:@@chat.q1:Which component shows an agent's steps?`,
    },
    {
      id: 'a1',
      role: 'assistant',
      reasoning: {
        text: $localize`:@@chat.a1.thought:The question is about an agent's steps. Search the docs for steps and tool calls, then read the page that matches.`,
        running: false,
      },
      steps: [
        {
          kind: 'search',
          title: $localize`:@@chat.a1.searched:Searched the docs`,
          detail: $localize`:@@chat.a1.results:3 results`,
        },
        {
          kind: 'read',
          title: $localize`:@@chat.a1.read:Read the Trace page`,
          output: $localize`:@@chat.a1.output:Trace — a line per step: its icon, its title, its status, its detail; a step can open on its output.`,
        },
      ],
      text: $localize`:@@chat.a1:Trace: a line per step, with a status, a detail and the output it opens on — above the reply, as here.`,
    },
  ]);
  readonly streaming = signal(false);

  private readonly model = signal({ text: '' });
  readonly composer = form(this.model, () => undefined, {
    submission: {
      action: async () => this.send(),
    },
  });

  constructor() {
    this.destroyRef.onDestroy(() => clearTimeout(this.timer));
  }

  /** Enter sends; Shift+Enter starts a new line. */
  protected sendOnEnter(event: Event): void {
    const key = event as KeyboardEvent;
    if (key.shiftKey || key.isComposing) return;
    key.preventDefault();
    (key.target as HTMLTextAreaElement).form?.requestSubmit();
  }

  /** Your message, then a reply: its thinking, its search, then its words. */
  private send(): void {
    const text = this.model().text.trim();
    if (!text || this.streaming()) return;
    this.model.set({ text: '' });
    const n = ++this.sent;
    const reply = `reply-${n}`;
    this.messages.update((messages) => [
      ...messages,
      { id: `ask-${n}`, role: 'user', text },
      {
        id: reply,
        role: 'assistant',
        text: '',
        reasoning: { text: '', running: true },
      },
    ]);
    this.streaming.set(true);
    const thought =
      $localize`:@@chat.reply.thought:A question about this page. Check how the conversation is built before answering: the scroller, the messages and the steps.`.split(
        ' ',
      );
    const words =
      $localize`:@@chat.reply:This page is built with the Message Scroller: your message stays near the top while this reply arrives below it, and the conversation follows the end until you scroll away. Each step of the reply is a Trace line above it.`.split(
        ' ',
      );
    this.after(300, () =>
      this.stream(
        thought,
        (text) => this.updateReasoning(reply, { text }),
        () => {
          this.updateReasoning(reply, { running: false });
          this.updateReply(reply, () => ({
            steps: [
              {
                kind: 'search',
                status: 'running',
                title: $localize`:@@chat.reply.searching:Searching the docs…`,
              },
            ],
          }));
          this.after(900, () => {
            this.updateReply(reply, () => ({
              steps: [
                {
                  kind: 'search',
                  title: $localize`:@@chat.reply.searched:Searched the docs`,
                  detail: $localize`:@@chat.reply.results:2 results`,
                },
              ],
            }));
            this.stream(
              words,
              (text) => this.updateReply(reply, () => ({ text })),
              () => this.streaming.set(false),
            );
          });
        },
      ),
    );
  }

  /** Writes the words one at a time, then calls `done`. */
  private stream(
    words: readonly string[],
    write: (text: string) => void,
    done: () => void,
    next = 0,
  ): void {
    if (next === words.length) {
      done();
      return;
    }
    write(words.slice(0, next + 1).join(' '));
    this.after(WORD_TIME, () => this.stream(words, write, done, next + 1));
  }

  private after(time: number, run: () => void): void {
    this.timer = setTimeout(run, time);
  }

  protected updateReasoning(id: string, change: Partial<ChatReasoning>): void {
    this.updateReply(id, (message) => ({
      reasoning: { text: '', running: false, ...message.reasoning, ...change },
    }));
  }

  private updateReply(
    id: string,
    change: (message: ChatMessage) => Partial<ChatMessage>,
  ): void {
    this.messages.update((messages) =>
      messages.map((message) =>
        message.id === id ? { ...message, ...change(message) } : message,
      ),
    );
  }
}
