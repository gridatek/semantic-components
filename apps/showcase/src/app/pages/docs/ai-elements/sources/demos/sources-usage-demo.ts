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
  ScCollapsible,
  ScCollapsiblePanel,
  ScCollapsibleTrigger,
  ScMessage,
  ScMessageContent,
  ScTrace,
  ScTraceCollapsible,
  ScTraceCollapsiblePanelContent,
  ScTraceCollapsibleTrigger,
  ScTraceIcon,
  ScTraceLine,
  ScTraceTitle,
} from '@semantic-components/ui';
import { SiArrowUpRightIcon, SiGlobeIcon } from '@semantic-icons/lucide-icons';

interface Source {
  url: string;
  title?: string;
}

/** The pages the reply cites, the same one twice among them. */
const CITED: Source[] = [
  {
    url: 'https://docs.astro.build/en/install-and-setup/',
    title: 'Install Astro | docs.astro.build',
  },
  {
    url: 'https://www.npmjs.com/package/create-astro',
    title: 'create-astro | npmjs.com',
  },
  {
    url: 'https://docs.astro.build/en/install-and-setup/',
    title: 'Install Astro | docs.astro.build',
  },
  { url: 'https://pnpm.io/cli/create' },
];

/** The links the agent used for a reply: a line with the count, opening on a link each. */
@Component({
  selector: 'app-sources-usage-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCollapsible,
    ScCollapsiblePanel,
    ScCollapsibleTrigger,
    ScMessage,
    ScMessageContent,
    ScTrace,
    ScTraceCollapsible,
    ScTraceCollapsiblePanelContent,
    ScTraceCollapsibleTrigger,
    ScTraceIcon,
    ScTraceLine,
    ScTraceTitle,
    SiArrowUpRightIcon,
    SiGlobeIcon,
  ],
  template: `
    <div class="flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>
              How do I start an Astro project with pnpm?
            </div>
          </div>
        </div>
      </div>

      @if (reply()) {
        <div scMessage>
          <div scMessageContent class="gap-4">
            <p>{{ reply() }}</p>
            @if (sources().length) {
              <div scTrace>
                <div scCollapsible scTraceCollapsible [open]="true">
                  <button scCollapsibleTrigger scTraceCollapsibleTrigger>
                    <span scTraceLine>
                      <span scTraceIcon><svg siGlobeIcon></svg></span>
                      <span scTraceTitle
                        >Used {{ sources().length }} sources</span
                      >
                    </span>
                  </button>
                  <div scCollapsiblePanel>
                    <div scTraceCollapsiblePanelContent>
                      <div scTrace>
                        @for (source of sources(); track source.url) {
                          <a
                            [href]="source.url"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span scTraceLine>
                              <span scTraceTitle>
                                {{ source.title ?? hostname(source.url) }}
                                <span class="sr-only">
                                  (opens in a new tab)</span
                                >
                              </span>
                              <span scTraceIcon
                                ><svg siArrowUpRightIcon></svg
                              ></span>
                            </span>
                          </a>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      }

      @if (!busy()) {
        <button
          scButton
          variant="outline"
          size="sm"
          class="mt-auto self-start"
          (click)="replay()"
        >
          Replay
        </button>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SourcesUsageDemo {
  private readonly answer =
    'Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies.';
  protected readonly reply = signal(this.answer);
  private readonly cited = signal<Source[]>(CITED);
  protected readonly busy = signal(false);
  /** Each page once: the agent can cite the same one more than once. */
  protected readonly sources = computed(() =>
    this.cited().filter(
      (source, index, all) =>
        all.findIndex((other) => other.url === source.url) === index,
    ),
  );
  private timers: ReturnType<typeof setTimeout>[] = [];

  constructor() {
    inject(DestroyRef).onDestroy(() => this.stop());
  }

  /** A title is optional: fall back to the page's host. */
  protected hostname(url: string): string {
    return new URL(url).hostname;
  }

  protected replay(): void {
    this.stop();
    this.reply.set('');
    this.cited.set([]);
    this.busy.set(true);
    let time = 300;
    const words = this.answer.split(' ');
    words.forEach((_, i) => {
      time += 40;
      this.at(time, () => this.reply.set(words.slice(0, i + 1).join(' ')));
    });
    // The sources arrive after the text.
    CITED.forEach((source) => {
      time += 150;
      this.at(time, () => this.cited.update((cited) => [...cited, source]));
    });
    this.at(time, () => this.busy.set(false));
  }

  private at(time: number, run: () => void): void {
    this.timers.push(setTimeout(run, time));
  }

  private stop(): void {
    this.timers.forEach(clearTimeout);
    this.timers = [];
  }
}
