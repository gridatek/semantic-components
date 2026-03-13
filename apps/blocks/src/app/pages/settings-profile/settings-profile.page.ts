import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScButton,
  ScFieldDescription,
  ScInlineLabel,
  ScInput,
  ScLabel,
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
    ScInlineLabel,
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
      <aside class="w-64 shrink-0 border-r p-6">
        <div class="mb-6">
          <h2 class="text-xl font-semibold">Settings</h2>
          <p class="text-muted-foreground text-sm">Manage your preferences</p>
        </div>

        <nav aria-label="Settings">
          <ul class="space-y-1">
            <li>
              <button
                class="bg-accent text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium"
              >
                <svg siCircleUserRoundIcon class="size-4"></svg>
                Profile
                <span class="bg-primary ml-auto size-1.5 rounded-full"></span>
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siSettingsIcon class="size-4"></svg>
                Account
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siBellIcon class="size-4"></svg>
                Notifications
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siCreditCardIcon class="size-4"></svg>
                Billing
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siUsersIcon class="size-4"></svg>
                Team
              </button>
            </li>
            <li>
              <button
                class="text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
              >
                <svg siShieldIcon class="size-4"></svg>
                Security
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-8">
        <div class="mx-auto max-w-2xl">
          <div class="mb-8">
            <h1 class="text-2xl font-semibold tracking-tight">
              Profile Settings
            </h1>
            <p class="text-muted-foreground text-sm">
              Update your personal information and public profile.
            </p>
          </div>

          <!-- Profile Photo -->
          <div class="rounded-lg border p-6">
            <div class="space-y-6">
              <div>
                <p class="text-sm font-medium">Profile Photo</p>
                <div class="mt-3 flex items-center gap-4">
                  <span scAvatar class="size-14 text-lg">
                    <span scAvatarFallback>AC</span>
                  </span>
                  <div>
                    <button scButton variant="outline" size="sm">Change</button>
                    <p class="text-muted-foreground mt-1 text-xs">
                      JPG, PNG or GIF. Max 2MB.
                    </p>
                  </div>
                </div>
              </div>

              <div scSeparator></div>

              <!-- Full Name -->
              <div class="space-y-2">
                <label scLabel for="full-name">Full Name</label>
                <input
                  scInput
                  id="full-name"
                  type="text"
                  value="Alexandra Chen"
                />
              </div>

              <!-- Email Address -->
              <div class="space-y-2">
                <label scLabel for="email-address">Email Address</label>
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
                    Verified
                  </span>
                </div>
              </div>

              <!-- Username -->
              <div class="space-y-2">
                <label scLabel for="username">Username</label>
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
                <label scLabel for="bio">Bio</label>
                <textarea
                  scTextarea
                  id="bio"
                  rows="4"
                  (input)="onBioInput($event)"
                >
Product designer with 8+ years of experience in SaaS applications. Passionate about creating intuitive user experiences.</textarea
                >
                <p class="text-muted-foreground text-xs">
                  {{ bioLength() }}/300 characters
                </p>
              </div>
            </div>

            <!-- Footer -->
            <div class="mt-6 flex items-center justify-between border-t pt-4">
              <p class="text-muted-foreground text-xs">
                Last updated 2 days ago
              </p>
              <div class="flex gap-3">
                <button scButton variant="outline">Cancel</button>
                <button scButton>Save changes</button>
              </div>
            </div>
          </div>

          <!-- Notification Preferences -->
          <div class="mt-8">
            <h2 class="text-lg font-semibold">Notification Preferences</h2>
            <p class="text-muted-foreground mb-4 text-sm">
              Choose how and when you want to be notified.
            </p>

            <div class="space-y-3">
              <label
                scSwitchField
                class="flex items-center justify-between rounded-lg border p-4"
              >
                <div>
                  <p scInlineLabel>Email Notifications</p>
                  <p scFieldDescription>
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
                  <p scInlineLabel>Push Notifications</p>
                  <p scFieldDescription>
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
                  <p scInlineLabel>Weekly Digest</p>
                  <p scFieldDescription>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsProfilePage {
  readonly bioLength = signal(120);

  onBioInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    this.bioLength.set(target.value.length);
  }
}
