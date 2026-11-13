import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScBubble,
  ScBubbleContent,
  ScButton,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScMessage,
  ScMessageContent,
  ScTextarea,
} from '@semantic-components/ui';
import { SiArrowUpIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';

const suggestions = [
  'Add a dark mode toggle',
  'Fix the failing build',
  'Write tests for the form',
  'Upgrade to Next.js 16',
  'Add a loading state',
  'Find unused dependencies',
];

const replies: Record<string, string> = {
  'Add a dark mode toggle':
    'Added a ModeToggle to the site header. It calls setTheme from next-themes.',
  'Fix the failing build':
    'The build failed on a missing import in app/page.tsx. I added it and the build passes.',
  'Write tests for the form':
    'Added four tests in signup-form.test.tsx. They cover the empty, invalid and valid states.',
  'Upgrade to Next.js 16':
    'Ran the codemod and bumped next to 16. Two routes needed async params, so I updated them.',
  'Add a loading state':
    'Added a loading.tsx to the dashboard route. It shows skeletons while the data loads.',
  'Find unused dependencies':
    'Three packages are not imported anywhere: lodash, moment and classnames. Should I remove them?',
};

interface Turn {
  prompt: string;
  reply: string;
}

/** Prompts sent in one click: a row of buttons above the field. */
@Component({
  selector: 'app-suggestion-usage-demo',
  imports: [
    FormField,
    FormRoot,
    ScBubble,
    ScBubbleContent,
    ScButton,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScMessage,
    ScMessageContent,
    ScTextarea,
    SiArrowUpIcon,
    SiPlusIcon,
  ],
  template: `
    <div class="mx-auto flex w-full max-w-lg flex-col gap-6 py-6 text-sm">
      @if (turn(); as turn) {
        <div class="flex flex-col gap-4">
          <div scMessage alignment="end">
            <div scMessageContent>
              <div scBubble alignment="end" variant="muted">
                <div scBubbleContent>{{ turn.prompt }}</div>
              </div>
            </div>
          </div>
          <div scMessage>
            <div scMessageContent>
              <p>{{ turn.reply }}</p>
            </div>
          </div>
        </div>
      }
      <div class="flex flex-col gap-2">
        <!-- Scrolls sideways when they don't fit; the edge with more to show fades. -->
        <div
          class="scroll-fade-x flex scrollbar-none gap-2 overflow-x-auto overscroll-x-contain"
        >
          @for (suggestion of suggestions; track suggestion) {
            <button
              scButton
              variant="outline"
              size="sm"
              class="shrink-0"
              (click)="send(suggestion)"
            >
              {{ suggestion }}
            </button>
          }
        </div>
        <form [formRoot]="composer">
          <div scInputGroup>
            <textarea
              scTextarea
              class="p-3"
              placeholder="Ask the agent to change your code..."
              aria-label="Message"
              [formField]="composer.text"
              (keydown.enter)="sendOnEnter($event)"
            ></textarea>
            <div scInputGroupAddon side="bottom">
              <button
                scInputGroupButton
                type="button"
                size="icon-sm"
                variant="outline"
                class="rounded-full"
              >
                <svg siPlusIcon></svg>
                <span class="sr-only">Attach files</span>
              </button>
              <button
                scInputGroupButton
                type="submit"
                size="icon-sm"
                variant="default"
                class="ms-auto rounded-full"
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
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SuggestionUsageDemo {
  protected readonly suggestions = suggestions;
  protected readonly turn = signal<Turn | null>(null);

  private readonly message = signal({ text: '' });
  protected readonly composer = form(this.message, () => undefined, {
    submission: {
      action: async () => {
        const text = this.message().text.trim();
        if (text) this.send(text);
      },
    },
  });

  /** The label is the message: sent as is. */
  protected send(prompt: string): void {
    this.turn.set({
      prompt,
      reply:
        replies[prompt] ?? 'This demo only knows the suggestions. Pick one.',
    });
    this.message.set({ text: '' });
  }

  /** Enter sends; Shift+Enter starts a new line. */
  protected sendOnEnter(event: Event): void {
    const key = event as KeyboardEvent;
    if (key.shiftKey || key.isComposing) return;
    key.preventDefault();
    (key.target as HTMLTextAreaElement).form?.requestSubmit();
  }
}
