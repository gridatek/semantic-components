import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
  ScProgress,
  ScProgressRange,
  ScProgressTrack,
} from '@semantic-components/ui';

const usage = { input: 8420, output: 1260, reasoning: 980, limit: 128000 };

/** Tokens, short: 980, 8.4k, 128k. */
function formatTokens(value: number): string {
  return value < 1000
    ? String(value)
    : `${(value / 1000).toFixed(1).replace(/\.0$/, '')}k`;
}

/** How much of the context window is used: a button, a card with the breakdown on hover. */
@Component({
  selector: 'app-context-usage-demo',
  imports: [
    ScButton,
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
  ],
  template: `
    <div class="flex justify-center py-12">
      <div scPreviewCardProvider>
        <button
          scButton
          scPreviewCardTrigger
          variant="outline"
          size="sm"
          [delay]="10"
          [closeDelay]="100"
        >
          {{ percent }}% context
        </button>
        <ng-template scPreviewCardPortal>
          <div scPreviewCard class="flex w-64 flex-col gap-3">
            <div class="flex items-center justify-between gap-3 text-sm">
              <span class="font-medium">Context</span>
              <span class="text-muted-foreground"
                >{{ format(used) }} / {{ format(usage.limit) }}</span
              >
            </div>
            <div scProgress [value]="percent" aria-label="Context used">
              <div scProgressTrack><div scProgressRange></div></div>
            </div>
            <div class="flex flex-col gap-1 text-sm">
              @for (row of rows; track row.label) {
                <div class="flex justify-between gap-3">
                  <span class="text-muted-foreground">{{ row.label }}</span>
                  <span>{{ format(row.value) }}</span>
                </div>
              }
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ContextUsageDemo {
  protected readonly usage = usage;
  protected readonly used = usage.input + usage.output + usage.reasoning;
  protected readonly percent = Math.round((this.used / usage.limit) * 100);
  protected readonly rows = [
    { label: 'Input', value: usage.input },
    { label: 'Output', value: usage.output },
    { label: 'Reasoning', value: usage.reasoning },
  ];
  protected readonly format = formatTokens;
}
