import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScLabelText,
  ScToggleGroup,
  ScToggleGroupItem,
} from '@semantic-components/ui';

/** A slot to book: times as a toggle group, a note for new patients. */
@Component({
  selector: 'app-preview-book-appointment',
  imports: [
    ScAlert,
    ScAlertDescription,
    ScAlertTitle,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScLabelText,
    ScToggleGroup,
    ScToggleGroupItem,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Book Appointment</h2>
        <p scCardDescription>Dr. Sarah Chen · Cardiology</p>
      </div>
      <div scCardBody class="flex flex-col gap-4">
        <div scFieldGroup>
          <div scField>
            <p scLabelText id="preview-slots-label">
              Available on March 18, 2026
            </p>
            <div
              scToggleGroup
              aria-labelledby="preview-slots-label"
              class="flex-wrap"
              [spacing]="2"
              [(value)]="slot"
            >
              @for (time of times; track time; let i = $index) {
                <button scToggleGroupItem [value]="'slot-' + i">
                  {{ time }}
                </button>
              }
            </div>
          </div>
        </div>
        <div scAlert>
          <div scAlertTitle>New patient?</div>
          <div scAlertDescription>Please arrive 15 minutes early.</div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">Book Appointment</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewBookAppointment {
  protected readonly times = ['9:00 AM', '10:30 AM', '11:00 AM', '1:30 PM'];
  protected readonly slot = signal(['slot-0']);
}
