import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButtonPattern,
  ScLabel,
  ScSwitch,
  ScSwitchField,
} from '@semantic-components/ui';

/** A button only while it can act: off, a plain row, out of the Tab order. */
@Component({
  selector: 'app-conditional-button-pattern-demo',
  imports: [FormField, ScButtonPattern, ScLabel, ScSwitch, ScSwitchField],
  template: `
    <div class="flex w-72 flex-col gap-4">
      <div scSwitchField>
        <input scSwitch [formField]="settings.editable" />
        <label scLabel>Editable</label>
      </div>
      <div
        [scButtonPattern]="editable()"
        (click)="edit()"
        class="rounded-md border p-3 text-sm"
        [class.cursor-pointer]="editable()"
      >
        Shipping address
        <span class="text-muted-foreground block">
          Edited {{ edits() }} times
        </span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ConditionalButtonPatternDemo {
  protected readonly settings = form(signal({ editable: true }));
  protected readonly editable = computed(() =>
    this.settings.editable().value(),
  );
  protected readonly edits = signal(0);

  protected edit(): void {
    if (this.editable()) this.edits.update((n) => n + 1);
  }
}
