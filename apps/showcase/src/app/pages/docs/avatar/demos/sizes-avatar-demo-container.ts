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
    <app-demo-container title="Sizes" [code]="code">
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
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-avatar-demo',
  imports: [ScAvatar, ScAvatarFallback, ScAvatarImage],
  template: \`
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
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesAvatarDemo {}`;
}
