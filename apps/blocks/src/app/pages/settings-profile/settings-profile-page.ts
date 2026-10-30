import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScButton,
  ScFieldDescription,
  ScInput,
  ScLabel,
  ScLabelText,
  ScSeparator,
  ScSwitch,
  ScSwitchField,
  ScTextarea,
} from '@semantic-components/ui';
import {
  SiAtSignIcon,
  SiBellIcon,
  SiCircleCheckIcon,
  SiCircleUserRoundIcon,
  SiCreditCardIcon,
  SiSettingsIcon,
  SiShieldIcon,
  SiUsersIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-settings-profile',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScButton,
    ScFieldDescription,
    ScLabelText,
    ScInput,
    ScLabel,
    ScSeparator,
    ScSwitch,
    ScSwitchField,
    ScTextarea,
    SiCircleUserRoundIcon,
    SiCreditCardIcon,
    SiSettingsIcon,
    SiShieldIcon,
    SiBellIcon,
    SiUsersIcon,
    SiCircleCheckIcon,
    SiAtSignIcon,
  ],
  template: `
    <div class="bg-background flex min-h-screen">
      <!-- Sidebar -->
      <aside class="w-64 shrink-0 border-e p-6">
        <div class="mb-6">
          <h2 class="text-xl font-semibold" i18n="@@settingsProfile.heading">
            Settings
          </h2>
          <p
            class="text-muted-foreground text-sm"
            i18n="@@settingsProfile.description"
          >
            Manage your preferences
          </p>
        </div>

        <nav aria-label="Settings" i18n-aria-label="@@settingsProfile.navLabel">
          <ul class="space-y-1">
            <li>
              <button
                class="bg-accent text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium"
              >
                <svg siCircleUserRoundIcon class="size-4"></svg>
                <ng-container i18n="@@settingsProfile.tab.profile"
                  >Profile</ng-container
                >
                <span class="bg-primary ml-auto size-1.5 rounded-full"></span>
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siSettingsIcon class="size-4"></svg>
                <ng-container i18n="@@settingsProfile.tab.account"
                  >Account</ng-container
                >
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siBellIcon class="size-4"></svg>
                <ng-container i18n="@@settingsProfile.tab.notifications"
                  >Notifications</ng-container
                >
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siCreditCardIcon class="size-4"></svg>
                <ng-container i18n="@@settingsProfile.tab.billing"
                  >Billing</ng-container
                >
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siUsersIcon class="size-4"></svg>
                <ng-container i18n="@@settingsProfile.tab.team"
                  >Team</ng-container
                >
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siShieldIcon class="size-4"></svg>
                <ng-container i18n="@@settingsProfile.tab.security"
                  >Security</ng-container
                >
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-8">
        <div class="mx-auto max-w-2xl">
          <div class="mb-8">
            <h1
              class="text-2xl font-semibold tracking-tight"
              i18n="@@settingsProfile.title"
            >
              Profile Settings
            </h1>
            <p
              class="text-muted-foreground text-sm"
              i18n="@@settingsProfile.subtitle"
            >
              Update your personal information and public profile.
            </p>
          </div>

          <!-- Profile Photo -->
          <div class="rounded-lg border p-6">
            <div class="space-y-6">
              <div>
                <p class="text-sm font-medium" i18n="@@settingsProfile.photo">
                  Profile Photo
                </p>
                <div class="mt-3 flex items-center gap-4">
                  <span scAvatar class="size-14 text-lg">
                    <span scAvatarFallback>AC</span>
                  </span>
                  <div>
                    <button
                      scButton
                      variant="outline"
                      size="sm"
                      i18n="@@settingsProfile.photo.change"
                    >
                      Change
                    </button>
                    <p
                      class="text-muted-foreground mt-1 text-xs"
                      i18n="@@settingsProfile.photo.hint"
                    >
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <div scSeparator></div>

              <!-- Full Name -->
              <div class="space-y-2">
                <label scLabel for="full-name" i18n="@@settingsProfile.fullName"
                  >Full Name</label
                >
                <input
                  scInput
                  id="full-name"
                  type="text"
                  value="Alexandra Chen"
                />
              </div>

              <!-- Email Address -->
              <div class="space-y-2">
                <label
                  scLabel
                  for="email-address"
                  i18n="@@settingsProfile.email"
                  >Email Address</label
                >
                <div class="relative">
                  <input
                    scInput
                    id="email-address"
                    type="email"
                    value="alexandra.chen&#64;company.com"
                    class="pr-24"
                  />
                  <span
                    class="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-1 text-xs font-medium text-emerald-600"
                  >
                    <svg siCircleCheckIcon class="size-3.5"></svg>
                    <ng-container i18n="@@settingsProfile.verified"
                      >Verified</ng-container
                    >
                  </span>
                </div>
              </div>

              <!-- Username -->
              <div class="space-y-2">
                <label scLabel for="username" i18n="@@settingsProfile.username"
                  >Username</label
                >
                <div class="relative">
                  <svg
                    siAtSignIcon
                    class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                  ></svg>
                  <input
                    scInput
                    id="username"
                    type="text"
                    value="alexchen"
                    class="pl-9"
                  />
                </div>
              </div>

              <!-- Bio -->
              <div class="space-y-2">
                <label scLabel for="bio" i18n="@@common.bio">Bio</label>
                <textarea
                  scTextarea
                  id="bio"
                  rows="4"
                  (input)="onBioInput($event)"
                >
Product designer with 8+ years of experience in SaaS applications. Passionate about creating intuitive user experiences.</textarea>
                <p
                  class="text-muted-foreground text-xs"
                  i18n="@@settingsProfile.bioLength"
                >
                  {{ bioLength() }}/300 characters
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-6 flex items-center justify-between border-t pt-4">
              <p
                class="text-muted-foreground text-xs"
                i18n="@@settingsProfile.lastUpdated"
              >
                Last updated 2 days ago
              </p>
              <div class="flex gap-3">
                <button scButton variant="outline" i18n="@@common.cancel">
                  Cancel
                </button>
                <button scButton i18n="@@common.saveChanges2">
                  Save changes
                </button>
              </div>
            </div>
          </div>

          <!-- Notification Preferences -->
          <div class="mt-8">
            <h2
              class="text-lg font-semibold"
              i18n="@@common.notificationPreferences"
            >
              Notification Preferences
            </h2>
            <p
              class="text-muted-foreground mb-4 text-sm"
              i18n="@@settingsProfile.notifications.description"
            >
              Choose how and when you want to be notified.
            </p>

            <div class="space-y-3">
              <label
                scSwitchField
                class="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p scLabelText i18n="@@common.emailNotifications">
                    Email Notifications
                  </p>
                  <p
                    scFieldDescription
                    i18n="@@settingsProfile.emailNotifications.description"
                  >
                    Receive email updates about your account activity and
                    important changes.
                  </p>
                </div>
                <input type="checkbox" scSwitch [checked]="true" />
              </label>

              <label
                scSwitchField
                class="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p scLabelText i18n="@@common.pushNotifications">
                    Push Notifications
                  </p>
                  <p
                    scFieldDescription
                    i18n="@@settingsProfile.pushNotifications.description"
                  >
                    Get real-time push notifications on your desktop or mobile
                    device.
                  </p>
                </div>
                <input type="checkbox" scSwitch [checked]="true" />
              </label>

              <label
                scSwitchField
                class="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p scLabelText i18n="@@settingsProfile.digest">
                    Weekly Digest
                  </p>
                  <p
                    scFieldDescription
                    i18n="@@settingsProfile.digest.description"
                  >
                    Receive a weekly summary of your team's activity and key
                    metrics.
                  </p>
                </div>
                <input type="checkbox" scSwitch />
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export default class SettingsProfilePage {
  readonly bioLength = signal(120);

  onBioInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.bioLength.set(target.value.length);
  }
}
