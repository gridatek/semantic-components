import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

@Component({
  selector: 'app-avatar-usage-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: `
    <span scAvatar>
      <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <span scAvatarFallback>CN</span>
    </span>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AvatarUsageDemo {}
