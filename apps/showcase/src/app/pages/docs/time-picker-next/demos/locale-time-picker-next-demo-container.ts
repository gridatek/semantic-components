import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LocaleTimePickerNextDemo } from './locale-time-picker-next-demo';

@Component({
  selector: 'app-locale-time-picker-next-demo-container',
  imports: [DemoContainer, LocaleTimePickerNextDemo],
  template: `
    <app-demo-container
      title="Locale"
      [code]="code"
      demoUrl="/demos/time-picker-next/locale-time-picker-next-demo"
    >
      <app-locale-time-picker-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimePickerNextDemoContainer {
  private readonly code = `import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScTimeInput,
  ScTimePickerNext,
  ScTimePickerNextColumns,
  ScTimePickerNextTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** LOCALE_ID provided as 'ko-KR': AM/PM's column first, the columns named in Korean. */
@Component({
  selector: 'app-locale-time-picker-next-demo',
  imports: [
    CdkOverlayOrigin,
    ScField,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScPopover,
    ScPopoverPortal,
    ScPopoverProvider,
    ScTimeInput,
    ScTimePickerNext,
    ScTimePickerNextColumns,
    ScTimePickerNextTrigger,
    SiClockIcon,
  ],
  template: \`
    <div lang="ko">
      <div scField class="w-44">
        <label scLabel>회의 시간</label>
        <div scTimePickerNext>
          <div scPopoverProvider [origin]="anchor" alignment="start">
            <div scInputGroup cdkOverlayOrigin #anchor="cdkOverlayOrigin">
              <div scTimeInput [(value)]="time"></div>
              <div scInputGroupAddon side="inline-end">
                <button scTimePickerNextTrigger>
                  <svg siClockIcon></svg>
                  <span class="sr-only">시간 선택</span>
                </button>
              </div>
            </div>
            <ng-template scPopoverPortal>
              <div scPopover class="w-auto p-0" aria-label="시간 선택">
                <div scTimePickerNextColumns></div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ko-KR' }],
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimePickerNextDemo {
  private readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('14:30'),
  );
}`;
}
