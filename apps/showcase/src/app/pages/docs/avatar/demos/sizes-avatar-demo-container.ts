import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesAvatarDemo } from './sizes-avatar-demo';

@Component({
  selector: 'app-sizes-avatar-demo-container',
  imports: [DemoContainer, SizesAvatarDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/avatar/sizes-avatar-demo"
      [code]="code"
    >
      <app-sizes-avatar-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesAvatarDemoContainer {
  readonly code = `import {
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
  template: \`
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesAvatarDemo {}`;
}
