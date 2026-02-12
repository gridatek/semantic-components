import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: `
    <div class="flex items-end gap-4">
      <span sc-avatar class="size-6">
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback class="text-xs">CN</span>
      </span>
      <span sc-avatar class="size-8">
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback class="text-xs">CN</span>
      </span>
      <span sc-avatar>
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback>CN</span>
      </span>
      <span sc-avatar class="size-14">
        <img
          sc-avatar-image
          src="https://github.com/shadcn.png"
          alt="@shadcn"
        />
        <span sc-avatar-fallback class="text-lg">CN</span>
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesAvatarDemo {}
