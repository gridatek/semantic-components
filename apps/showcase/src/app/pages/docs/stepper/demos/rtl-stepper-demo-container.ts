import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlStepperDemo } from './rtl-stepper-demo';

@Component({
  selector: 'app-rtl-stepper-demo-container',
  imports: [DemoContainer, RtlStepperDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/stepper/rtl-stepper-demo"
    >
      <app-rtl-stepper-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlStepperDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScFrame,
  ScStepper,
  ScStepperConnector,
  ScStepperDescription,
  ScStepperIndicator,
  ScStepperItem,
  ScStepperList,
  ScStepperNext,
  ScStepperPanel,
  ScStepperPrevious,
  ScStepperTitle,
  ScStepperTrigger,
} from '@semantic-components/ui';
import { SiCheckIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the steps run from the right, ← goes on to the next step. */
@Component({
  selector: 'app-rtl-stepper-demo',
  imports: [
    Dir,
    ScFrame,
    ScStepper,
    ScStepperConnector,
    ScStepperDescription,
    ScStepperIndicator,
    ScStepperItem,
    ScStepperList,
    ScStepperNext,
    ScStepperPanel,
    ScStepperPrevious,
    ScStepperTitle,
    ScStepperTrigger,
    SiCheckIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" scFrame class="w-full max-w-2xl p-6">
      <div scStepper [(selectedIndex)]="step">
        <div scStepperList aria-label="خطوات التسجيل">
          @for (s of steps; track s.title) {
            <div scStepperItem #item="scStepperItem">
              <button scStepperTrigger>
                <span scStepperIndicator>
                  @if (item.status() === 'complete') {
                    <svg siCheckIcon></svg>
                  } @else {
                    {{ $index + 1 }}
                  }
                </span>
                <span scStepperTitle>{{ s.title }}</span>
                <span scStepperDescription class="max-sm:sr-only">{{
                  s.description
                }}</span>
              </button>
              <div scStepperConnector></div>
            </div>
          }
        </div>
        @for (s of steps; track s.title) {
          <div scStepperPanel [step]="$index">
            <p class="text-muted-foreground text-sm">{{ s.content }}</p>
          </div>
        }
        <div class="flex justify-between gap-2">
          <button scStepperPrevious>السابق</button>
          <button scStepperNext>التالي</button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlStepperDemo {
  private readonly step = signal(0);
  private readonly steps = [
    {
      title: 'الحساب',
      description: 'بريدك وكلمة المرور',
      content: 'الخطوة ١: اختر البريد الذي تدخل به، وكلمة مرور.',
    },
    {
      title: 'الملف الشخصي',
      description: 'أنت وفريقك',
      content: 'الخطوة ٢: اسمك، ودورك، ومن تعمل معهم.',
    },
    {
      title: 'الخطة',
      description: 'مجانية أو احترافية',
      content: 'الخطوة ٣: ابدأ مجانًا، أو اختر الاحترافية للفريق كله.',
    },
  ];
}`;
}
