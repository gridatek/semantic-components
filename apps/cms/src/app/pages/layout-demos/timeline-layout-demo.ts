import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

import { ScStackLayout, ScTimelineLayout } from '@semantic-components/layouts';

@Component({
  selector: 'app-timeline-layout-demo',
  imports: [ScTimelineLayout, ScStackLayout],
  template: `
    <div class="space-y-12">
      <!-- Page Header -->
      <div class="p-8">
        <h1 class="text-3xl font-bold mb-4">ScTimelineLayout Demo</h1>
        <p class="text-lg text-muted-foreground">
          Vertical and horizontal timelines with different line styles and positioning options.
        </p>
      </div>

      <!-- Basic Vertical Timeline -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Basic Vertical Timeline</h2>
        <div class="px-8">
          <div
            sc-timeline-layout
            orientation="vertical"
            lineStyle="solid"
            linePosition="left"
            itemGap="6"
          >
            <div class="flex items-start gap-4">
              <div
                class="w-4 h-4 bg-primary rounded-full mt-1 z-10 border-2 border-background"
              ></div>
              <div class="bg-card border rounded-lg p-4 flex-1">
                <div sc-stack-layout gap="2">
                  <h3 class="font-semibold">Project Started</h3>
                  <p class="text-sm text-muted-foreground">March 15, 2024</p>
                  <p class="text-sm">
                    Initialized the new component library project with basic structure and
                    configuration.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-4 h-4 bg-primary rounded-full mt-1 z-10 border-2 border-background"
              ></div>
              <div class="bg-card border rounded-lg p-4 flex-1">
                <div sc-stack-layout gap="2">
                  <h3 class="font-semibold">Core Components Added</h3>
                  <p class="text-sm text-muted-foreground">March 22, 2024</p>
                  <p class="text-sm">
                    Implemented the first set of layout components including Stack, Grid, and Flex
                    layouts.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-4 h-4 bg-primary rounded-full mt-1 z-10 border-2 border-background"
              ></div>
              <div class="bg-card border rounded-lg p-4 flex-1">
                <div sc-stack-layout gap="2">
                  <h3 class="font-semibold">Documentation Complete</h3>
                  <p class="text-sm text-muted-foreground">March 29, 2024</p>
                  <p class="text-sm">
                    Finished comprehensive documentation and examples for all existing components.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div
                class="w-4 h-4 bg-green-500 rounded-full mt-1 z-10 border-2 border-background"
              ></div>
              <div class="bg-card border rounded-lg p-4 flex-1">
                <div sc-stack-layout gap="2">
                  <h3 class="font-semibold">Version 1.0 Released</h3>
                  <p class="text-sm text-muted-foreground">April 5, 2024</p>
                  <p class="text-sm">
                    Successfully launched the first stable version with all core functionality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Center Line Timeline -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Center Line Timeline</h2>
        <div class="px-8">
          <div
            sc-timeline-layout
            orientation="vertical"
            lineStyle="solid"
            linePosition="center"
            itemGap="8"
          >
            <div class="flex items-center gap-6">
              <div class="flex-1 text-right">
                <div class="bg-card border rounded-lg p-4">
                  <div sc-stack-layout gap="2">
                    <h3 class="font-semibold">Research Phase</h3>
                    <p class="text-sm text-muted-foreground">Q1 2024</p>
                    <p class="text-sm">Market analysis and user requirements gathering.</p>
                  </div>
                </div>
              </div>
              <div class="w-6 h-6 bg-blue-500 rounded-full z-10 border-4 border-background"></div>
              <div class="flex-1"></div>
            </div>

            <div class="flex items-center gap-6">
              <div class="flex-1"></div>
              <div class="w-6 h-6 bg-purple-500 rounded-full z-10 border-4 border-background"></div>
              <div class="flex-1">
                <div class="bg-card border rounded-lg p-4">
                  <div sc-stack-layout gap="2">
                    <h3 class="font-semibold">Development Phase</h3>
                    <p class="text-sm text-muted-foreground">Q2 2024</p>
                    <p class="text-sm">Core development and feature implementation.</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-6">
              <div class="flex-1 text-right">
                <div class="bg-card border rounded-lg p-4">
                  <div sc-stack-layout gap="2">
                    <h3 class="font-semibold">Testing Phase</h3>
                    <p class="text-sm text-muted-foreground">Q3 2024</p>
                    <p class="text-sm">Quality assurance and user acceptance testing.</p>
                  </div>
                </div>
              </div>
              <div class="w-6 h-6 bg-orange-500 rounded-full z-10 border-4 border-background"></div>
              <div class="flex-1"></div>
            </div>

            <div class="flex items-center gap-6">
              <div class="flex-1"></div>
              <div class="w-6 h-6 bg-green-500 rounded-full z-10 border-4 border-background"></div>
              <div class="flex-1">
                <div class="bg-card border rounded-lg p-4">
                  <div sc-stack-layout gap="2">
                    <h3 class="font-semibold">Launch Phase</h3>
                    <p class="text-sm text-muted-foreground">Q4 2024</p>
                    <p class="text-sm">Product launch and marketing campaign.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Different Line Styles -->
      <section class="px-8">
        <h2 class="text-2xl font-semibold mb-4">Line Style Variations</h2>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- Solid Line -->
          <div>
            <h3 class="font-medium mb-3">Solid Line</h3>
            <div
              class="h-64"
              sc-timeline-layout
              orientation="vertical"
              lineStyle="solid"
              linePosition="left"
              itemGap="4"
            >
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-red-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Step 1</p>
                  <p class="text-xs text-muted-foreground">Solid timeline</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-red-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Step 2</p>
                  <p class="text-xs text-muted-foreground">Continues here</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-red-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Step 3</p>
                  <p class="text-xs text-muted-foreground">Final step</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Dashed Line -->
          <div>
            <h3 class="font-medium mb-3">Dashed Line</h3>
            <div
              class="h-64"
              sc-timeline-layout
              orientation="vertical"
              lineStyle="dashed"
              linePosition="left"
              itemGap="4"
            >
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-blue-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Phase A</p>
                  <p class="text-xs text-muted-foreground">Dashed style</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-blue-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Phase B</p>
                  <p class="text-xs text-muted-foreground">In progress</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-blue-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Phase C</p>
                  <p class="text-xs text-muted-foreground">Planned</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Dotted Line -->
          <div>
            <h3 class="font-medium mb-3">Dotted Line</h3>
            <div
              class="h-64"
              sc-timeline-layout
              orientation="vertical"
              lineStyle="dotted"
              linePosition="left"
              itemGap="4"
            >
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-green-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Event 1</p>
                  <p class="text-xs text-muted-foreground">Dotted connection</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-green-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Event 2</p>
                  <p class="text-xs text-muted-foreground">Continuing</p>
                </div>
              </div>
              <div class="flex items-start gap-3">
                <div class="w-3 h-3 bg-green-500 rounded-full mt-1 z-10"></div>
                <div class="bg-card border rounded p-3 flex-1">
                  <p class="text-sm font-medium">Event 3</p>
                  <p class="text-xs text-muted-foreground">Latest event</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Horizontal Timeline -->
      <section>
        <h2 class="text-2xl font-semibold mb-4 px-8">Horizontal Timeline</h2>
        <div class="px-8">
          <div
            class="pb-4"
            sc-timeline-layout
            orientation="horizontal"
            lineStyle="solid"
            itemGap="6"
          >
            <div class="flex flex-col items-center gap-3 min-w-48">
              <div class="bg-card border rounded-lg p-4 w-full">
                <div sc-stack-layout gap="2">
                  <div class="w-4 h-4 bg-purple-500 rounded-full mx-auto"></div>
                  <h3 class="font-semibold text-center">Planning</h3>
                  <p class="text-xs text-muted-foreground text-center">Jan 2024</p>
                  <p class="text-sm text-center">
                    Initial project planning and requirements definition.
                  </p>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center gap-3 min-w-48">
              <div class="bg-card border rounded-lg p-4 w-full">
                <div sc-stack-layout gap="2">
                  <div class="w-4 h-4 bg-blue-500 rounded-full mx-auto"></div>
                  <h3 class="font-semibold text-center">Design</h3>
                  <p class="text-xs text-muted-foreground text-center">Feb 2024</p>
                  <p class="text-sm text-center">UI/UX design and architecture planning.</p>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center gap-3 min-w-48">
              <div class="bg-card border rounded-lg p-4 w-full">
                <div sc-stack-layout gap="2">
                  <div class="w-4 h-4 bg-orange-500 rounded-full mx-auto"></div>
                  <h3 class="font-semibold text-center">Development</h3>
                  <p class="text-xs text-muted-foreground text-center">Mar 2024</p>
                  <p class="text-sm text-center">Core development and feature implementation.</p>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-center gap-3 min-w-48">
              <div class="bg-card border rounded-lg p-4 w-full">
                <div sc-stack-layout gap="2">
                  <div class="w-4 h-4 bg-green-500 rounded-full mx-auto"></div>
                  <h3 class="font-semibold text-center">Launch</h3>
                  <p class="text-xs text-muted-foreground text-center">Apr 2024</p>
                  <p class="text-sm text-center">Product launch and deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Real-world Example: Order Tracking -->
      <section class="pb-12">
        <h2 class="text-2xl font-semibold mb-4 px-8">Order Tracking Example</h2>
        <div class="px-8">
          <div class="bg-card border rounded-lg p-6">
            <div sc-stack-layout gap="4">
              <div>
                <h3 class="text-lg font-semibold">Order #12345</h3>
                <p class="text-sm text-muted-foreground">Placed on March 15, 2024</p>
              </div>

              <div
                sc-timeline-layout
                orientation="vertical"
                lineStyle="solid"
                linePosition="left"
                itemGap="6"
              >
                <div class="flex items-start gap-4">
                  <div
                    class="w-5 h-5 bg-green-500 rounded-full mt-1 z-10 border-2 border-background"
                  >
                    <div class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  </div>
                  <div class="flex-1">
                    <div sc-stack-layout gap="1">
                      <div class="flex items-center justify-between">
                        <h4 class="font-medium">Order Confirmed</h4>
                        <span class="text-xs text-muted-foreground">Mar 15, 10:30 AM</span>
                      </div>
                      <p class="text-sm text-muted-foreground">
                        Your order has been confirmed and is being prepared.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                    class="w-5 h-5 bg-green-500 rounded-full mt-1 z-10 border-2 border-background"
                  >
                    <div class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  </div>
                  <div class="flex-1">
                    <div sc-stack-layout gap="1">
                      <div class="flex items-center justify-between">
                        <h4 class="font-medium">Package Prepared</h4>
                        <span class="text-xs text-muted-foreground">Mar 15, 2:15 PM</span>
                      </div>
                      <p class="text-sm text-muted-foreground">
                        Your package has been prepared and labeled for shipping.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                    class="w-5 h-5 bg-green-500 rounded-full mt-1 z-10 border-2 border-background"
                  >
                    <div class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  </div>
                  <div class="flex-1">
                    <div sc-stack-layout gap="1">
                      <div class="flex items-center justify-between">
                        <h4 class="font-medium">In Transit</h4>
                        <span class="text-xs text-muted-foreground">Mar 16, 8:00 AM</span>
                      </div>
                      <p class="text-sm text-muted-foreground">
                        Package is on its way to the destination.
                      </p>
                      <div class="bg-muted p-2 rounded text-xs">
                        <strong>Tracking:</strong>
                        PKG123456789
                      </div>
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div
                    class="w-5 h-5 bg-blue-500 rounded-full mt-1 z-10 border-2 border-background animate-pulse"
                  >
                    <div class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  </div>
                  <div class="flex-1">
                    <div sc-stack-layout gap="1">
                      <div class="flex items-center justify-between">
                        <h4 class="font-medium">Out for Delivery</h4>
                        <span class="text-xs text-muted-foreground">Expected today</span>
                      </div>
                      <p class="text-sm text-muted-foreground">
                        Your package is out for delivery and will arrive today.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex items-start gap-4 opacity-50">
                  <div
                    class="w-5 h-5 bg-gray-300 rounded-full mt-1 z-10 border-2 border-background"
                  >
                    <div class="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                  </div>
                  <div class="flex-1">
                    <div sc-stack-layout gap="1">
                      <div class="flex items-center justify-between">
                        <h4 class="font-medium">Delivered</h4>
                        <span class="text-xs text-muted-foreground">Pending</span>
                      </div>
                      <p class="text-sm text-muted-foreground">
                        Package will be marked as delivered upon completion.
                      </p>
                    </div>
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
export default class TimelineLayoutDemo {}
