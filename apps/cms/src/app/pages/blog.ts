import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import {
  ScHeroLayout,
  ScListLayout,
  ScMediaLayout,
  ScSidebarLayout,
  ScStackLayout,
} from '@semantic-components/layouts';

@Component({
  selector: 'app-blog',
  imports: [ScSidebarLayout, ScStackLayout, ScMediaLayout, ScHeroLayout, ScListLayout],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Hero Section -->
      <div
        class="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
        sc-hero-layout
        height="md"
        backgroundType="gradient"
        overlay="none"
        contentPosition="center"
      >
        <div class="text-center text-white max-w-4xl mx-auto px-6">
          <div sc-stack-layout gap="6">
            <h1 class="text-5xl font-bold">Developer Blog</h1>
            <p class="text-xl opacity-90">
              Insights, tutorials, and best practices for modern web development
            </p>
            <div class="flex gap-4 justify-center">
              <input
                class="px-4 py-3 rounded-lg text-gray-900 w-80"
                type="search"
                placeholder="Search articles..."
              />
              <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="py-12" sc-sidebar-layout direction="right" sidebarWidth="sm" gap="8">
        <!-- Articles List -->
        <div class="container mx-auto px-6">
          <div sc-stack-layout gap="8">
            <!-- Featured Article -->
            <section>
              <h2 class="text-2xl font-bold mb-6">Featured Article</h2>
              <div
                class="bg-card border rounded-lg overflow-hidden"
                sc-media-layout
                direction="media-left"
                mediaWidth="lg"
                gap="8"
              >
                <img
                  class="object-cover w-full h-full"
                  slot="media"
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop"
                  alt="Featured article"
                />
                <div class="p-8">
                  <div sc-stack-layout gap="4">
                    <div>
                      <div class="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          Featured
                        </span>
                        <span>March 15, 2024</span>
                        <span>•</span>
                        <span>8 min read</span>
                      </div>
                      <h3 class="text-2xl font-bold mb-3 hover:text-primary cursor-pointer">
                        Building Scalable Component Libraries: A Complete Guide
                      </h3>
                      <p class="text-muted-foreground text-lg">
                        Learn how to create and maintain component libraries that scale with your
                        organization's needs. This comprehensive guide covers everything from
                        planning to implementation.
                      </p>
                    </div>
                    <div class="flex items-center gap-4">
                      <div class="flex items-center gap-2">
                        <img
                          class="w-8 h-8 rounded-full"
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop"
                          alt="Author"
                        />
                        <span class="text-sm font-medium">Sarah Johnson</span>
                      </div>
                      <div class="flex gap-2">
                        <span
                          class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                        >
                          React
                        </span>
                        <span
                          class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                        >
                          Components
                        </span>
                        <span
                          class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                        >
                          Design System
                        </span>
                      </div>
                    </div>
                    <button
                      class="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium w-fit"
                    >
                      Read Article
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Recent Articles -->
            <section>
              <div class="flex items-center justify-between mb-6">
                <h2 class="text-2xl font-bold">Recent Articles</h2>
                <div class="flex gap-2">
                  <button class="bg-primary text-primary-foreground px-3 py-2 rounded text-sm">
                    All
                  </button>
                  <button class="border border-border px-3 py-2 rounded text-sm">
                    Development
                  </button>
                  <button class="border border-border px-3 py-2 rounded text-sm">Design</button>
                  <button class="border border-border px-3 py-2 rounded text-sm">Tutorial</button>
                </div>
              </div>

              <div sc-list-layout layout="cards" gap="6" itemsPerRow="2">
                <!-- Article 1 -->
                <article
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    class="w-full h-48 object-cover"
                    src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=200&fit=crop"
                    alt="Article thumbnail"
                  />
                  <div class="p-6">
                    <div sc-stack-layout gap="4">
                      <div>
                        <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>March 12, 2024</span>
                          <span>•</span>
                          <span>6 min read</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                          Advanced TypeScript Patterns for React
                        </h3>
                        <p class="text-muted-foreground">
                          Explore advanced TypeScript patterns that will make your React components
                          more robust and maintainable.
                        </p>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <img
                            class="w-6 h-6 rounded-full"
                            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=24&h=24&fit=crop"
                            alt="Author"
                          />
                          <span class="text-sm">Mike Chen</span>
                        </div>
                        <div class="flex gap-1">
                          <span
                            class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            TypeScript
                          </span>
                          <span
                            class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            React
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <!-- Article 2 -->
                <article
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    class="w-full h-48 object-cover"
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=200&fit=crop"
                    alt="Article thumbnail"
                  />
                  <div class="p-6">
                    <div sc-stack-layout gap="4">
                      <div>
                        <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>March 10, 2024</span>
                          <span>•</span>
                          <span>4 min read</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                          Modern CSS Layout Techniques
                        </h3>
                        <p class="text-muted-foreground">
                          Master modern CSS layout techniques including Grid, Flexbox, and Container
                          Queries.
                        </p>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <img
                            class="w-6 h-6 rounded-full"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=24&h=24&fit=crop"
                            alt="Author"
                          />
                          <span class="text-sm">Emma Wilson</span>
                        </div>
                        <div class="flex gap-1">
                          <span
                            class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            CSS
                          </span>
                          <span
                            class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            Layout
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <!-- Article 3 -->
                <article
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    class="w-full h-48 object-cover"
                    src="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=200&fit=crop"
                    alt="Article thumbnail"
                  />
                  <div class="p-6">
                    <div sc-stack-layout gap="4">
                      <div>
                        <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>March 8, 2024</span>
                          <span>•</span>
                          <span>10 min read</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                          Testing Strategies for Modern Web Apps
                        </h3>
                        <p class="text-muted-foreground">
                          Comprehensive guide to testing modern web applications with Jest, Cypress,
                          and Playwright.
                        </p>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <img
                            class="w-6 h-6 rounded-full"
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=24&h=24&fit=crop"
                            alt="Author"
                          />
                          <span class="text-sm">Alex Rodriguez</span>
                        </div>
                        <div class="flex gap-1">
                          <span
                            class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            Testing
                          </span>
                          <span
                            class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            JavaScript
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>

                <!-- Article 4 -->
                <article
                  class="bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    class="w-full h-48 object-cover"
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop"
                    alt="Article thumbnail"
                  />
                  <div class="p-6">
                    <div sc-stack-layout gap="4">
                      <div>
                        <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <span>March 5, 2024</span>
                          <span>•</span>
                          <span>7 min read</span>
                        </div>
                        <h3 class="text-xl font-semibold mb-2 hover:text-primary cursor-pointer">
                          Performance Optimization for React Apps
                        </h3>
                        <p class="text-muted-foreground">
                          Learn advanced techniques to optimize React application performance and
                          user experience.
                        </p>
                      </div>
                      <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                          <img
                            class="w-6 h-6 rounded-full"
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=24&h=24&fit=crop"
                            alt="Author"
                          />
                          <span class="text-sm">David Park</span>
                        </div>
                        <div class="flex gap-1">
                          <span
                            class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            React
                          </span>
                          <span
                            class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs"
                          >
                            Performance
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <!-- Load More -->
              <div class="text-center mt-8">
                <button class="border border-border px-6 py-3 rounded-lg hover:bg-muted">
                  Load More Articles
                </button>
              </div>
            </section>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="px-6" slot="sidebar">
          <div sc-stack-layout gap="8">
            <!-- Newsletter Signup -->
            <div
              class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border rounded-lg p-6"
            >
              <div sc-stack-layout gap="4">
                <h3 class="text-lg font-semibold">Stay Updated</h3>
                <p class="text-sm text-muted-foreground">
                  Get the latest articles and tutorials delivered to your inbox.
                </p>
                <div sc-stack-layout gap="3">
                  <input
                    class="w-full p-3 border rounded-lg"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button class="bg-primary text-primary-foreground py-2 rounded-lg font-medium">
                    Subscribe
                  </button>
                </div>
                <p class="text-xs text-muted-foreground">No spam, unsubscribe at any time.</p>
              </div>
            </div>

            <!-- Popular Articles -->
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="4">
                <h3 class="text-lg font-semibold">Popular This Week</h3>
                <div sc-stack-layout gap="4">
                  <div class="flex gap-3">
                    <div
                      class="w-12 h-12 bg-muted rounded flex items-center justify-center text-sm font-medium"
                    >
                      1
                    </div>
                    <div sc-stack-layout gap="1">
                      <h4 class="font-medium text-sm hover:text-primary cursor-pointer">
                        React 18 New Features Guide
                      </h4>
                      <p class="text-xs text-muted-foreground">2.1K views</p>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <div
                      class="w-12 h-12 bg-muted rounded flex items-center justify-center text-sm font-medium"
                    >
                      2
                    </div>
                    <div sc-stack-layout gap="1">
                      <h4 class="font-medium text-sm hover:text-primary cursor-pointer">
                        CSS Grid vs Flexbox Guide
                      </h4>
                      <p class="text-xs text-muted-foreground">1.8K views</p>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <div
                      class="w-12 h-12 bg-muted rounded flex items-center justify-center text-sm font-medium"
                    >
                      3
                    </div>
                    <div sc-stack-layout gap="1">
                      <h4 class="font-medium text-sm hover:text-primary cursor-pointer">
                        Next.js 13 App Router
                      </h4>
                      <p class="text-xs text-muted-foreground">1.5K views</p>
                    </div>
                  </div>

                  <div class="flex gap-3">
                    <div
                      class="w-12 h-12 bg-muted rounded flex items-center justify-center text-sm font-medium"
                    >
                      4
                    </div>
                    <div sc-stack-layout gap="1">
                      <h4 class="font-medium text-sm hover:text-primary cursor-pointer">
                        TypeScript Best Practices
                      </h4>
                      <p class="text-xs text-muted-foreground">1.2K views</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Categories -->
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="4">
                <h3 class="text-lg font-semibold">Categories</h3>
                <div sc-stack-layout gap="2">
                  <a class="flex items-center justify-between py-2 hover:text-primary" href="#">
                    <span>Development</span>
                    <span class="text-sm text-muted-foreground">89</span>
                  </a>
                  <a class="flex items-center justify-between py-2 hover:text-primary" href="#">
                    <span>Design</span>
                    <span class="text-sm text-muted-foreground">34</span>
                  </a>
                  <a class="flex items-center justify-between py-2 hover:text-primary" href="#">
                    <span>Tutorial</span>
                    <span class="text-sm text-muted-foreground">23</span>
                  </a>
                  <a class="flex items-center justify-between py-2 hover:text-primary" href="#">
                    <span>News</span>
                    <span class="text-sm text-muted-foreground">12</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="bg-card border rounded-lg p-6">
              <div sc-stack-layout gap="4">
                <h3 class="text-lg font-semibold">Popular Tags</h3>
                <div class="flex flex-wrap gap-2">
                  <span
                    class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 cursor-pointer"
                  >
                    React
                  </span>
                  <span
                    class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 cursor-pointer"
                  >
                    TypeScript
                  </span>
                  <span
                    class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 cursor-pointer"
                  >
                    CSS
                  </span>
                  <span
                    class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 cursor-pointer"
                  >
                    JavaScript
                  </span>
                  <span
                    class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 cursor-pointer"
                  >
                    Next.js
                  </span>
                  <span
                    class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 cursor-pointer"
                  >
                    Performance
                  </span>
                  <span
                    class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 cursor-pointer"
                  >
                    Testing
                  </span>
                  <span
                    class="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm hover:bg-secondary/80 cursor-pointer"
                  >
                    Design System
                  </span>
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
export default class BlogPage {}
