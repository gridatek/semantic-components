import { Component, ViewEncapsulation, inject, signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScButton,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScDialog,
  ScDialogClose,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
  ScToaster,
} from '@semantic-components/ui';
import {
  SiDribbbleIcon,
  SiFacebookIcon,
  SiGithubIcon,
  SiPencilIcon,
  SiTwitterIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';
import { PageHeader } from '../../layout/page-header';

interface Personal {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
}

interface Address {
  location: string;
  state: string;
  pin: string;
  zip: string;
  taxNo: string;
}

/** The user profile: who, how to reach them, where. */
@Component({
  selector: 'app-user-profile-page',
  imports: [
    FormField,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScDialog,
    ScDialogClose,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
    SiDribbbleIcon,
    SiFacebookIcon,
    SiGithubIcon,
    SiPencilIcon,
    SiTwitterIcon,
    SiXIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@userProfile.userProfile"
      title="User Profile"
      [trail]="[{ label: t.userProfile }]"
    />

    <div scCard>
      <div scCardBody class="flex flex-col items-center gap-6 sm:flex-row">
        <span scAvatar class="size-20">
          <img scAvatarImage src="images/profile/user-1.png" alt="" />
          <span scAvatarFallback>MA</span>
        </span>
        <div
          class="flex w-full flex-wrap items-center justify-center gap-4 sm:justify-between"
        >
          <div class="flex flex-col gap-1.5 text-center sm:text-start">
            <h2 class="text-lg font-semibold">
              {{ personal().firstName }} {{ personal().lastName }}
            </h2>
            <p class="text-muted-foreground text-sm">
              {{ personal().position }} · {{ address().location }}
            </p>
          </div>
          <ul
            i18n-aria-label="@@userProfile.socialProfiles"
            class="flex items-center gap-2"
            aria-label="Social profiles"
          >
            @for (link of socials; track link.label) {
              <li>
                <a
                  scLink
                  variant="outline"
                  size="icon"
                  class="rounded-full"
                  [href]="link.href"
                  target="_blank"
                  rel="noopener"
                >
                  @switch (link.label) {
                    @case ('Facebook') {
                      <svg siFacebookIcon></svg>
                    }
                    @case ('X') {
                      <svg siTwitterIcon></svg>
                    }
                    @case ('GitHub') {
                      <svg siGithubIcon></svg>
                    }
                    @case ('Dribbble') {
                      <svg siDribbbleIcon></svg>
                    }
                  }
                  <span class="sr-only">{{ link.label }}</span>
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <div scCard>
        <div scCardHeader>
          <h2
            i18n="@@userProfile.personalInformation"
            scCardTitle
            id="personal-title"
          >
            Personal Information
          </h2>
          <div scCardAction>
            <div scDialogProvider [(open)]="editingPersonal">
              <button scButton size="sm" (click)="editPersonal()">
                <svg siPencilIcon></svg>
                <ng-container i18n="@@userProfile.edit">Edit</ng-container>
              </button>
              <ng-template scDialogPortal>
                <div scDialog class="sm:max-w-lg">
                  <button scDialogClose>
                    <svg siXIcon></svg>
                    <span i18n="@@userProfile.close" class="sr-only"
                      >Close</span
                    >
                  </button>
                  <div scDialogHeader>
                    <h2
                      i18n="@@userProfile.editPersonalInformation"
                      scDialogTitle
                    >
                      Edit Personal Information
                    </h2>
                  </div>
                  <form id="personal-form" (submit)="savePersonal($event)">
                    <div scFieldGroup class="grid gap-4 sm:grid-cols-2">
                      <div scField>
                        <label i18n="@@userProfile.firstName" scLabel
                          >First Name</label
                        >
                        <input
                          scInput
                          cdkFocusInitial
                          [formField]="personalForm.firstName"
                        />
                      </div>
                      <div scField>
                        <label i18n="@@userProfile.lastName" scLabel
                          >Last Name</label
                        >
                        <input scInput [formField]="personalForm.lastName" />
                      </div>
                      <div scField>
                        <label i18n="@@userProfile.email" scLabel>Email</label>
                        <input
                          scInput
                          type="email"
                          [formField]="personalForm.email"
                        />
                      </div>
                      <div scField>
                        <label i18n="@@userProfile.phone" scLabel>Phone</label>
                        <input
                          scInput
                          type="tel"
                          [formField]="personalForm.phone"
                        />
                      </div>
                      <div scField class="sm:col-span-2">
                        <label i18n="@@userProfile.position" scLabel
                          >Position</label
                        >
                        <input scInput [formField]="personalForm.position" />
                      </div>
                    </div>
                  </form>
                  <div scDialogFooter>
                    <button
                      i18n="@@userProfile.cancel"
                      scDialogClose
                      variant="outline"
                      size="default"
                    >
                      Cancel
                    </button>
                    <button
                      i18n="@@userProfile.save"
                      scButton
                      type="submit"
                      form="personal-form"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        <div scCardBody>
          <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            @for (item of personalItems(); track item.label) {
              <div>
                <dt class="text-muted-foreground text-xs">{{ item.label }}</dt>
                <dd class="text-sm font-medium">{{ item.value }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>

      <div scCard>
        <div scCardHeader>
          <h2
            i18n="@@userProfile.addressDetails"
            scCardTitle
            id="address-title"
          >
            Address Details
          </h2>
          <div scCardAction>
            <div scDialogProvider [(open)]="editingAddress">
              <button scButton size="sm" (click)="editAddress()">
                <svg siPencilIcon></svg>
                <ng-container i18n="@@userProfile.edit">Edit</ng-container>
              </button>
              <ng-template scDialogPortal>
                <div scDialog class="sm:max-w-lg">
                  <button scDialogClose>
                    <svg siXIcon></svg>
                    <span i18n="@@userProfile.close" class="sr-only"
                      >Close</span
                    >
                  </button>
                  <div scDialogHeader>
                    <h2 i18n="@@userProfile.editAddressDetails" scDialogTitle>
                      Edit Address Details
                    </h2>
                  </div>
                  <form id="address-form" (submit)="saveAddress($event)">
                    <div scFieldGroup class="grid gap-4 sm:grid-cols-2">
                      <div scField>
                        <label i18n="@@userProfile.location" scLabel
                          >Location</label
                        >
                        <input
                          scInput
                          cdkFocusInitial
                          [formField]="addressForm.location"
                        />
                      </div>
                      <div scField>
                        <label i18n="@@userProfile.state" scLabel>State</label>
                        <input scInput [formField]="addressForm.state" />
                      </div>
                      <div scField>
                        <label scLabel>PIN</label>
                        <input scInput [formField]="addressForm.pin" />
                      </div>
                      <div scField>
                        <label scLabel>ZIP</label>
                        <input scInput [formField]="addressForm.zip" />
                      </div>
                      <div scField class="sm:col-span-2">
                        <label i18n="@@userProfile.taxNo" scLabel
                          >Tax No.</label
                        >
                        <input scInput [formField]="addressForm.taxNo" />
                      </div>
                    </div>
                  </form>
                  <div scDialogFooter>
                    <button
                      i18n="@@userProfile.cancel"
                      scDialogClose
                      variant="outline"
                      size="default"
                    >
                      Cancel
                    </button>
                    <button
                      i18n="@@userProfile.save"
                      scButton
                      type="submit"
                      form="address-form"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
        <div scCardBody>
          <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            @for (item of addressItems(); track item.label) {
              <div>
                <dt class="text-muted-foreground text-xs">{{ item.label }}</dt>
                <dd class="text-sm font-medium">{{ item.value }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class UserProfilePage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    userProfile: $localize`:@@userProfile.userProfile:User Profile`,
  };

  private readonly toaster = inject(ScToaster);

  private readonly personal = signal<Personal>({
    firstName: 'Mathew',
    lastName: 'Anderson',
    email: 'mathew.anderson@gmail.com',
    phone: '(347) 528-1947',
    position: 'Team Leader',
  });
  private readonly address = signal<Address>({
    location: 'United States',
    state: 'San Diego, California, United States',
    pin: '92101',
    zip: '30303',
    taxNo: 'GA45273910',
  });

  private readonly socials = [
    {
      label: $localize`:@@userProfile.facebook:Facebook`,
      href: 'https://www.facebook.com/wrappixel',
    },
    { label: 'X', href: 'https://x.com' },
    {
      label: $localize`:@@userProfile.github:GitHub`,
      href: 'https://github.com/gridatek/semantic-components',
    },
    {
      label: $localize`:@@userProfile.dribbble:Dribbble`,
      href: 'https://dribbble.com/wrappixel',
    },
  ];

  private readonly editingPersonal = signal(false);
  private readonly editingAddress = signal(false);

  // The dialogs edit a copy; Save writes it back, Cancel drops it.
  private readonly personalDraft = signal<Personal>(this.personal());
  private readonly personalForm = form(this.personalDraft, (path) => {
    required(path.firstName);
    required(path.email);
    email(path.email);
  });
  private readonly addressDraft = signal<Address>(this.address());
  private readonly addressForm = form(this.addressDraft);

  private personalItems() {
    const p = this.personal();
    return [
      {
        label: $localize`:@@userProfile.firstName:First Name`,
        value: p.firstName,
      },
      {
        label: $localize`:@@userProfile.lastName:Last Name`,
        value: p.lastName,
      },
      { label: $localize`:@@userProfile.email:Email`, value: p.email },
      { label: $localize`:@@userProfile.phone:Phone`, value: p.phone },
      { label: $localize`:@@userProfile.position:Position`, value: p.position },
    ];
  }

  private addressItems() {
    const a = this.address();
    return [
      { label: $localize`:@@userProfile.location:Location`, value: a.location },
      { label: $localize`:@@userProfile.state:State`, value: a.state },
      { label: 'PIN', value: a.pin },
      { label: 'ZIP', value: a.zip },
      { label: $localize`:@@userProfile.taxNo:Tax No.`, value: a.taxNo },
    ];
  }

  private editPersonal(): void {
    this.personalDraft.set({ ...this.personal() });
    this.editingPersonal.set(true);
  }

  private editAddress(): void {
    this.addressDraft.set({ ...this.address() });
    this.editingAddress.set(true);
  }

  private savePersonal(event: Event): void {
    event.preventDefault();
    if (this.personalForm().invalid()) return;
    this.personal.set({ ...this.personalDraft() });
    this.editingPersonal.set(false);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@userProfile.personalInformationSaved:Personal information saved`,
    });
  }

  private saveAddress(event: Event): void {
    event.preventDefault();
    this.address.set({ ...this.addressDraft() });
    this.editingAddress.set(false);
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@userProfile.addressSaved:Address saved`,
    });
  }
}
