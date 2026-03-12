import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScFieldDescription,
  ScInlineLabel,
  ScInput,
  ScLabel,
  ScSeparator,
  ScSwitch,
  ScSwitchField,
  ScTab,
  ScTabList,
  ScTabPanel,
  ScTabs,
  ScTextarea,
} from '@semantic-components/ui';

@Component({
  selector: 'app-settings',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScFieldDescription,
    ScInlineLabel,
    ScInput,
    ScLabel,
    ScSeparator,
    ScSwitch,
    ScSwitchField,
    ScTab,
    ScTabList,
    ScTabPanel,
    ScTabs,
    ScTextarea,
  ],
  template: `
    <div class="bg-background min-h-screen">
      <div class="mx-auto max-w-4xl px-6 py-12">
        <div class="space-y-1">
          <h1 class="text-3xl font-bold tracking-tight">Settings</h1>
          <p class="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <div scSeparator class="my-6"></div>

        <div scTabs class="w-full">
          <div scTabList [selectedTab]="'profile'">
            <button scTab value="profile">Profile</button>
            <button scTab value="account">Account</button>
            <button scTab value="notifications">Notifications</button>
            <button scTab value="appearance">Appearance</button>
          </div>

          <div scTabPanel value="profile">
            <div class="space-y-6 pt-6">
              <div scCard>
                <div scCardHeader>
                  <div class="flex items-center gap-4">
                    <div
                      class="bg-muted flex size-16 items-center justify-center rounded-full text-lg font-semibold"
                    >
                      JD
                    </div>
                    <div>
                      <h3 scCardTitle>John Doe</h3>
                      <p scCardDescription>john.doe&#64;example.com</p>
                    </div>
                  </div>
                </div>
              </div>

              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Profile Information</h3>
                  <p scCardDescription>Update your profile details below.</p>
                </div>
                <div scCardBody>
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <label scLabel for="display-name">Display Name</label>
                      <input
                        scInput
                        id="display-name"
                        type="text"
                        placeholder="John Doe"
                      />
                    </div>
                    <div class="space-y-2">
                      <label scLabel for="email">Email</label>
                      <input
                        scInput
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div class="space-y-2">
                      <label scLabel for="bio">Bio</label>
                      <textarea
                        scTextarea
                        id="bio"
                        placeholder="Tell us a little about yourself"
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div scCardFooter class="flex justify-end border-t px-4 py-3">
                  <button scButton>Save Changes</button>
                </div>
              </div>
            </div>
          </div>

          <div scTabPanel value="account">
            <div class="space-y-6 pt-6">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Change Password</h3>
                  <p scCardDescription>
                    Update your password to keep your account secure.
                  </p>
                </div>
                <div scCardBody>
                  <div class="space-y-4">
                    <div class="space-y-2">
                      <label scLabel for="current-password">
                        Current Password
                      </label>
                      <input
                        scInput
                        id="current-password"
                        type="password"
                        placeholder="Enter current password"
                      />
                    </div>
                    <div class="space-y-2">
                      <label scLabel for="new-password">New Password</label>
                      <input
                        scInput
                        id="new-password"
                        type="password"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div class="space-y-2">
                      <label scLabel for="confirm-password">
                        Confirm Password
                      </label>
                      <input
                        scInput
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>
                </div>
                <div scCardFooter class="flex justify-end border-t px-4 py-3">
                  <button scButton>Update Password</button>
                </div>
              </div>

              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Danger Zone</h3>
                  <p scCardDescription>Irreversible and destructive actions.</p>
                </div>
                <div scCardBody>
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm font-medium">Delete Account</p>
                      <p class="text-muted-foreground text-sm">
                        Permanently delete your account and all of your data.
                      </p>
                    </div>
                    <button scButton variant="destructive">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div scTabPanel value="notifications">
            <div class="space-y-6 pt-6">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Notification Preferences</h3>
                  <p scCardDescription>Choose how you want to be notified.</p>
                </div>
                <div scCardBody>
                  <div class="space-y-4">
                    <label
                      scSwitchField
                      class="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p scInlineLabel>Email Notifications</p>
                        <p scFieldDescription>
                          Receive notifications via email.
                        </p>
                      </div>
                      <input type="checkbox" scSwitch [checked]="true" />
                    </label>

                    <label
                      scSwitchField
                      class="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p scInlineLabel>Push Notifications</p>
                        <p scFieldDescription>
                          Receive push notifications on your device.
                        </p>
                      </div>
                      <input type="checkbox" scSwitch [checked]="true" />
                    </label>

                    <label
                      scSwitchField
                      class="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p scInlineLabel>Marketing Emails</p>
                        <p scFieldDescription>
                          Receive emails about new features and updates.
                        </p>
                      </div>
                      <input type="checkbox" scSwitch />
                    </label>

                    <label
                      scSwitchField
                      class="flex items-center justify-between rounded-lg border p-4"
                    >
                      <div>
                        <p scInlineLabel>Security Alerts</p>
                        <p scFieldDescription>
                          Get notified about security events on your account.
                        </p>
                      </div>
                      <input type="checkbox" scSwitch [checked]="true" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div scTabPanel value="appearance">
            <div class="space-y-6 pt-6">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Theme</h3>
                  <p scCardDescription>
                    Select your preferred theme for the application.
                  </p>
                </div>
                <div scCardBody>
                  <div class="grid grid-cols-3 gap-4">
                    <button
                      scButton
                      variant="outline"
                      class="h-auto flex-col gap-2 p-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="size-6"
                      >
                        <circle cx="12" cy="12" r="4" />
                        <path d="M12 2v2" />
                        <path d="M12 20v2" />
                        <path d="m4.93 4.93 1.41 1.41" />
                        <path d="m17.66 17.66 1.41 1.41" />
                        <path d="M2 12h2" />
                        <path d="M20 12h2" />
                        <path d="m6.34 17.66-1.41 1.41" />
                        <path d="m19.07 4.93-1.41 1.41" />
                      </svg>
                      <span class="text-sm font-medium">Light</span>
                    </button>
                    <button
                      scButton
                      variant="outline"
                      class="h-auto flex-col gap-2 p-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="size-6"
                      >
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                      <span class="text-sm font-medium">Dark</span>
                    </button>
                    <button
                      scButton
                      variant="outline"
                      class="h-auto flex-col gap-2 p-4"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="size-6"
                      >
                        <rect width="20" height="14" x="2" y="3" rx="2" />
                        <line x1="8" x2="16" y1="21" y2="21" />
                        <line x1="12" x2="12" y1="17" y2="21" />
                      </svg>
                      <span class="text-sm font-medium">System</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsPage {}
