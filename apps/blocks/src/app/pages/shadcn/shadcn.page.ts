import { Temporal } from '@js-temporal/polyfill';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBadge,
  ScButton,
  ScCalendar,
  ScCalendarHeader,
  ScCalendarHeading,
  ScCalendarNext,
  ScCalendarPrevious,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScDialog,
  ScDialogClose,
  ScDialogDescription,
  ScDialogFooter,
  ScDialogHeader,
  ScDialogPortal,
  ScDialogProvider,
  ScDialogTitle,
  ScDialogTrigger,
  ScInput,
  ScLabel,
  ScProgress,
  ScSeparator,
  ScTab,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiPlayIcon,
  SiShuffleIcon,
  SiStarIcon,
  SiTrendingUpIcon,
  SiUsersIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-shadcn',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScBadge,
    ScButton,
    ScCalendar,
    ScCalendarHeader,
    ScCalendarHeading,
    ScCalendarNext,
    ScCalendarPrevious,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScDialog,
    ScDialogClose,
    ScDialogDescription,
    ScDialogFooter,
    ScDialogHeader,
    ScDialogPortal,
    ScDialogProvider,
    ScDialogTitle,
    ScDialogTrigger,
    ScInput,
    ScLabel,
    ScProgress,
    ScSeparator,
    ScTab,
    ScTabList,
    ScTabPanel,
    ScTabs,
    SiArrowLeftIcon,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiPlayIcon,
    SiShuffleIcon,
    SiStarIcon,
    SiTrendingUpIcon,
    SiUsersIcon,
    SiXIcon,
  ],
  template: `
    <div class="bg-background min-h-screen">
      <div class="mx-auto max-w-6xl px-6 py-12">
        <!-- Header -->
        <div class="mb-12 space-y-2">
          <a
            href="/"
            class="text-muted-foreground hover:text-foreground mb-4 inline-flex items-center gap-1 text-sm"
          >
            <svg siArrowLeftIcon class="size-4"></svg>
            Back to Home
          </a>
          <h1 class="text-4xl font-bold tracking-tight">shadcn Showcase</h1>
          <p class="text-muted-foreground text-lg">
            A collection of UI blocks built with semantic components.
          </p>
        </div>

        <div class="space-y-16">
          <!-- 1. Login Form -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Login form</h2>
            <div scSeparator></div>
            <div class="flex justify-center">
              <div scCard class="w-full max-w-sm">
                <div scCardHeader class="text-center">
                  <h3 scCardTitle class="text-xl">Sign in</h3>
                  <p scCardDescription>
                    Enter your credentials to access your account.
                  </p>
                </div>
                <div scCardBody class="space-y-4">
                  <div class="space-y-2">
                    <label scLabel for="login-email">Email</label>
                    <input
                      scInput
                      id="login-email"
                      type="email"
                      placeholder="name@example.com"
                      autocomplete="email"
                    />
                  </div>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <label scLabel for="login-password">Password</label>
                      <a
                        href="#"
                        class="text-primary text-sm font-medium underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <input
                      scInput
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      autocomplete="current-password"
                    />
                  </div>
                  <button scButton class="w-full">Sign in</button>
                </div>
                <div scCardFooter class="justify-center">
                  <p class="text-muted-foreground text-sm">
                    Don't have an account?
                    <a
                      href="#"
                      class="text-primary font-medium underline-offset-4 hover:underline"
                    >
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- 2. Dialog -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Dialog</h2>
            <div scSeparator></div>
            <div class="flex flex-wrap gap-3">
              <div scDialogProvider [(open)]="basicDialogOpen">
                <button scDialogTrigger scButton variant="outline">
                  Open basic dialog
                </button>
                <ng-template scDialogPortal>
                  <div scDialog class="sm:max-w-md">
                    <button scDialogClose>
                      <svg siXIcon></svg>
                      <span class="sr-only">Close</span>
                    </button>
                    <div scDialogHeader>
                      <h2 scDialogTitle>Basic Dialog</h2>
                      <p scDialogDescription>
                        This is a basic dialog with a title and description.
                      </p>
                    </div>
                    <div scDialogFooter>
                      <button scButton (click)="basicDialogOpen.set(false)">
                        Close
                      </button>
                    </div>
                  </div>
                </ng-template>
              </div>

              <div scDialogProvider [(open)]="confirmDialogOpen">
                <button scDialogTrigger scButton variant="outline">
                  Open confirmation dialog
                </button>
                <ng-template scDialogPortal>
                  <div scDialog class="sm:max-w-md">
                    <button scDialogClose>
                      <svg siXIcon></svg>
                      <span class="sr-only">Close</span>
                    </button>
                    <div scDialogHeader>
                      <h2 scDialogTitle>Are you sure?</h2>
                      <p scDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </p>
                    </div>
                    <div scDialogFooter>
                      <button
                        scButton
                        variant="outline"
                        (click)="confirmDialogOpen.set(false)"
                      >
                        Cancel
                      </button>
                      <button
                        scButton
                        variant="destructive"
                        (click)="confirmDialogOpen.set(false)"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </ng-template>
              </div>

              <div scDialogProvider [(open)]="formDialogOpen">
                <button scDialogTrigger scButton variant="outline">
                  Open form dialog
                </button>
                <ng-template scDialogPortal>
                  <div scDialog class="sm:max-w-md">
                    <button scDialogClose>
                      <svg siXIcon></svg>
                      <span class="sr-only">Close</span>
                    </button>
                    <div scDialogHeader>
                      <h2 scDialogTitle>Edit profile</h2>
                      <p scDialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                      </p>
                    </div>
                    <div class="space-y-4 py-4">
                      <div class="space-y-2">
                        <label scLabel for="dialog-name">Name</label>
                        <input scInput id="dialog-name" value="Pedro Duarte" />
                      </div>
                      <div class="space-y-2">
                        <label scLabel for="dialog-username">Username</label>
                        <input scInput id="dialog-username" value="@peduarte" />
                      </div>
                    </div>
                    <div scDialogFooter>
                      <button
                        scButton
                        variant="outline"
                        (click)="formDialogOpen.set(false)"
                      >
                        Cancel
                      </button>
                      <button scButton (click)="formDialogOpen.set(false)">
                        Save changes
                      </button>
                    </div>
                  </div>
                </ng-template>
              </div>
            </div>
          </section>

          <!-- 3. Kanban Board -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Kanban board</h2>
            <div scSeparator></div>
            <div class="grid gap-6 md:grid-cols-3">
              <!-- Todo Column -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold">Todo</h3>
                  <span scBadge variant="secondary">3</span>
                </div>
                <div class="space-y-2">
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p class="text-sm font-medium">Design onboarding flow</p>
                      <div class="flex items-center justify-between">
                        <span scBadge variant="destructive">High</span>
                        <span scAvatar size="sm">
                          <span scAvatarFallback>AL</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p class="text-sm font-medium">Write API documentation</p>
                      <div class="flex items-center justify-between">
                        <span scBadge variant="outline">Medium</span>
                        <span scAvatar size="sm">
                          <span scAvatarFallback>BK</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p class="text-sm font-medium">Set up CI/CD pipeline</p>
                      <div class="flex items-center justify-between">
                        <span scBadge variant="secondary">Low</span>
                        <span scAvatar size="sm">
                          <span scAvatarFallback>CJ</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- In Progress Column -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold">In Progress</h3>
                  <span scBadge variant="secondary">2</span>
                </div>
                <div class="space-y-2">
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p class="text-sm font-medium">
                        Implement auth middleware
                      </p>
                      <div class="flex items-center justify-between">
                        <span scBadge variant="destructive">High</span>
                        <span scAvatar size="sm">
                          <span scAvatarFallback>DM</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p class="text-sm font-medium">
                        Refactor database models
                      </p>
                      <div class="flex items-center justify-between">
                        <span scBadge variant="outline">Medium</span>
                        <span scAvatar size="sm">
                          <span scAvatarFallback>AL</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Done Column -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold">Done</h3>
                  <span scBadge variant="secondary">2</span>
                </div>
                <div class="space-y-2">
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p class="text-sm font-medium">Fix login page layout</p>
                      <div class="flex items-center justify-between">
                        <span scBadge variant="secondary">Low</span>
                        <span scAvatar size="sm">
                          <span scAvatarFallback>BK</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p class="text-sm font-medium">
                        Add unit tests for utils
                      </p>
                      <div class="flex items-center justify-between">
                        <span scBadge variant="outline">Medium</span>
                        <span scAvatar size="sm">
                          <span scAvatarFallback>CJ</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 4. Analytics Dashboard -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">
              Analytics Dashboard
            </h2>
            <div scSeparator></div>

            <!-- Metrics Cards -->
            <div class="grid gap-4 md:grid-cols-3">
              <div scCard>
                <div scCardHeader>
                  <div class="flex items-center justify-between">
                    <p scCardDescription>Total Users</p>
                    <svg siUsersIcon class="text-muted-foreground size-4"></svg>
                  </div>
                  <h3 scCardTitle class="text-3xl">7,100</h3>
                </div>
                <div scCardBody>
                  <p class="text-muted-foreground text-xs">
                    <span class="font-medium text-emerald-500">+18%</span>
                    from last month
                  </p>
                </div>
              </div>
              <div scCard>
                <div scCardHeader>
                  <div class="flex items-center justify-between">
                    <p scCardDescription>Active Users</p>
                    <svg
                      siTrendingUpIcon
                      class="text-muted-foreground size-4"
                    ></svg>
                  </div>
                  <h3 scCardTitle class="text-3xl">4,830</h3>
                </div>
                <div scCardBody>
                  <p class="text-muted-foreground text-xs">
                    <span class="text-muted-foreground font-medium">68%</span>
                    of total
                  </p>
                </div>
              </div>
              <div scCard>
                <div scCardHeader>
                  <div class="flex items-center justify-between">
                    <p scCardDescription>Growth</p>
                    <svg
                      siTrendingUpIcon
                      class="text-muted-foreground size-4"
                    ></svg>
                  </div>
                  <h3 scCardTitle class="text-3xl">+24.3%</h3>
                </div>
                <div scCardBody>
                  <p class="text-muted-foreground text-xs">
                    <span class="font-medium text-emerald-500">+6.1pp</span>
                    from last quarter
                  </p>
                </div>
              </div>
            </div>

            <!-- Charts Row -->
            <div class="grid gap-4 md:grid-cols-2">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>User Growth</h3>
                  <p scCardDescription>Cumulative users over 12 months</p>
                </div>
                <div scCardBody>
                  <div class="flex h-48 items-end gap-2">
                    @for (height of userGrowthData; track $index) {
                      <div
                        class="bg-primary/80 hover:bg-primary flex-1 rounded-t transition-colors"
                        [style.height.%]="height"
                      ></div>
                    }
                  </div>
                  <div
                    class="text-muted-foreground mt-2 flex justify-between text-xs"
                  >
                    <span>Jan</span>
                    <span>Mar</span>
                    <span>May</span>
                    <span>Jul</span>
                    <span>Sep</span>
                    <span>Nov</span>
                  </div>
                </div>
              </div>
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Signups by Day</h3>
                  <p scCardDescription>Average signups per weekday</p>
                </div>
                <div scCardBody>
                  <div class="flex h-48 items-end gap-2">
                    @for (day of signupsByDay; track $index) {
                      <div class="flex flex-1 flex-col items-center gap-1">
                        <div
                          class="bg-primary/80 hover:bg-primary w-full rounded-t transition-colors"
                          [style.height.%]="day.value"
                        ></div>
                        <span class="text-muted-foreground text-xs">
                          {{ day.label }}
                        </span>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div scCard>
              <div scCardHeader>
                <h3 scCardTitle>Recent Activity</h3>
                <p scCardDescription>Latest user actions</p>
              </div>
              <div scCardBody class="space-y-4">
                @for (activity of recentActivity; track activity.name) {
                  <div class="flex items-center gap-4">
                    <span scAvatar size="sm">
                      <span scAvatarFallback>{{ activity.initials }}</span>
                    </span>
                    <div class="flex-1 space-y-1">
                      <p class="text-sm leading-none font-medium">
                        {{ activity.name }}
                      </p>
                      <p class="text-muted-foreground text-sm">
                        {{ activity.action }}
                      </p>
                    </div>
                    <span class="text-muted-foreground text-sm">
                      {{ activity.time }}
                    </span>
                  </div>
                }
              </div>
            </div>
          </section>

          <!-- 5. Artist Page -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Artist Page</h2>
            <div scSeparator></div>
            <div scCard>
              <div scCardBody class="space-y-6">
                <!-- Artist Header -->
                <div class="flex items-start gap-6">
                  <div
                    class="bg-primary/10 flex size-24 items-center justify-center rounded-full text-3xl font-bold"
                  >
                    TM
                  </div>
                  <div class="flex-1 space-y-2">
                    <div class="flex items-center gap-2">
                      <h3 class="text-2xl font-bold">The Midnight</h3>
                      <span scBadge>Verified Artist</span>
                    </div>
                    <p class="text-muted-foreground text-sm">
                      3.1M monthly listeners · 2.4M followers
                    </p>
                    <div class="flex gap-2">
                      <button scButton>
                        <svg siPlayIcon class="size-4"></svg>
                        Play
                      </button>
                      <button scButton variant="outline">
                        <svg siShuffleIcon class="size-4"></svg>
                        Shuffle
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Popular Tracks -->
                <div class="space-y-1">
                  <h4 class="mb-3 font-semibold">Popular</h4>
                  @for (track of popularTracks; track track.title) {
                    <div
                      class="hover:bg-muted/50 flex items-center gap-4 rounded-md px-2 py-2"
                    >
                      <span
                        class="text-muted-foreground w-6 text-right text-sm"
                      >
                        {{ $index + 1 }}
                      </span>
                      <div class="flex-1">
                        <p class="text-sm font-medium">{{ track.title }}</p>
                        <p class="text-muted-foreground text-xs">
                          {{ track.album }}
                        </p>
                      </div>
                      <span class="text-muted-foreground text-sm">
                        {{ track.plays }}
                      </span>
                      <span class="text-muted-foreground text-sm">
                        {{ track.duration }}
                      </span>
                    </div>
                  }
                </div>

                <!-- Discography -->
                <div class="space-y-3">
                  <h4 class="font-semibold">Discography</h4>
                  <div
                    class="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6"
                  >
                    @for (album of discography; track album.title) {
                      <div class="space-y-2">
                        <div class="bg-muted aspect-square rounded-md"></div>
                        <p class="text-sm font-medium">{{ album.title }}</p>
                        <p class="text-muted-foreground text-xs">
                          {{ album.year }} · {{ album.type }}
                        </p>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 6. Restaurant Menu -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">
              Restaurant Menu
            </h2>
            <div scSeparator></div>
            <div scCard>
              <div scCardHeader>
                <div class="flex items-start justify-between">
                  <div>
                    <h3 scCardTitle class="text-xl">Bella Napoli</h3>
                    <p scCardDescription>
                      Italian · Pasta · Pizza ·
                      <svg
                        siStarIcon
                        class="mb-0.5 inline size-3 fill-yellow-400 text-yellow-400"
                      ></svg>
                      4.8 (320+)
                    </p>
                  </div>
                  <span scBadge class="bg-emerald-500/10 text-emerald-500">
                    Open now
                  </span>
                </div>
              </div>
              <div scCardBody>
                <div scTabs>
                  <div
                    scTabList
                    [selectedTab]="'starters'"
                    class="grid w-full grid-cols-4"
                  >
                    <button scTab value="starters">Starters</button>
                    <button scTab value="mains">Mains</button>
                    <button scTab value="desserts">Desserts</button>
                    <button scTab value="drinks">Drinks</button>
                  </div>
                  <div scTabPanel value="starters">
                    <div class="space-y-4 pt-4">
                      @for (item of menuStarters; track item.name) {
                        <div
                          class="flex items-start justify-between gap-4 rounded-lg border p-4"
                        >
                          <div class="flex-1 space-y-1">
                            <div class="flex items-center gap-2">
                              <span class="text-lg">{{ item.emoji }}</span>
                              <h4 class="font-medium">{{ item.name }}</h4>
                            </div>
                            <div class="flex gap-1">
                              @for (tag of item.tags; track tag) {
                                <span scBadge variant="outline" class="text-xs">
                                  {{ tag }}
                                </span>
                              }
                            </div>
                            <p class="text-muted-foreground text-sm">
                              {{ item.description }}
                            </p>
                          </div>
                          <div class="flex flex-col items-end gap-2">
                            <span class="font-semibold">
                              \${{ item.price }}
                            </span>
                            <button scButton size="sm">Add</button>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                  <div scTabPanel value="mains">
                    <div
                      class="text-muted-foreground flex h-32 items-center justify-center text-sm"
                    >
                      Main courses coming soon
                    </div>
                  </div>
                  <div scTabPanel value="desserts">
                    <div
                      class="text-muted-foreground flex h-32 items-center justify-center text-sm"
                    >
                      Desserts coming soon
                    </div>
                  </div>
                  <div scTabPanel value="drinks">
                    <div
                      class="text-muted-foreground flex h-32 items-center justify-center text-sm"
                    >
                      Drinks coming soon
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 7. Activity Timeline -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">Activity</h2>
            <div scSeparator></div>
            <div scCard>
              <div scCardHeader>
                <h3 scCardTitle>Activity</h3>
                <p scCardDescription>Recent team events</p>
              </div>
              <div scCardBody>
                <div class="relative space-y-6">
                  <div
                    class="bg-border absolute top-0 bottom-0 left-[19px] w-px"
                  ></div>

                  <!-- Deploy -->
                  <div class="relative flex gap-4">
                    <span scAvatar size="sm" class="z-10">
                      <span scAvatarFallback>SC</span>
                    </span>
                    <div class="flex-1 space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium">Sarah Chen</span>
                        <span scBadge variant="outline" class="text-xs">
                          deploy
                        </span>
                        <span class="text-muted-foreground text-xs">
                          2 min ago
                        </span>
                      </div>
                      <p class="text-muted-foreground text-sm">
                        deployed v2.4.1 to production
                      </p>
                      <a
                        href="#"
                        class="text-primary text-sm underline-offset-4 hover:underline"
                      >
                        View details
                      </a>
                    </div>
                  </div>

                  <!-- Comment -->
                  <div class="relative flex gap-4">
                    <span scAvatar size="sm" class="z-10">
                      <span scAvatarFallback>AR</span>
                    </span>
                    <div class="flex-1 space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium">Alex Rivera</span>
                        <span scBadge variant="outline" class="text-xs">
                          comment
                        </span>
                        <span class="text-muted-foreground text-xs">
                          18 min ago
                        </span>
                      </div>
                      <p class="text-muted-foreground text-sm">
                        commented on PR #94 — Dark mode
                      </p>
                      <a
                        href="#"
                        class="text-primary text-sm underline-offset-4 hover:underline"
                      >
                        View details
                      </a>
                    </div>
                  </div>

                  <!-- Merge -->
                  <div class="relative flex gap-4">
                    <span scAvatar size="sm" class="z-10">
                      <span scAvatarFallback>JK</span>
                    </span>
                    <div class="flex-1 space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium">Jordan Kim</span>
                        <span scBadge variant="outline" class="text-xs">
                          merge
                        </span>
                        <span class="text-muted-foreground text-xs">
                          1 hr ago
                        </span>
                      </div>
                      <p class="text-muted-foreground text-sm">
                        merged feat/auth-refresh → main
                      </p>
                      <a
                        href="#"
                        class="text-primary text-sm underline-offset-4 hover:underline"
                      >
                        View details
                      </a>
                    </div>
                  </div>

                  <!-- Alert -->
                  <div class="relative flex gap-4">
                    <span scAvatar size="sm" class="z-10">
                      <span scAvatarFallback>SY</span>
                    </span>
                    <div class="flex-1 space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium">System</span>
                        <span scBadge variant="destructive" class="text-xs">
                          alert
                        </span>
                        <span class="text-muted-foreground text-xs">
                          2 hr ago
                        </span>
                      </div>
                      <p class="text-muted-foreground text-sm">
                        triggered alert on API p95 latency spike
                      </p>
                      <a
                        href="#"
                        class="text-primary text-sm underline-offset-4 hover:underline"
                      >
                        View details
                      </a>
                    </div>
                  </div>

                  <!-- Task -->
                  <div class="relative flex gap-4">
                    <span scAvatar size="sm" class="z-10">
                      <span scAvatarFallback>MP</span>
                    </span>
                    <div class="flex-1 space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium">Maya Patel</span>
                        <span scBadge variant="outline" class="text-xs">
                          task
                        </span>
                        <span class="text-muted-foreground text-xs">
                          3 hr ago
                        </span>
                      </div>
                      <p class="text-muted-foreground text-sm">
                        completed Migrate legacy auth tokens
                      </p>
                    </div>
                  </div>

                  <!-- Join -->
                  <div class="relative flex gap-4">
                    <span scAvatar size="sm" class="z-10">
                      <span scAvatarFallback>CW</span>
                    </span>
                    <div class="flex-1 space-y-1">
                      <div class="flex items-center gap-2">
                        <span class="text-sm font-medium">Chris Wong</span>
                        <span scBadge variant="outline" class="text-xs">
                          join
                        </span>
                        <span class="text-muted-foreground text-xs">
                          Yesterday
                        </span>
                      </div>
                      <p class="text-muted-foreground text-sm">
                        joined the team as Frontend Engineer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 8. Finance Dashboard -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">
              Finance Dashboard
            </h2>
            <div scSeparator></div>

            <!-- Net Worth -->
            <div scCard>
              <div scCardHeader>
                <p scCardDescription>Net Worth</p>
                <div class="flex items-baseline gap-2">
                  <h3 scCardTitle class="text-3xl">$124,850</h3>
                  <span class="text-sm font-medium text-emerald-500">
                    +$2,340 (+1.9%)
                  </span>
                </div>
              </div>
              <div scCardBody>
                <div class="grid grid-cols-3 gap-4">
                  <div class="space-y-1">
                    <p class="text-muted-foreground text-sm">Assets</p>
                    <p class="text-lg font-semibold">$186,200</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-muted-foreground text-sm">Liabilities</p>
                    <p class="text-lg font-semibold">$61,350</p>
                  </div>
                  <div class="space-y-1">
                    <p class="text-muted-foreground text-sm">Savings Rate</p>
                    <p class="text-lg font-semibold">33%</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <!-- Income vs Expense Chart -->
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Income vs Expense</h3>
                </div>
                <div scCardBody>
                  <div class="flex h-48 items-end gap-3">
                    @for (month of incomeExpenseData; track month.label) {
                      <div class="flex flex-1 flex-col items-center gap-1">
                        <div class="flex w-full gap-1">
                          <div
                            class="bg-primary/80 flex-1 rounded-t"
                            [style.height.px]="month.income"
                          ></div>
                          <div
                            class="bg-muted-foreground/30 flex-1 rounded-t"
                            [style.height.px]="month.expense"
                          ></div>
                        </div>
                        <span class="text-muted-foreground text-xs">
                          {{ month.label }}
                        </span>
                      </div>
                    }
                  </div>
                  <div class="mt-3 flex gap-4">
                    <div class="flex items-center gap-1.5">
                      <div class="bg-primary/80 size-2.5 rounded-full"></div>
                      <span class="text-muted-foreground text-xs">Income</span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <div
                        class="bg-muted-foreground/30 size-2.5 rounded-full"
                      ></div>
                      <span class="text-muted-foreground text-xs">Expense</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Spending Breakdown -->
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle>Spending Breakdown</h3>
                </div>
                <div scCardBody class="space-y-4">
                  @for (category of spendingBreakdown; track category.name) {
                    <div class="flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <div
                          class="size-3 rounded-full"
                          [class]="category.color"
                        ></div>
                        <span class="text-sm">{{ category.name }}</span>
                      </div>
                      <span class="text-sm font-medium">
                        \${{ category.amount }}
                      </span>
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- Budget Tracking -->
            <div scCard>
              <div scCardHeader>
                <h3 scCardTitle>Budget</h3>
              </div>
              <div scCardBody class="space-y-4">
                @for (budget of budgetItems; track budget.name) {
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span>{{ budget.name }}</span>
                      <span class="text-muted-foreground">
                        \${{ budget.spent }} / \${{ budget.limit }}
                        @if (budget.over) {
                          <span class="text-destructive ml-1 font-medium">
                            over budget
                          </span>
                        }
                      </span>
                    </div>
                    <div scProgress [value]="budget.percent"></div>
                  </div>
                }
              </div>
            </div>

            <!-- Recent Transactions -->
            <div scCard>
              <div scCardHeader>
                <h3 scCardTitle>Recent Transactions</h3>
              </div>
              <div scCardBody class="space-y-4">
                @for (tx of recentTransactions; track tx.name) {
                  <div class="flex items-center gap-4">
                    <div
                      class="bg-muted flex size-10 items-center justify-center rounded-full text-lg"
                    >
                      {{ tx.icon }}
                    </div>
                    <div class="flex-1">
                      <p class="text-sm font-medium">{{ tx.name }}</p>
                      <p class="text-muted-foreground text-xs">{{ tx.date }}</p>
                    </div>
                    <div class="text-right">
                      <p
                        class="text-sm font-medium"
                        [class]="tx.positive ? 'text-emerald-500' : ''"
                      >
                        {{ tx.amount }}
                      </p>
                      <p class="text-muted-foreground text-xs">
                        {{ tx.category }}
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </section>

          <!-- 9. Doctor Booking -->
          <section class="space-y-4">
            <h2 class="text-2xl font-semibold tracking-tight">
              Doctor Booking
            </h2>
            <div scSeparator></div>
            <div class="grid gap-6 md:grid-cols-2">
              <!-- Doctor Info -->
              <div scCard>
                <div scCardBody class="space-y-6">
                  <div class="flex items-start gap-4">
                    <span scAvatar size="lg">
                      <span scAvatarFallback>EC</span>
                    </span>
                    <div class="space-y-1">
                      <h3 class="text-lg font-semibold">Dr. Emily Chen</h3>
                      <p class="text-muted-foreground text-sm">
                        Cardiologist · NYC Heart Clinic
                      </p>
                      <span scBadge class="bg-emerald-500/10 text-emerald-500">
                        Available
                      </span>
                    </div>
                  </div>

                  <div scSeparator></div>

                  <div class="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div class="flex items-center justify-center gap-1">
                        <svg
                          siStarIcon
                          class="size-4 fill-yellow-400 text-yellow-400"
                        ></svg>
                        <span class="font-semibold">4.8</span>
                      </div>
                      <p class="text-muted-foreground text-xs">127 reviews</p>
                    </div>
                    <div>
                      <p class="font-semibold">12 yrs</p>
                      <p class="text-muted-foreground text-xs">Cardiology</p>
                    </div>
                    <div>
                      <p class="font-semibold">Mon – Fri</p>
                      <p class="text-muted-foreground text-xs">Schedule</p>
                    </div>
                  </div>

                  <button scButton class="w-full">Book Appointment</button>
                </div>
              </div>

              <!-- Calendar -->
              <div scCard>
                <div scCardBody>
                  <div class="w-fit rounded-md">
                    <div scCalendar [(value)]="selectedDate" #cal="scCalendar">
                      <div scCalendarHeader>
                        <button scCalendarPrevious>
                          <svg siChevronLeftIcon class="size-4"></svg>
                          <span class="sr-only">Go to previous month</span>
                        </button>
                        <button scCalendarHeading>{{ cal.heading() }}</button>
                        <button scCalendarNext>
                          <svg siChevronRightIcon class="size-4"></svg>
                          <span class="sr-only">Go to next month</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ShadcnPage {
  readonly basicDialogOpen = signal(false);
  readonly confirmDialogOpen = signal(false);
  readonly formDialogOpen = signal(false);
  readonly selectedDate = signal<Temporal.PlainDate | undefined>(undefined);

  readonly userGrowthData = [15, 22, 28, 35, 40, 48, 55, 60, 68, 75, 85, 100];

  readonly signupsByDay = [
    { label: 'Mon', value: 65 },
    { label: 'Tue', value: 80 },
    { label: 'Wed', value: 72 },
    { label: 'Thu', value: 90 },
    { label: 'Fri', value: 55 },
    { label: 'Sat', value: 40 },
    { label: 'Sun', value: 35 },
  ];

  readonly recentActivity = [
    { initials: 'AL', name: 'Alice Lee', action: 'signed up', time: '2m ago' },
    {
      initials: 'BK',
      name: 'Bob Kim',
      action: 'upgraded to Pro',
      time: '14m ago',
    },
    {
      initials: 'CJ',
      name: 'Clara Jones',
      action: 'invited 3 members',
      time: '1h ago',
    },
    {
      initials: 'DM',
      name: 'Dan Moore',
      action: 'submitted a report',
      time: '2h ago',
    },
    {
      initials: 'EW',
      name: 'Eva Wang',
      action: 'signed up',
      time: '3h ago',
    },
    {
      initials: 'FP',
      name: 'Frank Park',
      action: 'cancelled account',
      time: '5h ago',
    },
  ];

  readonly popularTracks = [
    {
      title: 'Los Angeles',
      album: 'Monsters',
      plays: '45.2M',
      duration: '4:32',
    },
    {
      title: 'Monsters',
      album: 'Monsters',
      plays: '38.7M',
      duration: '3:58',
    },
    {
      title: 'Sunset',
      album: 'Endless Summer',
      plays: '31.4M',
      duration: '5:12',
    },
    { title: 'Jason', album: 'Kids', plays: '28.9M', duration: '4:18' },
    {
      title: 'Crystalline',
      album: 'Nocturnal',
      plays: '24.1M',
      duration: '4:45',
    },
    {
      title: 'America Online',
      album: 'Kids',
      plays: '21.7M',
      duration: '3:52',
    },
    {
      title: 'Analog',
      album: 'Nocturnal',
      plays: '19.3M',
      duration: '4:29',
    },
  ];

  readonly discography = [
    { title: 'Monsters', year: '2022', type: 'Album' },
    { title: 'Endless Summer', year: '2021', type: 'Album' },
    { title: 'Kids', year: '2019', type: 'Album' },
    { title: 'Nocturnal', year: '2017', type: 'Album' },
    { title: 'Days of Thunder', year: '2018', type: 'EP' },
    { title: 'Burn', year: '2023', type: 'Single' },
  ];

  readonly menuStarters = [
    {
      emoji: '🧀',
      name: 'Burrata & Heirloom Tomatoes',
      tags: ['Vegetarian', 'Gluten-free'],
      description:
        'Creamy burrata, rainbow tomatoes, basil oil, flaked sea salt',
      price: 14,
    },
    {
      emoji: '🦑',
      name: 'Crispy Calamari',
      tags: ['Spicy 🌶'],
      description:
        'Flash-fried squid, lemon aioli, pickled chilli, fresh herbs',
      price: 13,
    },
    {
      emoji: '🍄',
      name: 'Wild Mushroom Crostini',
      tags: ['Vegetarian'],
      description: 'Sourdough, whipped ricotta, truffle, aged parmesan',
      price: 11,
    },
    {
      emoji: '🥣',
      name: 'Spiced Lentil Soup',
      tags: ['Vegan', 'Gluten-free'],
      description: 'Red lentils, cumin, coriander, coconut cream, crusty bread',
      price: 10,
    },
  ];

  readonly spendingBreakdown = [
    { name: 'Housing', amount: '1,225', color: 'bg-blue-500' },
    { name: 'Food', amount: '770', color: 'bg-emerald-500' },
    { name: 'Transport', amount: '490', color: 'bg-yellow-500' },
    { name: 'Shopping', amount: '630', color: 'bg-purple-500' },
    { name: 'Other', amount: '385', color: 'bg-gray-400' },
  ];

  readonly budgetItems = [
    {
      name: 'Food & Dining',
      spent: 770,
      limit: 900,
      percent: 86,
      over: false,
    },
    {
      name: 'Shopping',
      spent: 630,
      limit: 500,
      percent: 100,
      over: true,
    },
    {
      name: 'Transport',
      spent: 490,
      limit: 600,
      percent: 82,
      over: false,
    },
    {
      name: 'Entertainment',
      spent: 120,
      limit: 200,
      percent: 60,
      over: false,
    },
  ];

  readonly recentTransactions = [
    {
      icon: '🛒',
      name: 'Whole Foods',
      date: 'Today, 2:30 PM',
      amount: '$89.50',
      category: 'Groceries',
      positive: false,
    },
    {
      icon: '🎬',
      name: 'Netflix',
      date: 'Yesterday',
      amount: '$15.99',
      category: 'Entertainment',
      positive: false,
    },
    {
      icon: '⛽',
      name: 'Shell Gas',
      date: 'Yesterday',
      amount: '$52.30',
      category: 'Transport',
      positive: false,
    },
    {
      icon: '💰',
      name: 'Salary Deposit',
      date: 'Jun 1',
      amount: '+$4200.00',
      category: 'Income',
      positive: true,
    },
    {
      icon: '🛍️',
      name: 'Amazon',
      date: 'May 30',
      amount: '$124.00',
      category: 'Shopping',
      positive: false,
    },
    {
      icon: '☕',
      name: 'Starbucks',
      date: 'May 29',
      amount: '$6.75',
      category: 'Food',
      positive: false,
    },
  ];

  readonly incomeExpenseData = [
    { label: 'Jan', income: 140, expense: 100 },
    { label: 'Feb', income: 135, expense: 95 },
    { label: 'Mar', income: 150, expense: 110 },
    { label: 'Apr', income: 145, expense: 105 },
    { label: 'May', income: 155, expense: 120 },
    { label: 'Jun', income: 160, expense: 115 },
  ];
}
