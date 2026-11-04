import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarImage,
} from '@semantic-components/ui';

/** Overlapping, each ringed by the background. */
@Component({
  selector: 'app-group-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarGroup, ScAvatarImage],
  template: `
    <div scAvatarGroup class="grayscale">
      <span scAvatar>
        <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <span scAvatarFallback>CN</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/maxleiter.png"
          alt="@maxleiter"
        />
        <span scAvatarFallback>LR</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/evilrabbit.png"
          alt="@evilrabbit"
        />
        <span scAvatarFallback>ER</span>
      </span>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class GroupAvatarDemo {}
