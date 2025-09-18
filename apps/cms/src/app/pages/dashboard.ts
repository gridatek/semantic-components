import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScDashboardLayout, ScSidebarLayout, ScStackLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-dashboard',
  imports: [ScDashboardLayout, ScStackLayout, ScSidebarLayout],
  template: `
    <div sc-sidebar-layout direction="left" sidebarWidth="md" gap="0" class="min-h-screen">
      <!-- Sidebar Navigation -->
      <div slot="sidebar" class="bg-card border-r">
        <div sc-stack-layout gap="6" padding="6">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-primary rounded"></div>
            <span class="font-bold text-lg">CMS Admin</span>
          </div>

          <!-- Navigation -->
          <nav>
            <div sc-stack-layout gap="1">
              <div class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Overview
              </div>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded bg-primary text-primary-foreground">
                <span class="w-4 h-4 bg-current rounded-sm opacity-75"></span>
                Dashboard
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Analytics
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Reports
              </a>
            </div>
          </nav>

          <nav>
            <div sc-stack-layout gap="1">
              <div class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Content
              </div>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Articles
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Pages
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Media
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Categories
              </a>
            </div>
          </nav>

          <nav>
            <div sc-stack-layout gap="1">
              <div class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Users
              </div>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                All Users
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Roles
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Permissions
              </a>
            </div>
          </nav>

          <nav>
            <div sc-stack-layout gap="1">
              <div class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Settings
              </div>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                General
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Security
              </a>
              <a href="#" class="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted">
                <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                Integrations
              </a>
            </div>
          </nav>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-background">
        <div sc-stack-layout gap="8" padding="8">
          <!-- Header -->
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold">Dashboard</h1>
              <p class="text-muted-foreground">Welcome back! Here's what's happening with your content.</p>
            </div>
            <div class="flex gap-3">
              <button class="border border-border px-4 py-2 rounded">Export</button>
              <button class="bg-primary text-primary-foreground px-4 py-2 rounded">New Article</button>
            </div>
          </div>

          <!-- Stats Grid -->
          <div sc-dashboard-layout layout="auto-fit" gap="6">
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-muted-foreground">Total Articles</span>
                  <span class="text-green-600">+12%</span>
                </div>
                <div class="text-3xl font-bold">1,234</div>
                <p class="text-sm text-muted-foreground">Published articles across all categories</p>
              </div>
            </div>

            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-muted-foreground">Page Views</span>
                  <span class="text-green-600">+8%</span>
                </div>
                <div class="text-3xl font-bold">45.2K</div>
                <p class="text-sm text-muted-foreground">Monthly page views this month</p>
              </div>
            </div>

            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-muted-foreground">Active Users</span>
                  <span class="text-blue-600">+23%</span>
                </div>
                <div class="text-3xl font-bold">2,345</div>
                <p class="text-sm text-muted-foreground">Registered users this month</p>
              </div>
            </div>

            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <div class="flex items-center justify-between">
                  <span class="text-sm font-medium text-muted-foreground">Comments</span>
                  <span class="text-yellow-600">+5%</span>
                </div>
                <div class="text-3xl font-bold">892</div>
                <p class="text-sm text-muted-foreground">Comments awaiting moderation</p>
              </div>
            </div>
          </div>

          <!-- Content Grid -->
          <div sc-dashboard-layout layout="two-column" gap="6">
            <!-- Recent Articles -->
            <div class="bg-card border rounded-lg">
              <div class="border-b p-6">
                <div class="flex items-center justify-between">
                  <h2 class="text-lg font-semibold">Recent Articles</h2>
                  <a href="#" class="text-sm text-primary hover:underline">View all</a>
                </div>
              </div>
              <div>
                <div sc-stack-layout gap="0">
                  <div class="border-b p-4 hover:bg-muted/50">
                    <div sc-stack-layout gap="2">
                      <div class="flex items-start justify-between">
                        <h3 class="font-medium">Getting Started with Angular Components</h3>
                        <span class="text-xs text-muted-foreground">2h ago</span>
                      </div>
                      <p class="text-sm text-muted-foreground">Learn the basics of creating reusable Angular components...</p>
                      <div class="flex gap-2">
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Published</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Development</span>
                      </div>
                    </div>
                  </div>

                  <div class="border-b p-4 hover:bg-muted/50">
                    <div sc-stack-layout gap="2">
                      <div class="flex items-start justify-between">
                        <h3 class="font-medium">Design System Best Practices</h3>
                        <span class="text-xs text-muted-foreground">5h ago</span>
                      </div>
                      <p class="text-sm text-muted-foreground">Building consistent and scalable design systems...</p>
                      <div class="flex gap-2">
                        <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Draft</span>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">Design</span>
                      </div>
                    </div>
                  </div>

                  <div class="border-b p-4 hover:bg-muted/50">
                    <div sc-stack-layout gap="2">
                      <div class="flex items-start justify-between">
                        <h3 class="font-medium">Advanced TypeScript Patterns</h3>
                        <span class="text-xs text-muted-foreground">1d ago</span>
                      </div>
                      <p class="text-sm text-muted-foreground">Exploring advanced TypeScript features for better code...</p>
                      <div class="flex gap-2">
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Published</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Development</span>
                      </div>
                    </div>
                  </div>

                  <div class="p-4 hover:bg-muted/50">
                    <div sc-stack-layout gap="2">
                      <div class="flex items-start justify-between">
                        <h3 class="font-medium">Testing Strategies for Frontend Apps</h3>
                        <span class="text-xs text-muted-foreground">2d ago</span>
                      </div>
                      <p class="text-sm text-muted-foreground">Comprehensive guide to testing modern web applications...</p>
                      <div class="flex gap-2">
                        <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Review</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Development</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Activity & Stats -->
            <div sc-stack-layout gap="6">
              <!-- Quick Actions -->
              <div class="bg-card border rounded-lg p-6">
                <div sc-stack-layout gap="4">
                  <h2 class="text-lg font-semibold">Quick Actions</h2>
                  <div sc-stack-layout gap="2">
                    <button class="flex items-center gap-3 w-full p-3 text-left rounded border hover:bg-muted">
                      <span class="w-4 h-4 bg-primary rounded"></span>
                      <span>Create New Article</span>
                    </button>
                    <button class="flex items-center gap-3 w-full p-3 text-left rounded border hover:bg-muted">
                      <span class="w-4 h-4 bg-blue-500 rounded"></span>
                      <span>Upload Media</span>
                    </button>
                    <button class="flex items-center gap-3 w-full p-3 text-left rounded border hover:bg-muted">
                      <span class="w-4 h-4 bg-green-500 rounded"></span>
                      <span>Manage Categories</span>
                    </button>
                    <button class="flex items-center gap-3 w-full p-3 text-left rounded border hover:bg-muted">
                      <span class="w-4 h-4 bg-purple-500 rounded"></span>
                      <span>View Analytics</span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Recent Activity -->
              <div class="bg-card border rounded-lg p-6">
                <div sc-stack-layout gap="4">
                  <h2 class="text-lg font-semibold">Recent Activity</h2>
                  <div sc-stack-layout gap="3">
                    <div class="flex gap-3">
                      <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div sc-stack-layout gap="1">
                        <p class="text-sm">Article published: "Angular Best Practices"</p>
                        <span class="text-xs text-muted-foreground">2 hours ago</span>
                      </div>
                    </div>
                    <div class="flex gap-3">
                      <div class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div sc-stack-layout gap="1">
                        <p class="text-sm">New user registered: john.doe@example.com</p>
                        <span class="text-xs text-muted-foreground">4 hours ago</span>
                      </div>
                    </div>
                    <div class="flex gap-3">
                      <div class="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div sc-stack-layout gap="1">
                        <p class="text-sm">Comment awaiting moderation</p>
                        <span class="text-xs text-muted-foreground">6 hours ago</span>
                      </div>
                    </div>
                    <div class="flex gap-3">
                      <div class="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div sc-stack-layout gap="1">
                        <p class="text-sm">Media uploaded: design-patterns.jpg</p>
                        <span class="text-xs text-muted-foreground">8 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
export default class DashboardPage {}
