import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScSidebarLayout, ScStackLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-sidebar-layout-demo',
  imports: [ScSidebarLayout, ScStackLayout],
  template: `
    <div class="space-y-8">
      <!-- Page Header -->
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">ScSidebarLayout Demo</h1>
        <p class="text-lg text-muted-foreground">
          Two-panel layouts with configurable sidebar positions and widths.
        </p>
      </div>

      <!-- Basic Left Sidebar -->
      <section class="h-96">
        <h2 class="text-2xl font-semibold mb-4 px-8">Left Sidebar Layout</h2>
        <div class="h-full" sc-sidebar-layout direction="left" sidebarWidth="md" gap="4">
          <div class="bg-card border rounded-lg p-6" slot="sidebar">
            <div sc-stack-layout gap="4">
              <h3 class="font-semibold">Navigation</h3>
              <div sc-stack-layout gap="2">
                <a class="block px-3 py-2 rounded bg-primary text-primary-foreground" href="#">
                  Dashboard
                </a>
                <a class="block px-3 py-2 rounded hover:bg-muted" href="#">Analytics</a>
                <a class="block px-3 py-2 rounded hover:bg-muted" href="#">Settings</a>
                <a class="block px-3 py-2 rounded hover:bg-muted" href="#">Profile</a>
              </div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="4">
              <h2 class="text-xl font-semibold">Main Content Area</h2>
              <p class="text-muted-foreground">
                This is the main content area. The sidebar contains navigation links and the main
                area contains the primary content.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="bg-muted p-4 rounded">
                  <h3 class="font-medium mb-2">Widget 1</h3>
                  <p class="text-sm text-muted-foreground">Some content here</p>
                </div>
                <div class="bg-muted p-4 rounded">
                  <h3 class="font-medium mb-2">Widget 2</h3>
                  <p class="text-sm text-muted-foreground">More content here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Sidebar -->
      <section class="h-96">
        <h2 class="text-2xl font-semibold mb-4 px-8">Right Sidebar Layout</h2>
        <div class="h-full" sc-sidebar-layout direction="right" sidebarWidth="sm" gap="4">
          <div class="bg-card border rounded-lg p-4" slot="sidebar">
            <div sc-stack-layout gap="4">
              <h3 class="font-semibold">Recent Activity</h3>
              <div sc-stack-layout gap="3">
                <div class="text-sm">
                  <div class="font-medium">User logged in</div>
                  <div class="text-muted-foreground text-xs">2 minutes ago</div>
                </div>
                <div class="text-sm">
                  <div class="font-medium">File uploaded</div>
                  <div class="text-muted-foreground text-xs">5 minutes ago</div>
                </div>
                <div class="text-sm">
                  <div class="font-medium">Report generated</div>
                  <div class="text-muted-foreground text-xs">10 minutes ago</div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="4">
              <h2 class="text-xl font-semibold">Article Content</h2>
              <p>
                This layout demonstrates a right sidebar configuration. The main content is on the
                left, and the sidebar with additional information is on the right.
              </p>
              <p>
                This pattern is commonly used in blogs, documentation sites, and content management
                systems where you want to display related information or navigation alongside the
                main content.
              </p>
              <div class="bg-muted p-4 rounded">
                <h3 class="font-medium mb-2">Code Example</h3>
                <pre class="text-sm"><code>&lt;div sc-sidebar-layout direction="right"&gt;
  &lt;div slot="sidebar"&gt;...&lt;/div&gt;
  &lt;div&gt;Main content&lt;/div&gt;
&lt;/div&gt;</code></pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Different Widths -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Sidebar Width Variations</h2>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Small Sidebar -->
          <div class="h-64">
            <h3 class="font-medium mb-2">Small Sidebar (sidebarWidth="sm")</h3>
            <div class="h-full" sc-sidebar-layout direction="left" sidebarWidth="sm" gap="2">
              <div class="bg-blue-100 dark:bg-blue-900 rounded p-3" slot="sidebar">
                <div class="text-sm font-medium">Compact Nav</div>
              </div>
              <div class="bg-card border rounded p-4">
                <p class="text-sm">Main content with small sidebar</p>
              </div>
            </div>
          </div>

          <!-- Large Sidebar -->
          <div class="h-64">
            <h3 class="font-medium mb-2">Large Sidebar (sidebarWidth="lg")</h3>
            <div class="h-full" sc-sidebar-layout direction="left" sidebarWidth="lg" gap="2">
              <div class="bg-green-100 dark:bg-green-900 rounded p-3" slot="sidebar">
                <div class="text-sm font-medium">Extended Navigation</div>
                <div class="text-xs text-muted-foreground mt-1">More space for content</div>
              </div>
              <div class="bg-card border rounded p-4">
                <p class="text-sm">Main content with large sidebar</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Admin Dashboard Example -->
      <section class="h-[500px]">
        <h2 class="text-2xl font-semibold mb-4 px-8">Admin Dashboard Example</h2>
        <div class="h-full" sc-sidebar-layout direction="left" sidebarWidth="md" gap="4">
          <div class="bg-card border rounded-lg p-4" slot="sidebar">
            <div sc-stack-layout gap="6">
              <!-- Logo -->
              <div class="text-center">
                <div class="w-8 h-8 bg-primary rounded mx-auto mb-2"></div>
                <div class="font-semibold">Admin Panel</div>
              </div>

              <!-- Navigation -->
              <div sc-stack-layout gap="1">
                <div class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Main
                </div>
                <a
                  class="flex items-center gap-2 px-3 py-2 rounded bg-primary text-primary-foreground"
                  href="#"
                >
                  <span class="w-4 h-4 bg-current rounded-sm opacity-75"></span>
                  Dashboard
                </a>
                <a class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted" href="#">
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Users
                </a>
                <a class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted" href="#">
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Products
                </a>
                <a class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted" href="#">
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Orders
                </a>
              </div>

              <div sc-stack-layout gap="1">
                <div class="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                  Settings
                </div>
                <a class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted" href="#">
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Preferences
                </a>
                <a class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted" href="#">
                  <span class="w-4 h-4 bg-current rounded-sm opacity-50"></span>
                  Security
                </a>
              </div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="6">
              <!-- Header -->
              <div class="flex items-center justify-between">
                <h1 class="text-2xl font-bold">Dashboard</h1>
                <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                  New Item
                </button>
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="bg-muted p-4 rounded">
                  <div class="text-2xl font-bold">1,234</div>
                  <div class="text-sm text-muted-foreground">Total Users</div>
                </div>
                <div class="bg-muted p-4 rounded">
                  <div class="text-2xl font-bold">567</div>
                  <div class="text-sm text-muted-foreground">Active Orders</div>
                </div>
                <div class="bg-muted p-4 rounded">
                  <div class="text-2xl font-bold">$89,234</div>
                  <div class="text-sm text-muted-foreground">Revenue</div>
                </div>
              </div>

              <!-- Content Area -->
              <div class="bg-muted p-4 rounded">
                <h3 class="font-medium mb-2">Recent Activity</h3>
                <div class="space-y-2 text-sm">
                  <div class="flex justify-between">
                    <span>New user registration</span>
                    <span class="text-muted-foreground">2 min ago</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Order #1234 completed</span>
                    <span class="text-muted-foreground">5 min ago</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Product updated</span>
                    <span class="text-muted-foreground">10 min ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Layout Example -->
      <section class="h-96 pb-8">
        <h2 class="text-2xl font-semibold mb-4 px-8">Blog Layout Example</h2>
        <div class="h-full" sc-sidebar-layout direction="right" sidebarWidth="sm" gap="6">
          <div class="bg-card border rounded-lg p-4" slot="sidebar">
            <div sc-stack-layout gap="4">
              <div>
                <h3 class="font-semibold mb-2">Recent Posts</h3>
                <div sc-stack-layout gap="2">
                  <a class="text-sm hover:text-primary" href="#">Getting Started with Components</a>
                  <a class="text-sm hover:text-primary" href="#">Design System Best Practices</a>
                  <a class="text-sm hover:text-primary" href="#">Building Responsive Layouts</a>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-2">Categories</h3>
                <div sc-stack-layout gap="1">
                  <a class="text-sm text-muted-foreground hover:text-primary" href="#">
                    Development
                  </a>
                  <a class="text-sm text-muted-foreground hover:text-primary" href="#">Design</a>
                  <a class="text-sm text-muted-foreground hover:text-primary" href="#">Tutorials</a>
                </div>
              </div>

              <div>
                <h3 class="font-semibold mb-2">Tags</h3>
                <div class="flex flex-wrap gap-1">
                  <span class="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    React
                  </span>
                  <span class="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    CSS
                  </span>
                  <span class="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                    Design
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-6">
            <article>
              <div sc-stack-layout gap="4">
                <div>
                  <h1 class="text-2xl font-bold mb-2">Understanding Sidebar Layouts</h1>
                  <div class="text-sm text-muted-foreground">
                    Published on March 15, 2024 by John Doe
                  </div>
                </div>

                <p>
                  Sidebar layouts are one of the most common patterns in web design. They provide a
                  clean way to separate navigation or secondary content from the main content area.
                </p>

                <p>
                  The ScSidebarLayout component makes it easy to create these layouts with flexible
                  configuration options for sidebar position, width, and spacing.
                </p>

                <div class="bg-muted p-4 rounded">
                  <h3 class="font-medium mb-2">Key Features</h3>
                  <ul class="text-sm space-y-1">
                    <li>• Configurable sidebar position (left/right)</li>
                    <li>• Multiple width options</li>
                    <li>• Responsive design support</li>
                    <li>• Flexible content projection</li>
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SidebarLayoutDemo {}
