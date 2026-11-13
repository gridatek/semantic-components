import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLink,
  ScPreviewCard,
  ScPreviewCardPortal,
  ScPreviewCardProvider,
  ScPreviewCardTrigger,
} from '@semantic-components/ui';

/** Right to left: the citation at the end of the Arabic sentence, on its left. */
@Component({
  selector: 'app-rtl-inline-citation-demo',
  imports: [
    Dir,
    ScLink,
    ScPreviewCard,
    ScPreviewCardPortal,
    ScPreviewCardProvider,
    ScPreviewCardTrigger,
  ],
  template: `
    <p dir="rtl" lang="ar" class="max-w-sm py-6 text-sm leading-relaxed">
      يبثّ Next.js المسار على دفعات، فتظهر الصفحة قبل أن ينتهي كل طلب.
      <span scPreviewCardProvider>
        <a
          scLink
          scPreviewCardTrigger
          variant="secondary"
          size="xs"
          target="_blank"
          rel="noreferrer"
          href="https://nextjs.org/docs/app/getting-started/linking-and-navigating#streaming"
          [delay]="10"
          [closeDelay]="100"
        >
          nextjs.org
          <span class="sr-only"
            >: التنقل والروابط (يُفتح في علامة تبويب جديدة)</span
          >
        </a>
        <ng-template scPreviewCardPortal>
          <div
            scPreviewCard
            dir="rtl"
            lang="ar"
            class="flex w-64 flex-col gap-1"
          >
            <div class="font-medium">التنقل والروابط</div>
            <p class="text-muted-foreground">
              كيف يبثّ موجّه التطبيق المسار إلى المتصفح.
            </p>
            <span class="text-muted-foreground text-xs">nextjs.org</span>
          </div>
        </ng-template>
      </span>
    </p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlInlineCitationDemo {}
