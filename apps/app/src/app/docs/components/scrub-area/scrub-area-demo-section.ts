import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { ScrubAreaDemo } from './scrub-area-demo';

@Component({
  selector: 'app-scrub-area-demo-section',
  imports: [ScrubAreaDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-scrub-area-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrubAreaDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScScrubArea } from '@semantic-components/ui';

@Component({
  selector: 'app-scrub-area-demo',
  imports: [ScScrubArea],
  template: \`
    <div class="space-y-8">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic scrub area</h3>
        <p class="text-sm text-muted-foreground">
          Click and drag horizontally to change the value.
        </p>
        <div class="space-y-2">
          <div sc-scrub-area [(value)]="value1" class="inline-flex items-center gap-2 rounded-md border px-3 py-2">
            <span class="text-sm font-medium">Value:</span>
            <span class="text-sm font-mono">{{ value1() }}</span>
          </div>
          <p class="text-xs text-muted-foreground">
            Range: 0-100, Step: 1, Sensitivity: 1
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Custom range and step</h3>
        <div class="space-y-2">
          <div 
            sc-scrub-area 
            [(value)]="value2" 
            [min]="-10" 
            [max]="10" 
            [step]="0.1"
            [sensitivity]="0.1"
            class="inline-flex items-center gap-2 rounded-md border px-3 py-2 bg-accent/50"
          >
            <span class="text-sm font-medium">Decimal:</span>
            <span class="text-sm font-mono">{{ value2().toFixed(1) }}</span>
          </div>
          <p class="text-xs text-muted-foreground">
            Range: -10 to 10, Step: 0.1, Low sensitivity for precision
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">High sensitivity</h3>
        <div class="space-y-2">
          <div 
            sc-scrub-area 
            [(value)]="value3" 
            [max]="1000"
            [sensitivity]="5"
            class="inline-flex items-center gap-2 rounded-md border px-3 py-2 bg-blue-50 dark:bg-blue-950/20"
          >
            <span class="text-sm font-medium">Fast scrub:</span>
            <span class="text-sm font-mono">{{ value3() }}</span>
          </div>
          <p class="text-xs text-muted-foreground">
            Range: 0-1000, Higher sensitivity for faster changes
          </p>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrubAreaDemo {
  readonly value1 = signal(50);
  readonly value2 = signal(0);
  readonly value3 = signal(500);
  readonly value4 = signal(128);
  readonly value5 = signal(64);
}`;
}
