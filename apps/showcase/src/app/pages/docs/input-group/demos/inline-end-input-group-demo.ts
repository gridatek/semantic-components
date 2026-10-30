import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScFieldDescription,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
} from '@semantic-components/ui';
import { SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-inline-end-input-group-demo',
  imports: [
    ScField,
    ScFieldDescription,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    SiEyeOffIcon,
  ],
  template: `
    <div scField class="max-w-sm">
      <label scLabel>Password</label>
      <div scInputGroup>
        <input
          scInput
          type="password"
          placeholder="Enter password"
          autocomplete="current-password"
        />
        <div scInputGroupAddon align="inline-end">
          <svg siEyeOffIcon></svg>
        </div>
      </div>
      <p scFieldDescription>Icon positioned at the end.</p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class InlineEndInputGroupDemo {}
