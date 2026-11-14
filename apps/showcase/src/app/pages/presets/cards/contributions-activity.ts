import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldGroup,
  ScFieldset,
  ScLabel,
  ScLegend,
} from '@semantic-components/ui';

/** One setting: a checkbox with a long description. */
@Component({
  selector: 'app-preview-contributions-activity',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldGroup,
    ScFieldset,
    ScLabel,
    ScLegend,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Contributions &amp; Activity</h2>
        <p scCardDescription>
          Manage your contributions and activity visibility.
        </p>
      </div>
      <div scCardBody>
        <fieldset scFieldset>
          <legend scLegend class="sr-only">Contributions &amp; activity</legend>
          <div scFieldGroup>
            <div scField orientation="horizontal">
              <input scCheckbox [formField]="settings.private" />
              <div scFieldContentWrapper>
                <label scLabel>Make profile private and hide activity</label>
                <p scFieldDescription>
                  Enabling this will hide your contributions and activity from
                  your GitHub profile and from social features like followers,
                  stars, feeds, leaderboards and releases.
                </p>
              </div>
            </div>
          </div>
        </fieldset>
      </div>
      <div scCardFooter>
        <button scButton>Save Changes</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewContributionsActivity {
  protected readonly settings = form(signal({ private: false }));
}
