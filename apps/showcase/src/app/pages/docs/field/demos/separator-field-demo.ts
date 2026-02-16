import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScField,
  ScFieldGroup,
  ScFieldSeparator,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';
import { ScSeparator } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-separator-field-demo',
  imports: [
    ScField,
    ScLabel,
    ScFieldGroup,
    ScFieldSeparator,
    ScSeparator,
    ScInput,
  ],
  template: `
    <div scFieldGroup>
      <div scField>
        <label scLabel for="email">Email</label>
        <input
          scInput
          id="email"
          type="email"
          placeholder="Enter your email"
        />
      </div>

      <div scFieldSeparator>
        <div scSeparator class="absolute inset-0 top-1/2"></div>
        <span
          class="text-muted-foreground px-2 bg-background relative mx-auto block w-fit"
        >
          or
        </span>
      </div>

      <div scField>
        <label scLabel for="phone">Phone</label>
        <input scInput id="phone" type="tel" placeholder="Enter your phone" />
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorFieldDemo {}
