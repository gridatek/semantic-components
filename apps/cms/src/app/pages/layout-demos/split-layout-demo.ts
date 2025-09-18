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
          Horizontal and vertical splits with configurable ratios and resizable panes.
        </p>
      </div>

      <!-- Basic Horizontal Split -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Basic Horizontal Split</h2>
        <div class="px-8">
          <div sc-split-layout direction="horizontal" ratio="50:50" gap="4" class="h-64">
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Left Panel</h3>
                <p class="text-sm text-muted-foreground">
                  This is the left side of a 50:50 horizontal split. Both panels have equal width.
                </p>
                <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded">
                  <p class="text-sm">Content area 1</p>
                </div>
              </div>
            </div>

            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Right Panel</h3>
                <p class="text-sm text-muted-foreground">
                  This is the right side of the split. You can put any content here.
                </p>
                <div class="bg-green-100 dark:bg-green-900 p-3 rounded">
                  <p class="text-sm">Content area 2</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Different Ratios -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Different Split Ratios</h2>
        <div class="space-y-6">
          <!-- 30:70 Split -->
          <div>
            <h3 class="font-medium mb-2">30:70 Split</h3>
            <div sc-split-layout direction="horizontal" ratio="30:70" gap="3" class="h-32">
              <div class="bg-purple-100 dark:bg-purple-900 rounded p-4 flex items-center justify-center">
                <span class="text-sm font-medium">30%</span>
              </div>
              <div class="bg-purple-200 dark:bg-purple-800 rounded p-4 flex items-center justify-center">
                <span class="text-sm font-medium">70%</span>
              </div>
            </div>
          </div>

          <!-- 70:30 Split -->
          <div>
            <h3 class="font-medium mb-2">70:30 Split</h3>
            <div sc-split-layout direction="horizontal" ratio="70:30" gap="3" class="h-32">
              <div class="bg-orange-100 dark:bg-orange-900 rounded p-4 flex items-center justify-center">
                <span class="text-sm font-medium">70%</span>
              </div>
              <div class="bg-orange-200 dark:bg-orange-800 rounded p-4 flex items-center justify-center">
                <span class="text-sm font-medium">30%</span>
              </div>
            </div>
          </div>

          <!-- 25:75 Split -->
          <div>
            <h3 class="font-medium mb-2">25:75 Split</h3>
            <div sc-split-layout direction="horizontal" ratio="25:75" gap="3" class="h-32">
              <div class="bg-teal-100 dark:bg-teal-900 rounded p-4 flex items-center justify-center">
                <span class="text-sm font-medium">25%</span>
              </div>
              <div class="bg-teal-200 dark:bg-teal-800 rounded p-4 flex items-center justify-center">
                <span class="text-sm font-medium">75%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Vertical Split -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Vertical Split</h2>
        <div class="px-8">
          <div sc-split-layout direction="vertical" ratio="40:60" gap="4" class="h-96">
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Top Panel (40%)</h3>
                <p class="text-sm text-muted-foreground">
                  This is the top section of a vertical split layout. Great for headers, toolbars, or preview areas.
                </p>
                <div class="grid grid-cols-3 gap-2">
                  <div class="bg-red-100 dark:bg-red-900 p-2 rounded text-center text-xs">Tool 1</div>
                  <div class="bg-red-100 dark:bg-red-900 p-2 rounded text-center text-xs">Tool 2</div>
                  <div class="bg-red-100 dark:bg-red-900 p-2 rounded text-center text-xs">Tool 3</div>
                </div>
              </div>
            </div>

            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Bottom Panel (60%)</h3>
                <p class="text-sm text-muted-foreground">
                  This is the bottom section with more space. Perfect for main content, editors, or detailed views.
                </p>
                <div class="bg-muted p-4 rounded">
                  <p class="text-sm">Main content area with more vertical space for detailed information.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Code Editor Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Code Editor Layout Example</h2>
        <div class="px-8">
          <div sc-split-layout direction="horizontal" ratio="25:75" gap="0" class="h-96 border rounded-lg overflow-hidden">
            <!-- File Explorer -->
            <div class="bg-muted/30 border-r">
              <div class="border-b p-3">
                <h3 class="font-semibold text-sm">Explorer</h3>
              </div>
              <div class="p-3">
                <div sc-stack-layout gap="1">
                  <div class="flex items-center gap-2 text-sm">
                    <span class="w-4 h-4 text-center">📁</span>
                    <span>src</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm ml-4">
                    <span class="w-4 h-4 text-center">📁</span>
                    <span>components</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm ml-8">
                    <span class="w-4 h-4 text-center">📄</span>
                    <span class="text-blue-600 dark:text-blue-400">Button.tsx</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm ml-8">
                    <span class="w-4 h-4 text-center">📄</span>
                    <span>Input.tsx</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm ml-4">
                    <span class="w-4 h-4 text-center">📁</span>
                    <span>layouts</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm ml-8">
                    <span class="w-4 h-4 text-center">📄</span>
                    <span>SplitLayout.tsx</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Editor Area -->
            <div class="bg-background">
              <div sc-split-layout direction="vertical" ratio="80-20" gap="0" class="h-full">
                <!-- Code Editor -->
                <div>
                  <div class="border-b p-3 bg-muted/20">
                    <div class="flex items-center gap-2">
                      <span class="text-sm">Button.tsx</span>
                      <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                    </div>
                  </div>
                  <div class="p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 h-full">
                    <div sc-stack-layout gap="0">
                      <span class="text-purple-600 dark:text-purple-400">import</span>
                      <span class="text-blue-600 dark:text-blue-400">interface ButtonProps {</span>
                      <span class="ml-4">children: React.ReactNode;</span>
                      <span class="ml-4">onClick?: () => void;</span>
                      <span class="text-blue-600 dark:text-blue-400">}</span>
                      <span></span>
                      <span class="text-green-600 dark:text-green-400">export const Button = ({ children, onClick }: ButtonProps) => {</span>
                      <span class="ml-4 text-purple-600 dark:text-purple-400">return</span>
                      <span class="ml-8">&lt;button onClick={onClick}&gt;{children}&lt;/button&gt;</span>
                      <span class="text-green-600 dark:text-green-400">}</span>
                    </div>
                  </div>
                </div>

                <!-- Terminal -->
                <div class="border-t bg-black text-green-400">
                  <div class="border-b p-2 bg-muted/20 text-foreground">
                    <span class="text-sm">Terminal</span>
                  </div>
                  <div class="p-3 font-mono text-sm">
                    <div sc-stack-layout gap="1">
                      <span>$ npm run dev</span>
                      <span>✓ Local:    http://localhost:3000</span>
                      <span>✓ ready in 150ms</span>
                      <span class="opacity-60">▶</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Email Client Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Email Client Layout</h2>
        <div class="px-8">
          <div sc-split-layout direction="horizontal" ratio="30:70" gap="0" class="h-96 border rounded-lg overflow-hidden">
            <!-- Sidebar -->
            <div class="bg-muted/30 border-r">
              <div class="border-b p-4">
                <h3 class="font-semibold">Mailbox</h3>
              </div>
              <div class="p-2">
                <div sc-stack-layout gap="1">
                  <a href="#" class="flex items-center gap-2 px-3 py-2 rounded bg-primary text-primary-foreground text-sm">
                    <span>📥</span>
                    <span>Inbox</span>
                    <span class="ml-auto bg-primary-foreground text-primary px-1.5 py-0.5 rounded text-xs">12</span>
                  </a>
                  <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-sm">
                    <span>📤</span>
                    <span>Sent</span>
                  </a>
                  <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-sm">
                    <span>📋</span>
                    <span>Drafts</span>
                    <span class="ml-auto text-muted-foreground text-xs">3</span>
                  </a>
                  <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-sm">
                    <span>⭐</span>
                    <span>Starred</span>
                  </a>
                  <a href="#" class="flex items-center gap-2 px-3 py-2 rounded hover:bg-muted text-sm">
                    <span>🗑️</span>
                    <span>Trash</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="bg-background">
              <div sc-split-layout direction="vertical" ratio="50:50" gap="0" class="h-full">
                <!-- Email List -->
                <div class="border-b">
                  <div class="border-b p-4">
                    <h3 class="font-semibold">Inbox</h3>
                  </div>
                  <div class="overflow-y-auto">
                    <div sc-stack-layout gap="0">
                      <div class="border-b p-3 hover:bg-muted/50 cursor-pointer bg-blue-50 dark:bg-blue-950">
                        <div class="flex items-start justify-between">
                          <div sc-stack-layout gap="1">
                            <div class="flex items-center gap-2">
                              <span class="font-medium text-sm">John Doe</span>
                              <span class="w-2 h-2 bg-blue-500 rounded-full"></span>
                            </div>
                            <p class="text-sm text-muted-foreground">Meeting Follow-up</p>
                          </div>
                          <span class="text-xs text-muted-foreground">2m ago</span>
                        </div>
                      </div>
                      <div class="border-b p-3 hover:bg-muted/50 cursor-pointer">
                        <div class="flex items-start justify-between">
                          <div sc-stack-layout gap="1">
                            <span class="font-medium text-sm">Sarah Wilson</span>
                            <p class="text-sm text-muted-foreground">Project Update</p>
                          </div>
                          <span class="text-xs text-muted-foreground">1h ago</span>
                        </div>
                      </div>
                      <div class="border-b p-3 hover:bg-muted/50 cursor-pointer">
                        <div class="flex items-start justify-between">
                          <div sc-stack-layout gap="1">
                            <span class="font-medium text-sm">Team Newsletter</span>
                            <p class="text-sm text-muted-foreground">Weekly Updates</p>
                          </div>
                          <span class="text-xs text-muted-foreground">3h ago</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Email Content -->
                <div class="p-6">
                  <div sc-stack-layout gap="4">
                    <div>
                      <h3 class="text-lg font-semibold">Meeting Follow-up</h3>
                      <div class="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>From: john.doe@company.com</span>
                        <span>•</span>
                        <span>Today at 2:30 PM</span>
                      </div>
                    </div>
                    <div class="prose prose-sm max-w-none">
                      <p>Hi there,</p>
                      <p>
                        Thank you for the productive meeting this morning. As discussed, I'm sending over the
                        action items we agreed upon:
                      </p>
                      <ul>
                        <li>Update project timeline by Friday</li>
                        <li>Schedule design review session</li>
                        <li>Prepare user testing scenarios</li>
                      </ul>
                      <p>Let me know if you have any questions!</p>
                      <p>Best regards,<br/>John</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Resizable Split Example -->
      <section class="pb-12">
        <h2 class="text-2xl font-semibold mb-4 px-8">Dashboard with Resizable Panels</h2>
        <div class="px-8">
          <div sc-split-layout direction="horizontal" ratio="40:60" gap="4" class="h-80">
            <!-- Left Panel: Charts -->
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
                <div class="grid grid-cols-2 gap-2">
                  <div class="bg-muted p-3 rounded">
                    <div class="text-sm text-muted-foreground">Users</div>
                    <div class="text-lg font-bold">1,234</div>
                  </div>
                  <div class="bg-muted p-3 rounded">
                    <div class="text-sm text-muted-foreground">Sales</div>
                    <div class="text-lg font-bold">$56,789</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Panel: Data Table -->
            <div class="bg-card border rounded-lg p-4">
              <div sc-stack-layout gap="4">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold">Recent Orders</h3>
                  <button class="text-sm text-primary hover:underline">View All</button>
                </div>
                <div class="overflow-x-auto">
                  <table class="w-full text-sm">
                    <thead>
                      <tr class="border-b text-left">
                        <th class="pb-2">Order ID</th>
                        <th class="pb-2">Customer</th>
                        <th class="pb-2">Amount</th>
                        <th class="pb-2">Status</th>
                      </tr>
                    </thead>
                    <tbody class="text-muted-foreground">
                      <tr class="border-b">
                        <td class="py-2">#12345</td>
                        <td class="py-2">John Smith</td>
                        <td class="py-2">$129.99</td>
                        <td class="py-2">
                          <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>
                        </td>
                      </tr>
                      <tr class="border-b">
                        <td class="py-2">#12346</td>
                        <td class="py-2">Sarah Johnson</td>
                        <td class="py-2">$89.50</td>
                        <td class="py-2">
                          <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">Pending</span>
                        </td>
                      </tr>
                      <tr class="border-b">
                        <td class="py-2">#12347</td>
                        <td class="py-2">Mike Brown</td>
                        <td class="py-2">$299.00</td>
                        <td class="py-2">
                          <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Processing</span>
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
