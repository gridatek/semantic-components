import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarGroupCount,
  ScAvatarImage,
} from '@semantic-components/ui';

/** Right to left: the group overlaps from the right, the badge at the end (left). */
@Component({
  selector: 'app-rtl-avatar-demo',
  imports: [
    ScAvatar,
    ScAvatarBadge,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarGroupCount,
    ScAvatarImage,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex items-center gap-6">
      <span scAvatar>
        <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <span scAvatarFallback>ش</span>
        <span scAvatarBadge class="bg-green-600 dark:bg-green-800"></span>
      </span>
      <div scAvatarGroup class="grayscale">
        <span scAvatar>
          <img
            scAvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
          />
          <span scAvatarFallback>ش</span>
        </span>
        <span scAvatar>
          <img
            scAvatarImage
            src="https://github.com/maxleiter.png"
            alt="@maxleiter"
          />
          <span scAvatarFallback>م</span>
        </span>
        <div scAvatarGroupCount>+٣</div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAvatarDemo {}
