import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScHoverCardNext,
  ScHoverCardNextPortal,
  ScHoverCardNextProvider,
  ScHoverCardNextTrigger,
} from '@semantic-components/ui';

/** In a right-to-left page: its text follows; inline-start is the right. */
@Component({
  selector: 'app-rtl-hover-card-next-demo',
  imports: [
    ScButton,
    ScHoverCardNext,
    ScHoverCardNextPortal,
    ScHoverCardNextProvider,
    ScHoverCardNextTrigger,
  ],
  template: `
    <div dir="rtl" lang="ar" class="grid gap-4">
      <div class="flex flex-wrap justify-center gap-2">
        <div scHoverCardNextProvider side="left">
          <button
            scButton
            variant="outline"
            scHoverCardNextTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            يسار
          </button>
          <ng-template scHoverCardNextPortal>
            <div scHoverCardNext class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scHoverCardNextProvider side="top">
          <button
            scButton
            variant="outline"
            scHoverCardNextTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            أعلى
          </button>
          <ng-template scHoverCardNextPortal>
            <div scHoverCardNext class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scHoverCardNextProvider side="bottom">
          <button
            scButton
            variant="outline"
            scHoverCardNextTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            أسفل
          </button>
          <ng-template scHoverCardNextPortal>
            <div scHoverCardNext class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scHoverCardNextProvider side="right">
          <button
            scButton
            variant="outline"
            scHoverCardNextTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            يمين
          </button>
          <ng-template scHoverCardNextPortal>
            <div scHoverCardNext class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
      </div>
      <div class="flex flex-wrap justify-center gap-2">
        <div scHoverCardNextProvider side="inline-start">
          <button
            scButton
            variant="outline"
            scHoverCardNextTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            بداية السطر
          </button>
          <ng-template scHoverCardNextPortal>
            <div scHoverCardNext class="flex w-64 flex-col gap-1">
              <div class="font-semibold">سماعات لاسلكية</div>
              <div class="text-muted-foreground text-sm">٩٩.٩٩ $</div>
            </div>
          </ng-template>
        </div>
        <div scHoverCardNextProvider side="inline-end">
          <button
            scButton
            variant="outline"
            scHoverCardNextTrigger
            [delay]="10"
            [closeDelay]="100"
          >
            نهاية السطر
          </button>
          <ng-template scHoverCardNextPortal>
            <div scHoverCardNext class="flex w-64 flex-col gap-1">
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
export class RtlHoverCardNextDemo {}
