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
  ScSeparator,
} from '@semantic-components/ui';

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
        <label scLabel>Email</label>
        <input scInput type="email" placeholder="Enter your email" />
      </div>

      <div scFieldSeparator>
        <div scSeparator class="absolute inset-0 top-1/2"></div>
        <span
          class="text-muted-foreground bg-background relative mx-auto block w-fit px-2"
        >
          or
        </span>
      </div>

      <div scField>
        <label scLabel>Phone</label>
        <input scInput type="tel" placeholder="Enter your phone" />
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeparatorFieldDemo {}
