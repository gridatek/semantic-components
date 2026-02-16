import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FallbackAvatarDemo } from './fallback-avatar-demo';

@Component({
  selector: 'app-fallback-avatar-demo-container',
  imports: [DemoContainer, FallbackAvatarDemo],
  template: `
    <app-demo-container
      title="Fallback"
      demoUrl="/demos/avatar/fallback-avatar-demo"
      [code]="code"
    >
      <app-fallback-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackAvatarDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScAvatar, ScAvatarFallback } from '@semantic-components/ui';

@Component({
  selector: 'app-fallback-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback],
  template: \`
    <div class="flex items-center gap-4">
      <span scAvatar>
        <span scAvatarFallback>JD</span>
      </span>
      <span scAvatar>
        <span scAvatarFallback>AB</span>
      </span>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackAvatarDemo {}`;
}
