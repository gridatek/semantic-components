import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScSplitLayout, ScStackLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-split-layout-demo',
  imports: [ScSplitLayout, ScStackLayout],
  template: `
    <div class="space-y-12">
      <!-- Page Header -->
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">ScSplitLayout Demo</h1>
        <p class="text-lg text-muted-foreground">
          Flexible split layouts for creating multi-panel interfaces with precise control over
          sizing.
        </p>
      </div>

      <!-- Basic Horizontal Split -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Basic Horizontal Split</h2>
        <div class="px-8">
          <div class="h-64" sc-split-layout direction="horizontal" ratio="50-50" gap="4">
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Left Panel</h3>
                <p class="text-sm text-muted-foreground">
                  This is the left panel content. Perfect for navigation, sidebars, or secondary
                  information.
                </p>
                <button class="bg-primary text-primary-foreground px-4 py-2 rounded w-fit">
                  Left Action
                </button>
              </div>
            </div>
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Right Panel</h3>
                <p class="text-sm text-muted-foreground">
                  This is the right panel content. Ideal for main content, details, or primary
                  actions.
                </p>
                <button class="bg-secondary text-secondary-foreground px-4 py-2 rounded w-fit">
                  Right Action
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Different Ratios -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Different Split Ratios</h2>
        <div class="px-8">
          <div sc-stack-layout gap="6">
            <div class="h-32" sc-split-layout direction="horizontal" ratio="30-70" gap="3">
              <div
                class="bg-blue-100 dark:bg-blue-950 border rounded-lg p-4 flex items-center justify-center"
              >
                <span class="font-medium">30%</span>
              </div>
              <div
                class="bg-green-100 dark:bg-green-950 border rounded-lg p-4 flex items-center justify-center"
              >
                <span class="font-medium">70%</span>
              </div>
            </div>

            <div class="h-32" sc-split-layout direction="horizontal" ratio="70-30" gap="3">
              <div
                class="bg-purple-100 dark:bg-purple-950 border rounded-lg p-4 flex items-center justify-center"
              >
                <span class="font-medium">70%</span>
              </div>
              <div
                class="bg-orange-100 dark:bg-orange-950 border rounded-lg p-4 flex items-center justify-center"
              >
                <span class="font-medium">30%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vertical Split -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Vertical Split Layout</h2>
        <div class="px-8">
          <div class="h-96" sc-split-layout direction="vertical" ratio="40-60" gap="4">
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Top Panel</h3>
                <p class="text-sm text-muted-foreground">
                  This is the top panel content. Great for headers, toolbars, or summary
                  information.
                </p>
              </div>
            </div>
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Bottom Panel</h3>
                <p class="text-sm text-muted-foreground">
                  This is the bottom panel content. Perfect for detailed content, logs, or extended
                  information.
                </p>
                <div class="grid grid-cols-3 gap-2">
                  <div class="bg-gray-100 dark:bg-gray-800 rounded p-2 text-center text-xs">
                    Item 1
                  </div>
                  <div class="bg-gray-100 dark:bg-gray-800 rounded p-2 text-center text-xs">
                    Item 2
                  </div>
                  <div class="bg-gray-100 dark:bg-gray-800 rounded p-2 text-center text-xs">
                    Item 3
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Nested Splits -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Nested Split Layouts</h2>
        <div class="px-8">
          <div class="h-80" sc-split-layout direction="horizontal" ratio="30-70" gap="4">
            <div class="bg-card border rounded-lg p-4">
              <div sc-stack-layout gap="4">
                <h3 class="font-semibold">Sidebar</h3>
                <nav class="space-y-2">
                  <a class="block py-2 px-3 bg-primary text-primary-foreground rounded" href="#">
                    Dashboard
                  </a>
                  <a class="block py-2 px-3 hover:bg-muted rounded" href="#">Analytics</a>
                  <a class="block py-2 px-3 hover:bg-muted rounded" href="#">Reports</a>
                  <a class="block py-2 px-3 hover:bg-muted rounded" href="#">Settings</a>
                </nav>
              </div>
            </div>
            <div sc-split-layout direction="vertical" ratio="20-80" gap="4">
              <div class="bg-muted/30 border rounded-lg p-4">
                <h3 class="font-semibold">Header Area</h3>
                <p class="text-sm text-muted-foreground">Page title and actions</p>
              </div>
              <div class="bg-card border rounded-lg p-4">
                <h3 class="font-semibold">Main Content</h3>
                <p class="text-sm text-muted-foreground">
                  Primary content area with nested layout structure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Dashboard Example -->
      <section class="pb-12">
        <h2 class="text-2xl font-semibold mb-4 px-8">Dashboard with Resizable Panels</h2>
        <div class="px-8">
          <div class="h-80" sc-split-layout direction="horizontal" ratio="40-60" gap="4">
            <div class="bg-card border rounded-lg p-4">
              <div sc-stack-layout gap="4">
                <h3 class="font-semibold">Analytics Overview</h3>
                <div class="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
                  <div sc-stack-layout gap="2">
                    <h4 class="font-medium">Revenue Trend</h4>
                    <div class="flex items-end gap-1 h-16">
                      <div class="bg-white/30 w-3 h-8 rounded-sm"></div>
                      <div class="bg-white/50 w-3 h-12 rounded-sm"></div>
                      <div class="bg-white/70 w-3 h-10 rounded-sm"></div>
                      <div class="bg-white/90 w-3 h-16 rounded-sm"></div>
                      <div class="bg-white w-3 h-14 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-card border rounded-lg p-4">
              <div sc-stack-layout gap="4">
                <h3 class="font-semibold">Recent Orders</h3>
                <div class="overflow-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b">
                        <th class="text-left py-2">Order</th>
                        <th class="text-left py-2">Customer</th>
                        <th class="text-left py-2">Amount</th>
                        <th class="text-left py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody class="space-y-1">
                      <tr class="border-b">
                        <td class="py-2">#12345</td>
                        <td class="py-2">John Doe</td>
                        <td class="py-2">$299.00</td>
                        <td class="py-2">
                          <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                            Completed
                          </span>
                        </td>
                      </tr>
                      <tr class="border-b">
                        <td class="py-2">#12346</td>
                        <td class="py-2">Jane Smith</td>
                        <td class="py-2">$149.99</td>
                        <td class="py-2">
                          <span
                            class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs"
                          >
                            Pending
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SplitLayoutDemo {}
