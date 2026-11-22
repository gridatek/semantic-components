import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  ScTokenInputTokenRemove,
  type ScTokenInputValue,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuEmpty,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
  tokenInputToLabel,
} from '@semantic-components/ui';
import {
  SiArrowUpIcon,
  SiFileTextIcon,
  SiPaperclipIcon,
  SiSparklesIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** A prompt: @ a file, / a skill (at the start), a file attached (pending, then ready); Enter sends, Shift + Enter a new line. */
@Component({
  selector: 'app-prompt-token-input-demo',
  imports: [
    ScButton,
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputToken,
    ScTokenInputTokenRemove,
    ScTriggerMenu,
    ScTriggerMenuEmpty,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
    SiArrowUpIcon,
    SiFileTextIcon,
    SiPaperclipIcon,
    SiSparklesIcon,
    SiXIcon,
  ],
  template: `
    <div class="grid w-full max-w-lg gap-3">
      <div
        scTokenInput
        #prompt="scTokenInput"
        submitShortcut="enter"
        [(value)]="value"
        (submitted)="send($event)"
      >
        <div
          scTokenInputEditor
          aria-label="Prompt"
          placeholder="Ask anything — @ a file, / a skill"
          class="pb-12"
        ></div>
        <ng-template scTokenInputToken let-token>
          @if (token.type === 'skill') {
            <svg siSparklesIcon></svg>
            <span class="sr-only">skill</span>
          } @else {
            <svg siFileTextIcon></svg>
            <span class="sr-only">file</span>
          }
          {{ token.label }}
          @if (token.status === 'pending') {
            <span class="sr-only">uploading</span>
          }
          <span scTokenInputTokenRemove><svg siXIcon></svg></span>
        </ng-template>
        <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
          <ng-template scTriggerMenuPortal>
            <div scTriggerMenuPopup>
              <div scTriggerMenuEmpty>Nothing found.</div>
              <div scTriggerMenuList aria-label="Suggestions">
                @for (item of menu.items(); track item.value) {
                  <div scTriggerMenuItem [item]="item">{{ item.label }}</div>
                }
              </div>
            </div>
          </ng-template>
        </div>
        <div class="absolute inset-x-2 bottom-2 flex items-center gap-2">
          <button
            scButton
            variant="ghost"
            size="icon-sm"
            type="button"
            (click)="attach(prompt)"
          >
            <svg siPaperclipIcon></svg>
            <span class="sr-only">Attach README.md</span>
          </button>
          <button
            scButton
            size="icon-sm"
            type="button"
            class="ms-auto"
            [disabled]="!value().length"
            (click)="send(value())"
          >
            <svg siArrowUpIcon></svg>
            <span class="sr-only">Send</span>
          </button>
        </div>
      </div>
      @if (sent()) {
        <p class="text-muted-foreground text-sm" data-testid="picked">
          Sent: {{ sent() }}
        </p>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PromptTokenInputDemo {
  private readonly triggers: readonly ScTrigger[] = [
    {
      char: '@',
      type: 'file',
      items: [
        { value: 'src/routes.ts', label: 'routes.ts' },
        { value: 'src/app.ts', label: 'app.ts' },
        { value: 'src/styles.css', label: 'styles.css' },
        { value: 'package.json', label: 'package.json' },
      ],
    },
    {
      char: '/',
      type: 'skill',
      boundary: 'start',
      items: [
        { value: 'explain', label: 'explain' },
        { value: 'review', label: 'review' },
        { value: 'test', label: 'test' },
      ],
    },
  ];
  private readonly value = signal<ScTokenInputValue>([]);
  private readonly sent = signal('');

  /** A file attached: pending until it is "uploaded". */
  private attach(prompt: ScTokenInput): void {
    const [token] = prompt.insert([
      {
        type: 'file',
        value: 'README.md',
        label: 'README.md',
        status: 'pending',
      },
      ' ',
    ]);
    setTimeout(
      () => prompt.updateToken(token.id ?? '', { status: undefined }),
      1500,
    );
  }

  private send(value: ScTokenInputValue): void {
    if (!value.length) return;
    this.sent.set(tokenInputToLabel(value));
    this.value.set([]);
  }
}
