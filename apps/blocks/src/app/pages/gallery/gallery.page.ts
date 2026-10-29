import { Component, ViewEncapsulation } from '@angular/core';
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
  ScProgressRange,
  ScProgressTrack,
  ScSeparator,
  ScSkeleton,
  ScSlider,
  ScSpinner,
  ScSwitch,
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
  ScTextarea,
  ScToggle,
  ScToggleGroup,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

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
    ScProgressRange,
    ScProgressTrack,
    ScSeparator,
    ScSkeleton,
    ScSlider,
    ScSpinner,
    ScSwitch,
    ScTab,
    ScTabContent,
    ScTabList,
    ScTabPanel,
    ScTabs,
    ScTextarea,
    ScToggle,
    ScToggleGroup,
    SiChevronDownIcon,
  ],
  template: `
    <div class="bg-background min-h-screen">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <div class="mb-12 space-y-2">
          <h1 class="text-4xl font-bold tracking-tight" i18n="@@gallery.title">
            Component Gallery
          </h1>
          <p class="text-muted-foreground text-lg" i18n="@@gallery.description">
            A showcase of all available UI components.
          </p>
        </div>

        <div class="space-y-16">
          <!-- Buttons -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.button"
            >
              Button
            </h2>
            <div scSeparator></div>
            <div class="flex flex-wrap items-center gap-3">
              <button scButton i18n="@@gallery.default">Default</button>
              <button scButton variant="secondary" i18n="@@gallery.secondary">
                Secondary
              </button>
              <button scButton variant="outline" i18n="@@gallery.outline">
                Outline
              </button>
              <button scButton variant="ghost" i18n="@@gallery.ghost">
                Ghost
              </button>
              <button
                scButton
                variant="destructive"
                i18n="@@gallery.destructive"
              >
                Destructive
              </button>
              <button scButton variant="link" i18n="@@gallery.link">
                Link
              </button>
            </div>
            <div class="flex flex-wrap items-center gap-3">
              <button scButton size="sm" i18n="@@gallery.small">Small</button>
              <button scButton size="default" i18n="@@gallery.default.2">
                Default
              </button>
              <button scButton size="lg" i18n="@@gallery.large">Large</button>
              <button scButton [disabled]="true" i18n="@@gallery.disabled">
                Disabled
              </button>
            </div>
          </section>

          <!-- Badge -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.badge"
            >
              Badge
            </h2>
            <div scSeparator></div>
            <div class="flex flex-wrap items-center gap-3">
              <div scBadge i18n="@@gallery.default">Default</div>
              <div scBadge variant="secondary" i18n="@@gallery.secondary">
                Secondary
              </div>
              <div scBadge variant="outline" i18n="@@gallery.outline">
                Outline
              </div>
              <div scBadge variant="destructive" i18n="@@gallery.destructive">
                Destructive
              </div>
            </div>
          </section>

          <!-- Card -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.card"
            >
              Card
            </h2>
            <div scSeparator></div>
            <div class="grid gap-6 md:grid-cols-2">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle i18n="@@gallery.cardTitle">Card Title</h3>
                  <p scCardDescription i18n="@@gallery.cardDescription">
                    Card description with supporting text.
                  </p>
                </div>
                <div scCardBody>
                  <p
                    class="text-muted-foreground text-sm"
                    i18n="@@gallery.cardBody"
                  >
                    This is the card body content. It can contain any elements.
                  </p>
                </div>
                <div scCardFooter>
                  <button scButton variant="outline" i18n="@@gallery.cancel">
                    Cancel
                  </button>
                  <button scButton i18n="@@gallery.save">Save</button>
                </div>
              </div>

              <div scCard size="sm">
                <div scCardHeader>
                  <h3 scCardTitle i18n="@@gallery.notifications">
                    Notifications
                  </h3>
                  <p scCardDescription i18n="@@gallery.unread">
                    You have 3 unread messages.
                  </p>
                </div>
                <div scCardBody>
                  <div class="flex items-center gap-4">
                    <span scAvatar>
                      <span scAvatarFallback>JD</span>
                    </span>
                    <div class="space-y-1">
                      <p class="text-sm leading-none font-medium">John Doe</p>
                      <p
                        class="text-muted-foreground text-sm"
                        i18n="@@gallery.sentMessage"
                      >
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.alert"
            >
              Alert
            </h2>
            <div scSeparator></div>
            <div class="space-y-4">
              <div scAlert>
                <h4 scAlertTitle i18n="@@gallery.headsUp">Heads up!</h4>
                <p scAlertDescription i18n="@@gallery.headsUp.description">
                  You can add components to your app using the CLI.
                </p>
              </div>
              <div scAlert variant="destructive">
                <h4 scAlertTitle i18n="@@gallery.error">Error</h4>
                <p scAlertDescription i18n="@@gallery.error.description">
                  Your session has expired. Please log in again.
                </p>
              </div>
            </div>
          </section>

          <!-- Avatar -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.avatar"
            >
              Avatar
            </h2>
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.input"
            >
              Input
            </h2>
            <div scSeparator></div>
            <div class="grid max-w-sm gap-4">
              <div class="space-y-2">
                <label scLabel for="email" i18n="@@gallery.email">Email</label>
                <input
                  scInput
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  i18n-placeholder="@@gallery.emailPlaceholder"
                />
              </div>
              <div class="space-y-2">
                <label scLabel for="disabled-input" i18n="@@gallery.disabled.2"
                  >Disabled</label
                >
                <input
                  scInput
                  id="disabled-input"
                  [disabled]="true"
                  placeholder="Disabled input"
                  i18n-placeholder="@@gallery.disabledPlaceholder"
                />
              </div>
            </div>
          </section>

          <!-- Textarea -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.textarea"
            >
              Textarea
            </h2>
            <div scSeparator></div>
            <div class="max-w-sm space-y-2">
              <label scLabel for="message" i18n="@@gallery.yourMessage"
                >Your message</label
              >
              <textarea
                scTextarea
                id="message"
                placeholder="Type your message here..."
                i18n-placeholder="@@gallery.messagePlaceholder"
              ></textarea>
            </div>
          </section>

          <!-- Checkbox -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.checkbox"
            >
              Checkbox
            </h2>
            <div scSeparator></div>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <input type="checkbox" scCheckbox id="terms" />
                <label scLabel for="terms" i18n="@@gallery.acceptTerms"
                  >Accept terms and conditions</label
                >
              </div>
              <div class="flex items-center gap-2">
                <input type="checkbox" scCheckbox id="newsletter" />
                <label scLabel for="newsletter" i18n="@@gallery.newsletter"
                  >Subscribe to newsletter</label
                >
              </div>
            </div>
          </section>

          <!-- Switch -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.switch"
            >
              Switch
            </h2>
            <div scSeparator></div>
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <input type="checkbox" scSwitch id="airplane" />
                <label scLabel for="airplane" i18n="@@gallery.airplaneMode"
                  >Airplane Mode</label
                >
              </div>
              <div class="flex items-center gap-2">
                <input type="checkbox" scSwitch id="notifications" />
                <label
                  scLabel
                  for="notifications"
                  i18n="@@gallery.notifications.2"
                  >Notifications</label
                >
              </div>
            </div>
          </section>

          <!-- Slider -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.slider"
            >
              Slider
            </h2>
            <div scSeparator></div>
            <div class="max-w-sm space-y-2">
              <label scLabel for="volume" i18n="@@gallery.volume">Volume</label>
              <input scSlider id="volume" />
            </div>
          </section>

          <!-- Progress -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.progress"
            >
              Progress
            </h2>
            <div scSeparator></div>
            <div class="max-w-sm space-y-4">
              <div
                scProgress
                [value]="25"
                aria-label="25% progress"
                i18n-aria-label="@@gallery.progress25"
              >
                <div scProgressTrack><div scProgressRange></div></div>
              </div>
              <div
                scProgress
                [value]="50"
                aria-label="50% progress"
                i18n-aria-label="@@gallery.progress50"
              >
                <div scProgressTrack><div scProgressRange></div></div>
              </div>
              <div
                scProgress
                [value]="75"
                aria-label="75% progress"
                i18n-aria-label="@@gallery.progress75"
              >
                <div scProgressTrack><div scProgressRange></div></div>
              </div>
            </div>
          </section>

          <!-- Spinner -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.spinner"
            >
              Spinner
            </h2>
            <div scSeparator></div>
            <div class="flex items-center gap-4">
              <svg
                scSpinner
                aria-label="Loading"
                i18n-aria-label="@@gallery.loading"
                class="size-6"
              ></svg>
              <svg
                scSpinner
                aria-label="Loading"
                i18n-aria-label="@@gallery.loading"
                class="size-8"
              ></svg>
              <svg
                scSpinner
                aria-label="Loading"
                i18n-aria-label="@@gallery.loading"
                class="size-10"
              ></svg>
            </div>
          </section>

          <!-- Skeleton -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.skeleton"
            >
              Skeleton
            </h2>
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
              <span
                class="text-muted-foreground ml-4 text-sm"
                i18n="@@gallery.copy"
                >Copy</span
              >
            </div>
            <div class="flex items-center gap-2">
              <kbd scKbd>Ctrl</kbd>
              <span class="text-muted-foreground">+</span>
              <kbd scKbd>V</kbd>
              <span
                class="text-muted-foreground ml-4 text-sm"
                i18n="@@gallery.paste"
                >Paste</span
              >
            </div>
          </section>

          <!-- Separator -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.separator"
            >
              Separator
            </h2>
            <div scSeparator></div>
            <div class="space-y-1">
              <h4 class="text-sm leading-none font-medium">
                Semantic Components
              </h4>
              <p
                class="text-muted-foreground text-sm"
                i18n="@@gallery.separator.description"
              >
                An open-source UI component library.
              </p>
            </div>
            <div scSeparator></div>
            <div class="flex h-5 items-center gap-4 text-sm">
              <span i18n="@@gallery.blog">Blog</span>
              <div scSeparator orientation="vertical"></div>
              <span i18n="@@gallery.docs">Docs</span>
              <div scSeparator orientation="vertical"></div>
              <span i18n="@@gallery.source">Source</span>
            </div>
          </section>

          <!-- Toggle -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.toggle"
            >
              Toggle
            </h2>
            <div scSeparator></div>
            <div class="flex items-center gap-3">
              <button
                scToggle
                variant="outline"
                aria-label="Toggle bold"
                i18n-aria-label="@@gallery.toggleBold"
              >
                <span class="font-bold">B</span>
              </button>
              <button
                scToggle
                variant="outline"
                aria-label="Toggle italic"
                i18n-aria-label="@@gallery.toggleItalic"
              >
                <span class="italic">I</span>
              </button>
              <button
                scToggle
                variant="outline"
                aria-label="Toggle underline"
                i18n-aria-label="@@gallery.toggleUnderline"
              >
                <span class="underline">U</span>
              </button>
            </div>
          </section>

          <!-- Toggle Group -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.toggleGroup"
            >
              Toggle Group
            </h2>
            <div scSeparator></div>
            <div scToggleGroup type="single" variant="outline">
              <button
                scToggle
                aria-label="Align left"
                i18n-aria-label="@@gallery.alignLeft"
                i18n="@@gallery.left"
              >
                Left
              </button>
              <button
                scToggle
                aria-label="Align center"
                i18n-aria-label="@@gallery.alignCenter"
                i18n="@@gallery.center"
              >
                Center
              </button>
              <button
                scToggle
                aria-label="Align right"
                i18n-aria-label="@@gallery.alignRight"
                i18n="@@gallery.right"
              >
                Right
              </button>
            </div>
          </section>

          <!-- Tabs -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.tabs"
            >
              Tabs
            </h2>
            <div scSeparator></div>
            <div scTabs class="max-w-md">
              <div
                scTabList
                [selectedTab]="'overview'"
                class="grid w-full grid-cols-3"
              >
                <button scTab value="overview" i18n="@@gallery.overview">
                  Overview
                </button>
                <button scTab value="analytics" i18n="@@gallery.analytics">
                  Analytics
                </button>
                <button scTab value="reports" i18n="@@gallery.reports">
                  Reports
                </button>
              </div>
              <div scTabPanel value="overview">
                <ng-template scTabContent>
                  <div class="rounded-lg border p-4">
                    <h3 class="text-lg font-medium" i18n="@@gallery.overview">
                      Overview
                    </h3>
                    <p
                      class="text-muted-foreground text-sm"
                      i18n="@@gallery.overview.description"
                    >
                      A high-level summary of your project's metrics.
                    </p>
                  </div>
                </ng-template>
              </div>
              <div scTabPanel value="analytics">
                <ng-template scTabContent>
                  <div class="rounded-lg border p-4">
                    <h3 class="text-lg font-medium" i18n="@@gallery.analytics">
                      Analytics
                    </h3>
                    <p
                      class="text-muted-foreground text-sm"
                      i18n="@@gallery.analytics.description"
                    >
                      Detailed analytics and performance data.
                    </p>
                  </div>
                </ng-template>
              </div>
              <div scTabPanel value="reports">
                <ng-template scTabContent>
                  <div class="rounded-lg border p-4">
                    <h3 class="text-lg font-medium" i18n="@@gallery.reports">
                      Reports
                    </h3>
                    <p
                      class="text-muted-foreground text-sm"
                      i18n="@@gallery.reports.description"
                    >
                      Generated reports and exportable data.
                    </p>
                  </div>
                </ng-template>
              </div>
            </div>
          </section>

          <!-- Accordion -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@gallery.accordion"
            >
              Accordion
            </h2>
            <div scSeparator></div>
            <div scAccordionGroup [multiExpandable]="false" class="max-w-lg">
              <div scAccordionItem>
                <div scAccordionHeader>
                  <button
                    scAccordionTrigger
                    [panel]="faq1.panel"
                    [expanded]="true"
                    i18n="@@gallery.faq.accessible"
                  >
                    Is it accessible?
                    <svg siChevronDownIcon></svg>
                  </button>
                </div>
                <div scAccordionPanel #faq1="scAccordionPanel">
                  <ng-template scAccordionContent>
                    <div scAccordionBody i18n="@@gallery.faq.accessible.answer">
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scAccordionItem>
                <div scAccordionHeader>
                  <button
                    scAccordionTrigger
                    [panel]="faq2.panel"
                    i18n="@@gallery.faq.styled"
                  >
                    Is it styled?
                    <svg siChevronDownIcon></svg>
                  </button>
                </div>
                <div scAccordionPanel #faq2="scAccordionPanel">
                  <ng-template scAccordionContent>
                    <div scAccordionBody i18n="@@gallery.faq.styled.answer">
                      Yes. It comes with default styles that match the other
                      components' aesthetic.
                    </div>
                  </ng-template>
                </div>
              </div>
              <div scAccordionItem>
                <div scAccordionHeader>
                  <button
                    scAccordionTrigger
                    [panel]="faq3.panel"
                    i18n="@@gallery.faq.animated"
                  >
                    Is it animated?
                    <svg siChevronDownIcon></svg>
                  </button>
                </div>
                <div scAccordionPanel #faq3="scAccordionPanel">
                  <ng-template scAccordionContent>
                    <div scAccordionBody i18n="@@gallery.faq.animated.answer">
                      Yes. It's animated by default, but you can disable it if
                      you prefer.
                    </div>
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
})
export default class GalleryPage {}
