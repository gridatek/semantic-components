import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarBadge,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

/** A badge in the corner: a status, in your color. */
@Component({
  selector: 'app-badge-avatar-demo',
  imports: [ScAvatar, ScAvatarBadge, ScAvatarFallback, ScAvatarImage],
  template: `
    <span scAvatar>
      <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <span scAvatarFallback>CN</span>
      <span scAvatarBadge class="bg-green-600 dark:bg-green-800"></span>
    </span>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeAvatarDemo {}
