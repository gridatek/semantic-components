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
  ScInput,
  ScInputGroup,
  ScInputGroupAddon,
  ScInputGroupButton,
  ScLabel,
  ScSelect,
  ScSelectGroup,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScSeparator,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiCopyIcon,
  SiPlusIcon,
} from '@semantic-icons/lucide-icons';

/** Invites: an email and a role each, one more, or a link to share. */
@Component({
  selector: 'app-preview-invite-team',
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
    ScInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScInputGroupButton,
    ScLabel,
    ScSelect,
    ScSelectGroup,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScSeparator,
    SiCheckIcon,
    SiChevronDownIcon,
    SiCopyIcon,
    SiPlusIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Invite Team</h2>
        <p scCardDescription>Add members to your workspace</p>
      </div>
      <div scCardContent class="flex flex-col gap-4">
        <div class="flex flex-col gap-3">
          @for (invite of team.invites; track $index; let i = $index) {
            <div class="flex items-center gap-2">
              <input
                scInput
                type="email"
                class="flex-1"
                [attr.aria-label]="'Email ' + (i + 1)"
                [formField]="invite.email"
              />
              <div
                scSelect
                class="w-24"
                [items]="roles"
                [formField]="invite.role"
              >
                <div
                  scSelectTrigger
                  class="w-full"
                  [attr.aria-label]="'Role ' + (i + 1)"
                >
                  <span scSelectValue></span>
                  <svg scSelectIcon siChevronDownIcon></svg>
                </div>
                <ng-template scSelectPortal>
                  <div scSelectPopup>
                    <div scSelectList>
                      <div scSelectGroup>
                        @for (role of roles; track role.value) {
                          <div scSelectItem [value]="role.value">
                            <span scSelectItemText>{{ role.label }}</span>
                            <span scSelectItemIndicator>
                              <svg siCheckIcon></svg>
                            </span>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          }
        </div>
        <button scButton variant="outline" (click)="addAnother()">
          <svg siPlusIcon data-icon="inline-start"></svg>
          Add another
        </button>
        <div scSeparator aria-hidden="true"></div>
        <div scField>
          <label scLabel>Or share invite link</label>
          <div scInputGroup>
            <input scInput readonly [value]="link" />
            <div scInputGroupAddon side="inline-end">
              <button scInputGroupButton size="icon-xs">
                <svg siCopyIcon></svg>
                <span class="sr-only">Copy link</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div scCardFooter>
        <button scButton class="w-full">Send Invites</button>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewInviteTeam {
  protected readonly link = 'https://app.co/invite/x8f2k';
  protected readonly roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Editor', value: 'editor' },
    { label: 'Viewer', value: 'viewer' },
  ];
  private readonly model = signal({
    invites: [
      { email: 'alex@example.com', role: 'editor' },
      { email: 'sam@example.com', role: 'viewer' },
    ],
  });
  protected readonly team = form(this.model);

  protected addAnother(): void {
    this.model.update((m) => ({
      invites: [...m.invites, { email: '', role: 'viewer' }],
    }));
  }
}
