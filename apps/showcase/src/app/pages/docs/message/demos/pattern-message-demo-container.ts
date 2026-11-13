import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PatternMessageDemo } from './pattern-message-demo';

@Component({
  selector: 'app-pattern-message-demo-container',
  imports: [DemoContainer, PatternMessageDemo],
  template: `
    <app-demo-container
      title="Pattern"
      demoUrl="/demos/message/pattern-message-demo"
      [code]="code"
    >
      <app-pattern-message-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PatternMessageDemoContainer {
  readonly code = `import {
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
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiCopyIcon,
  SiPencilIcon,
  SiRefreshCcwIcon,
  SiThumbsDownIcon,
  SiThumbsUpIcon,
} from '@semantic-icons/lucide-icons';

/** An exchange with its actions: Copy says when it has copied; the feedback buttons are pressed or not. */
@Component({
  selector: 'app-pattern-message-demo',
  imports: [
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScMessage,
    ScMessageContent,
    ScMessageFooter,
    SiCopyIcon,
    SiPencilIcon,
    SiCheckIcon,
    SiThumbsUpIcon,
    SiThumbsDownIcon,
    SiRefreshCcwIcon,
  ],
  template: \`
    <div class="flex w-full max-w-sm flex-col gap-8 py-6" aria-live="polite">
      <div scMessage alignment="end">
        <div scMessageContent>
          <div scBubble variant="muted">
            <div scBubbleContent>
              How do I add a settings dialog? It should open from the gear icon
              in the header.
            </div>
          </div>
          <div scMessageFooter>
            <button scButton variant="ghost" size="icon">
              <svg siCopyIcon></svg>
              <span class="sr-only">Copy</span>
            </button>
            <button scButton variant="ghost" size="icon">
              <svg siPencilIcon></svg>
              <span class="sr-only">Edit</span>
            </button>
          </div>
        </div>
      </div>
      <div scMessage>
        <div scMessageContent>
          <div scBubble variant="ghost">
            <div scBubbleContent>{{ reply }}</div>
          </div>
          <div scMessageFooter class="px-0">
            <button scButton variant="ghost" size="icon" (click)="copy()">
              @if (copied()) {
                <svg siCheckIcon></svg>
              } @else {
                <svg siCopyIcon></svg>
              }
              <span class="sr-only">{{ copied() ? 'Copied' : 'Copy' }}</span>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon"
              [attr.aria-pressed]="feedback() === 'like'"
              (click)="rate('like')"
            >
              <svg
                siThumbsUpIcon
                [class.fill-current]="feedback() === 'like'"
              ></svg>
              <span class="sr-only">Good response</span>
            </button>
            <button
              scButton
              variant="ghost"
              size="icon"
              [attr.aria-pressed]="feedback() === 'dislike'"
              (click)="rate('dislike')"
            >
              <svg
                siThumbsDownIcon
                [class.fill-current]="feedback() === 'dislike'"
              ></svg>
              <span class="sr-only">Bad response</span>
            </button>
            <button scButton variant="ghost" size="icon">
              <svg siRefreshCcwIcon></svg>
              <span class="sr-only">Retry</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PatternMessageDemo {
  protected readonly reply =
    'Add a dialog with its trigger on the gear button in the header, and put the settings form inside it.';
  protected readonly copied = signal(false);
  protected readonly feedback = signal<'like' | 'dislike' | null>(null);
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected copy(): void {
    void navigator.clipboard?.writeText(this.reply);
    this.copied.set(true);
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.copied.set(false), 2000);
  }

  protected rate(value: 'like' | 'dislike'): void {
    this.feedback.update((current) => (current === value ? null : value));
  }
}`;
}
