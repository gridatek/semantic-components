import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScStackLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-stack-layout-demo',
  imports: [ScStackLayout],
  template: `
    <div class="p-8 space-y-12">
      <div>
        <h1 class="text-3xl font-bold mb-8">ScStackLayout Demo</h1>
        <p class="text-lg text-muted-foreground mb-8">
          Vertical stacking with consistent spacing, alignment, and justification options.
        </p>
      </div>

      <!-- Basic Stack -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Basic Stack</h2>
        <div class="bg-card border rounded-lg p-6">
          <div class="max-w-md" sc-stack-layout gap="4">
            <div class="bg-blue-100 dark:bg-blue-900 p-4 rounded">Item 1</div>
            <div class="bg-green-100 dark:bg-green-900 p-4 rounded">Item 2</div>
            <div class="bg-purple-100 dark:bg-purple-900 p-4 rounded">Item 3</div>
          </div>
        </div>
      </section>

      <!-- Form Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Form Layout</h2>
        <div class="bg-card border rounded-lg p-6">
          <div class="max-w-md" sc-stack-layout gap="4">
            <div>
              <label class="block text-sm font-medium mb-2">Name</label>
              <input class="w-full p-2 border rounded" type="text" placeholder="Enter your name" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input
                class="w-full p-2 border rounded"
                type="email"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Message</label>
              <textarea
                class="w-full p-2 border rounded"
                placeholder="Enter your message"
                rows="4"
              ></textarea>
            </div>
            <button
              class="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
            >
              Submit
            </button>
          </div>
        </div>
      </section>

      <!-- Different Gaps -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Gap Variations</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-card border rounded-lg p-4">
            <h3 class="font-medium mb-3">Small Gap (gap="2")</h3>
            <div sc-stack-layout gap="2">
              <div class="bg-red-100 dark:bg-red-900 p-2 rounded text-sm">Item A</div>
              <div class="bg-red-100 dark:bg-red-900 p-2 rounded text-sm">Item B</div>
              <div class="bg-red-100 dark:bg-red-900 p-2 rounded text-sm">Item C</div>
            </div>
          </div>
          <div class="bg-card border rounded-lg p-4">
            <h3 class="font-medium mb-3">Medium Gap (gap="4")</h3>
            <div sc-stack-layout gap="4">
              <div class="bg-blue-100 dark:bg-blue-900 p-2 rounded text-sm">Item A</div>
              <div class="bg-blue-100 dark:bg-blue-900 p-2 rounded text-sm">Item B</div>
              <div class="bg-blue-100 dark:bg-blue-900 p-2 rounded text-sm">Item C</div>
            </div>
          </div>
          <div class="bg-card border rounded-lg p-4">
            <h3 class="font-medium mb-3">Large Gap (gap="8")</h3>
            <div sc-stack-layout gap="8">
              <div class="bg-green-100 dark:bg-green-900 p-2 rounded text-sm">Item A</div>
              <div class="bg-green-100 dark:bg-green-900 p-2 rounded text-sm">Item B</div>
              <div class="bg-green-100 dark:bg-green-900 p-2 rounded text-sm">Item C</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Alignment Options -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Alignment Options</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-card border rounded-lg p-4">
            <h3 class="font-medium mb-3">Start Aligned</h3>
            <div class="bg-muted/20 p-4 rounded" sc-stack-layout gap="3" align="start">
              <div class="bg-yellow-100 dark:bg-yellow-900 p-2 rounded w-20">Short</div>
              <div class="bg-yellow-100 dark:bg-yellow-900 p-2 rounded w-32">Medium Width</div>
              <div class="bg-yellow-100 dark:bg-yellow-900 p-2 rounded w-24">Regular</div>
            </div>
          </div>
          <div class="bg-card border rounded-lg p-4">
            <h3 class="font-medium mb-3">Center Aligned</h3>
            <div class="bg-muted/20 p-4 rounded" sc-stack-layout gap="3" align="center">
              <div class="bg-orange-100 dark:bg-orange-900 p-2 rounded w-20">Short</div>
              <div class="bg-orange-100 dark:bg-orange-900 p-2 rounded w-32">Medium Width</div>
              <div class="bg-orange-100 dark:bg-orange-900 p-2 rounded w-24">Regular</div>
            </div>
          </div>
          <div class="bg-card border rounded-lg p-4">
            <h3 class="font-medium mb-3">Stretch (Full Width)</h3>
            <div class="bg-muted/20 p-4 rounded" sc-stack-layout gap="3" align="stretch">
              <div class="bg-teal-100 dark:bg-teal-900 p-2 rounded">Full Width</div>
              <div class="bg-teal-100 dark:bg-teal-900 p-2 rounded">All Items</div>
              <div class="bg-teal-100 dark:bg-teal-900 p-2 rounded">Stretch</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Justification -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Justification (when container has height)</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-card border rounded-lg p-4">
            <h3 class="font-medium mb-3">Space Between</h3>
            <div class="bg-muted/20 p-4 rounded h-48" sc-stack-layout gap="0" justify="between">
              <div class="bg-indigo-100 dark:bg-indigo-900 p-2 rounded">Top</div>
              <div class="bg-indigo-100 dark:bg-indigo-900 p-2 rounded">Middle</div>
              <div class="bg-indigo-100 dark:bg-indigo-900 p-2 rounded">Bottom</div>
            </div>
          </div>
          <div class="bg-card border rounded-lg p-4">
            <h3 class="font-medium mb-3">Center Justified</h3>
            <div class="bg-muted/20 p-4 rounded h-48" sc-stack-layout gap="3" justify="center">
              <div class="bg-pink-100 dark:bg-pink-900 p-2 rounded">Item 1</div>
              <div class="bg-pink-100 dark:bg-pink-900 p-2 rounded">Item 2</div>
              <div class="bg-pink-100 dark:bg-pink-900 p-2 rounded">Item 3</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Real-world Examples -->
      <section>
        <h2 class="text-2xl font-semibold mb-4">Real-world Examples</h2>

        <!-- Card with Stack Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div class="bg-card border rounded-lg overflow-hidden">
            <img
              class="w-full h-32 object-cover"
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
              alt="Project"
            />
            <div sc-stack-layout gap="4" padding="6">
              <div sc-stack-layout gap="2">
                <h3 class="text-lg font-semibold">Project Card</h3>
                <p class="text-sm text-muted-foreground">
                  Using ScStackLayout for consistent spacing in cards
                </p>
              </div>
              <div class="flex gap-2">
                <span class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                  React
                </span>
                <span class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                  TypeScript
                </span>
              </div>
              <div class="flex gap-2">
                <button class="bg-primary text-primary-foreground px-3 py-1 rounded text-sm">
                  View
                </button>
                <button class="border border-border px-3 py-1 rounded text-sm">Share</button>
              </div>
            </div>
          </div>

          <!-- Settings Panel -->
          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="6">
              <h3 class="text-lg font-semibold">Settings Panel</h3>

              <div sc-stack-layout gap="4">
                <div class="flex items-center justify-between">
                  <span>Notifications</span>
                  <input class="rounded" type="checkbox" checked />
                </div>
                <div class="flex items-center justify-between">
                  <span>Dark Mode</span>
                  <input class="rounded" type="checkbox" />
                </div>
                <div class="flex items-center justify-between">
                  <span>Auto-save</span>
                  <input class="rounded" type="checkbox" checked />
                </div>
              </div>

              <div sc-stack-layout gap="3">
                <label class="text-sm font-medium">Theme</label>
                <select class="p-2 border rounded">
                  <option>System</option>
                  <option>Light</option>
                  <option>Dark</option>
                </select>
              </div>

              <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                Save Settings
              </button>
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
export default class StackLayoutDemo {}
