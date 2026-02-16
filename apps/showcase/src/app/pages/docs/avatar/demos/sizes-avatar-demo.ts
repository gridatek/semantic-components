import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui';

@Component({
  selector: 'app-sizes-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: `
    <div class="flex items-end gap-4">
      <span scAvatar size="sm">
        <img
          scAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span scAvatarFallback>CN</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span scAvatarFallback>CN</span>
      </span>
      <span scAvatar size="lg">
        <img
          scAvatarImage
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span scAvatarFallback>CN</span>
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesAvatarDemo {}
