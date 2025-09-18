import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScDashboardLayout, ScStackLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-dashboard-layout-demo',
  imports: [ScDashboardLayout, ScStackLayout],
  template: `
    <div class="space-y-8">
      <!-- Page Header -->
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">ScDashboardLayout Demo</h1>
        <p class="text-lg text-muted-foreground">
          Multi-panel widget arrangements perfect for admin interfaces and data dashboards.
        </p>
      </div>

      <!-- Auto-fit Layout (Default) -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Auto-fit Layout (Default)</h2>
        <div class="min-h-[300px]" sc-dashboard-layout layout="auto-fit" gap="4">
          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="3">
              <h3 class="text-lg font-semibold">Revenue</h3>
              <div class="text-3xl font-bold text-green-600">$45,231</div>
              <p class="text-sm text-muted-foreground">+20.1% from last month</p>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="3">
              <h3 class="text-lg font-semibold">Orders</h3>
              <div class="text-3xl font-bold text-blue-600">1,234</div>
              <p class="text-sm text-muted-foreground">+12% from last month</p>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="3">
              <h3 class="text-lg font-semibold">Customers</h3>
              <div class="text-3xl font-bold text-purple-600">892</div>
              <p class="text-sm text-muted-foreground">+8% from last month</p>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="3">
              <h3 class="text-lg font-semibold">Conversion Rate</h3>
              <div class="text-3xl font-bold text-orange-600">3.2%</div>
              <p class="text-sm text-muted-foreground">+0.5% from last month</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Three Column Layout -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Three Column Layout</h2>
        <div class="min-h-[200px]" sc-dashboard-layout layout="three-column" gap="4">
          <div class="bg-card border rounded-lg p-4">
            <div sc-stack-layout gap="2">
              <h3 class="font-semibold">Active Users</h3>
              <div class="text-2xl font-bold">1,847</div>
              <div class="text-xs text-green-600">↑ 15.3%</div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-4">
            <div sc-stack-layout gap="2">
              <h3 class="font-semibold">Page Views</h3>
              <div class="text-2xl font-bold">12,849</div>
              <div class="text-xs text-blue-600">↑ 8.2%</div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-4">
            <div sc-stack-layout gap="2">
              <h3 class="font-semibold">Bounce Rate</h3>
              <div class="text-2xl font-bold">24.5%</div>
              <div class="text-xs text-red-600">↓ 2.1%</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Sidebar Main Layout -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Sidebar + Main Layout</h2>
        <div class="min-h-[400px]" sc-dashboard-layout layout="sidebar-main" gap="6">
          <!-- Sidebar Panel -->
          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="4">
              <h3 class="text-lg font-semibold">Quick Actions</h3>

              <div sc-stack-layout gap="2">
                <button class="bg-primary text-primary-foreground px-4 py-2 rounded text-sm w-full">
                  Create Report
                </button>
                <button class="border border-border px-4 py-2 rounded text-sm w-full">
                  Export Data
                </button>
                <button class="border border-border px-4 py-2 rounded text-sm w-full">
                  Settings
                </button>
              </div>

              <div>
                <h4 class="font-medium mb-2">Recent Activity</h4>
                <div sc-stack-layout gap="2">
                  <div class="text-sm">
                    <div class="font-medium">Report generated</div>
                    <div class="text-xs text-muted-foreground">2 minutes ago</div>
                  </div>
                  <div class="text-sm">
                    <div class="font-medium">User added</div>
                    <div class="text-xs text-muted-foreground">5 minutes ago</div>
                  </div>
                  <div class="text-sm">
                    <div class="font-medium">Data exported</div>
                    <div class="text-xs text-muted-foreground">10 minutes ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Content Panel -->
          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="6">
              <div>
                <h3 class="text-xl font-semibold mb-2">Analytics Overview</h3>
                <p class="text-muted-foreground">
                  Comprehensive view of your application's performance metrics and user engagement.
                </p>
              </div>

              <!-- Chart Area -->
              <div class="bg-muted rounded-lg p-8 text-center">
                <div class="text-muted-foreground">
                  <div class="text-6xl mb-2">📊</div>
                  <p>Interactive Chart Component</p>
                  <p class="text-sm">Revenue trend over the last 30 days</p>
                </div>
              </div>

              <!-- Data Table -->
              <div>
                <h4 class="font-medium mb-3">Top Performing Pages</h4>
                <div class="border rounded-lg overflow-hidden">
                  <table class="w-full">
                    <thead class="bg-muted">
                      <tr class="text-left">
                        <th class="p-3 font-medium">Page</th>
                        <th class="p-3 font-medium">Views</th>
                        <th class="p-3 font-medium">Bounce Rate</th>
                        <th class="p-3 font-medium">Avg. Time</th>
                      </tr>
                    </thead>
                    <tbody class="text-sm">
                      <tr class="border-t">
                        <td class="p-3">/dashboard</td>
                        <td class="p-3">2,847</td>
                        <td class="p-3">22.3%</td>
                        <td class="p-3">4:32</td>
                      </tr>
                      <tr class="border-t">
                        <td class="p-3">/analytics</td>
                        <td class="p-3">1,923</td>
                        <td class="p-3">18.7%</td>
                        <td class="p-3">6:15</td>
                      </tr>
                      <tr class="border-t">
                        <td class="p-3">/reports</td>
                        <td class="p-3">1,456</td>
                        <td class="p-3">25.1%</td>
                        <td class="p-3">3:48</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Four Column Layout -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Four Column Layout</h2>
        <div class="min-h-[150px]" sc-dashboard-layout layout="four-column" gap="3">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-4">
            <div sc-stack-layout gap="1">
              <div class="text-lg font-bold">23,456</div>
              <div class="text-sm opacity-90">Total Visits</div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-4">
            <div sc-stack-layout gap="1">
              <div class="text-lg font-bold">$34,567</div>
              <div class="text-sm opacity-90">Revenue</div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-4">
            <div sc-stack-layout gap="1">
              <div class="text-lg font-bold">1,234</div>
              <div class="text-sm opacity-90">New Users</div>
            </div>
          </div>

          <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-4">
            <div sc-stack-layout gap="1">
              <div class="text-lg font-bold">89.2%</div>
              <div class="text-sm opacity-90">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Dense Layout -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Dense Layout (Grid Auto-placement)</h2>
        <div class="min-h-[300px]" sc-dashboard-layout layout="auto-fit" gap="3" dense="true">
          <!-- Large widget -->
          <div class="bg-card border rounded-lg p-4 col-span-2 row-span-2">
            <div sc-stack-layout gap="3">
              <h3 class="font-semibold">Sales Funnel</h3>
              <div class="space-y-2">
                <div class="flex justify-between text-sm">
                  <span>Prospects</span>
                  <span class="font-medium">1,000</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="bg-blue-500 h-2 rounded-full" style="width: 100%"></div>
                </div>

                <div class="flex justify-between text-sm">
                  <span>Qualified</span>
                  <span class="font-medium">500</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="bg-green-500 h-2 rounded-full" style="width: 50%"></div>
                </div>

                <div class="flex justify-between text-sm">
                  <span>Customers</span>
                  <span class="font-medium">150</span>
                </div>
                <div class="w-full bg-muted rounded-full h-2">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: 15%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Small widgets -->
          <div class="bg-card border rounded-lg p-3">
            <div class="text-center">
              <div class="text-lg font-bold text-blue-600">98%</div>
              <div class="text-xs text-muted-foreground">Uptime</div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-3">
            <div class="text-center">
              <div class="text-lg font-bold text-green-600">2.3s</div>
              <div class="text-xs text-muted-foreground">Load Time</div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-3">
            <div class="text-center">
              <div class="text-lg font-bold text-orange-600">15</div>
              <div class="text-xs text-muted-foreground">Alerts</div>
            </div>
          </div>

          <div class="bg-card border rounded-lg p-3">
            <div class="text-center">
              <div class="text-lg font-bold text-red-600">3</div>
              <div class="text-xs text-muted-foreground">Issues</div>
            </div>
          </div>

          <!-- Medium widget -->
          <div class="bg-card border rounded-lg p-4 col-span-2">
            <div sc-stack-layout gap="2">
              <h3 class="font-semibold">Server Status</h3>
              <div class="grid grid-cols-3 gap-2 text-sm">
                <div class="text-center">
                  <div class="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                  <div>Web</div>
                </div>
                <div class="text-center">
                  <div class="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                  <div>API</div>
                </div>
                <div class="text-center">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                  <div>DB</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Real-world Example: E-commerce Dashboard -->
      <section class="px-8 pb-8">
        <h2 class="text-2xl font-semibold mb-4">E-commerce Dashboard Example</h2>
        <div class="min-h-[400px]" sc-dashboard-layout layout="auto-fit" gap="4">
          <!-- Revenue Card -->
          <div class="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg p-6">
            <div sc-stack-layout gap="3">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">Total Revenue</h3>
                <span class="text-2xl">💰</span>
              </div>
              <div class="text-3xl font-bold">$247,891</div>
              <div class="text-sm opacity-90">+12.5% vs last month</div>
            </div>
          </div>

          <!-- Orders Card -->
          <div class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg p-6">
            <div sc-stack-layout gap="3">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">Orders</h3>
                <span class="text-2xl">📦</span>
              </div>
              <div class="text-3xl font-bold">1,456</div>
              <div class="text-sm opacity-90">+8.2% vs last month</div>
            </div>
          </div>

          <!-- Customers Card -->
          <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6">
            <div sc-stack-layout gap="3">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">Customers</h3>
                <span class="text-2xl">👥</span>
              </div>
              <div class="text-3xl font-bold">892</div>
              <div class="text-sm opacity-90">+15.3% vs last month</div>
            </div>
          </div>

          <!-- Recent Orders -->
          <div class="bg-card border rounded-lg p-6 col-span-full lg:col-span-2">
            <div sc-stack-layout gap="4">
              <h3 class="text-lg font-semibold">Recent Orders</h3>
              <div class="space-y-3">
                <div class="flex items-center justify-between p-3 bg-muted rounded">
                  <div>
                    <div class="font-medium">Order #1234</div>
                    <div class="text-sm text-muted-foreground">John Doe - 2 items</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium">$156.99</div>
                    <div class="text-sm text-green-600">Completed</div>
                  </div>
                </div>
                <div class="flex items-center justify-between p-3 bg-muted rounded">
                  <div>
                    <div class="font-medium">Order #1235</div>
                    <div class="text-sm text-muted-foreground">Jane Smith - 1 item</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium">$89.50</div>
                    <div class="text-sm text-yellow-600">Processing</div>
                  </div>
                </div>
                <div class="flex items-center justify-between p-3 bg-muted rounded">
                  <div>
                    <div class="font-medium">Order #1236</div>
                    <div class="text-sm text-muted-foreground">Bob Johnson - 3 items</div>
                  </div>
                  <div class="text-right">
                    <div class="font-medium">$234.75</div>
                    <div class="text-sm text-blue-600">Shipped</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Top Products -->
          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="4">
              <h3 class="text-lg font-semibold">Top Products</h3>
              <div class="space-y-3">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-blue-100 rounded"></div>
                  <div class="flex-1">
                    <div class="font-medium">Wireless Headphones</div>
                    <div class="text-sm text-muted-foreground">245 sold</div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-green-100 rounded"></div>
                  <div class="flex-1">
                    <div class="font-medium">Smart Watch</div>
                    <div class="text-sm text-muted-foreground">189 sold</div>
                  </div>
                </div>
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-purple-100 rounded"></div>
                  <div class="flex-1">
                    <div class="font-medium">Laptop Stand</div>
                    <div class="text-sm text-muted-foreground">156 sold</div>
                  </div>
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
export default class DashboardLayoutDemo {}
