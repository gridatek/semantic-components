import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScHeaderLayout,
  ScSidebarLayout,
  ScSplitLayout,
  ScStackLayout,
} from '@semantic-components/layouts';

@Component({
  selector: 'app-articles',
  imports: [ScStackLayout, ScSplitLayout, ScHeaderLayout],
  template: `
    <div class="min-h-screen" sc-header-layout>
      <!-- Header -->
      <div class="bg-card border-b" slot="header">
        <div class="px-6 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-4">
              <a class="text-primary hover:underline" href="/dashboard">← Back to Dashboard</a>
              <div class="w-px h-6 bg-border"></div>
              <h1 class="text-xl font-semibold">Articles</h1>
            </div>
            <div class="flex items-center gap-3">
              <input
                class="px-3 py-2 border rounded-lg w-64"
                type="search"
                placeholder="Search articles..."
              />
              <button class="border border-border px-4 py-2 rounded">Filter</button>
              <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                New Article
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div sc-split-layout direction="horizontal" ratio="70-30" gap="0">
        <!-- Articles List -->
        <div class="bg-background">
          <div class="p-6">
            <div sc-stack-layout gap="6">
              <!-- Filter Tabs -->
              <div class="border-b">
                <nav class="flex gap-6">
                  <a class="border-b-2 border-primary text-primary py-2" href="#">
                    All Articles (127)
                  </a>
                  <a class="py-2 text-muted-foreground hover:text-foreground" href="#">
                    Published (89)
                  </a>
                  <a class="py-2 text-muted-foreground hover:text-foreground" href="#">
                    Drafts (24)
                  </a>
                  <a class="py-2 text-muted-foreground hover:text-foreground" href="#">
                    Review (14)
                  </a>
                </nav>
              </div>

              <!-- Articles Grid -->
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <!-- Article Card 1 -->
                <div
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    class="w-full h-32 object-cover"
                    src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=200&fit=crop"
                    alt="Article cover"
                  />
                  <div class="p-4">
                    <div sc-stack-layout gap="3">
                      <div>
                        <h3 class="font-semibold hover:text-primary cursor-pointer">
                          Building Scalable Component Libraries
                        </h3>
                        <p class="text-sm text-muted-foreground mt-1">
                          Learn how to create and maintain component libraries that scale with your
                          organization's needs.
                        </p>
                      </div>
                      <div class="flex items-center gap-2 text-xs">
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Published
                        </span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Development
                        </span>
                        <span class="text-muted-foreground">March 15, 2024</span>
                      </div>
                      <div class="flex items-center justify-between text-sm text-muted-foreground">
                        <span>By Sarah Johnson</span>
                        <div class="flex gap-4">
                          <span>1.2K views</span>
                          <span>23 comments</span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button
                          class="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button class="border border-border px-3 py-1 rounded text-sm">
                          Preview
                        </button>
                        <button class="text-muted-foreground hover:text-foreground px-2">⋯</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Article Card 2 -->
                <div
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    class="w-full h-32 object-cover"
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop"
                    alt="Article cover"
                  />
                  <div class="p-4">
                    <div sc-stack-layout gap="3">
                      <div>
                        <h3 class="font-semibold hover:text-primary cursor-pointer">
                          Advanced TypeScript Patterns for React
                        </h3>
                        <p class="text-sm text-muted-foreground mt-1">
                          Explore advanced TypeScript patterns that will make your React components
                          more robust and maintainable.
                        </p>
                      </div>
                      <div class="flex items-center gap-2 text-xs">
                        <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Draft
                        </span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Development
                        </span>
                        <span class="text-muted-foreground">March 12, 2024</span>
                      </div>
                      <div class="flex items-center justify-between text-sm text-muted-foreground">
                        <span>By Mike Chen</span>
                        <div class="flex gap-4">
                          <span>Draft</span>
                          <span>-</span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button
                          class="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button class="border border-border px-3 py-1 rounded text-sm">
                          Preview
                        </button>
                        <button class="text-muted-foreground hover:text-foreground px-2">⋯</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Article Card 3 -->
                <div
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    class="w-full h-32 object-cover"
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop"
                    alt="Article cover"
                  />
                  <div class="p-4">
                    <div sc-stack-layout gap="3">
                      <div>
                        <h3 class="font-semibold hover:text-primary cursor-pointer">
                          Modern CSS Layout Techniques
                        </h3>
                        <p class="text-sm text-muted-foreground mt-1">
                          Master modern CSS layout techniques including Grid, Flexbox, and Container
                          Queries.
                        </p>
                      </div>
                      <div class="flex items-center gap-2 text-xs">
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Published
                        </span>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          Design
                        </span>
                        <span class="text-muted-foreground">March 10, 2024</span>
                      </div>
                      <div class="flex items-center justify-between text-sm text-muted-foreground">
                        <span>By Emma Wilson</span>
                        <div class="flex gap-4">
                          <span>892 views</span>
                          <span>15 comments</span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button
                          class="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button class="border border-border px-3 py-1 rounded text-sm">
                          Preview
                        </button>
                        <button class="text-muted-foreground hover:text-foreground px-2">⋯</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Article Card 4 -->
                <div
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    class="w-full h-32 object-cover"
                    src="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=200&fit=crop"
                    alt="Article cover"
                  />
                  <div class="p-4">
                    <div sc-stack-layout gap="3">
                      <div>
                        <h3 class="font-semibold hover:text-primary cursor-pointer">
                          Testing Strategies for Modern Web Apps
                        </h3>
                        <p class="text-sm text-muted-foreground mt-1">
                          Comprehensive guide to testing modern web applications with Jest, Cypress,
                          and Playwright.
                        </p>
                      </div>
                      <div class="flex items-center gap-2 text-xs">
                        <span class="bg-red-100 text-red-800 px-2 py-1 rounded-full">Review</span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Development
                        </span>
                        <span class="text-muted-foreground">March 8, 2024</span>
                      </div>
                      <div class="flex items-center justify-between text-sm text-muted-foreground">
                        <span>By Alex Rodriguez</span>
                        <div class="flex gap-4">
                          <span>In Review</span>
                          <span>-</span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button
                          class="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button class="border border-border px-3 py-1 rounded text-sm">
                          Preview
                        </button>
                        <button class="text-muted-foreground hover:text-foreground px-2">⋯</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Article Card 5 -->
                <div
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    class="w-full h-32 object-cover"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=200&fit=crop"
                    alt="Article cover"
                  />
                  <div class="p-4">
                    <div sc-stack-layout gap="3">
                      <div>
                        <h3 class="font-semibold hover:text-primary cursor-pointer">
                          Performance Optimization for React Apps
                        </h3>
                        <p class="text-sm text-muted-foreground mt-1">
                          Learn advanced techniques to optimize React application performance and
                          user experience.
                        </p>
                      </div>
                      <div class="flex items-center gap-2 text-xs">
                        <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          Published
                        </span>
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Development
                        </span>
                        <span class="text-muted-foreground">March 5, 2024</span>
                      </div>
                      <div class="flex items-center justify-between text-sm text-muted-foreground">
                        <span>By David Park</span>
                        <div class="flex gap-4">
                          <span>2.1K views</span>
                          <span>45 comments</span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button
                          class="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button class="border border-border px-3 py-1 rounded text-sm">
                          Preview
                        </button>
                        <button class="text-muted-foreground hover:text-foreground px-2">⋯</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Article Card 6 -->
                <div
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    class="w-full h-32 object-cover"
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=200&fit=crop"
                    alt="Article cover"
                  />
                  <div class="p-4">
                    <div sc-stack-layout gap="3">
                      <div>
                        <h3 class="font-semibold hover:text-primary cursor-pointer">
                          Design System Implementation Guide
                        </h3>
                        <p class="text-sm text-muted-foreground mt-1">
                          Step-by-step guide to implementing a design system in your organization.
                        </p>
                      </div>
                      <div class="flex items-center gap-2 text-xs">
                        <span class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                          Draft
                        </span>
                        <span class="bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          Design
                        </span>
                        <span class="text-muted-foreground">March 3, 2024</span>
                      </div>
                      <div class="flex items-center justify-between text-sm text-muted-foreground">
                        <span>By Lisa Zhang</span>
                        <div class="flex gap-4">
                          <span>Draft</span>
                          <span>-</span>
                        </div>
                      </div>
                      <div class="flex gap-2">
                        <button
                          class="bg-primary text-primary-foreground px-3 py-1 rounded text-sm"
                        >
                          Edit
                        </button>
                        <button class="border border-border px-3 py-1 rounded text-sm">
                          Preview
                        </button>
                        <button class="text-muted-foreground hover:text-foreground px-2">⋯</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Pagination -->
              <div class="flex items-center justify-between">
                <span class="text-sm text-muted-foreground">Showing 1-6 of 127 articles</span>
                <div class="flex gap-2">
                  <button
                    class="border border-border px-3 py-2 rounded disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <button class="bg-primary text-primary-foreground px-3 py-2 rounded">1</button>
                  <button class="border border-border px-3 py-2 rounded">2</button>
                  <button class="border border-border px-3 py-2 rounded">3</button>
                  <span class="px-2">...</span>
                  <button class="border border-border px-3 py-2 rounded">22</button>
                  <button class="border border-border px-3 py-2 rounded">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar Filters -->
        <div class="bg-muted/30 border-l p-6">
          <div sc-stack-layout gap="6">
            <div>
              <h3 class="font-medium mb-3">Categories</h3>
              <div sc-stack-layout gap="2">
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" checked />
                  <span>Development (89)</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>Design (34)</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>Tutorial (23)</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>News (12)</span>
                </label>
              </div>
            </div>

            <div>
              <h3 class="font-medium mb-3">Authors</h3>
              <div sc-stack-layout gap="2">
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>Sarah Johnson (23)</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>Mike Chen (18)</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>Emma Wilson (15)</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>Alex Rodriguez (12)</span>
                </label>
              </div>
            </div>

            <div>
              <h3 class="font-medium mb-3">Date Range</h3>
              <div sc-stack-layout gap="2">
                <label class="flex items-center gap-2 text-sm">
                  <input type="radio" name="date" checked />
                  <span>Last 30 days</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input type="radio" name="date" />
                  <span>Last 3 months</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input type="radio" name="date" />
                  <span>Last year</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input type="radio" name="date" />
                  <span>All time</span>
                </label>
              </div>
            </div>

            <div>
              <h3 class="font-medium mb-3">Status</h3>
              <div sc-stack-layout gap="2">
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" checked />
                  <span>Published (89)</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>Draft (24)</span>
                </label>
                <label class="flex items-center gap-2 text-sm">
                  <input class="rounded" type="checkbox" />
                  <span>Under Review (14)</span>
                </label>
              </div>
            </div>

            <button class="w-full bg-primary text-primary-foreground py-2 rounded">
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ArticlesPage {}
