import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScProgressNext,
  ScProgressNextCircle,
  ScProgressNextLabel,
  ScProgressNextRange,
  ScProgressNextTrack,
  ScProgressNextValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-rtl-progress-next-demo',
  imports: [
    ScProgressNext,
    ScProgressNextCircle,
    ScProgressNextLabel,
    ScProgressNextRange,
    ScProgressNextTrack,
    ScProgressNextValueText,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full max-w-sm items-center gap-6">
      <div class="flex-1">
        <div scProgressNext [value]="40">
          <span scProgressNextLabel>التحميل</span>
          <span scProgressNextValueText>٪٤٠</span>
          <div scProgressNextTrack><div scProgressNextRange></div></div>
        </div>
      </div>
      <div scProgressNext [value]="40" aria-label="التحميل">
        <svg scProgressNextCircle></svg>
        <span scProgressNextValueText>٪٤٠</span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlProgressNextDemo {}
