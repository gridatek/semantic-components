import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../../components/demo-container/demo-container';
import { RtlContextDemo } from './rtl-context-demo';

@Component({
  selector: 'app-rtl-context-demo-container',
  imports: [DemoContainer, RtlContextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/ai-elements/rtl-context-demo"
      [code]="code"
    >
      <app-rtl-context-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlContextDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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

/** Right to left: the bar fills from the right, the numbers on the left. */
@Component({
  selector: 'app-rtl-context-demo',
  imports: [
    Dir,
    ScButton,
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
    ScProgress,
    ScProgressRange,
    ScProgressTrack,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="flex justify-center py-12">
      <div scPreviewCardProvider>
        <button
          scButton
          scPreviewCardTrigger
          variant="outline"
          size="sm"
          [delay]="10"
          [closeDelay]="100"
        >
          ٨٪ من السياق
        </button>
        <ng-template scPreviewCardPortal>
          <div
            scPreviewCard
            dir="rtl"
            lang="ar"
            class="flex w-64 flex-col gap-3"
          >
            <div class="flex items-center justify-between gap-3 text-sm">
              <span class="font-medium">السياق</span>
              <span class="text-muted-foreground">10.7k / 128k</span>
            </div>
            <div scProgress [value]="8" aria-label="السياق المستخدم">
              <div scProgressTrack><div scProgressRange></div></div>
            </div>
            <div class="flex flex-col gap-1 text-sm">
              <div class="flex justify-between gap-3">
                <span class="text-muted-foreground">الإدخال</span
                ><span>8.4k</span>
              </div>
              <div class="flex justify-between gap-3">
                <span class="text-muted-foreground">الإخراج</span
                ><span>1.3k</span>
              </div>
              <div class="flex justify-between gap-3">
                <span class="text-muted-foreground">التفكير</span
                ><span>980</span>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlContextDemo {}`;
}
