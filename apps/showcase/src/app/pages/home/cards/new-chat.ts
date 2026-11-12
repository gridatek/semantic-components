import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScCard,
  ScCardAction,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
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
  ScTooltip,
  ScTooltipArrow,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import {
  SiArrowDownIcon,
  SiArrowUpIcon,
  SiGlobeIcon,
  SiImageIcon,
  SiMessageCircleDashedIcon,
  SiPaperclipIcon,
  SiPlusIcon,
  SiRotateCwIcon,
  SiTelescopeIcon,
} from '@semantic-icons/lucide-icons';

interface ChatMessage {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

/** A scripted conversation: each user turn, then its reply. */
const SCRIPT: readonly { user: string; assistant: string }[] = [
  {
    user: "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around.",
    assistant:
      "That's the classic streaming scroll problem. Wrap your message list in `scMessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent.",
  },
  {
    user: 'Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top.',
    assistant:
      "`scMessageScrollerItem` fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container.",
  },
  {
    user: "And if they've scrolled up to re-read an older answer? I don't want to yank them back down.",
    assistant:
      "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `scMessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not.",
  },
  {
    user: 'Last one — does this work with assistive tech?',
    assistant:
      '`scMessageScrollerContent` sets `role="log"` and `aria-relevant="additions"`, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.',
  },
];

/** A paragraph of a reply, as text and inline code. */
type Segment = { code: boolean; text: string };

/**
 * shadcn's message scroller demo, as their home page shows it: a new chat,
 * its next question queued in the input; Send asks it, and the reply streams
 * in word by word (a timer: no AI here). Reset starts again.
 */
@Component({
  selector: 'app-home-new-chat',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
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
    ScTooltip,
    ScTooltipArrow,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    SiArrowDownIcon,
    SiArrowUpIcon,
    SiGlobeIcon,
    SiImageIcon,
    SiMessageCircleDashedIcon,
    SiPaperclipIcon,
    SiPlusIcon,
    SiRotateCwIcon,
    SiTelescopeIcon,
  ],
  template: `
    <div scCard class="mx-auto h-140 w-full max-w-sm gap-0">
      <div scCardHeader class="gap-1 border-b">
        <h2 scCardTitle>New Chat</h2>
        <p scCardDescription>How can I help you today?</p>
        <div scCardAction>
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
              <div scTooltip>
                Reset
                <span scTooltipArrow></span>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
      <div scCardContent class="flex-1 overflow-hidden p-0">
        @if (messages().length === 0) {
          <div scEmpty class="h-full">
            <div scEmptyHeader>
              <div scEmptyMedia variant="icon">
                <svg siMessageCircleDashedIcon></svg>
              </div>
              <h3 scEmptyTitle>Morning!</h3>
              <div scEmptyDescription>
                What are we working on today? Press send to start a new
                conversation
              </div>
            </div>
          </div>
        } @else {
          <div scMessageScroller autoScroll class="h-full">
            <div scMessageScrollerViewport aria-label="New chat">
              <div
                scMessageScrollerContent
                class="p-(--card-spacing)"
                [attr.aria-busy]="busy()"
              >
                @for (message of messages(); track message.id) {
                  <div
                    scMessageScrollerItem
                    [messageId]="'chat-' + message.id"
                    [scrollAnchor]="message.role === 'user'"
                    [animate.enter]="
                      message.role === 'user'
                        ? 'animate-in fade-in slide-in-from-bottom-4 duration-300 motion-reduce:animate-none'
                        : ''
                    "
                  >
                    <div
                      scMessage
                      [align]="message.role === 'user' ? 'end' : 'start'"
                    >
                      <div scMessageContent>
                        <div
                          scBubble
                          [align]="message.role === 'user' ? 'end' : 'start'"
                          [variant]="
                            message.role === 'user' ? 'muted' : 'ghost'
                          "
                        >
                          <div scBubbleContent class="flex flex-col gap-3">
                            @for (
                              paragraph of paragraphs(message.text);
                              track $index
                            ) {
                              <p>
                                @for (part of paragraph; track $index) {
                                  @if (part.code) {
                                    <code
                                      class="bg-muted rounded px-1 font-mono text-[0.85em]"
                                      >{{ part.text }}</code
                                    >
                                  } @else {
                                    {{ part.text }}
                                  }
                                }
                              </p>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
      <div scCardFooter class="flex-col gap-2">
        <form class="w-full" (submit)="$event.preventDefault(); send()">
          <div scInputGroup>
            <div class="h-14 w-full px-3 py-2.5">
              <span
                class="line-clamp-2"
                [class.opacity-60]="busy()"
                aria-live="polite"
              >
                @if (next(); as question) {
                  {{ question.user }}
                } @else {
                  <span class="text-muted-foreground">
                    No messages queued. Reset the conversation.
                  </span>
                }
              </span>
            </div>
            <div scInputGroupAddon align="block-end" class="pt-1">
              <div scMenuProvider side="top" align="start">
                <button
                  scInputGroupButton
                  scMenuTrigger
                  type="button"
                  size="icon-sm"
                  variant="outline"
                >
                  <svg siPlusIcon></svg>
                  <span class="sr-only">Add files</span>
                </button>
                <ng-template scMenuPortal>
                  <div scMenu class="w-44">
                    <ng-template scMenuContent>
                      <div scMenuItem value="files">
                        <svg siPaperclipIcon></svg>
                        Add Photos &amp; Files
                      </div>
                      <div scMenuSeparator></div>
                      <div scMenuItem value="image">
                        <svg siImageIcon></svg>
                        Create Image
                      </div>
                      <div scMenuItem value="research">
                        <svg siTelescopeIcon></svg>
                        Deep Research
                      </div>
                      <div scMenuItem value="search">
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
                [disabled]="!next() || busy()"
              >
                <svg siArrowUpIcon></svg>
                <span class="sr-only">Send</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeNewChat {
  protected readonly messages = signal<readonly ChatMessage[]>([]);
  /** A question asked, its reply not yet complete. */
  protected readonly busy = signal(false);
  /** The next question of the script, or none. */
  protected readonly next = computed(
    () =>
      SCRIPT[this.messages().filter((m) => m.role === 'user').length] ?? null,
  );

  private timers: ReturnType<typeof setTimeout>[] = [];
  private id = 0;

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  protected send(): void {
    const turn = this.next();
    if (!turn || this.busy()) return;
    this.busy.set(true);
    this.messages.update((m) => [
      ...m,
      { id: ++this.id, role: 'user', text: turn.user },
    ]);
    // After a second, the reply, a word every 20 ms.
    const words = turn.assistant.split(/(?<=\s)/);
    const replyId = ++this.id;
    this.timers.push(
      setTimeout(() => {
        this.messages.update((m) => [
          ...m,
          { id: replyId, role: 'assistant', text: '' },
        ]);
        words.forEach((word, i) =>
          this.timers.push(
            setTimeout(() => {
              this.messages.update((m) =>
                m.map((message) =>
                  message.id === replyId
                    ? { ...message, text: message.text + word }
                    : message,
                ),
              );
              if (i === words.length - 1) this.busy.set(false);
            }, i * 20),
          ),
        );
      }, 1000),
    );
  }

  protected reset(): void {
    this.stop();
    this.busy.set(false);
    this.messages.set([]);
  }

  /** A reply's paragraphs, each its text and inline code. */
  protected paragraphs(text: string): Segment[][] {
    return text.split('\n\n').map((paragraph) =>
      paragraph
        .split('`')
        .map((part, i) => ({ code: i % 2 === 1, text: part }))
        .filter((part) => part.text),
    );
  }

  private stop(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
