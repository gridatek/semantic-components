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
      title="Form Layouts"
      [trail]="[{ label: 'Forms' }, { label: 'Layouts' }]"
    />

    <div class="grid gap-4 xl:grid-cols-2">
      <form (submit)="send($event, 'Stacked')">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Stacked</h2>
            <p scCardDescription>Labels above the fields</p>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label scLabel>Name</label>
                <input scInput autocomplete="name" />
              </div>
              <div scField>
                <label scLabel>Email</label>
                <input scInput type="email" autocomplete="email" />
              </div>
              <div scField>
                <label scLabel>Message</label>
                <textarea scTextarea rows="3"></textarea>
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end">
            <button scButton type="submit">Submit</button>
          </div>
        </div>
      </form>

      <form (submit)="send($event, 'Side by side')">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>Side by side</h2>
            <p scCardDescription>Labels beside the fields on wide screens</p>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField orientation="responsive">
                <label
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
                  scLabel
                  class="@md/field-group:w-32 @md/field-group:flex-none"
                  >Website</label
                >
                <input scInput class="@md/field-group:flex-1" type="url" />
              </div>
              <div scField orientation="horizontal">
                <input scCheckbox type="checkbox" />
                <label scLabel>Keep me posted</label>
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end">
            <button scButton type="submit">Submit</button>
          </div>
        </div>
      </form>

      <form (submit)="send($event, 'Row')">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>In a row</h2>
            <p scCardDescription>A short form on one line</p>
          </div>
          <div scCardBody>
            <div class="flex flex-wrap items-end gap-3">
              <div scField class="min-w-40 flex-1">
                <label scLabel>Email</label>
                <input scInput type="email" autocomplete="email" />
              </div>
              <div scField class="min-w-40 flex-1">
                <label scLabel>Password</label>
                <input
                  scInput
                  type="password"
                  autocomplete="current-password"
                />
              </div>
              <button scButton type="submit">Sign in</button>
            </div>
          </div>
        </div>
      </form>

      <form (submit)="send($event, 'With icons')">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>With icons</h2>
            <p scCardDescription>Each field says what it holds</p>
          </div>
          <div scCardBody>
            <div scFieldGroup>
              <div scField>
                <label scLabel>Username</label>
                <div scInputGroup>
                  <input scInput autocomplete="username" />
                  <div scInputGroupAddon><svg siUserIcon></svg></div>
                </div>
              </div>
              <div scField>
                <label scLabel>Email</label>
                <div scInputGroup>
                  <input scInput type="email" autocomplete="email" />
                  <div scInputGroupAddon><svg siAtSignIcon></svg></div>
                </div>
              </div>
              <div scField>
                <label scLabel>Website</label>
                <div scInputGroup>
                  <input scInput type="url" />
                  <div scInputGroupAddon><svg siGlobeIcon></svg></div>
                </div>
              </div>
              <div scField>
                <label scLabel>Password</label>
                <div scInputGroup>
                  <input scInput type="password" autocomplete="new-password" />
                  <div scInputGroupAddon><svg siLockIcon></svg></div>
                </div>
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end">
            <button scButton type="submit">Submit</button>
          </div>
        </div>
      </form>

      <form class="xl:col-span-2" (submit)="send($event, 'Columns')">
        <div scCard>
          <div scCardHeader>
            <h2 scCardTitle>In columns</h2>
            <p scCardDescription>A longer form, two or three to a row</p>
          </div>
          <div scCardBody>
            <div scFieldGroup class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div scField>
                <label scLabel>First name</label>
                <input scInput autocomplete="given-name" />
              </div>
              <div scField>
                <label scLabel>Last name</label>
                <input scInput autocomplete="family-name" />
              </div>
              <div scField>
                <label scLabel>Company</label>
                <input scInput autocomplete="organization" />
              </div>
              <div scField class="md:col-span-2">
                <label scLabel>Address</label>
                <input scInput autocomplete="street-address" />
              </div>
              <div scField>
                <label scLabel>City</label>
                <input scInput autocomplete="address-level2" />
              </div>
              <div scField>
                <label scLabel>Postal code</label>
                <input scInput autocomplete="postal-code" />
              </div>
              <div scField>
                <label scLabel>Country</label>
                <input scInput autocomplete="country-name" />
              </div>
              <div scField>
                <label scLabel>Phone</label>
                <input scInput type="tel" autocomplete="tel" />
              </div>
            </div>
          </div>
          <div scCardFooter class="justify-end gap-2">
            <button scButton type="reset" variant="outline">Clear</button>
            <button scButton type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class FormLayoutsPage {
  private readonly toaster = inject(ScToaster);

  private send(event: Event, layout: string): void {
    event.preventDefault();
    this.toaster.show({ variant: 'success', title: `${layout} form sent` });
  }
}
