import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScCenterLayout, ScStackLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-center-layout-demo',
  imports: [ScCenterLayout, ScStackLayout],
  template: `
    <div class="space-y-12">
      <!-- Page Header -->
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">ScCenterLayout Demo</h1>
        <p class="text-lg text-muted-foreground">
          Perfect centering with multiple strategies for different use cases.
        </p>
      </div>

      <!-- Basic Center -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Basic Centering</h2>
        <div class="px-8">
          <div
            class="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border rounded-lg"
            sc-center-layout
            strategy="flex-center"
          >
            <div class="bg-card border rounded-lg p-6 max-w-md">
              <div sc-stack-layout gap="3">
                <h3 class="font-semibold">Perfectly Centered</h3>
                <p class="text-sm text-muted-foreground">
                  This content is centered both horizontally and vertically using flexbox.
                </p>
                <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                  Action Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Different Strategies -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Centering Strategies</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Flexbox Strategy -->
          <div>
            <h3 class="font-medium mb-3">Flexbox Strategy</h3>
            <div
              class="h-48 bg-purple-50 dark:bg-purple-950 border rounded-lg"
              sc-center-layout
              strategy="flex-center"
            >
              <div class="bg-white dark:bg-gray-800 border rounded p-4 text-center">
                <div sc-stack-layout gap="2">
                  <div class="w-8 h-8 bg-purple-500 rounded-full mx-auto"></div>
                  <span class="text-sm font-medium">Flex Center</span>
                  <span class="text-xs text-muted-foreground">display: flex</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Grid Strategy -->
          <div>
            <h3 class="font-medium mb-3">Grid Strategy</h3>
            <div
              class="h-48 bg-green-50 dark:bg-green-950 border rounded-lg"
              sc-center-layout
              strategy="grid-center"
            >
              <div class="bg-white dark:bg-gray-800 border rounded p-4 text-center">
                <div sc-stack-layout gap="2">
                  <div class="w-8 h-8 bg-green-500 rounded-full mx-auto"></div>
                  <span class="text-sm font-medium">Grid Center</span>
                  <span class="text-xs text-muted-foreground">display: grid</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Absolute Strategy -->
          <div>
            <h3 class="font-medium mb-3">Absolute Strategy</h3>
            <div
              class="h-48 bg-orange-50 dark:bg-orange-950 border rounded-lg"
              sc-center-layout
              strategy="absolute-center"
            >
              <div class="bg-white dark:bg-gray-800 border rounded p-4 text-center">
                <div sc-stack-layout gap="2">
                  <div class="w-8 h-8 bg-orange-500 rounded-full mx-auto"></div>
                  <span class="text-sm font-medium">Absolute Center</span>
                  <span class="text-xs text-muted-foreground">position: absolute</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Transform Strategy -->
          <div>
            <h3 class="font-medium mb-3">Transform Strategy</h3>
            <div
              class="h-48 bg-pink-50 dark:bg-pink-950 border rounded-lg"
              sc-center-layout
              strategy="transform"
            >
              <div class="bg-white dark:bg-gray-800 border rounded p-4 text-center">
                <div sc-stack-layout gap="2">
                  <div class="w-8 h-8 bg-pink-500 rounded-full mx-auto"></div>
                  <span class="text-sm font-medium">Transform Center</span>
                  <span class="text-xs text-muted-foreground">translate(-50%, -50%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Login Form Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Login Form Example</h2>
        <div class="px-8">
          <div
            class="h-96 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 border rounded-lg"
            sc-center-layout
            strategy="flex-center"
          >
            <div class="bg-card border rounded-lg p-8 w-full max-w-md">
              <div sc-stack-layout gap="6">
                <div class="text-center">
                  <h3 class="text-2xl font-bold">Welcome Back</h3>
                  <p class="text-sm text-muted-foreground mt-2">Sign in to your account</p>
                </div>

                <div sc-stack-layout gap="4">
                  <div>
                    <label class="block text-sm font-medium mb-2">Email</label>
                    <input
                      class="w-full p-3 border rounded-lg"
                      type="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Password</label>
                    <input
                      class="w-full p-3 border rounded-lg"
                      type="password"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>

                <div class="flex items-center justify-between text-sm">
                  <label class="flex items-center gap-2">
                    <input class="rounded" type="checkbox" />
                    <span>Remember me</span>
                  </label>
                  <a class="text-primary hover:underline" href="#">Forgot password?</a>
                </div>

                <button
                  class="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium"
                >
                  Sign In
                </button>

                <div class="text-center text-sm">
                  <span class="text-muted-foreground">Don't have an account?</span>
                  <a class="text-primary hover:underline" href="#">Sign up</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Error State Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Error State Example</h2>
        <div class="px-8">
          <div
            class="h-64 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg"
            sc-center-layout
            strategy="flex-center"
          >
            <div class="text-center max-w-md">
              <div sc-stack-layout gap="4">
                <div
                  class="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto"
                >
                  <span class="text-2xl">❌</span>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-red-900 dark:text-red-100">
                    Something went wrong
                  </h3>
                  <p class="text-sm text-red-700 dark:text-red-300 mt-2">
                    We encountered an error while processing your request. Please try again.
                  </p>
                </div>
                <div class="flex gap-3 justify-center">
                  <button class="bg-red-600 text-white px-4 py-2 rounded">Retry</button>
                  <button class="border border-red-600 text-red-600 px-4 py-2 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Loading State Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Loading State Example</h2>
        <div class="px-8">
          <div
            class="h-48 bg-blue-50 dark:bg-blue-950 border rounded-lg"
            sc-center-layout
            strategy="flex-center"
          >
            <div class="text-center">
              <div sc-stack-layout gap="4">
                <div
                  class="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"
                ></div>
                <div>
                  <h3 class="font-medium">Loading...</h3>
                  <p class="text-sm text-muted-foreground">
                    Please wait while we process your request
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Modal Content Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Modal Content Example</h2>
        <div class="px-8">
          <div
            class="h-80 bg-black/20 border rounded-lg backdrop-blur-sm"
            sc-center-layout
            strategy="flex-center"
          >
            <div class="bg-card border rounded-lg p-6 w-full max-w-lg mx-4">
              <div sc-stack-layout gap="4">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold">Confirm Action</h3>
                  <button class="text-muted-foreground hover:text-foreground">✕</button>
                </div>

                <div sc-stack-layout gap="3">
                  <p>Are you sure you want to delete this item? This action cannot be undone.</p>
                  <div
                    class="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded p-3"
                  >
                    <div class="flex gap-2">
                      <span class="text-yellow-600">⚠️</span>
                      <span class="text-sm text-yellow-800 dark:text-yellow-200">
                        This will permanently remove all associated data.
                      </span>
                    </div>
                  </div>
                </div>

                <div class="flex gap-3 justify-end">
                  <button class="border border-border px-4 py-2 rounded">Cancel</button>
                  <button class="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Empty State Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Empty State Example</h2>
        <div class="px-8">
          <div
            class="h-64 bg-gray-50 dark:bg-gray-900 border rounded-lg"
            sc-center-layout
            strategy="flex-center"
          >
            <div class="text-center max-w-sm">
              <div sc-stack-layout gap="4">
                <div
                  class="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto"
                >
                  <span class="text-3xl opacity-50">📭</span>
                </div>
                <div>
                  <h3 class="font-semibold">No items found</h3>
                  <p class="text-sm text-muted-foreground mt-2">
                    Your inbox is empty. New messages will appear here when they arrive.
                  </p>
                </div>
                <button class="bg-primary text-primary-foreground px-6 py-2 rounded">
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Coming Soon Page Example -->
      <section class="pb-12">
        <h2 class="text-2xl font-semibold mb-4 px-8">Coming Soon Page</h2>
        <div class="px-8">
          <div
            class="h-96 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-lg"
            sc-center-layout
            strategy="flex-center"
          >
            <div class="text-center max-w-2xl px-6">
              <div sc-stack-layout gap="6">
                <div>
                  <h1 class="text-4xl font-bold mb-4">Something Amazing is Coming</h1>
                  <p class="text-xl opacity-90">
                    We're working hard to bring you something spectacular. Stay tuned!
                  </p>
                </div>

                <div class="bg-white/10 backdrop-blur rounded-lg p-6">
                  <div sc-stack-layout gap="4">
                    <h3 class="font-semibold">Get notified when we launch</h3>
                    <div class="flex gap-3">
                      <input
                        class="flex-1 px-4 py-3 rounded bg-white/20 backdrop-blur border border-white/30 placeholder-white/70 text-white"
                        type="email"
                        placeholder="Enter your email"
                      />
                      <button class="bg-white text-indigo-600 px-6 py-3 rounded font-medium">
                        Notify Me
                      </button>
                    </div>
                  </div>
                </div>

                <div class="flex justify-center gap-6 text-white/80">
                  <a class="hover:text-white" href="#">Twitter</a>
                  <a class="hover:text-white" href="#">LinkedIn</a>
                  <a class="hover:text-white" href="#">GitHub</a>
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
export default class CenterLayoutDemo {}
