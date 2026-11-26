import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScCard,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScInputGroupText,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemTitle,
  ScMessage,
  ScMessageAvatar,
  ScMessageContent,
  ScMessageScroller,
  ScMessageScrollerButton,
  ScMessageScrollerContent,
  ScMessageScrollerItem,
  ScMessageScrollerViewport,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiPlusIcon,
  SiSparklesIcon,
  SiSquareIcon,
} from '@semantic-icons/lucide-icons';
import { ME } from '../../data/people';
import { PageHeader } from '../../layout/page-header';
import { count } from '../../shared/format';

interface ChatMessage {
  readonly id: string;
  readonly role: 'user' | 'assistant';
  readonly text: string;
}

interface Conversation {
  readonly id: number;
  readonly title: string;
  readonly messages: readonly ChatMessage[];
}

/** The suggestions, in the order of their answers below. */
const SUGGESTIONS = [
  $localize`:@@ai.chat.summariseLastMonthSSales:Summarise last month’s sales`,
  $localize`:@@ai.chat.draftAReplyToA:Draft a reply to a late-delivery ticket`,
  $localize`:@@ai.chat.ideasForABlogPost:Ideas for a blog post on dashboards`,
  $localize`:@@ai.chat.explainChurnInOneParagraph:Explain churn in one paragraph`,
];

/**
 * Canned answers, picked by the suggestion asked or a word of the question
 * (English words: a question typed in another language gets the fallback).
 * The app has no model behind it.
 */
const ANSWERS: readonly { words: readonly string[]; text: string }[] = [
  {
    words: ['sales', 'revenue', 'month'],
    text: $localize`:@@ai.chat.salesWere147kOverThe:Sales were $147K over the half, up 18.6%. June was the best month at $31.6K, carried by headphones and books; conversion slipped a little, to 3.2%, so the growth came from more visitors rather than better checkout. Worth a look: the drop between cart and payment on phones.`,
  },
  {
    words: ['ticket', 'reply', 'delivery', 'late'],
    text: $localize`:@@ai.chat.hereIsADraftHi:Here is a draft:

Hi — thank you for your patience, and sorry the parcel is late. It left our warehouse on Monday and the carrier now expects it on Thursday. I have refunded the shipping to your card; if it has not arrived by Friday, reply here and we will send a new one at once.`,
  },
  {
    words: ['blog', 'post', 'ideas', 'article'],
    text: $localize`:@@ai.chat.threeIdeas1OneLook:Three ideas: 1) “One look, many screens” — how a style keeps a dashboard consistent. 2) “Charts that read in greyscale” — choosing shades that survive a neutral theme. 3) “From mock data to real” — swapping in-memory stores for an API without touching the screens.`,
  },
  {
    words: ['churn'],
    text: $localize`:@@ai.chat.churnIsTheShareOf:Churn is the share of paying accounts that leave in a period. At 2.1% a month, about one account in fifty cancels each month; over a year that compounds to roughly 22%. Lowering it is usually cheaper than finding new accounts to replace the ones lost.`,
  },
];

const FALLBACK = $localize`:@@ai.chat.goodQuestionInThisDemo:Good question. In this demo I answer from a few prepared notes — ask about sales, churn, a ticket reply or blog ideas to see a fuller answer.`;

/** AI Chat (Pro): past conversations, a conversation, a prompt. */
@Component({
  selector: 'app-ai-chat-page',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCard,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScInputGroupText,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemTitle,
    ScMessage,
    ScMessageAvatar,
    ScMessageContent,
    ScMessageScroller,
    ScMessageScrollerButton,
    ScMessageScrollerContent,
    ScMessageScrollerItem,
    ScMessageScrollerViewport,
    ScTextarea,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiPlusIcon,
    SiSparklesIcon,
    SiSquareIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@ai.chat.aiChat"
      title="AI Chat"
      [trail]="[{ label: t.apps }, { label: t.aiChat }]"
    />

    <div
      class="grid min-h-[36rem] gap-4 lg:h-[calc(100svh-14rem)] lg:grid-cols-[16rem_1fr]"
    >
      <div scCard class="gap-3 p-3">
        <button scButton variant="outline" (click)="newChat()">
          <svg siPlusIcon></svg>
          <ng-container i18n="@@ai.chat.newChat">New chat</ng-container>
        </button>
        <h2
          i18n="@@ai.chat.history"
          class="text-muted-foreground px-2 text-xs font-medium"
        >
          History
        </h2>
        <ul class="flex flex-col gap-1">
          @for (chat of conversations(); track chat.id) {
            <li>
              <button
                scItem
                size="sm"
                class="w-full"
                [attr.aria-pressed]="chat.id === currentId()"
                (click)="currentId.set(chat.id)"
              >
                <div scItemBody>
                  <div scItemTitle>{{ chat.title }}</div>
                  <p i18n="@@ai.chat.messages" scItemDescription>
                    {{ countOf(chat.messages.length) }} messages
                  </p>
                </div>
              </button>
            </li>
          }
        </ul>
      </div>

      <div scCard class="min-h-0 gap-0 overflow-hidden py-0">
        <div class="relative min-h-0 flex-1">
          @if (messages().length) {
            <div scMessageScroller autoScroll class="absolute inset-0">
              <div
                i18n-aria-label="@@ai.chat.conversation"
                scMessageScrollerViewport
                aria-label="Conversation"
              >
                <div
                  scMessageScrollerContent
                  class="mx-auto max-w-3xl p-4"
                  [attr.aria-busy]="streaming()"
                >
                  @for (message of messages(); track message.id) {
                    <div
                      scMessageScrollerItem
                      [messageId]="message.id"
                      [scrollAnchor]="message.role === 'user'"
                    >
                      @if (message.role === 'user') {
                        <div scMessage alignment="end">
                          <div scMessageAvatar>
                            <span scAvatar>
                              <img scAvatarImage [src]="me.avatar" alt="" />
                              <span scAvatarFallback>MA</span>
                            </span>
                          </div>
                          <div scMessageContent>
                            <div scBubble>
                              <div scBubbleContent>{{ message.text }}</div>
                            </div>
                          </div>
                        </div>
                      } @else {
                        <div scMessage>
                          <div scMessageAvatar>
                            <span scAvatar>
                              <span scAvatarFallback
                                ><svg siSparklesIcon></svg
                              ></span>
                            </span>
                          </div>
                          <div scMessageContent>
                            <div scBubble variant="ghost">
                              <div scBubbleContent class="whitespace-pre-line">
                                {{ message.text }}
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  }
                </div>
              </div>
              <button scMessageScrollerButton>
                <svg siArrowDownIcon></svg>
                <span i18n="@@ai.chat.scrollToTheLatestMessage" class="sr-only"
                  >Scroll to the latest message</span
                >
              </button>
            </div>
          } @else {
            <div
              class="flex h-full flex-col items-center justify-center gap-6 p-6 text-center"
            >
              <span
                class="bg-muted flex size-12 items-center justify-center rounded-full"
              >
                <svg siSparklesIcon></svg>
              </span>
              <div class="flex flex-col gap-1">
                <h2 i18n="@@ai.chat.howCanIHelp" class="text-xl font-semibold">
                  How can I help?
                </h2>
                <p
                  i18n="@@ai.chat.askAboutYourNumbersOr"
                  class="text-muted-foreground text-sm"
                >
                  Ask about your numbers, or start from one of these.
                </p>
              </div>
              <div class="grid w-full max-w-xl gap-2 sm:grid-cols-2">
                @for (suggestion of suggestions; track suggestion) {
                  <button
                    scButton
                    variant="outline"
                    class="h-auto justify-start py-3 text-start whitespace-normal"
                    (click)="send(suggestion)"
                  >
                    {{ suggestion }}
                  </button>
                }
              </div>
            </div>
          }
        </div>

        <form class="border-t p-4" (submit)="submit($event)">
          <div scInputGroup class="mx-auto max-w-3xl">
            <textarea
              i18n-placeholder="@@ai.chat.askAnything"
              i18n-aria-label="@@ai.chat.message"
              scTextarea
              rows="2"
              aria-label="Message"
              placeholder="Ask anything…"
              [value]="draft()"
              (input)="draft.set($any($event.target).value)"
              (keydown.enter)="enter($event)"
            ></textarea>
            <div scInputGroupAddon side="bottom">
              <span i18n="@@ai.chat.enterSendsShiftEnterA" scInputGroupText
                >Enter sends, Shift+Enter a new line</span
              >
              @if (streaming()) {
                <button
                  scInputGroupButton
                  variant="secondary"
                  size="icon-xs"
                  class="ms-auto"
                  (click)="stop()"
                >
                  <svg siSquareIcon></svg>
                  <span i18n="@@ai.chat.stop" class="sr-only">Stop</span>
                </button>
              } @else {
                <button
                  scInputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-xs"
                  class="ms-auto"
                  [disabled]="!draft().trim()"
                >
                  <svg siArrowUpIcon></svg>
                  <span i18n="@@ai.chat.send" class="sr-only">Send</span>
                </button>
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AiChatPage {
  /** In the user's numbering system. */
  private readonly countOf = count;

  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    apps: $localize`:@@ai.chat.apps:Apps`,
    aiChat: $localize`:@@ai.chat.aiChat:AI Chat`,
  };

  /** A question brought from elsewhere (the SaaS dashboard): `?q=`. */
  readonly q = input<string>();

  private readonly me = ME;
  private readonly suggestions = SUGGESTIONS;
  private readonly draft = signal('');
  private readonly streaming = signal(false);
  private timer: ReturnType<typeof setInterval> | undefined;
  private nextId = 1;

  private readonly conversations = signal<readonly Conversation[]>([
    {
      id: 2,
      title: $localize`:@@ai.chat.churnInOneParagraph:Churn in one paragraph`,
      messages: [
        { id: 'h1', role: 'user', text: SUGGESTIONS[3] },
        { id: 'h2', role: 'assistant', text: ANSWERS[3].text },
      ],
    },
    {
      id: 1,
      title: $localize`:@@ai.chat.blogIdeas:Blog ideas`,
      messages: [
        { id: 'h3', role: 'user', text: SUGGESTIONS[2] },
        { id: 'h4', role: 'assistant', text: ANSWERS[2].text },
      ],
    },
  ]);
  private readonly currentId = signal(0);
  private readonly messages = computed(
    () =>
      this.conversations().find((chat) => chat.id === this.currentId())
        ?.messages ?? [],
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
    effect(() => {
      const question = this.q()?.trim();
      if (question) untracked(() => this.send(question));
    });
  }

  private newChat(): void {
    this.stop();
    this.currentId.set(0);
    this.draft.set('');
  }

  private enter(event: Event): void {
    if ((event as KeyboardEvent).shiftKey) return;
    event.preventDefault();
    this.send(this.draft());
  }

  private submit(event: Event): void {
    event.preventDefault();
    this.send(this.draft());
  }

  /** Adds the question, then types the answer in, a few words at a time. */
  private send(text: string): void {
    const question = text.trim();
    if (!question || this.streaming()) return;
    this.draft.set('');
    let id = this.currentId();
    if (!id) {
      id = Math.max(0, ...this.conversations().map((chat) => chat.id)) + 1;
      const title =
        question.length > 32 ? question.slice(0, 32) + '…' : question;
      this.conversations.update((chats) => [
        { id, title, messages: [] },
        ...chats,
      ]);
      this.currentId.set(id);
    }
    const answerId = `m${this.nextId++}`;
    this.append(id, { id: `m${this.nextId++}`, role: 'user', text: question });
    this.append(id, { id: answerId, role: 'assistant', text: '' });

    const words = answerTo(question).split(/(\s+)/);
    let shown = 0;
    this.streaming.set(true);
    this.timer = setInterval(() => {
      shown += 2;
      this.write(id, answerId, words.slice(0, shown).join(''));
      if (shown >= words.length) this.stop();
    }, 40);
  }

  private stop(): void {
    clearInterval(this.timer);
    this.streaming.set(false);
  }

  private append(chatId: number, message: ChatMessage): void {
    this.conversations.update((chats) =>
      chats.map((chat) =>
        chat.id === chatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat,
      ),
    );
  }

  private write(chatId: number, messageId: string, text: string): void {
    this.conversations.update((chats) =>
      chats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map((m) =>
                m.id === messageId ? { ...m, text } : m,
              ),
            }
          : chat,
      ),
    );
  }
}

function answerTo(question: string): string {
  const asked = SUGGESTIONS.indexOf(question);
  if (asked >= 0) return ANSWERS[asked].text;
  const lower = question.toLowerCase();
  return (
    ANSWERS.find((answer) => answer.words.some((w) => lower.includes(w)))
      ?.text ?? FALLBACK
  );
}
