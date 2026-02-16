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
      <span sc-avatar>
        <span sc-avatar-fallback>JD</span>
      </span>
      <span sc-avatar>
        <span sc-avatar-fallback>AB</span>
      </span>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackAvatarDemo {}
