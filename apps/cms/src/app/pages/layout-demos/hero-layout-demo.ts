import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScHeroLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-hero-layout-demo',
  imports: [ScHeroLayout],
  template: `
    <div class="space-y-12">
      <!-- Page Header -->
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">ScHeroLayout Demo</h1>
        <p class="text-lg text-muted-foreground">
          Landing page heroes with background images, overlays, and flexible content positioning.
        </p>
      </div>

      <!-- Basic Hero -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Basic Hero Section</h2>
        <div
          class="bg-gradient-to-r from-blue-600 to-purple-600"
          sc-hero-layout
          height="md"
          backgroundType="gradient"
          overlay="medium"
          contentPosition="center"
        >
          <div class="text-center text-white">
            <h1 class="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
            <p class="text-xl mb-6 opacity-90">Build amazing experiences with our tools</p>
            <button
              class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      <!-- Image Background Hero -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Image Background Hero</h2>
        <div
          sc-hero-layout
          height="lg"
          backgroundType="image"
          overlay="dark"
          contentPosition="center"
          contentWidth="xl"
          style="background-image: url('https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=600&fit=crop')"
        >
          <div class="text-center text-white">
            <h1 class="text-5xl font-bold mb-6">Innovation Starts Here</h1>
            <p class="text-xl mb-8 max-w-2xl mx-auto">
              Discover cutting-edge solutions that transform the way you work and create.
            </p>
            <div class="flex gap-4 justify-center">
              <button class="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold">
                Learn More
              </button>
              <button
                class="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900"
              >
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Left-aligned Content -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Left-aligned Hero</h2>
        <div
          sc-hero-layout
          height="lg"
          backgroundType="image"
          overlay="medium"
          contentPosition="left"
          contentWidth="lg"
          padding="12"
          style="background-image: url('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop')"
        >
          <div class="text-white">
            <div class="inline-block bg-primary px-3 py-1 rounded text-sm font-medium mb-4">
              New Feature
            </div>
            <h1 class="text-4xl font-bold mb-4">Advanced Analytics Dashboard</h1>
            <p class="text-lg mb-6 opacity-90 max-w-md">
              Get real-time insights into your business performance with our comprehensive analytics
              suite.
            </p>
            <div class="flex gap-3">
              <button class="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold">
                Start Free Trial
              </button>
              <button class="text-white underline hover:no-underline">View Pricing →</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Minimal Hero -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Minimal Hero</h2>
        <div
          class="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950"
          sc-hero-layout
          height="md"
          backgroundType="solid"
          overlay="none"
          contentPosition="center"
        >
          <div class="text-center">
            <div
              class="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span class="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Now Available
            </div>
            <h1 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              Simple. Powerful. Effective.
            </h1>
            <p class="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              The tool you need to streamline your workflow and boost productivity.
            </p>
            <button
              class="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Try It Now
            </button>
          </div>
        </div>
      </section>

      <!-- Bottom-positioned Content -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Bottom-positioned Hero</h2>
        <div
          sc-hero-layout
          height="lg"
          backgroundType="image"
          overlay="light"
          contentPosition="bottom-center"
          contentWidth="2xl"
          style="background-image: url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=600&fit=crop')"
        >
          <div class="text-center text-white bg-black/50 backdrop-blur-sm p-8 rounded-lg">
            <h1 class="text-3xl font-bold mb-3">Ready to Transform Your Business?</h1>
            <p class="text-lg mb-6 opacity-90">
              Join thousands of companies already using our platform
            </p>
            <div class="flex gap-4 justify-center flex-wrap">
              <input
                class="px-4 py-2 rounded text-gray-900 flex-1 max-w-xs"
                type="email"
                placeholder="Enter your email"
              />
              <button class="bg-primary text-primary-foreground px-6 py-2 rounded font-semibold">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Multiple Height Options -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Height Variations</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Small Hero -->
          <div
            class="bg-gradient-to-r from-pink-500 to-rose-500"
            sc-hero-layout
            height="sm"
            backgroundType="gradient"
            overlay="none"
            contentPosition="center"
          >
            <div class="text-center text-white">
              <h3 class="text-xl font-bold">Small Hero</h3>
              <p class="text-sm opacity-90">height="sm"</p>
            </div>
          </div>

          <!-- Medium Hero -->
          <div
            class="bg-gradient-to-r from-blue-500 to-indigo-500"
            sc-hero-layout
            height="md"
            backgroundType="gradient"
            overlay="none"
            contentPosition="center"
          >
            <div class="text-center text-white">
              <h3 class="text-xl font-bold">Medium Hero</h3>
              <p class="text-sm opacity-90">height="md"</p>
            </div>
          </div>

          <!-- Large Hero -->
          <div
            class="bg-gradient-to-r from-emerald-500 to-teal-500"
            sc-hero-layout
            height="lg"
            backgroundType="gradient"
            overlay="none"
            contentPosition="center"
          >
            <div class="text-center text-white">
              <h3 class="text-xl font-bold">Large Hero</h3>
              <p class="text-sm opacity-90">height="lg"</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Video Background Hero -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Video Background Hero</h2>
        <div
          sc-hero-layout
          height="lg"
          backgroundType="video"
          overlay="dark"
          contentPosition="center"
          contentWidth="xl"
        >
          <!-- Video background would go in the background slot -->
          <div
            class="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-700"
            slot="background"
          ></div>

          <div class="text-center text-white">
            <h1 class="text-4xl font-bold mb-4">Experience the Future</h1>
            <p class="text-xl mb-8 opacity-90">Immersive experiences that captivate and inspire</p>
            <button
              class="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
            >
              Watch Video
            </button>
          </div>
        </div>
      </section>

      <!-- Call-to-Action Hero -->
      <section class="pb-12">
        <h2 class="text-2xl font-semibold mb-4 px-8">Call-to-Action Hero</h2>
        <div
          class="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500"
          sc-hero-layout
          height="md"
          backgroundType="gradient"
          overlay="none"
          contentPosition="center"
        >
          <div class="text-center text-white">
            <h1 class="text-3xl font-bold mb-4">Limited Time Offer</h1>
            <p class="text-lg mb-6 opacity-90">
              Get 50% off your first year. No commitment required.
            </p>
            <div class="flex gap-4 justify-center items-center flex-wrap">
              <span class="text-2xl font-bold">$49/month</span>
              <span class="text-lg line-through opacity-75">$99/month</span>
              <button
                class="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 ml-4"
              >
                Claim Offer
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
export default class HeroLayoutDemo {}
