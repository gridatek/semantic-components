import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import {
  ScCodeBlock,
  ScCodeBlockActions,
  ScCodeBlockContent,
  ScCodeBlockCopy,
  ScCodeBlockFooter,
  ScCodeBlockHeader,
  ScCodeBlockTitle,
} from '@semantic-components/ui/code-block';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiCopyIcon,
} from '@semantic-icons/lucide-icons';

/** Long code shown in part, a button in the footer to show it all (your button, aria-expanded on it). */
@Component({
  selector: 'app-show-more-code-block-demo',
  imports: [
    ScButton,
    ScCodeBlock,
    ScCodeBlockHeader,
    ScCodeBlockTitle,
    ScCodeBlockActions,
    ScCodeBlockCopy,
    ScCodeBlockContent,
    ScCodeBlockFooter,
    SiCheckIcon,
    SiCopyIcon,
    SiChevronDownIcon,
  ],
  template: `
    <div scCodeBlock>
      <div scCodeBlockHeader>
        <div scCodeBlockTitle>chat.ts</div>
        <div scCodeBlockActions>
          <button [scCodeBlockCopy]="source" #copy="scCodeBlockCopy">
            @if (copy.copied()) {
              <svg siCheckIcon></svg>
            } @else {
              <svg siCopyIcon></svg>
            }
            <span class="sr-only">Copy code</span>
          </button>
        </div>
      </div>
      <pre
        scCodeBlockContent
        id="show-more-code"
        [code]="source"
        language="angular-ts"
        lineNumbers
        [class]="expanded() ? '' : 'scroll-fade-y max-h-64 overflow-y-hidden'"
      ></pre>
      <div scCodeBlockFooter class="justify-center">
        <button
          scButton
          variant="ghost"
          size="xs"
          aria-controls="show-more-code"
          [attr.aria-expanded]="expanded()"
          (click)="expanded.set(!expanded())"
        >
          <svg
            siChevronDownIcon
            class="transition-transform in-aria-expanded:rotate-180"
          ></svg>
          {{ expanded() ? 'Show less' : 'Show more' }}
        </button>
      </div>
      <span aria-live="polite" class="sr-only">
        @if (copy.copied()) {
          Copied
        }
      </span>
    </div>
  `,
  host: { class: 'block w-full max-w-md' },
  encapsulation: ViewEncapsulation.None,
})
export class ShowMoreCodeBlockDemo {
  readonly source = `import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-chat',
  template: \`
    @for (message of messages(); track message.id) {
      <p>{{ message.text }}</p>
    }
    <form (submit)="send($event)">
      <input [value]="draft()" (input)="draft.set($any($event.target).value)" />
      <button [disabled]="!draft()">Send</button>
    </form>
  \`,
})
export class Chat {
  readonly messages = signal<{ id: number; text: string }[]>([]);
  readonly draft = signal('');

  send(event: Event): void {
    event.preventDefault();
    const text = this.draft().trim();
    if (!text) return;
    this.messages.update((list) => [...list, { id: list.length, text }]);
    this.draft.set('');
  }
}`;
  protected readonly expanded = signal(false);
}
