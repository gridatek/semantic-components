import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAvatarDemo } from './basic-avatar-demo';

@Component({
  selector: 'app-basic-avatar-demo-container',
  imports: [DemoContainer, BasicAvatarDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAvatarDemoContainer {
  readonly code = `import {
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
  selector: 'app-basic-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: \`
    <span sc-avatar>
      <img sc-avatar-image src="https://github.com/shadcn.png" alt="@shadcn" />
      <span sc-avatar-fallback>CN</span>
    </span>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAvatarDemo {}`;
}
