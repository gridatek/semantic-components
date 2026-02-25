import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAccordionBody,
  ScAccordionContent,
  ScAccordionGroup,
  ScAccordionHeader,
  ScAccordionItem,
  ScAccordionPanel,
  ScAccordionTrigger,
  ScAlert,
  ScAlertDescription,
  ScAlertTitle,
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScBadge,
  ScButton,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScCheckbox,
  ScInput,
  ScKbd,
  ScLabel,
  ScProgress,
  ScSeparator,
  ScSkeleton,
  ScSlider,
  ScSpinner,
  ScSwitch,
  ScTab,
  ScTabList,
  ScTabPanel,
  ScTabs,
  ScTextarea,
  ScToggle,
  ScToggleGroup,
} from '@semantic-components/ui';

@Component({
  selector: 'app-gallery',
  imports: [
    ScAccordionBody,
    ScAccordionContent,
    ScAccordionGroup,
    ScAccordionHeader,
    ScAccordionItem,
    ScAccordionPanel,
    ScAccordionTrigger,
    ScAlert,
    ScAlertDescription,
    ScAlertTitle,
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScBadge,
    ScButton,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScCheckbox,
    ScInput,
    ScKbd,
    ScLabel,
    ScProgress,
    ScSeparator,
    ScSkeleton,
    ScSlider,
    ScSpinner,
    ScSwitch,
    ScTab,
    ScTabList,
    ScTabPanel,
    ScTabs,
    ScTextarea,
    ScToggle,
    ScToggleGroup,
  ],
  template: `
    <div class="min-h-screen bg-background">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="mb-12 space-y-2">
          <h1 class="text-4xl font-bold tracking-tight">Component Gallery</h1>
          <p class="text-lg text-muted-foreground">
            A showcase of all available UI components.
          </p>
        </div>

        <div class="space-y-16">
          <!-- Buttons -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Button</h2>
            <div scSeparator></div>
            <div class="flex flex-wrap items-center gap-3">
              <button scButton>Default</button>
              <button scButton variant="secondary">Secondary</button>
              <button scButton variant="outline">Outline</button>
              <button scButton variant="ghost">Ghost</button>
              <button scButton variant="destructive">Destructive</button>
              <button scButton variant="link">Link</button>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button scButton size="sm">Small</button>
              <button scButton size="default">Default</button>
              <button scButton size="lg">Large</button>
              <button scButton [disabled]="true">Disabled</button>
            </div>
          </section>

          <!-- Badge -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Badge</h2>
            <div scSeparator></div>
            <div class="flex flex-wrap items-center gap-3">
              <div scBadge>Default</div>
              <div scBadge variant="secondary">Secondary</div>
              <div scBadge variant="outline">Outline</div>
              <div scBadge variant="destructive">Destructive</div>
            </div>
          </section>

          <!-- Card -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Card</h2>
            <div scSeparator></div>
            <div class="grid gap-6 md:grid-cols-2">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Card Title</h3>
                  <p scCardDescription>
                    Card description with supporting text.
                  </p>
                </div>
                <div scCardBody>
                  <p class="text-sm text-muted-foreground">
                    This is the card body content. It can contain any elements.
                  </p>
                </div>
                <div scCardFooter>
                  <button scButton variant="outline">Cancel</button>
                  <button scButton>Save</button>
                </div>
              </div>

              <div scCard size="sm">
                <div scCardHeader>
                  <h3 scCardTitle>Notifications</h3>
                  <p scCardDescription>You have 3 unread messages.</p>
                </div>
                <div scCardBody>
                  <div class="flex items-center gap-4">
                    <span scAvatar>
                      <span scAvatarFallback>JD</span>
                    </span>
                    <div class="space-y-1">
                      <p class="text-sm font-medium leading-none">John Doe</p>
                      <p class="text-sm text-muted-foreground">
                        Sent you a message
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Alert -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Alert</h2>
            <div scSeparator></div>
            <div class="space-y-4">
              <div scAlert>
                <h4 scAlertTitle>Heads up!</h4>
                <p scAlertDescription>
                  You can add components to your app using the CLI.
                </p>
              </div>
              <div scAlert variant="destructive">
                <h4 scAlertTitle>Error</h4>
                <p scAlertDescription>
                  Your session has expired. Please log in again.
                </p>
              </div>
            </div>
          </section>

          <!-- Avatar -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Avatar</h2>
            <div scSeparator></div>
            <div class="flex items-center gap-4">
              <span scAvatar size="sm">
                <span scAvatarFallback>SM</span>
              </span>
              <span scAvatar>
                <span scAvatarFallback>DF</span>
              </span>
              <span scAvatar size="lg">
                <span scAvatarFallback>LG</span>
              </span>
              <span scAvatar>
                <img
                  scAvatarImage
                  src="https://github.com/shadcn.png"
                  alt="shadcn"
                />
                <span scAvatarFallback>CN</span>
              </span>
            </div>
          </section>

          <!-- Input -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Input</h2>
            <div scSeparator></div>
            <div class="grid gap-4 max-w-sm">
              <div class="space-y-2">
                <label scLabel for="email">Email</label>
                <input
                  scInput
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div class="space-y-2">
                <label scLabel for="disabled-input">Disabled</label>
                <input
                  scInput
                  id="disabled-input"
                  [disabled]="true"
                  placeholder="Disabled input"
                />
              </div>
            </div>
          </section>

          <!-- Textarea -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Textarea</h2>
            <div scSeparator></div>
            <div class="max-w-sm space-y-2">
              <label scLabel for="message">Your message</label>
              <textarea
                scTextarea
                id="message"
                placeholder="Type your message here..."
              ></textarea>
            </div>
          </section>

          <!-- Checkbox -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Checkbox</h2>
            <div scSeparator></div>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <input type="checkbox" scCheckbox id="terms" />
                <label scLabel for="terms">Accept terms and conditions</label>
              </div>
              <div class="flex items-center gap-2">
                <input type="checkbox" scCheckbox id="newsletter" />
                <label scLabel for="newsletter">Subscribe to newsletter</label>
              </div>
            </div>
          </section>

          <!-- Switch -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Switch</h2>
            <div scSeparator></div>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <input type="checkbox" scSwitch id="airplane" />
                <label scLabel for="airplane">Airplane Mode</label>
              </div>
              <div class="flex items-center gap-2">
                <input type="checkbox" scSwitch id="notifications" />
                <label scLabel for="notifications">Notifications</label>
              </div>
            </div>
          </section>

          <!-- Slider -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Slider</h2>
            <div scSeparator></div>
            <div class="max-w-sm space-y-2">
              <label scLabel for="volume">Volume</label>
              <input scSlider id="volume" type="range" min="0" max="100" />
            </div>
          </section>

          <!-- Progress -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Progress</h2>
            <div scSeparator></div>
            <div class="max-w-sm space-y-4">
              <div scProgress [value]="25"></div>
              <div scProgress [value]="50"></div>
              <div scProgress [value]="75"></div>
            </div>
          </section>

          <!-- Spinner -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Spinner</h2>
            <div scSeparator></div>
            <div class="flex items-center gap-4">
              <svg scSpinner class="size-6"></svg>
              <svg scSpinner class="size-8"></svg>
              <svg scSpinner class="size-10"></svg>
            </div>
          </section>

          <!-- Skeleton -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Skeleton</h2>
            <div scSeparator></div>
            <div class="flex items-center gap-4">
              <div scSkeleton class="size-12 rounded-full"></div>
              <div class="space-y-2">
                <div scSkeleton class="h-4 w-[250px]"></div>
                <div scSkeleton class="h-4 w-[200px]"></div>
              </div>
            </div>
          </section>

          <!-- Kbd -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Kbd</h2>
            <div scSeparator></div>
            <div class="flex items-center gap-2">
              <kbd scKbd>Ctrl</kbd>
              <span class="text-muted-foreground">+</span>
              <kbd scKbd>C</kbd>
              <span class="ml-4 text-sm text-muted-foreground">Copy</span>
            </div>
            <div class="flex items-center gap-2">
              <kbd scKbd>Ctrl</kbd>
              <span class="text-muted-foreground">+</span>
              <kbd scKbd>V</kbd>
              <span class="ml-4 text-sm text-muted-foreground">Paste</span>
            </div>
          </section>

          <!-- Separator -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Separator</h2>
            <div scSeparator></div>
            <div class="space-y-1">
              <h4 class="text-sm font-medium leading-none">
                Semantic Components
              </h4>
              <p class="text-sm text-muted-foreground">
                An open-source UI component library.
              </p>
            </div>
            <div scSeparator></div>
            <div class="flex h-5 items-center gap-4 text-sm">
              <span>Blog</span>
              <div scSeparator orientation="vertical"></div>
              <span>Docs</span>
              <div scSeparator orientation="vertical"></div>
              <span>Source</span>
            </div>
          </section>

          <!-- Toggle -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Toggle</h2>
            <div scSeparator></div>
            <div class="flex items-center gap-3">
              <button scToggle variant="outline" aria-label="Toggle bold">
                <span class="font-bold">B</span>
              </button>
              <button scToggle variant="outline" aria-label="Toggle italic">
                <span class="italic">I</span>
              </button>
              <button scToggle variant="outline" aria-label="Toggle underline">
                <span class="underline">U</span>
              </button>
            </div>
          </section>

          <!-- Toggle Group -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Toggle Group</h2>
            <div scSeparator></div>
            <div scToggleGroup type="single" variant="outline">
              <button scToggle aria-label="Align left">Left</button>
              <button scToggle aria-label="Align center">Center</button>
              <button scToggle aria-label="Align right">Right</button>
            </div>
          </section>

          <!-- Tabs -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Tabs</h2>
            <div scSeparator></div>
            <div scTabs class="max-w-md">
              <div
                scTabList
                [selectedTab]="'overview'"
                class="grid w-full grid-cols-3"
              >
                <button scTab value="overview">Overview</button>
                <button scTab value="analytics">Analytics</button>
                <button scTab value="reports">Reports</button>
              </div>
              <div scTabPanel value="overview">
                <div class="rounded-lg border p-4">
                  <h3 class="text-lg font-medium">Overview</h3>
                  <p class="text-sm text-muted-foreground">
                    A high-level summary of your project's metrics.
                  </p>
                </div>
              </div>
              <div scTabPanel value="analytics">
                <div class="rounded-lg border p-4">
                  <h3 class="text-lg font-medium">Analytics</h3>
                  <p class="text-sm text-muted-foreground">
                    Detailed analytics and performance data.
                  </p>
                </div>
              </div>
              <div scTabPanel value="reports">
                <div class="rounded-lg border p-4">
                  <h3 class="text-lg font-medium">Reports</h3>
                  <p class="text-sm text-muted-foreground">
                    Generated reports and exportable data.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Accordion -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Accordion</h2>
            <div scSeparator></div>
            <div scAccordionGroup [multiExpandable]="false" class="max-w-lg">
              <div scAccordionItem>
                <div scAccordionHeader>
                  <button scAccordionTrigger panelId="faq-1" [expanded]="true">
                    Is it accessible?
                  </button>
                </div>
                <div scAccordionPanel panelId="faq-1">
                  <ng-template scAccordionContent>
                    <sc-accordion-body>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </sc-accordion-body>
                  </ng-template>
                </div>
              </div>
              <div scAccordionItem>
                <div scAccordionHeader>
                  <button scAccordionTrigger panelId="faq-2">
                    Is it styled?
                  </button>
                </div>
                <div scAccordionPanel panelId="faq-2">
                  <ng-template scAccordionContent>
                    <sc-accordion-body>
                      Yes. It comes with default styles that match the other
                      components' aesthetic.
                    </sc-accordion-body>
                  </ng-template>
                </div>
              </div>
              <div scAccordionItem>
                <div scAccordionHeader>
                  <button scAccordionTrigger panelId="faq-3">
                    Is it animated?
                  </button>
                </div>
                <div scAccordionPanel panelId="faq-3">
                  <ng-template scAccordionContent>
                    <sc-accordion-body>
                      Yes. It's animated by default, but you can disable it if
                      you prefer.
                    </sc-accordion-body>
                  </ng-template>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GalleryPage {}
