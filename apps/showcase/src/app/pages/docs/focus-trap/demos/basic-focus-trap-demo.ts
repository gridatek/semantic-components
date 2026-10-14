import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScField,
  ScFocusTrap,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

/**
 * A panel that holds focus while open: its first field is focused, Tab
 * stays inside, and closing it gives focus back to the button.
 */
@Component({
  selector: 'app-basic-focus-trap-demo',
  imports: [ScButton, ScField, ScFocusTrap, ScInput, ScLabel],
  template: `
    <div class="flex w-72 flex-col items-start gap-4">
      <button
        scButton
        variant="outline"
        [attr.aria-expanded]="open()"
        (click)="open.set(true)"
      >
        Edit name
      </button>

      @if (open()) {
        <div
          scFocusTrap
          role="group"
          aria-label="Name"
          class="grid w-full gap-3 rounded-lg border p-4"
        >
          <div scField>
            <label scLabel>First name</label>
            <input scInput />
          </div>
          <div scField>
            <label scLabel>Last name</label>
            <input scInput />
          </div>
          <button scButton class="justify-self-end" (click)="open.set(false)">
            Done
          </button>
        </div>
      }
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicFocusTrapDemo {
  protected readonly open = signal(false);
}
