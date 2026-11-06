import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlPreviewCardDemo } from './rtl-preview-card-demo';

@Component({
  selector: 'app-rtl-preview-card-demo-container',
  imports: [DemoContainer, RtlPreviewCardDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/preview-card/rtl-preview-card-demo"
      [code]="code"
    >
      <app-rtl-preview-card-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPreviewCardDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
} from '@semantic-components/ui';

/** In a right-to-left page: its text follows; inline-start is the right. */
@Component({
  selector: 'app-rtl-preview-card-demo',
  imports: [
    ScButton,
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="grid gap-4">
      <div class="flex flex-wrap justify-center gap-2">
        <div scPreviewCardProvider side="left">
          <button
            scButton
            variant="outline"
            scPreviewCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            يسار
          </button>
          <ng-template scPreviewCardPortal>
            <div scPreviewCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scPreviewCardProvider side="top">
          <button
            scButton
            variant="outline"
            scPreviewCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            أعلى
          </button>
          <ng-template scPreviewCardPortal>
            <div scPreviewCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scPreviewCardProvider side="bottom">
          <button
            scButton
            variant="outline"
            scPreviewCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            أسفل
          </button>
          <ng-template scPreviewCardPortal>
            <div scPreviewCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scPreviewCardProvider side="right">
          <button
            scButton
            variant="outline"
            scPreviewCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            يمين
          </button>
          <ng-template scPreviewCardPortal>
            <div scPreviewCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        <div scPreviewCardProvider side="inline-start">
          <button
            scButton
            variant="outline"
            scPreviewCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            بداية السطر
          </button>
          <ng-template scPreviewCardPortal>
            <div scPreviewCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scPreviewCardProvider side="inline-end">
          <button
            scButton
            variant="outline"
            scPreviewCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            نهاية السطر
          </button>
          <ng-template scPreviewCardPortal>
            <div scPreviewCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPreviewCardDemo {}`;
}
