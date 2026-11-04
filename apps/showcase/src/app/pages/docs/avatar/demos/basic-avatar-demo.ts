import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

/** An image over its fallback; loaded lazily, it still shows (it is hidden by visibility, not display, while it loads). */
@Component({
  selector: 'app-basic-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: `
    <span scAvatar>
      <img
        scAvatarImage
        src="/images/gallery/cafe-thumb.jpg"
        alt="Jordan Lee"
        loading="lazy"
        class="grayscale"
      />
      <span scAvatarFallback>JL</span>
    </span>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAvatarDemo {}
