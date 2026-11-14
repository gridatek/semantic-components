import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScProgress,
  ScProgressCircle,
  ScProgressLabel,
  ScProgressRange,
  ScProgressTrack,
  ScProgressValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-rtl-progress-demo',
  imports: [
    Dir,
    ScProgress,
    ScProgressCircle,
    ScProgressLabel,
    ScProgressRange,
    ScProgressTrack,
    ScProgressValueText,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full max-w-sm items-center gap-6">
      <div class="flex-1">
        <div scProgress [value]="40">
          <span scProgressLabel>التحميل</span>
          <span scProgressValueText>٪٤٠</span>
          <div scProgressTrack><div scProgressRange></div></div>
        </div>
      </div>
      <div scProgress [value]="40" aria-label="التحميل">
        <svg scProgressCircle></svg>
        <span scProgressValueText>٪٤٠</span>
      </div>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlProgressDemo {}
