import { NgOptimizedImage } from '@angular/common';
import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  FormField,
  email,
  form,
  minLength,
  required,
  validate,
} from '@angular/forms/signals';
import {
  SC_DAYS_OF_WEEK,
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldContentWrapper,
  ScFieldDescription,
  ScFieldErrors,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectLabel,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
  ScSeparator,
  ScSwitch,
  ScTable,
  ScTableBody,
  ScTableCell,
  ScTableContainer,
  ScTableHeader,
  ScTableHeaderCell,
  ScTableRow,
  ScTabs,
  ScTabsList,
  ScTabsPanel,
  ScTabsPanelContent,
  ScTabsTab,
  ScTextarea,
  ScToaster,
  injectFirstDayOfWeek,
} from '@semantic-components/ui';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiDownloadIcon,
  SiLaptopIcon,
  SiSmartphoneIcon,
} from '@semantic-icons/lucide-icons';
import { ME } from '../../data/people';
import { PageHeader } from '../../layout/page-header';

/** Account Settings (Pro): the account, security, notifications, billing. */
@Component({
  selector: 'app-account-settings-page',
  imports: [
    FormField,
    NgOptimizedImage,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldContentWrapper,
    ScFieldDescription,
    ScFieldErrors,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectLabel,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    ScSeparator,
    ScSwitch,
    ScTable,
    ScTableBody,
    ScTableCell,
    ScTableContainer,
    ScTableHeader,
    ScTableHeaderCell,
    ScTableRow,
    ScTabs,
    ScTabsList,
    ScTabsPanel,
    ScTabsPanelContent,
    ScTabsTab,
    ScTextarea,
    SiCheckIcon,
    SiChevronDownIcon,
    SiDownloadIcon,
    SiLaptopIcon,
    SiSmartphoneIcon,
    PageHeader,
  ],
  template: `
    <app-page-header
      i18n-title="@@accountSettings.accountSettings"
      title="Account Settings"
      [trail]="[{ label: t.pages }, { label: t.accountSettings }]"
    />

    <div scTabs value="account" class="flex flex-col gap-4">
      <div scTabsList class="self-start">
        <button i18n="@@accountSettings.account" scTabsTab value="account">
          Account
        </button>
        <button i18n="@@accountSettings.security" scTabsTab value="security">
          Security
        </button>
        <button
          i18n="@@accountSettings.notifications"
          scTabsTab
          value="notifications"
        >
          Notifications
        </button>
        <button i18n="@@accountSettings.billing" scTabsTab value="billing">
          Billing
        </button>
      </div>

      <div scTabsPanel value="account">
        <ng-template scTabsPanelContent>
          <div class="flex flex-col gap-4">
            <form (submit)="saveAccount($event)">
              <div scCard>
                <div scCardHeader>
                  <h2 i18n="@@accountSettings.profile" scCardTitle>Profile</h2>
                  <p i18n="@@accountSettings.howOthersSeeYou" scCardDescription>
                    How others see you
                  </p>
                </div>
                <div scCardBody class="flex flex-col gap-6">
                  <div class="flex items-center gap-4">
                    <span scAvatar class="size-16">
                      <img scAvatarImage [src]="me.avatar" alt="" />
                      <span scAvatarFallback>MA</span>
                    </span>
                    <p
                      i18n="@@accountSettings.jpgOrPngUpTo"
                      class="text-muted-foreground text-sm"
                    >
                      JPG or PNG, up to 800 KB.
                    </p>
                  </div>
                  <div scFieldGroup class="grid gap-4 md:grid-cols-2">
                    <div scField>
                      <label i18n="@@accountSettings.fullName" scLabel
                        >Full name</label
                      >
                      <input
                        scInput
                        autocomplete="name"
                        [formField]="accountForm.name"
                      />
                      <div scFieldErrors></div>
                    </div>
                    <div scField>
                      <label i18n="@@accountSettings.email" scLabel
                        >Email</label
                      >
                      <input
                        scInput
                        type="email"
                        autocomplete="email"
                        [formField]="accountForm.email"
                      />
                      <div scFieldErrors></div>
                    </div>
                    <div scField>
                      <label i18n="@@accountSettings.phone" scLabel
                        >Phone</label
                      >
                      <input
                        scInput
                        type="tel"
                        autocomplete="tel"
                        [formField]="accountForm.phone"
                      />
                    </div>
                    <div scField>
                      <label i18n="@@accountSettings.location" scLabel
                        >Location</label
                      >
                      <input scInput [formField]="accountForm.location" />
                    </div>
                    <div scField class="md:col-span-2">
                      <label i18n="@@accountSettings.bio" scLabel>Bio</label>
                      <textarea
                        scTextarea
                        rows="3"
                        [formField]="accountForm.bio"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div scCardFooter class="justify-end">
                  <button
                    i18n="@@accountSettings.saveChanges"
                    scButton
                    type="submit"
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </form>

            <div scCard>
              <div scCardHeader>
                <h2 i18n="@@accountSettings.dateAndTime" scCardTitle>
                  Date and time
                </h2>
                <p
                  i18n="@@accountSettings.dateAndTimeDescription"
                  scCardDescription
                >
                  How calendars show the week, kept on this device
                </p>
              </div>
              <div scCardBody>
                <div scField class="w-full max-w-xs">
                  <div
                    scSelect
                    [items]="weekStarts()"
                    [value]="weekStart.value()"
                    (valueChange)="chooseWeekStart($event)"
                    class="w-full"
                  >
                    <div i18n="@@accountSettings.weekStartsOn" scSelectLabel>
                      Week starts on
                    </div>
                    <div scSelectTrigger>
                      <span scSelectValue></span>
                      <svg scSelectIcon siChevronDownIcon></svg>
                    </div>
                    <ng-template scSelectPortal>
                      <div scSelectPopup>
                        <div scSelectList>
                          @for (day of weekStarts(); track day.value) {
                            <div scSelectItem [value]="day.value">
                              <span scSelectItemText>{{ day.label }}</span>
                              <span scSelectItemIndicator>
                                <svg siCheckIcon></svg>
                              </span>
                            </div>
                          }
                        </div>
                      </div>
                    </ng-template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ng-template>
      </div>

      <div scTabsPanel value="security">
        <ng-template scTabsPanelContent>
          <div class="flex flex-col gap-4">
            <form (submit)="savePassword($event)">
              <div scCard>
                <div scCardHeader>
                  <h2 i18n="@@accountSettings.password" scCardTitle>
                    Password
                  </h2>
                  <p
                    i18n="@@accountSettings.atLeast8Characters"
                    scCardDescription
                  >
                    At least 8 characters
                  </p>
                </div>
                <div scCardBody>
                  <div scFieldGroup class="max-w-md">
                    <div scField>
                      <label i18n="@@accountSettings.currentPassword" scLabel
                        >Current password</label
                      >
                      <input
                        scInput
                        type="password"
                        autocomplete="current-password"
                        [formField]="passwordForm.current"
                      />
                      <div scFieldErrors></div>
                    </div>
                    <div scField>
                      <label i18n="@@accountSettings.newPassword" scLabel
                        >New password</label
                      >
                      <input
                        scInput
                        type="password"
                        autocomplete="new-password"
                        [formField]="passwordForm.next"
                      />
                      <div scFieldErrors></div>
                    </div>
                    <div scField>
                      <label i18n="@@accountSettings.confirmNewPassword" scLabel
                        >Confirm new password</label
                      >
                      <input
                        scInput
                        type="password"
                        autocomplete="new-password"
                        [formField]="passwordForm.confirm"
                      />
                      <div scFieldErrors></div>
                    </div>
                  </div>
                </div>
                <div scCardFooter class="justify-end">
                  <button
                    i18n="@@accountSettings.updatePassword"
                    scButton
                    type="submit"
                  >
                    Update password
                  </button>
                </div>
              </div>
            </form>

            <div scCard>
              <div scCardHeader>
                <h2 i18n="@@accountSettings.twoStepVerification" scCardTitle>
                  Two-step verification
                </h2>
              </div>
              <div scCardBody>
                <div scField orientation="horizontal">
                  <div scFieldContentWrapper>
                    <label
                      i18n="@@accountSettings.askForACodeAt"
                      scLabel
                      for="two-step"
                      >Ask for a code at sign-in</label
                    >
                    <p
                      i18n="@@accountSettings.fromAnAuthenticatorAppAfter"
                      scFieldDescription
                    >
                      From an authenticator app, after your password.
                    </p>
                  </div>
                  <input
                    scSwitch
                    id="two-step"
                    type="checkbox"
                    [checked]="twoStep()"
                    (change)="toggleTwoStep()"
                  />
                </div>
              </div>
            </div>

            <div scCard>
              <div scCardHeader>
                <h2 i18n="@@accountSettings.whereYouReSignedIn" scCardTitle>
                  Where you’re signed in
                </h2>
              </div>
              <div scCardBody class="flex flex-col gap-4">
                @for (session of sessions(); track session.id) {
                  <div class="flex items-center gap-3">
                    <span
                      class="bg-muted flex size-10 items-center justify-center rounded-lg"
                    >
                      @if (session.phone) {
                        <svg siSmartphoneIcon></svg>
                      } @else {
                        <svg siLaptopIcon></svg>
                      }
                    </span>
                    <div class="flex flex-col text-sm">
                      <span class="font-medium">
                        {{ session.device }}
                        @if (session.current) {
                          <span
                            i18n="@@accountSettings.thisDevice"
                            scBadge
                            variant="secondary"
                            class="ms-1"
                            >This device</span
                          >
                        }
                      </span>
                      <span class="text-muted-foreground">{{
                        session.where
                      }}</span>
                    </div>
                    @if (!session.current) {
                      <button
                        i18n="@@accountSettings.signOut"
                        scButton
                        variant="outline"
                        size="sm"
                        class="ms-auto"
                        (click)="signOut(session.id)"
                      >
                        Sign out
                      </button>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </ng-template>
      </div>

      <div scTabsPanel value="notifications">
        <ng-template scTabsPanelContent>
          <div scCard>
            <div scCardHeader>
              <h2 i18n="@@accountSettings.notifications" scCardTitle>
                Notifications
              </h2>
              <p i18n="@@accountSettings.whatWeTellYouAbout" scCardDescription>
                What we tell you about, and how
              </p>
            </div>
            <div scCardBody class="flex flex-col gap-4">
              @for (item of notices(); track item.id; let last = $last) {
                <div scField orientation="horizontal">
                  <div scFieldContentWrapper>
                    <label scLabel [for]="'n-' + item.id">{{
                      item.label
                    }}</label>
                    <p scFieldDescription>{{ item.text }}</p>
                  </div>
                  <input
                    scSwitch
                    type="checkbox"
                    [id]="'n-' + item.id"
                    [checked]="item.on"
                    (change)="toggleNotice(item.id)"
                  />
                </div>
                @if (!last) {
                  <div scSeparator></div>
                }
              }
            </div>
          </div>
        </ng-template>
      </div>

      <div scTabsPanel value="billing">
        <ng-template scTabsPanelContent>
          <div class="flex flex-col gap-4">
            <div class="grid gap-4 md:grid-cols-2">
              <div scCard>
                <div scCardHeader>
                  <h2 i18n="@@accountSettings.plan" scCardTitle>Plan</h2>
                  <p
                    i18n="@@accountSettings.renewsOnJune12026"
                    scCardDescription
                  >
                    Renews on June 1, 2026
                  </p>
                </div>
                <div
                  i18n="@@accountSettings.pro49Month"
                  scCardBody
                  class="flex items-baseline gap-2"
                >
                  <span class="text-3xl font-semibold">Pro</span>
                  <span class="text-muted-foreground">$49 / month</span>
                </div>
              </div>
              <div scCard>
                <div scCardHeader>
                  <h2 i18n="@@accountSettings.paymentMethod" scCardTitle>
                    Payment method
                  </h2>
                  <p i18n="@@accountSettings.chargedOnThe1st" scCardDescription>
                    Charged on the 1st
                  </p>
                </div>
                <div scCardBody class="flex items-center gap-3">
                  <img
                    i18n-alt="@@accountSettings.mastercard"
                    ngSrc="images/brands/mastercard.svg"
                    width="36"
                    height="24"
                    alt="Mastercard"
                  />
                  <span class="tabular-nums">•••• 4242</span>
                  <span
                    i18n="@@accountSettings.expires0828"
                    class="text-muted-foreground text-sm"
                    >Expires 08/28</span
                  >
                </div>
              </div>
            </div>
            <div scCard>
              <div scCardHeader>
                <h2 i18n="@@accountSettings.invoices" scCardTitle>Invoices</h2>
              </div>
              <div scCardBody>
                <div scTableContainer>
                  <table scTable>
                    <thead scTableHeader>
                      <tr scTableRow>
                        <th i18n="@@accountSettings.date" scTableHeaderCell>
                          Date
                        </th>
                        <th i18n="@@accountSettings.plan" scTableHeaderCell>
                          Plan
                        </th>
                        <th
                          i18n="@@accountSettings.amount"
                          scTableHeaderCell
                          class="text-end"
                        >
                          Amount
                        </th>
                        <th i18n="@@accountSettings.download" scTableHeaderCell>
                          <span class="sr-only">Download</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody scTableBody>
                      @for (bill of bills; track bill.date) {
                        <tr scTableRow>
                          <td scTableCell>{{ bill.date }}</td>
                          <td i18n="@@accountSettings.proMonthly" scTableCell>
                            Pro, monthly
                          </td>
                          <td scTableCell class="text-end tabular-nums">
                            $49.00
                          </td>
                          <td scTableCell class="text-end">
                            <button
                              scButton
                              variant="ghost"
                              size="icon-sm"
                              (click)="download(bill.date)"
                            >
                              <svg siDownloadIcon></svg>
                              <span
                                i18n="@@accountSettings.downloadTheInvoiceOf"
                                class="sr-only"
                                >Download the invoice of {{ bill.date }}</span
                              >
                            </button>
                          </td>
                        </tr>
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </ng-template>
      </div>
    </div>
  `,
  host: { class: 'flex flex-col gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class AccountSettingsPage {
  /** The template's words that sit in bindings, translated. */
  private readonly t = {
    pages: $localize`:@@accountSettings.pages:Pages`,
    accountSettings: $localize`:@@accountSettings.accountSettings:Account Settings`,
  };

  private readonly toaster = inject(ScToaster);
  private readonly locale = inject(LOCALE_ID);

  /** The user's first day of the week: calendars and the scheduler follow it. */
  private readonly weekStart = injectFirstDayOfWeek();
  /** The days, named in the language. */
  private readonly weekStarts = computed(() => {
    const monday = Temporal.PlainDate.from('2024-01-01');
    return SC_DAYS_OF_WEEK.map((value, i) => ({
      value: value as string,
      label: monday.add({ days: i }).toLocaleString(this.locale, {
        weekday: 'long',
      }),
    }));
  });

  /** The day picked: kept, every calendar follows it. */
  private chooseWeekStart(value: string): void {
    const day = SC_DAYS_OF_WEEK.find((d) => d === value);
    if (day) this.weekStart.set(day);
  }
  private readonly me = ME;

  private readonly account = signal({
    name: ME.name,
    email: ME.email,
    phone: ME.phone,
    location: `${ME.city}, ${ME.country}`,
    bio: 'Product designer in New York.',
  });
  private readonly accountForm = form(this.account, (path) => {
    required(path.name);
    required(path.email);
    email(path.email);
  });

  private readonly password = signal({ current: '', next: '', confirm: '' });
  private readonly passwordForm = form(this.password, (path) => {
    required(path.current);
    required(path.next);
    minLength(path.next, 8);
    validate(path.confirm, ({ value, valueOf }) =>
      value() === valueOf(path.next)
        ? undefined
        : {
            kind: 'mismatch',
            message: $localize`:@@accountSettings.thePasswordsDiffer:The passwords differ.`,
          },
    );
  });

  private readonly twoStep = signal(true);
  private readonly sessions = signal([
    {
      id: 1,
      device: 'MacBook Pro · Chrome',
      where: 'New York · now',
      phone: false,
      current: true,
    },
    {
      id: 2,
      device: 'iPhone 15 · Safari',
      where: 'New York · 2 hours ago',
      phone: true,
      current: false,
    },
    {
      id: 3,
      device: 'Windows · Edge',
      where: 'Boston · 3 days ago',
      phone: false,
      current: false,
    },
  ]);
  private readonly notices = signal([
    {
      id: 'orders',
      label: $localize`:@@accountSettings.newOrders:New orders`,
      text: $localize`:@@accountSettings.anEmailForEachOrder:An email for each order.`,
      on: true,
    },
    {
      id: 'tickets',
      label: $localize`:@@accountSettings.ticketReplies:Ticket replies`,
      text: $localize`:@@accountSettings.whenACustomerAnswers:When a customer answers.`,
      on: true,
    },
    {
      id: 'mentions',
      label: $localize`:@@accountSettings.mentions:Mentions`,
      text: $localize`:@@accountSettings.whenSomeoneMentionsYouIn:When someone mentions you in a chat.`,
      on: true,
    },
    {
      id: 'digest',
      label: $localize`:@@accountSettings.weeklyDigest:Weekly digest`,
      text: $localize`:@@accountSettings.theWeekSNumbersOn:The week’s numbers, on Monday.`,
      on: false,
    },
    {
      id: 'product',
      label: $localize`:@@accountSettings.productNews:Product news`,
      text: $localize`:@@accountSettings.newFeaturesNowAndThen:New features, now and then.`,
      on: false,
    },
  ]);
  private readonly bills = [
    { date: 'May 1, 2026' },
    { date: 'Apr 1, 2026' },
    { date: 'Mar 1, 2026' },
  ];

  private saveAccount(event: Event): void {
    event.preventDefault();
    if (this.accountForm().invalid()) return;
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@accountSettings.profileSaved:Profile saved`,
    });
  }

  private savePassword(event: Event): void {
    event.preventDefault();
    if (this.passwordForm().invalid()) {
      this.toaster.show({
        variant: 'error',
        title: $localize`:@@accountSettings.checkThePasswordFields:Check the password fields`,
      });
      return;
    }
    this.password.set({ current: '', next: '', confirm: '' });
    this.passwordForm().reset();
    this.toaster.show({
      variant: 'success',
      title: $localize`:@@accountSettings.passwordUpdated:Password updated`,
    });
  }

  private toggleTwoStep(): void {
    this.twoStep.update((on) => !on);
    this.toaster.show({
      title: this.twoStep()
        ? $localize`:@@accountSettings.twoStepVerificationOn:Two-step verification on`
        : $localize`:@@accountSettings.twoStepVerificationOff:Two-step verification off`,
    });
  }

  private signOut(id: number): void {
    this.sessions.update((all) => all.filter((s) => s.id !== id));
    this.toaster.show({
      title: $localize`:@@accountSettings.signedOutOfThatDevice:Signed out of that device`,
    });
  }

  private toggleNotice(id: string): void {
    this.notices.update((all) =>
      all.map((n) => (n.id === id ? { ...n, on: !n.on } : n)),
    );
  }

  private download(date: string): void {
    this.toaster.show({
      title: $localize`:@@accountSettings.invoiceOfDownloaded:Invoice of ${date} downloaded`,
    });
  }
}
