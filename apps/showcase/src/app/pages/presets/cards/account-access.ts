import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScItem,
  ScItemBody,
  ScItemDescription,
  ScItemMedia,
  ScItemTitle,
  ScLabel,
} from '@semantic-components/ui';
import {
  SiArrowRightIcon,
  SiCircleAlertIcon,
  SiLockKeyholeIcon,
} from '@semantic-icons/lucide-icons';

/** Credentials to update, and a danger zone as a link item. */
@Component({
  selector: 'app-preview-account-access',
  imports: [
    FormField,
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScItem,
    ScItemBody,
    ScItemDescription,
    ScItemMedia,
    ScItemTitle,
    ScLabel,
    SiArrowRightIcon,
    SiCircleAlertIcon,
    SiLockKeyholeIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Account Access</h2>
        <p scCardDescription>Update your credentials or re-authenticate.</p>
      </div>
      <div scCardContent>
        <div scFieldGroup>
          <div scField>
            <label scLabel>Email Address</label>
            <input scInput type="email" [formField]="access.email" />
          </div>
          <div scField>
            <div class="flex items-center justify-between">
              <label scLabel>Current Password</label>
              <a
                href="#"
                class="text-muted-foreground hover:text-foreground text-xs font-medium tracking-wider uppercase"
                >Forgot?</a
              >
            </div>
            <input scInput type="password" [formField]="access.password" />
          </div>
        </div>
      </div>
      <div scCardFooter class="flex-col gap-4">
        <button scButton class="w-full">
          <svg siLockKeyholeIcon></svg>
          Update Security
        </button>
        <a scItem variant="muted" href="#" class="w-full">
          <div scItemMedia variant="icon">
            <svg siCircleAlertIcon class="text-destructive"></svg>
          </div>
          <div scItemBody>
            <div scItemTitle>Danger Zone</div>
            <p scItemDescription class="line-clamp-1">
              Archive account and remove catalog
            </p>
          </div>
          <svg siArrowRightIcon class="size-4"></svg>
        </a>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewAccountAccess {
  protected readonly access = form(
    signal({ email: 'artist@studio.inc', password: '' }),
  );
}
