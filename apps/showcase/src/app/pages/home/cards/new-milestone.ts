import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
} from '@semantic-components/ui';

/** A small form: a name, an amount and a date. */
@Component({
  selector: 'app-home-new-milestone',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Set a new milestone</h2>
        <p scCardDescription>
          Define your financial target and we&apos;ll help you pace your
          savings.
        </p>
      </div>
      <div scCardBody>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Goal Name</label>
            <input scInput placeholder="e.g. New Car, Home Downpayment" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div scField>
              <label scLabel>Target Amount</label>
              <input scInput value="$15,000" />
            </div>
            <div scField>
              <label scLabel>Target Date</label>
              <input scInput value="Dec 2025" />
            </div>
          </div>
        </div>
      </div>
      <div scCardFooter class="flex-col gap-2">
        <button scButton class="w-full">Create Goal</button>
        <button scButton variant="outline" class="w-full">Cancel</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeNewMilestone {}
