import { Component, ViewEncapsulation, inject } from '@angular/core';
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
  ScFieldGroup,
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScTextarea,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiAtSignIcon,
  SiGlobeIcon,
  SiLockIcon,
  SiUserIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

/** Form Layouts (Pro): the same fields stacked, side by side, in a row, in columns, with icons. */
@Component({
  selector: 'app-form-layouts-page',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScField,
    ScFieldGroup,
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScLabel,
    ScTextarea,
    SiAtSignIcon,
    SiGlobeIcon,
    SiLockIcon,
    SiUserIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title
      title="Form Layouts"
      [trail]="[{ label: t.forms }, { label: t.layouts }]"
    />

    <div class="grid gap-4 xl:grid-cols-2">
      <form (submit)="send($event, 'Stacked')">
        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>Stacked</h2>
            <p i18n scCardDescription>Labels above the fields</p>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label i18n scLabel>Name</label>
                <input scInput autocomplete="name" />
              </div>
              <div scField>
                <label i18n scLabel>Email</label>
                <input scInput type="email" autocomplete="email" />
              </div>
              <div scField>
                <label i18n scLabel>Message</label>
                <textarea scTextarea rows="3"></textarea>
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end">
            <button i18n scButton type="submit">Submit</button>
          </div>
        </div>
      </form>

      <form (submit)="send($event, 'Side by side')">
        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>Side by side</h2>
            <p i18n scCardDescription>
              Labels beside the fields on wide screens
            </p>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField orientation="responsive">
                <label
                  i18n
                  scLabel
                  class="@md/field-group:w-32 @md/field-group:flex-none"
                  >Name</label
                >
                <input
                  scInput
                  class="@md/field-group:flex-1"
                  autocomplete="name"
                />
              </div>
              <div scField orientation="responsive">
                <label
                  i18n
                  scLabel
                  class="@md/field-group:w-32 @md/field-group:flex-none"
                  >Email</label
                >
                <input
                  scInput
                  class="@md/field-group:flex-1"
                  type="email"
                  autocomplete="email"
                />
              </div>
              <div scField orientation="responsive">
                <label
                  i18n
                  scLabel
                  class="@md/field-group:w-32 @md/field-group:flex-none"
                  >Website</label
                >
                <input scInput class="@md/field-group:flex-1" type="url" />
              </div>
              <div scField orientation="horizontal">
                <input scCheckbox type="checkbox" />
                <label i18n scLabel>Keep me posted</label>
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end">
            <button i18n scButton type="submit">Submit</button>
          </div>
        </div>
      </form>

      <form (submit)="send($event, 'Row')">
        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>In a row</h2>
            <p i18n scCardDescription>A short form on one line</p>
          </div>
          <div scCardBody>
            <div class="flex flex-wrap items-end gap-3">
              <div scField class="min-w-40 flex-1">
                <label i18n scLabel>Email</label>
                <input scInput type="email" autocomplete="email" />
              </div>
              <div scField class="min-w-40 flex-1">
                <label i18n scLabel>Password</label>
                <input
                  scInput
                  type="password"
                  autocomplete="current-password"
                />
              </div>
              <button i18n scButton type="submit">Sign in</button>
            </div>
          </div>
        </div>
      </form>

      <form (submit)="send($event, 'With icons')">
        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>With icons</h2>
            <p i18n scCardDescription>Each field says what it holds</p>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label i18n scLabel>Username</label>
                <div scInputGroup>
                  <input scInput autocomplete="username" />
                  <div scInputGroupAddon><svg siUserIcon></svg></div>
                </div>
              </div>
              <div scField>
                <label i18n scLabel>Email</label>
                <div scInputGroup>
                  <input scInput type="email" autocomplete="email" />
                  <div scInputGroupAddon><svg siAtSignIcon></svg></div>
                </div>
              </div>
              <div scField>
                <label i18n scLabel>Website</label>
                <div scInputGroup>
                  <input scInput type="url" />
                  <div scInputGroupAddon><svg siGlobeIcon></svg></div>
                </div>
              </div>
              <div scField>
                <label i18n scLabel>Password</label>
                <div scInputGroup>
                  <input scInput type="password" autocomplete="new-password" />
                  <div scInputGroupAddon><svg siLockIcon></svg></div>
                </div>
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end">
            <button i18n scButton type="submit">Submit</button>
          </div>
        </div>
      </form>

      <form class="xl:col-span-2" (submit)="send($event, 'Columns')">
        <div scCard>
          <div scCardHeader>
            <h2 i18n scCardTitle>In columns</h2>
            <p i18n scCardDescription>A longer form, two or three to a row</p>
          </div>
          <div scCardBody>
            <div scFieldGroup class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div scField>
                <label i18n scLabel>First name</label>
                <input scInput autocomplete="given-name" />
              </div>
              <div scField>
                <label i18n scLabel>Last name</label>
                <input scInput autocomplete="family-name" />
              </div>
              <div scField>
                <label i18n scLabel>Company</label>
                <input scInput autocomplete="organization" />
              </div>
              <div scField class="md:col-span-2">
                <label i18n scLabel>Address</label>
                <input scInput autocomplete="street-address" />
              </div>
              <div scField>
                <label i18n scLabel>City</label>
                <input scInput autocomplete="address-level2" />
              </div>
              <div scField>
                <label i18n scLabel>Postal code</label>
                <input scInput autocomplete="postal-code" />
              </div>
              <div scField>
                <label i18n scLabel>Country</label>
                <input scInput autocomplete="country-name" />
              </div>
              <div scField>
                <label i18n scLabel>Phone</label>
                <input scInput type="tel" autocomplete="tel" />
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end gap-2">
            <button i18n scButton type="reset" variant="outline">Clear</button>
            <button i18n scButton type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormLayoutsPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    forms: $localize`Forms`,
    layouts: $localize`Layouts`,
  };

  private readonly toaster = inject(ScToaster);

  private send(event: Event, layout: string): void {
    event.preventDefault();
    this.toaster.show({
      variant: 'success',
      title: $localize`${layout} form sent`,
    });
  }
}
