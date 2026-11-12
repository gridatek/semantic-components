import { Component, ViewEncapsulation } from '@angular/core';
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
  SiChevronRightIcon,
  SiCircleAlertIcon,
  SiLockIcon,
} from '@semantic-icons/lucide-icons';

/** Credentials to update, and a danger zone as a link item. */
@Component({
  selector: 'app-home-account-access',
  imports: [
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
    SiChevronRightIcon,
    SiCircleAlertIcon,
    SiLockIcon,
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
            <input scInput type="email" placeholder="artist@studio.inc" />
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
            <input
              scInput
              type="password"
              placeholder="••••••••••••••••••••••••"
            />
          </div>
        </div>
      </div>
      <div scCardFooter class="flex-col gap-4">
        <button scButton class="w-full">
          <svg siLockIcon></svg>
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
          <svg siChevronRightIcon class="size-4"></svg>
        </a>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class HomeAccountAccess {}
