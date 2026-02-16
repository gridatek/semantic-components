import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarGroup,
  ScAvatarGroupCount,
  ScAvatarImage,
} from '@semantic-components/ui';

@Component({
  selector: 'app-group-avatar-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarGroup,
    ScAvatarGroupCount,
    ScAvatarImage,
  ],
  template: `
    <div scAvatarGroup>
      <span scAvatar>
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
          src="https://github.com/vercel.png"
          alt="@vercel"
        />
        <span scAvatarFallback>VC</span>
      </span>
      <span scAvatar>
        <img
          scAvatarImage
          src="https://github.com/nextjs.png"
          alt="@nextjs"
        />
        <span scAvatarFallback>NX</span>
      </span>
      <span scAvatar>
        <img scAvatarImage src="https://github.com/react.png" alt="@react" />
        <span scAvatarFallback>RC</span>
      </span>
      <div scAvatarGroupCount>+3</div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupAvatarDemo {}
