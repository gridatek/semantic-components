import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScMediaLayout, ScStackLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-media-layout-demo',
  imports: [ScMediaLayout, ScStackLayout],
  template: `
    <div class="space-y-12">
      <!-- Page Header -->
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">ScMediaLayout Demo</h1>
        <p class="text-lg text-muted-foreground">
          Image and video layouts with text content in various configurations.
        </p>
      </div>

      <!-- Basic Image + Text -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Basic Image + Text Layout</h2>
        <div class="px-8">
          <div sc-media-layout direction="left" mediaWidth="md" gap="6">
            <img
              class="rounded-lg object-cover w-full h-full"
              slot="media"
              src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
              alt="Technology"
            />
            <div>
              <div sc-stack-layout gap="4">
                <h3 class="text-xl font-semibold">Innovation in Technology</h3>
                <p class="text-muted-foreground">
                  The rapid advancement of technology continues to reshape how we work, communicate,
                  and solve complex problems. From artificial intelligence to quantum computing,
                  each breakthrough opens new possibilities for the future.
                </p>
                <p class="text-muted-foreground">
                  Understanding these developments and their implications helps us better prepare
                  for a world where technology and human creativity work together to create
                  unprecedented solutions.
                </p>
                <button class="bg-primary text-primary-foreground px-4 py-2 rounded w-fit">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Right Media Layout -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Right Media Layout</h2>
        <div class="px-8">
          <div sc-media-layout direction="right" mediaWidth="lg" gap="8">
            <div>
              <div sc-stack-layout gap="4">
                <h3 class="text-xl font-semibold">Sustainable Development</h3>
                <p class="text-muted-foreground">
                  Creating a sustainable future requires innovative approaches to energy,
                  transportation, and urban planning. Green technologies are becoming more
                  accessible and cost-effective.
                </p>
                <div
                  class="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4"
                >
                  <h4 class="font-medium text-green-900 dark:text-green-100 mb-2">Key Benefits</h4>
                  <ul class="text-sm text-green-800 dark:text-green-200 space-y-1">
                    <li>• Reduced environmental impact</li>
                    <li>• Long-term cost savings</li>
                    <li>• Improved quality of life</li>
                    <li>• Future-proof solutions</li>
                  </ul>
                </div>
                <a class="text-primary hover:underline" href="#">Learn about our initiatives →</a>
              </div>
            </div>
            <img
              class="rounded-lg object-cover w-full h-full"
              slot="media"
              src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&h=400&fit=crop"
              alt="Nature"
            />
          </div>
        </div>
      </section>

      <!-- Different Media Widths -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Media Width Variations</h2>
        <div class="space-y-8">
          <!-- Small Media -->
          <div>
            <h3 class="font-medium mb-3">Small Media (mediaWidth="sm")</h3>
            <div
              class="bg-card border rounded-lg p-4"
              sc-media-layout
              direction="left"
              mediaWidth="sm"
              gap="4"
            >
              <div
                class="bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center w-full h-full"
                slot="media"
              >
                <span class="text-sm font-medium">150px</span>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Compact Layout</h4>
                <p class="text-sm text-muted-foreground">
                  Small media width is perfect for thumbnails, icons, or compact layouts where the
                  text content is the primary focus.
                </p>
              </div>
            </div>
          </div>

          <!-- Medium Media -->
          <div>
            <h3 class="font-medium mb-3">Medium Media (mediaWidth="md")</h3>
            <div
              class="bg-card border rounded-lg p-4"
              sc-media-layout
              direction="left"
              mediaWidth="md"
              gap="4"
            >
              <div
                class="bg-green-100 dark:bg-green-900 rounded flex items-center justify-center w-full h-full"
                slot="media"
              >
                <span class="text-sm font-medium">200px</span>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Balanced Layout</h4>
                <p class="text-sm text-muted-foreground">
                  Medium width provides a good balance between media and text content, suitable for
                  most content layouts and article previews.
                </p>
              </div>
            </div>
          </div>

          <!-- Large Media -->
          <div>
            <h3 class="font-medium mb-3">Large Media (mediaWidth="lg")</h3>
            <div
              class="bg-card border rounded-lg p-4"
              sc-media-layout
              direction="left"
              mediaWidth="lg"
              gap="4"
            >
              <div
                class="bg-purple-100 dark:bg-purple-900 rounded flex items-center justify-center w-full h-full"
                slot="media"
              >
                <span class="text-sm font-medium">300px</span>
              </div>
              <div>
                <h4 class="font-semibold mb-2">Prominent Media</h4>
                <p class="text-sm text-muted-foreground">
                  Large media width emphasizes visual content, ideal for showcasing products,
                  portfolios, or when the image is a key part of the content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Video Content Example -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Video Content Layout</h2>
        <div class="px-8">
          <div sc-media-layout direction="left" mediaWidth="lg" gap="6">
            <div class="bg-black rounded-lg overflow-hidden aspect-video" slot="media">
              <div class="w-full h-full flex items-center justify-center text-white">
                <div class="text-center">
                  <div
                    class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2"
                  >
                    <span class="text-2xl">▶️</span>
                  </div>
                  <span class="text-sm">Video Player</span>
                </div>
              </div>
            </div>
            <div>
              <div sc-stack-layout gap="4">
                <div>
                  <h3 class="text-xl font-semibold">Getting Started Tutorial</h3>
                  <p class="text-sm text-muted-foreground">Duration: 5:30</p>
                </div>
                <p class="text-muted-foreground">
                  This comprehensive tutorial walks you through the basic concepts and helps you get
                  up and running quickly. Perfect for beginners who want to understand the
                  fundamentals.
                </p>
                <div class="flex gap-3">
                  <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                    Watch Now
                  </button>
                  <button class="border border-border px-4 py-2 rounded">Save for Later</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Product Showcase -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Product Showcase</h2>
        <div class="px-8">
          <div class="space-y-6">
            <!-- Product 1 -->
            <div
              class="bg-card border rounded-lg p-6"
              sc-media-layout
              direction="left"
              mediaWidth="md"
              gap="6"
            >
              <img
                class="rounded-lg object-cover w-full h-full"
                slot="media"
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop"
                alt="Headphones"
              />
              <div>
                <div sc-stack-layout gap="3">
                  <div>
                    <h3 class="text-lg font-semibold">Premium Wireless Headphones</h3>
                    <p class="text-2xl font-bold text-primary">$299.99</p>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    Experience crystal-clear audio with our latest wireless headphones featuring
                    noise cancellation and 30-hour battery life.
                  </p>
                  <div class="flex gap-2">
                    <span class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                      Wireless
                    </span>
                    <span class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                      Noise Cancelling
                    </span>
                    <span class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                      30h Battery
                    </span>
                  </div>
                  <div class="flex gap-3">
                    <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                      Add to Cart
                    </button>
                    <button class="border border-border px-4 py-2 rounded">View Details</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Product 2 -->
            <div
              class="bg-card border rounded-lg p-6"
              sc-media-layout
              direction="right"
              mediaWidth="md"
              gap="6"
            >
              <div>
                <div sc-stack-layout gap="3">
                  <div>
                    <h3 class="text-lg font-semibold">Smart Fitness Watch</h3>
                    <p class="text-2xl font-bold text-primary">$199.99</p>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    Track your fitness goals with our advanced smartwatch featuring GPS, heart rate
                    monitoring, and week-long battery life.
                  </p>
                  <div class="flex gap-2">
                    <span class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                      GPS
                    </span>
                    <span class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                      Heart Rate
                    </span>
                    <span class="bg-secondary text-secondary-foreground px-2 py-1 rounded text-xs">
                      7 Day Battery
                    </span>
                  </div>
                  <div class="flex gap-3">
                    <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                      Add to Cart
                    </button>
                    <button class="border border-border px-4 py-2 rounded">View Details</button>
                  </div>
                </div>
              </div>
              <img
                class="rounded-lg object-cover w-full h-full"
                slot="media"
                src="https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=300&h=300&fit=crop"
                alt="Smartwatch"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Team Member Profiles -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Team Member Profiles</h2>
        <div class="px-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Team Member 1 -->
            <div
              class="bg-card border rounded-lg p-4"
              sc-media-layout
              direction="left"
              mediaWidth="sm"
              gap="4"
            >
              <img
                class="rounded-full object-cover w-full h-full"
                slot="media"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop"
                alt="John Smith"
              />
              <div>
                <div sc-stack-layout gap="2">
                  <div>
                    <h3 class="font-semibold">John Smith</h3>
                    <p class="text-sm text-primary">Lead Developer</p>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    Passionate about creating scalable solutions and mentoring junior developers.
                  </p>
                  <div class="flex gap-2">
                    <a class="text-primary hover:underline text-sm" href="#">LinkedIn</a>
                    <a class="text-primary hover:underline text-sm" href="#">GitHub</a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Team Member 2 -->
            <div
              class="bg-card border rounded-lg p-4"
              sc-media-layout
              direction="left"
              mediaWidth="sm"
              gap="4"
            >
              <img
                class="rounded-full object-cover w-full h-full"
                slot="media"
                src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop"
                alt="Sarah Johnson"
              />
              <div>
                <div sc-stack-layout gap="2">
                  <div>
                    <h3 class="font-semibold">Sarah Johnson</h3>
                    <p class="text-sm text-primary">UX Designer</p>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    Focused on creating intuitive user experiences and beautiful interfaces.
                  </p>
                  <div class="flex gap-2">
                    <a class="text-primary hover:underline text-sm" href="#">Portfolio</a>
                    <a class="text-primary hover:underline text-sm" href="#">Dribbble</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Blog Post Layout -->
      <section class="pb-12">
        <h2 class="text-2xl font-semibold mb-4 px-8">Blog Post Layout</h2>
        <div class="px-8">
          <div sc-media-layout direction="left" mediaWidth="lg" gap="8">
            <img
              class="rounded-lg object-cover w-full h-full"
              slot="media"
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop"
              alt="Office workspace"
            />
            <div>
              <article>
                <div sc-stack-layout gap="4">
                  <div>
                    <div class="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <span>March 15, 2024</span>
                      <span>•</span>
                      <span>5 min read</span>
                      <span>•</span>
                      <span class="text-primary">Development</span>
                    </div>
                    <h1 class="text-2xl font-bold">Building Better User Interfaces</h1>
                  </div>

                  <p class="text-muted-foreground">
                    Creating exceptional user interfaces requires a deep understanding of user
                    needs, design principles, and modern development practices. In this article, we
                    explore the key strategies for building interfaces that are both beautiful and
                    functional.
                  </p>

                  <div class="bg-muted/50 border-l-4 border-primary pl-4">
                    <p class="text-sm italic">
                      "Good design is obvious. Great design is transparent." - Joe Sparano
                    </p>
                  </div>

                  <div class="flex items-center gap-4">
                    <button class="bg-primary text-primary-foreground px-4 py-2 rounded">
                      Read Full Article
                    </button>
                    <div class="flex gap-2 text-sm text-muted-foreground">
                      <button class="hover:text-foreground">Like</button>
                      <button class="hover:text-foreground">Share</button>
                      <button class="hover:text-foreground">Save</button>
                    </div>
                  </div>
                </div>
              </article>
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
export default class MediaLayoutDemo {}
