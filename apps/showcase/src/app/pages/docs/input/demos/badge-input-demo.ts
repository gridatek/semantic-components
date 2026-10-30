import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge, ScField, ScInput, ScLabel } from '@semantic-components/ui';

@Component({
  selector: 'app-badge-input-demo',
  imports: [ScBadge, ScField, ScInput, ScLabel],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>
        Webhook URL
        <span scBadge variant="secondary" class="ms-auto">Beta</span>
      </label>
      <input scInput type="url" placeholder="https://api.example.com/webhook" />
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BadgeInputDemo {}
