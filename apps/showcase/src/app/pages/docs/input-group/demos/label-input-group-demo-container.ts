import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LabelInputGroupDemo } from './label-input-group-demo';

@Component({
  selector: 'app-label-input-group-demo-container',
  imports: [DemoContainer, LabelInputGroupDemo],
  template: `
    <app-demo-container
      title="Label"
      demoUrl="/demos/input-group/label-input-group-demo"
      [code]="code"
    >
      <app-label-input-group-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputGroupDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';

@Component({
  selector: 'app-label-input-group-demo',
  imports: [ScInput, ScInputGroup, ScInputGroupAddon, ScLabel],
  template: \`
    <div class="grid w-full max-w-sm gap-4">
      <div scInputGroup>
        <div scInputGroupAddon>
          <label scLabel for="email">&#64;</label>
        </div>
        <input scInput variant="group" id="email" placeholder="shadcn" />
      </div>
      <div scInputGroup>
        <div scInputGroupAddon align="block-start">
          <label scLabel for="email-2" class="text-foreground">Email</label>
        </div>
        <input
          scInput
          variant="group"
          id="email-2"
          placeholder="shadcn&#64;vercel.com"
        />
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputGroupDemo {}`;
}
