import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';
import { SiPlusIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-badge-icon-avatar-demo',
  imports: [
    ScAvatar,
    ScAvatarBadge,
    ScAvatarFallback,
    ScAvatarImage,
    SiPlusIcon,
  ],
  template: `
    <span scAvatar class="grayscale">
      <img
        scAvatarImage
        src="https://github.com/pranathip.png"
        alt="@pranathip"
      />
      <span scAvatarFallback>PP</span>
      <span scAvatarBadge><svg siPlusIcon></svg></span>
    </span>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeIconAvatarDemo {}
