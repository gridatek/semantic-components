import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAvatar, ScAvatarFallback } from '@semantic-components/ui';

@Component({
  selector: 'app-fallback-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback],
  template: `
    <div class="flex items-center gap-4">
      <span scAvatar>
        <span scAvatarFallback>JD</span>
      </span>
      <span scAvatar>
        <span scAvatarFallback>AB</span>
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackAvatarDemo {}
