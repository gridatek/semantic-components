import { NgTemplateOutlet } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScMessage,
  ScMessageContent,
  ScMessageFooter,
  ScTooltip,
  ScTooltipPortal,
  ScTooltipProvider,
  ScTooltipTrigger,
} from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockContent,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiPencilIcon,
  SiRefreshCcwIcon,
  SiThumbsDownIcon,
  SiThumbsUpIcon,
} from '@semantic-icons/lucide-icons';

/** One turn: the person's question, the agent's reply, and the actions under each. */
@Component({
  selector: 'app-message-pattern-usage-demo',
  imports: [
    NgTemplateOutlet,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScCodeBlock,
    ScCodeBlockContent,
    ScMessage,
    ScMessageContent,
    ScMessageFooter,
    ScTooltip,
    ScTooltipPortal,
    ScTooltipProvider,
    ScTooltipTrigger,
    SiCheckIcon,
    SiCopyIcon,
    SiPencilIcon,
    SiRefreshCcwIcon,
    SiThumbsDownIcon,
    SiThumbsUpIcon,
  ],
  template: `
    <div class="mx-auto flex w-full max-w-md flex-col gap-8 py-6 text-sm">
      <div scMessage alignment="end">
        <div scMessageContent class="gap-2">
          <div scBubble alignment="end" variant="muted">
            <div scBubbleContent>
              How do I add a settings dialog? It should open from the gear icon
              in the header.
            </div>
          </div>
          <div scMessageFooter>
            <ng-container
              [ngTemplateOutlet]="action"
              [ngTemplateOutletContext]="{ label: 'Copy', icon: 'copy' }"
            />
            <ng-container
              [ngTemplateOutlet]="action"
              [ngTemplateOutletContext]="{ label: 'Edit', icon: 'edit' }"
            />
          </div>
        </div>
      </div>

      <div scMessage>
        <div scMessageContent class="gap-2">
          <div class="flex flex-col gap-3">
            <p>
              Install Dialog, then open it from the gear button in
              <code class="bg-muted rounded px-1 py-0.5 font-mono text-[0.9em]"
                >site-header.ts</code
              >.
            </p>
            <div scCodeBlock size="sm">
              <pre
                scCodeBlockContent
                language="bash"
                [code]="'ng add @semantic-components/ui'"
              ></pre>
            </div>
            <p>
              Put
              <code class="bg-muted rounded px-1 py-0.5 font-mono text-[0.9em]"
                >scDialogTrigger</code
              >
              on the button and the settings form in the dialog. Focus moves
              into the dialog when it opens, and <strong>Esc</strong> closes it.
            </p>
          </div>
          <div scMessageFooter class="px-0">
            <!-- The name follows the state: Copy, then Copied. -->
            <div scTooltipProvider>
              <button
                scButton
                scTooltipTrigger
                variant="ghost"
                size="icon-sm"
                (click)="copy()"
              >
                @if (copied()) {
                  <svg siCheckIcon></svg>
                } @else {
                  <svg siCopyIcon></svg>
                }
                <span class="sr-only">{{ copied() ? 'Copied' : 'Copy' }}</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>{{ copied() ? 'Copied' : 'Copy' }}</div>
              </ng-template>
            </div>
            <!-- Toggles: a fixed name, the state in aria-pressed. -->
            <div scTooltipProvider>
              <button
                scButton
                scTooltipTrigger
                variant="ghost"
                size="icon-sm"
                [attr.aria-pressed]="feedback() === 'like'"
                (click)="rate('like')"
              >
                <svg
                  siThumbsUpIcon
                  [class.fill-current]="feedback() === 'like'"
                ></svg>
                <span class="sr-only">Good response</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Good response</div>
              </ng-template>
            </div>
            <div scTooltipProvider>
              <button
                scButton
                scTooltipTrigger
                variant="ghost"
                size="icon-sm"
                [attr.aria-pressed]="feedback() === 'dislike'"
                (click)="rate('dislike')"
              >
                <svg
                  siThumbsDownIcon
                  [class.fill-current]="feedback() === 'dislike'"
                ></svg>
                <span class="sr-only">Bad response</span>
              </button>
              <ng-template scTooltipPortal>
                <div scTooltip>Bad response</div>
              </ng-template>
            </div>
            <ng-container
              [ngTemplateOutlet]="action"
              [ngTemplateOutletContext]="{ label: 'Retry', icon: 'retry' }"
            />
          </div>
        </div>
      </div>
    </div>

    <ng-template #action let-label="label" let-icon="icon">
      <div scTooltipProvider>
        <button scButton scTooltipTrigger variant="ghost" size="icon-sm">
          @switch (icon) {
            @case ('copy') {
              <svg siCopyIcon></svg>
            }
            @case ('edit') {
              <svg siPencilIcon></svg>
            }
            @default {
              <svg siRefreshCcwIcon></svg>
            }
          }
          <span class="sr-only">{{ label }}</span>
        </button>
        <ng-template scTooltipPortal>
          <div scTooltip>{{ label }}</div>
        </ng-template>
      </div>
    </ng-template>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MessagePatternUsageDemo {
  protected readonly copied = signal(false);
  protected readonly feedback = signal<'like' | 'dislike' | null>(null);
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  /** Writes the reply to the clipboard; a check for two seconds. */
  protected copy(): void {
    void navigator.clipboard?.writeText(
      'Install Dialog, then open it from the gear button in site-header.ts.',
    );
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2000);
  }

  protected rate(value: 'like' | 'dislike'): void {
    this.feedback.update((current) => (current === value ? null : value));
  }
}
