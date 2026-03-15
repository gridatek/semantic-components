import {
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
  template: `
    <div class="grid w-full max-w-sm gap-4">
      <div scInputGroup>
        <div scInputGroupAddon>
          <label scLabel for="email">&#64;</label>
        </div>
        <input scInput id="email" placeholder="shadcn" />
      </div>
      <div scInputGroup>
        <div scInputGroupAddon align="block-start">
          <label scLabel for="email-2" class="text-foreground">Email</label>
        </div>
        <input scInput id="email-2" placeholder="shadcn&#64;vercel.com" />
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabelInputGroupDemo {}
