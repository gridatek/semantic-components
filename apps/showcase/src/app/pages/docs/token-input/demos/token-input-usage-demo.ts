import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScLabel,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  ScTokenInputTokenRemove,
  type ScTokenInputValue,
  tokenInputToText,
} from '@semantic-components/ui';
import { SiFileTextIcon, SiXIcon } from '@semantic-icons/lucide-icons';

/** Text and a token in a field: the token moves and deletes whole; its template written once. */
@Component({
  selector: 'app-token-input-usage-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScLabel,
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputToken,
    ScTokenInputTokenRemove,
    SiFileTextIcon,
    SiXIcon,
  ],
  template: `
    <div scField class="w-full max-w-md">
      <label scLabel>Prompt</label>
      <div scTokenInput [(value)]="prompt">
        <div scTokenInputEditor placeholder="Ask anything…"></div>
        <ng-template scTokenInputToken let-token>
          <svg siFileTextIcon></svg>
          {{ token.label }}
          <span class="sr-only">file</span>
          <span scTokenInputTokenRemove><svg siXIcon></svg></span>
        </ng-template>
      </div>
      <p scFieldDescription>
        Backspace removes a file; the arrows step over it.
      </p>
      <p class="text-muted-foreground font-mono text-xs" data-testid="picked">
        {{ text() }}
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TokenInputUsageDemo {
  private readonly prompt = signal<ScTokenInputValue>([
    'Explain ',
    { type: 'file', value: 'src/routes.ts', label: 'routes.ts' },
    ' and how it loads the pages.',
  ]);
  private readonly text = computed(() => tokenInputToText(this.prompt()));
}
