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
  selector: 'app-basic-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: `
    <span scAvatar>
      <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <span scAvatarFallback>CN</span>
    </span>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAvatarDemo {}
