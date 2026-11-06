import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScHoverCard,
  ScHoverCardPortal,
  ScHoverCardProvider,
  ScHoverCardTrigger,
} from '@semantic-components/ui';

/** In a right-to-left page: its text follows; inline-start is the right. */
@Component({
  selector: 'app-rtl-hover-card-demo',
  imports: [
    ScButton,
    ScHoverCard,
    ScHoverCardPortal,
    ScHoverCardProvider,
    ScHoverCardTrigger,
  ],
  template: `
    <div dir="rtl" lang="ar" class="grid gap-4">
      <div class="flex flex-wrap justify-center gap-2">
        <div scHoverCardProvider side="left">
          <button
            scButton
            variant="outline"
            scHoverCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            يسار
          </button>
          <ng-template scHoverCardPortal>
            <div scHoverCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scHoverCardProvider side="top">
          <button
            scButton
            variant="outline"
            scHoverCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            أعلى
          </button>
          <ng-template scHoverCardPortal>
            <div scHoverCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scHoverCardProvider side="bottom">
          <button
            scButton
            variant="outline"
            scHoverCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            أسفل
          </button>
          <ng-template scHoverCardPortal>
            <div scHoverCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scHoverCardProvider side="right">
          <button
            scButton
            variant="outline"
            scHoverCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            يمين
          </button>
          <ng-template scHoverCardPortal>
            <div scHoverCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        <div scHoverCardProvider side="inline-start">
          <button
            scButton
            variant="outline"
            scHoverCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            بداية السطر
          </button>
          <ng-template scHoverCardPortal>
            <div scHoverCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scHoverCardProvider side="inline-end">
          <button
            scButton
            variant="outline"
            scHoverCardTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            نهاية السطر
          </button>
          <ng-template scHoverCardPortal>
            <div scHoverCard class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlHoverCardDemo {}
