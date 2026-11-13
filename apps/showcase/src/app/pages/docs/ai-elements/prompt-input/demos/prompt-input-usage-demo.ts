import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
  ScAttachment,
  ScAttachmentAction,
  ScAttachmentActions,
  ScAttachmentContent,
  ScAttachmentMedia,
  ScAttachmentTitle,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScMenu,
  ScMenuContent,
  ScMenuGroup,
  ScMenuItemIndicator,
  ScMenuLabel,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuRadioGroup,
  ScMenuRadioItem,
  ScMenuSeparator,
  ScMenuTrigger,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiArrowUpIcon,
  SiCheckIcon,
  SiChevronDownIcon,
  SiFileTextIcon,
  SiPlusIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

interface AttachedFile {
  id: string;
  name: string;
}

const providers = [
  {
    name: 'OpenAI',
    models: [
      { id: 'gpt-5', name: 'GPT-5' },
      { id: 'gpt-5-mini', name: 'GPT-5 mini' },
    ],
  },
  {
    name: 'Anthropic',
    models: [
      { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5' },
      { id: 'claude-haiku-4-5', name: 'Claude Haiku 4.5' },
    ],
  },
];
const models = providers.flatMap((provider) => provider.models);
const efforts = [
  { id: 'low', name: 'Low' },
  { id: 'medium', name: 'Medium' },
  { id: 'high', name: 'High' },
];

/** The message field: attachments above the text, the model menus and Send below. */
@Component({
  selector: 'app-prompt-input-usage-demo',
  imports: [
    FormField,
    FormRoot,
    ScAttachment,
    ScAttachmentAction,
    ScAttachmentActions,
    ScAttachmentContent,
    ScAttachmentMedia,
    ScAttachmentTitle,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScMenu,
    ScMenuContent,
    ScMenuGroup,
    ScMenuItemIndicator,
    ScMenuLabel,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuRadioGroup,
    ScMenuRadioItem,
    ScMenuSeparator,
    ScMenuTrigger,
    ScTextarea,
    SiArrowUpIcon,
    SiCheckIcon,
    SiChevronDownIcon,
    SiFileTextIcon,
    SiPlusIcon,
    SiXIcon,
  ],
  template: `
    <form [formRoot]="composer" class="mx-auto w-full max-w-lg py-6">
      <input
        #picker
        type="file"
        multiple
        class="sr-only"
        tabindex="-1"
        aria-hidden="true"
        (change)="attach(picker)"
      />
      <div scInputGroup>
        @if (files().length) {
          <div scInputGroupAddon side="top" class="flex-wrap">
            @for (file of files(); track file.id) {
              <div scAttachment size="sm">
                <div scAttachmentMedia><svg siFileTextIcon></svg></div>
                <div scAttachmentContent>
                  <div scAttachmentTitle>{{ file.name }}</div>
                </div>
                <div scAttachmentActions>
                  <button scAttachmentAction (click)="remove(file.id)">
                    <svg siXIcon></svg>
                    <span class="sr-only">Remove {{ file.name }}</span>
                  </button>
                </div>
              </div>
            }
          </div>
        }
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
            (click)="picker.click()"
          >
            <svg siPlusIcon></svg>
            <span class="sr-only">Attach files</span>
          </button>

          <div scMenuProvider alignment="start" class="ms-auto">
            <button
              scInputGroupButton
              scMenuTrigger
              type="button"
              size="sm"
              variant="outline"
            >
              <span class="sr-only">Model: </span>
              {{ currentModel().name }}
              <svg siChevronDownIcon></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu class="w-48">
                <ng-template scMenuContent>
                  <div scMenuRadioGroup [(value)]="model">
                    @for (provider of providers; track provider.name) {
                      @if (!$first) {
                        <div scMenuSeparator></div>
                      }
                      <div scMenuGroup>
                        <div scMenuLabel>{{ provider.name }}</div>
                        @for (item of provider.models; track item.id) {
                          <div scMenuRadioItem closeOnClick [value]="item.id">
                            <span scMenuItemIndicator
                              ><svg siCheckIcon></svg
                            ></span>
                            {{ item.name }}
                          </div>
                        }
                      </div>
                    }
                  </div>
                </ng-template>
              </div>
            </ng-template>
          </div>

          <div scMenuProvider alignment="start">
            <button
              scInputGroupButton
              scMenuTrigger
              type="button"
              size="sm"
              variant="outline"
            >
              <span class="text-muted-foreground">Effort</span>
              {{ currentEffort().name }}
              <svg siChevronDownIcon></svg>
            </button>
            <ng-template scMenuPortal>
              <div scMenu class="w-36">
                <ng-template scMenuContent>
                  <div scMenuGroup>
                    <div scMenuLabel>Effort</div>
                    <div scMenuRadioGroup [(value)]="effort">
                      @for (item of efforts; track item.id) {
                        <div scMenuRadioItem closeOnClick [value]="item.id">
                          <span scMenuItemIndicator
                            ><svg siCheckIcon></svg
                          ></span>
                          {{ item.name }}
                        </div>
                      }
                    </div>
                  </div>
                </ng-template>
              </div>
            </ng-template>
          </div>

          <button
            scInputGroupButton
            type="submit"
            size="icon-sm"
            variant="default"
            class="rounded-full"
            [disabled]="!canSend()"
          >
            <svg siArrowUpIcon></svg>
            <span class="sr-only">Send</span>
          </button>
        </div>
      </div>
    </form>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PromptInputUsageDemo {
  protected readonly providers = providers;
  protected readonly efforts = efforts;
  protected readonly model = signal<string | null>(models[0].id);
  protected readonly effort = signal<string | null>(efforts[1].id);
  protected readonly currentModel = computed(
    () => models.find((item) => item.id === this.model()) ?? models[0],
  );
  protected readonly currentEffort = computed(
    () => efforts.find((item) => item.id === this.effort()) ?? efforts[1],
  );
  protected readonly files = signal<readonly AttachedFile[]>([]);

  private readonly message = signal({ text: '' });
  protected readonly composer = form(this.message, () => undefined, {
    submission: {
      action: async () => {
        this.message.set({ text: '' });
        this.files.set([]);
      },
    },
  });
  protected readonly canSend = computed(
    () => this.message().text.trim().length > 0,
  );

  /** Enter sends; Shift+Enter starts a new line. */
  protected sendOnEnter(event: Event): void {
    const key = event as KeyboardEvent;
    if (key.shiftKey || key.isComposing) return;
    key.preventDefault();
    (key.target as HTMLTextAreaElement).form?.requestSubmit();
  }

  /** The files chosen in the hidden file input, as chips above the text. */
  protected attach(picker: HTMLInputElement): void {
    const chosen = Array.from(picker.files ?? [], (file) => ({
      id: crypto.randomUUID(),
      name: file.name,
    }));
    this.files.update((files) => [...files, ...chosen]);
    picker.value = '';
  }

  protected remove(id: string): void {
    this.files.update((files) => files.filter((file) => file.id !== id));
  }
}
