import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScHeaderLayout, ScSidebarLayout, ScStackLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-settings',
  imports: [ScSidebarLayout, ScStackLayout, ScHeaderLayout],
  template: `
    <div class="min-h-screen" sc-header-layout>
      <!-- Header -->
      <div class="bg-card border-b" slot="header">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <a class="text-primary hover:underline" href="/dashboard">← Back to Dashboard</a>
              <div class="w-px h-6 bg-border"></div>
              <h1 class="text-xl font-semibold">Settings</h1>
            </div>
            <div class="flex gap-3">
              <button class="border border-border px-4 py-2 rounded">Reset to Defaults</button>
              <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Settings Layout -->
      <div sc-sidebar-layout direction="left" sidebarWidth="sm" gap="0">
        <!-- Settings Navigation -->
        <div class="bg-muted/30 border-r" slot="sidebar">
          <div class="p-6">
            <nav>
              <div sc-stack-layout gap="1">
                <a
                  class="flex items-center gap-3 px-3 py-2 rounded bg-primary text-primary-foreground"
                  href="#general"
                >
                  <span class="w-4 h-4 bg-current rounded-sm opacity-75"></span>
                  General
                </a>
                <a
                  class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted"
                  href="#appearance"
                >
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Appearance
                </a>
                <a class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted" href="#users">
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Users & Roles
                </a>
                <a class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted" href="#content">
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Content
                </a>
                <a class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted" href="#seo">
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  SEO
                </a>
                <a
                  class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted"
                  href="#integrations"
                >
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Integrations
                </a>
                <a
                  class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted"
                  href="#security"
                >
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Security
                </a>
                <a
                  class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted"
                  href="#advanced"
                >
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Advanced
                </a>
              </div>
            </nav>
          </div>
        </div>

        <!-- Settings Content -->
        <div class="bg-background">
          <div class="p-8">
            <div sc-stack-layout gap="8">
              <!-- General Settings -->
              <section id="general">
                <div sc-stack-layout gap="6">
                  <div>
                    <h2 class="text-2xl font-bold">General Settings</h2>
                    <p class="text-muted-foreground">
                      Manage your site's basic information and configuration.
                    </p>
                  </div>

                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <!-- Site Information -->
                    <div class="bg-card border rounded-lg p-6">
                      <div sc-stack-layout gap="4">
                        <h3 class="text-lg font-semibold">Site Information</h3>
                        <div sc-stack-layout gap="4">
                          <div>
                            <label class="block text-sm font-medium mb-2">Site Title</label>
                            <input
                              class="w-full p-3 border rounded-lg"
                              type="text"
                              value="My CMS Site"
                            />
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-2">Site Description</label>
                            <textarea
                              class="w-full p-3 border rounded-lg"
                              rows="3"
                              placeholder="A brief description of your site"
                            >
A modern content management system for developers and content creators.</textarea
                            >
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-2">Site URL</label>
                            <input
                              class="w-full p-3 border rounded-lg"
                              type="url"
                              value="https://mycms.example.com"
                            />
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-2">Admin Email</label>
                            <input
                              class="w-full p-3 border rounded-lg"
                              type="email"
                              value="admin@example.com"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Regional Settings -->
                    <div class="bg-card border rounded-lg p-6">
                      <div sc-stack-layout gap="4">
                        <h3 class="text-lg font-semibold">Regional Settings</h3>
                        <div sc-stack-layout gap="4">
                          <div>
                            <label class="block text-sm font-medium mb-2">Timezone</label>
                            <select class="w-full p-3 border rounded-lg">
                              <option>UTC</option>
                              <option>America/New_York</option>
                              <option>America/Los_Angeles</option>
                              <option>Europe/London</option>
                              <option>Europe/Paris</option>
                              <option>Asia/Tokyo</option>
                            </select>
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-2">Date Format</label>
                            <select class="w-full p-3 border rounded-lg">
                              <option>MM/DD/YYYY</option>
                              <option>DD/MM/YYYY</option>
                              <option>YYYY-MM-DD</option>
                              <option>Month DD, YYYY</option>
                            </select>
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-2">Time Format</label>
                            <select class="w-full p-3 border rounded-lg">
                              <option>12-hour (AM/PM)</option>
                              <option>24-hour</option>
                            </select>
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-2">Language</label>
                            <select class="w-full p-3 border rounded-lg">
                              <option>English (US)</option>
                              <option>English (UK)</option>
                              <option>Spanish</option>
                              <option>French</option>
                              <option>German</option>
                              <option>Japanese</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Site Features -->
                  <div class="bg-card border rounded-lg p-6">
                    <div sc-stack-layout gap="4">
                      <h3 class="text-lg font-semibold">Site Features</h3>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label class="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span class="font-medium">User Registration</span>
                            <p class="text-sm text-muted-foreground">Allow new users to register</p>
                          </div>
                          <input class="rounded" type="checkbox" checked />
                        </label>
                        <label class="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span class="font-medium">Comments</span>
                            <p class="text-sm text-muted-foreground">Enable comments on articles</p>
                          </div>
                          <input class="rounded" type="checkbox" checked />
                        </label>
                        <label class="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span class="font-medium">Search</span>
                            <p class="text-sm text-muted-foreground">Enable site-wide search</p>
                          </div>
                          <input class="rounded" type="checkbox" checked />
                        </label>
                        <label class="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span class="font-medium">RSS Feed</span>
                            <p class="text-sm text-muted-foreground">Generate RSS feed</p>
                          </div>
                          <input class="rounded" type="checkbox" checked />
                        </label>
                        <label class="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span class="font-medium">Social Sharing</span>
                            <p class="text-sm text-muted-foreground">Add social share buttons</p>
                          </div>
                          <input class="rounded" type="checkbox" />
                        </label>
                        <label class="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <span class="font-medium">Newsletter</span>
                            <p class="text-sm text-muted-foreground">Enable newsletter signup</p>
                          </div>
                          <input class="rounded" type="checkbox" />
                        </label>
                      </div>
                    </div>
                  </div>

                  <!-- Performance Settings -->
                  <div class="bg-card border rounded-lg p-6">
                    <div sc-stack-layout gap="4">
                      <h3 class="text-lg font-semibold">Performance & Cache</h3>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div sc-stack-layout gap="3">
                          <label class="flex items-center justify-between">
                            <span class="font-medium">Enable Caching</span>
                            <input class="rounded" type="checkbox" checked />
                          </label>
                          <div>
                            <label class="block text-sm font-medium mb-2">
                              Cache Duration (minutes)
                            </label>
                            <input class="w-full p-2 border rounded" type="number" value="60" />
                          </div>
                        </div>
                        <div sc-stack-layout gap="3">
                          <label class="flex items-center justify-between">
                            <span class="font-medium">Image Optimization</span>
                            <input class="rounded" type="checkbox" checked />
                          </label>
                          <div>
                            <label class="block text-sm font-medium mb-2">Image Quality (%)</label>
                            <input class="w-full" type="range" min="1" max="100" value="85" />
                            <div class="text-sm text-muted-foreground">85%</div>
                          </div>
                        </div>
                      </div>
                      <div class="flex gap-3">
                        <button class="bg-blue-600 text-white px-4 py-2 rounded">
                          Clear Cache
                        </button>
                        <button class="border border-border px-4 py-2 rounded">
                          Optimize Images
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Backup Settings -->
                  <div class="bg-card border rounded-lg p-6">
                    <div sc-stack-layout gap="4">
                      <h3 class="text-lg font-semibold">Backup & Maintenance</h3>
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div sc-stack-layout gap="3">
                          <label class="flex items-center justify-between">
                            <span class="font-medium">Automatic Backups</span>
                            <input class="rounded" type="checkbox" checked />
                          </label>
                          <div>
                            <label class="block text-sm font-medium mb-2">Backup Frequency</label>
                            <select class="w-full p-2 border rounded">
                              <option>Daily</option>
                              <option>Weekly</option>
                              <option>Monthly</option>
                            </select>
                          </div>
                          <div>
                            <label class="block text-sm font-medium mb-2">Retain Backups</label>
                            <select class="w-full p-2 border rounded">
                              <option>7 days</option>
                              <option>30 days</option>
                              <option>90 days</option>
                              <option>1 year</option>
                            </select>
                          </div>
                        </div>
                        <div sc-stack-layout gap="3">
                          <div class="bg-muted/50 p-4 rounded">
                            <div sc-stack-layout gap="2">
                              <h4 class="font-medium">Last Backup</h4>
                              <p class="text-sm text-muted-foreground">March 15, 2024 at 3:00 AM</p>
                              <p class="text-sm text-green-600">✓ Backup successful (2.3 MB)</p>
                            </div>
                          </div>
                          <div class="flex gap-2">
                            <button class="bg-green-600 text-white px-3 py-2 rounded text-sm">
                              Create Backup
                            </button>
                            <button class="border border-border px-3 py-2 rounded text-sm">
                              Download Latest
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SettingsPage {}
