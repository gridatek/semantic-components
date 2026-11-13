import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { ModelSelectorUsageDemo } from './model-selector-usage-demo';

@Component({
  selector: 'app-model-selector-usage-demo-container',
  imports: [DemoContainer, ModelSelectorUsageDemo],
  template: `
    <app-demo-container
      title="Model Selector"
      demoUrl="/demos/ai-elements/model-selector-usage-demo"
      [code]="code"
    >
      <app-model-selector-usage-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ModelSelectorUsageDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, FormRoot, form } from '@angular/forms/signals';
import {
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
  SiPlusIcon,
} from '@semantic-icons/lucide-icons';

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

/** Two menus in the field: the model the agent runs, and how hard it thinks. */
@Component({
  selector: 'app-model-selector-usage-demo',
  imports: [
    FormField,
    FormRoot,
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
    SiPlusIcon,
  ],
  template: \`
    <form [formRoot]="composer" class="mx-auto w-full max-w-lg py-6">
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
            <span class="sr-only">Attach</span>
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
          >
            <svg siArrowUpIcon></svg>
            <span class="sr-only">Send</span>
          </button>
        </div>
      </div>
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ModelSelectorUsageDemo {
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

  private readonly message = signal({ text: '' });
  protected readonly composer = form(this.message, () => undefined, {
    submission: {
      // An empty message sends nothing. (Send isn't disabled: a disabled
      // button dims the whole input group — see the page.)
      action: async () => {
        if (this.message().text.trim()) this.message.set({ text: '' });
      },
    },
  });

  /** Enter sends; Shift+Enter starts a new line. */
  protected sendOnEnter(event: Event): void {
    const key = event as KeyboardEvent;
    if (key.shiftKey || key.isComposing) return;
    key.preventDefault();
    (key.target as HTMLTextAreaElement).form?.requestSubmit();
  }
}`;
}
