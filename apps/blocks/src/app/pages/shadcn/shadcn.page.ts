import {
  Component,
  LOCALE_ID,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBadge,
  ScButton,
  ScCalendar,
  ScCalendarHeader,
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
  ScTabContent,
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
    ScTabContent,
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
            <svg siArrowLeftIcon class="size-4 rtl:rotate-180"></svg>
            <ng-container i18n="@@shadcn.back">Back to Home</ng-container>
          </a>
          <h1 class="text-4xl font-bold tracking-tight" i18n="@@shadcn.title">
            shadcn Showcase
          </h1>
          <p class="text-muted-foreground text-lg" i18n="@@shadcn.description">
            A collection of UI blocks built with semantic components.
          </p>
        </div>

        <div class="space-y-16">
          <!-- 1. Login Form -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.login"
            >
              Login form
            </h2>
            <div scSeparator></div>
            <div class="flex justify-center">
              <div scCard class="w-full max-w-sm">
                <div scCardHeader class="text-center">
                  <h3 scCardTitle class="text-xl" i18n="@@shadcn.login.signIn">
                    Sign in
                  </h3>
                  <p scCardDescription i18n="@@shadcn.login.description">
                    Enter your credentials to access your account.
                  </p>
                </div>
                <div scCardBody class="space-y-4">
                  <div class="space-y-2">
                    <label scLabel for="login-email" i18n="@@shadcn.email"
                      >Email</label
                    >
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
                      <label
                        scLabel
                        for="login-password"
                        i18n="@@shadcn.password"
                        >Password</label
                      >
                      <a
                        href="#"
                        class="text-primary text-sm font-medium underline-offset-4 hover:underline"
                        i18n="@@shadcn.login.forgot"
                      >
                        Forgot password?
                      </a>
                    </div>
                    <input
                      scInput
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      i18n-placeholder="@@shadcn.passwordPlaceholder"
                      autocomplete="current-password"
                    />
                  </div>
                  <button scButton class="w-full" i18n="@@shadcn.login.signIn">
                    Sign in
                  </button>
                </div>
                <div scCardFooter class="justify-center">
                  <p
                    class="text-muted-foreground text-sm"
                    i18n="@@shadcn.login.noAccount"
                  >
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.dialog"
            >
              Dialog
            </h2>
            <div scSeparator></div>
            <div class="flex flex-wrap gap-3">
              <div scDialogProvider [(open)]="basicDialogOpen">
                <button
                  scDialogTrigger
                  scButton
                  variant="outline"
                  i18n="@@shadcn.dialog.openBasic"
                >
                  Open basic dialog
                </button>
                <ng-template scDialogPortal>
                  <div scDialog class="sm:max-w-md">
                    <button scDialogClose>
                      <svg siXIcon></svg>
                      <span class="sr-only" i18n="@@shadcn.dialog.close"
                        >Close</span
                      >
                    </button>
                    <div scDialogHeader>
                      <h2 scDialogTitle i18n="@@shadcn.dialog.basic">
                        Basic Dialog
                      </h2>
                      <p
                        scDialogDescription
                        i18n="@@shadcn.dialog.basic.description"
                      >
                        This is a basic dialog with a title and description.
                      </p>
                    </div>
                    <div scDialogFooter>
                      <button
                        scButton
                        (click)="basicDialogOpen.set(false)"
                        i18n="@@shadcn.dialog.close.2"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </ng-template>
              </div>

              <div scDialogProvider [(open)]="confirmDialogOpen">
                <button
                  scDialogTrigger
                  scButton
                  variant="outline"
                  i18n="@@shadcn.dialog.openConfirm"
                >
                  Open confirmation dialog
                </button>
                <ng-template scDialogPortal>
                  <div scDialog class="sm:max-w-md">
                    <button scDialogClose>
                      <svg siXIcon></svg>
                      <span class="sr-only" i18n="@@shadcn.dialog.close"
                        >Close</span
                      >
                    </button>
                    <div scDialogHeader>
                      <h2 scDialogTitle i18n="@@shadcn.dialog.confirm">
                        Are you sure?
                      </h2>
                      <p
                        scDialogDescription
                        i18n="@@shadcn.dialog.confirm.description"
                      >
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
                        i18n="@@shadcn.cancel"
                      >
                        Cancel
                      </button>
                      <button
                        scButton
                        variant="destructive"
                        (click)="confirmDialogOpen.set(false)"
                        i18n="@@shadcn.delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </ng-template>
              </div>

              <div scDialogProvider [(open)]="formDialogOpen">
                <button
                  scDialogTrigger
                  scButton
                  variant="outline"
                  i18n="@@shadcn.dialog.openForm"
                >
                  Open form dialog
                </button>
                <ng-template scDialogPortal>
                  <div scDialog class="sm:max-w-md">
                    <button scDialogClose>
                      <svg siXIcon></svg>
                      <span class="sr-only" i18n="@@shadcn.dialog.close"
                        >Close</span
                      >
                    </button>
                    <div scDialogHeader>
                      <h2 scDialogTitle i18n="@@shadcn.dialog.editProfile">
                        Edit profile
                      </h2>
                      <p
                        scDialogDescription
                        i18n="@@shadcn.dialog.editProfile.description"
                      >
                        Make changes to your profile here. Click save when
                        you're done.
                      </p>
                    </div>
                    <div class="space-y-4 py-4">
                      <div class="space-y-2">
                        <label scLabel for="dialog-name" i18n="@@shadcn.name"
                          >Name</label
                        >
                        <input scInput id="dialog-name" value="Pedro Duarte" />
                      </div>
                      <div class="space-y-2">
                        <label
                          scLabel
                          for="dialog-username"
                          i18n="@@shadcn.username"
                          >Username</label
                        >
                        <input scInput id="dialog-username" value="@peduarte" />
                      </div>
                    </div>
                    <div scDialogFooter>
                      <button
                        scButton
                        variant="outline"
                        (click)="formDialogOpen.set(false)"
                        i18n="@@shadcn.cancel"
                      >
                        Cancel
                      </button>
                      <button
                        scButton
                        (click)="formDialogOpen.set(false)"
                        i18n="@@shadcn.saveChanges"
                      >
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.kanban"
            >
              Kanban board
            </h2>
            <div scSeparator></div>
            <div class="grid gap-6 md:grid-cols-3">
              <!-- Todo Column -->
              <div class="space-y-3">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold" i18n="@@shadcn.kanban.todo">
                    Todo
                  </h3>
                  <span scBadge variant="secondary">3</span>
                </div>
                <div class="space-y-2">
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p
                        class="text-sm font-medium"
                        i18n="@@shadcn.kanban.onboarding"
                      >
                        Design onboarding flow
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          scBadge
                          variant="destructive"
                          i18n="@@shadcn.priority.high"
                          >High</span
                        >
                        <span scAvatar size="sm">
                          <span scAvatarFallback>AL</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p
                        class="text-sm font-medium"
                        i18n="@@shadcn.kanban.apiDocs"
                      >
                        Write API documentation
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          scBadge
                          variant="outline"
                          i18n="@@shadcn.priority.medium"
                          >Medium</span
                        >
                        <span scAvatar size="sm">
                          <span scAvatarFallback>BK</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p class="text-sm font-medium" i18n="@@shadcn.kanban.ci">
                        Set up CI/CD pipeline
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          scBadge
                          variant="secondary"
                          i18n="@@shadcn.priority.low"
                          >Low</span
                        >
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
                  <h3 class="font-semibold" i18n="@@shadcn.kanban.inProgress">
                    In Progress
                  </h3>
                  <span scBadge variant="secondary">2</span>
                </div>
                <div class="space-y-2">
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p
                        class="text-sm font-medium"
                        i18n="@@shadcn.kanban.auth"
                      >
                        Implement auth middleware
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          scBadge
                          variant="destructive"
                          i18n="@@shadcn.priority.high"
                          >High</span
                        >
                        <span scAvatar size="sm">
                          <span scAvatarFallback>DM</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p
                        class="text-sm font-medium"
                        i18n="@@shadcn.kanban.models"
                      >
                        Refactor database models
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          scBadge
                          variant="outline"
                          i18n="@@shadcn.priority.medium"
                          >Medium</span
                        >
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
                  <h3 class="font-semibold" i18n="@@shadcn.kanban.done">
                    Done
                  </h3>
                  <span scBadge variant="secondary">2</span>
                </div>
                <div class="space-y-2">
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p
                        class="text-sm font-medium"
                        i18n="@@shadcn.kanban.loginLayout"
                      >
                        Fix login page layout
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          scBadge
                          variant="secondary"
                          i18n="@@shadcn.priority.low"
                          >Low</span
                        >
                        <span scAvatar size="sm">
                          <span scAvatarFallback>BK</span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div scCard size="sm">
                    <div scCardBody class="space-y-2">
                      <p
                        class="text-sm font-medium"
                        i18n="@@shadcn.kanban.tests"
                      >
                        Add unit tests for utils
                      </p>
                      <div class="flex items-center justify-between">
                        <span
                          scBadge
                          variant="outline"
                          i18n="@@shadcn.priority.medium"
                          >Medium</span
                        >
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.analytics"
            >
              Analytics Dashboard
            </h2>
            <div scSeparator></div>

            <!-- Metrics Cards -->
            <div class="grid gap-4 md:grid-cols-3">
              <div scCard>
                <div scCardHeader>
                  <div class="flex items-center justify-between">
                    <p scCardDescription i18n="@@shadcn.analytics.totalUsers">
                      Total Users
                    </p>
                    <svg siUsersIcon class="text-muted-foreground size-4"></svg>
                  </div>
                  <h3 scCardTitle class="text-3xl">7,100</h3>
                </div>
                <div scCardBody>
                  <p class="text-muted-foreground text-xs">
                    <span class="font-medium text-emerald-500">+18%</span>
                    <ng-container i18n="@@shadcn.analytics.fromLastMonth"
                      >from last month</ng-container
                    >
                  </p>
                </div>
              </div>
              <div scCard>
                <div scCardHeader>
                  <div class="flex items-center justify-between">
                    <p scCardDescription i18n="@@shadcn.analytics.activeUsers">
                      Active Users
                    </p>
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
                    <ng-container i18n="@@shadcn.analytics.ofTotal"
                      >of total</ng-container
                    >
                  </p>
                </div>
              </div>
              <div scCard>
                <div scCardHeader>
                  <div class="flex items-center justify-between">
                    <p scCardDescription i18n="@@shadcn.analytics.growth">
                      Growth
                    </p>
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
                    <ng-container i18n="@@shadcn.analytics.fromLastQuarter"
                      >from last quarter</ng-container
                    >
                  </p>
                </div>
              </div>
            </div>

            <!-- Charts Row -->
            <div class="grid gap-4 md:grid-cols-2">
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle i18n="@@shadcn.analytics.userGrowth">
                    User Growth
                  </h3>
                  <p scCardDescription i18n="@@shadcn.analytics.cumulative">
                    Cumulative users over 12 months
                  </p>
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
                    <span>{{ month(1) }}</span>
                    <span>{{ month(3) }}</span>
                    <span>{{ month(5) }}</span>
                    <span>{{ month(7) }}</span>
                    <span>{{ month(9) }}</span>
                    <span>{{ month(11) }}</span>
                  </div>
                </div>
              </div>
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle i18n="@@shadcn.analytics.signups">
                    Signups by Day
                  </h3>
                  <p
                    scCardDescription
                    i18n="@@shadcn.analytics.signups.description"
                  >
                    Average signups per weekday
                  </p>
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
                <h3 scCardTitle i18n="@@shadcn.analytics.recent">
                  Recent Activity
                </h3>
                <p
                  scCardDescription
                  i18n="@@shadcn.analytics.recent.description"
                >
                  Latest user actions
                </p>
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.artist"
            >
              Artist Page
            </h2>
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
                      <span scBadge i18n="@@shadcn.artist.verified"
                        >Verified Artist</span
                      >
                    </div>
                    <p
                      class="text-muted-foreground text-sm"
                      i18n="@@shadcn.artist.listeners"
                    >
                      3.1M monthly listeners · 2.4M followers
                    </p>
                    <div class="flex gap-2">
                      <button scButton>
                        <svg siPlayIcon></svg>
                        <ng-container i18n="@@shadcn.artist.play"
                          >Play</ng-container
                        >
                      </button>
                      <button scButton variant="outline">
                        <svg siShuffleIcon></svg>
                        <ng-container i18n="@@shadcn.artist.shuffle"
                          >Shuffle</ng-container
                        >
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Popular Tracks -->
                <div class="space-y-1">
                  <h4 class="mb-3 font-semibold" i18n="@@shadcn.artist.popular">
                    Popular
                  </h4>
                  @for (track of popularTracks; track track.title) {
                    <div
                      class="hover:bg-muted/50 flex items-center gap-4 rounded-md px-2 py-2"
                    >
                      <span class="text-muted-foreground w-6 text-end text-sm">
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
                  <h4 class="font-semibold" i18n="@@shadcn.artist.discography">
                    Discography
                  </h4>
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.menu"
            >
              Restaurant Menu
            </h2>
            <div scSeparator></div>
            <div scCard>
              <div scCardHeader>
                <div class="flex items-start justify-between">
                  <div>
                    <h3 scCardTitle class="text-xl">Bella Napoli</h3>
                    <p scCardDescription i18n="@@shadcn.menu.cuisine">
                      Italian · Pasta · Pizza ·
                      <svg
                        siStarIcon
                        class="mb-0.5 inline size-3 fill-yellow-400 text-yellow-400"
                      ></svg>
                      4.8 (320+)
                    </p>
                  </div>
                  <span
                    scBadge
                    class="bg-emerald-500/10 text-emerald-500"
                    i18n="@@shadcn.menu.open"
                  >
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
                    <button
                      scTab
                      value="starters"
                      i18n="@@shadcn.menu.starters"
                    >
                      Starters
                    </button>
                    <button scTab value="mains" i18n="@@shadcn.menu.mains">
                      Mains
                    </button>
                    <button
                      scTab
                      value="desserts"
                      i18n="@@shadcn.menu.desserts"
                    >
                      Desserts
                    </button>
                    <button scTab value="drinks" i18n="@@shadcn.menu.drinks">
                      Drinks
                    </button>
                  </div>
                  <div scTabPanel value="starters">
                    <ng-template scTabContent>
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
                                  <span
                                    scBadge
                                    variant="outline"
                                    class="text-xs"
                                  >
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
                              <button
                                scButton
                                size="sm"
                                i18n="@@shadcn.menu.add"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        }
                      </div>
                    </ng-template>
                  </div>
                  <div scTabPanel value="mains">
                    <ng-template scTabContent>
                      <div
                        class="text-muted-foreground flex h-32 items-center justify-center text-sm"
                        i18n="@@shadcn.menu.mainsSoon"
                      >
                        Main courses coming soon
                      </div>
                    </ng-template>
                  </div>
                  <div scTabPanel value="desserts">
                    <ng-template scTabContent>
                      <div
                        class="text-muted-foreground flex h-32 items-center justify-center text-sm"
                        i18n="@@shadcn.menu.dessertsSoon"
                      >
                        Desserts coming soon
                      </div>
                    </ng-template>
                  </div>
                  <div scTabPanel value="drinks">
                    <ng-template scTabContent>
                      <div
                        class="text-muted-foreground flex h-32 items-center justify-center text-sm"
                        i18n="@@shadcn.menu.drinksSoon"
                      >
                        Drinks coming soon
                      </div>
                    </ng-template>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- 7. Activity Timeline -->
          <section class="space-y-4">
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.activity"
            >
              Activity
            </h2>
            <div scSeparator></div>
            <div scCard>
              <div scCardHeader>
                <h3 scCardTitle i18n="@@shadcn.activity.2">Activity</h3>
                <p scCardDescription i18n="@@shadcn.activity.description">
                  Recent team events
                </p>
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
                        <span
                          scBadge
                          variant="outline"
                          class="text-xs"
                          i18n="@@shadcn.event.deploy"
                        >
                          deploy
                        </span>
                        <span
                          class="text-muted-foreground text-xs"
                          i18n="@@shadcn.event.2min"
                        >
                          2 min ago
                        </span>
                      </div>
                      <p
                        class="text-muted-foreground text-sm"
                        i18n="@@shadcn.event.deployed"
                      >
                        deployed v2.4.1 to production
                      </p>
                      <a
                        href="#"
                        class="text-primary text-sm underline-offset-4 hover:underline"
                        i18n="@@shadcn.event.viewDetails"
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
                        <span
                          scBadge
                          variant="outline"
                          class="text-xs"
                          i18n="@@shadcn.event.comment"
                        >
                          comment
                        </span>
                        <span
                          class="text-muted-foreground text-xs"
                          i18n="@@shadcn.event.18min"
                        >
                          18 min ago
                        </span>
                      </div>
                      <p
                        class="text-muted-foreground text-sm"
                        i18n="@@shadcn.event.commented"
                      >
                        commented on PR #94 — Dark mode
                      </p>
                      <a
                        href="#"
                        class="text-primary text-sm underline-offset-4 hover:underline"
                        i18n="@@shadcn.event.viewDetails"
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
                        <span
                          scBadge
                          variant="outline"
                          class="text-xs"
                          i18n="@@shadcn.event.merge"
                        >
                          merge
                        </span>
                        <span
                          class="text-muted-foreground text-xs"
                          i18n="@@shadcn.event.1hr"
                        >
                          1 hr ago
                        </span>
                      </div>
                      <p
                        class="text-muted-foreground text-sm"
                        i18n="@@shadcn.event.merged"
                      >
                        merged feat/auth-refresh → main
                      </p>
                      <a
                        href="#"
                        class="text-primary text-sm underline-offset-4 hover:underline"
                        i18n="@@shadcn.event.viewDetails"
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
                        <span
                          class="text-sm font-medium"
                          i18n="@@shadcn.event.system"
                          >System</span
                        >
                        <span
                          scBadge
                          variant="destructive"
                          class="text-xs"
                          i18n="@@shadcn.event.alert"
                        >
                          alert
                        </span>
                        <span
                          class="text-muted-foreground text-xs"
                          i18n="@@shadcn.event.2hr"
                        >
                          2 hr ago
                        </span>
                      </div>
                      <p
                        class="text-muted-foreground text-sm"
                        i18n="@@shadcn.event.alerted"
                      >
                        triggered alert on API p95 latency spike
                      </p>
                      <a
                        href="#"
                        class="text-primary text-sm underline-offset-4 hover:underline"
                        i18n="@@shadcn.event.viewDetails"
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
                        <span
                          scBadge
                          variant="outline"
                          class="text-xs"
                          i18n="@@shadcn.event.task"
                        >
                          task
                        </span>
                        <span
                          class="text-muted-foreground text-xs"
                          i18n="@@shadcn.event.3hr"
                        >
                          3 hr ago
                        </span>
                      </div>
                      <p
                        class="text-muted-foreground text-sm"
                        i18n="@@shadcn.event.completed"
                      >
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
                        <span
                          scBadge
                          variant="outline"
                          class="text-xs"
                          i18n="@@shadcn.event.join"
                        >
                          join
                        </span>
                        <span
                          class="text-muted-foreground text-xs"
                          i18n="@@shadcn.event.yesterday"
                        >
                          Yesterday
                        </span>
                      </div>
                      <p
                        class="text-muted-foreground text-sm"
                        i18n="@@shadcn.event.joined"
                      >
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.finance"
            >
              Finance Dashboard
            </h2>
            <div scSeparator></div>

            <!-- Net Worth -->
            <div scCard>
              <div scCardHeader>
                <p scCardDescription i18n="@@shadcn.finance.netWorth">
                  Net Worth
                </p>
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
                    <p
                      class="text-muted-foreground text-sm"
                      i18n="@@shadcn.finance.assets"
                    >
                      Assets
                    </p>
                    <p class="text-lg font-semibold">$186,200</p>
                  </div>
                  <div class="space-y-1">
                    <p
                      class="text-muted-foreground text-sm"
                      i18n="@@shadcn.finance.liabilities"
                    >
                      Liabilities
                    </p>
                    <p class="text-lg font-semibold">$61,350</p>
                  </div>
                  <div class="space-y-1">
                    <p
                      class="text-muted-foreground text-sm"
                      i18n="@@shadcn.finance.savingsRate"
                    >
                      Savings Rate
                    </p>
                    <p class="text-lg font-semibold">33%</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <!-- Income vs Expense Chart -->
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle i18n="@@shadcn.finance.incomeVsExpense">
                    Income vs Expense
                  </h3>
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
                      <span
                        class="text-muted-foreground text-xs"
                        i18n="@@shadcn.finance.income"
                        >Income</span
                      >
                    </div>
                    <div class="flex items-center gap-1.5">
                      <div
                        class="bg-muted-foreground/30 size-2.5 rounded-full"
                      ></div>
                      <span
                        class="text-muted-foreground text-xs"
                        i18n="@@shadcn.finance.expense"
                        >Expense</span
                      >
                    </div>
                  </div>
                </div>
              </div>

              <!-- Spending Breakdown -->
              <div scCard>
                <div scCardHeader>
                  <h3 scCardTitle i18n="@@shadcn.finance.spending">
                    Spending Breakdown
                  </h3>
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
                <h3 scCardTitle i18n="@@shadcn.finance.budget">Budget</h3>
              </div>
              <div scCardBody class="space-y-4">
                @for (budget of budgetItems; track budget.name) {
                  <div class="space-y-2">
                    <div class="flex items-center justify-between text-sm">
                      <span>{{ budget.name }}</span>
                      <span class="text-muted-foreground">
                        \${{ budget.spent }} / \${{ budget.limit }}
                        @if (budget.over) {
                          <span
                            class="text-destructive ml-1 font-medium"
                            i18n="@@shadcn.finance.overBudget"
                          >
                            over budget
                          </span>
                        }
                      </span>
                    </div>
                    <div
                      scProgress
                      [value]="budget.percent"
                      aria-label="{{ budget.name }} budget"
                      i18n-aria-label="@@shadcn.budgetOf"
                    ></div>
                  </div>
                }
              </div>
            </div>

            <!-- Recent Transactions -->
            <div scCard>
              <div scCardHeader>
                <h3 scCardTitle i18n="@@shadcn.finance.transactions">
                  Recent Transactions
                </h3>
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
                    <div class="text-end">
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
            <h2
              class="text-2xl font-semibold tracking-tight"
              i18n="@@shadcn.doctor"
            >
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
                      <p
                        class="text-muted-foreground text-sm"
                        i18n="@@shadcn.doctor.specialty"
                      >
                        Cardiologist · NYC Heart Clinic
                      </p>
                      <span
                        scBadge
                        class="bg-emerald-500/10 text-emerald-500"
                        i18n="@@shadcn.doctor.available"
                      >
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
                      <p
                        class="text-muted-foreground text-xs"
                        i18n="@@shadcn.doctor.reviews"
                      >
                        127 reviews
                      </p>
                    </div>
                    <div>
                      <p class="font-semibold" i18n="@@shadcn.doctor.years">
                        12 yrs
                      </p>
                      <p
                        class="text-muted-foreground text-xs"
                        i18n="@@shadcn.doctor.cardiology"
                      >
                        Cardiology
                      </p>
                    </div>
                    <div>
                      <p class="font-semibold" i18n="@@shadcn.doctor.days">
                        Mon – Fri
                      </p>
                      <p
                        class="text-muted-foreground text-xs"
                        i18n="@@shadcn.doctor.schedule"
                      >
                        Schedule
                      </p>
                    </div>
                  </div>

                  <button scButton class="w-full" i18n="@@shadcn.doctor.book">
                    Book Appointment
                  </button>
                </div>
              </div>

              <!-- Calendar -->
              <div scCard>
                <div scCardBody>
                  <div class="w-fit rounded-md">
                    <div
                      scCalendar
                      aria-label="Calendar"
                      i18n-aria-label="@@shadcn.calendar"
                      [(value)]="selectedDate"
                    >
                      <div scCalendarHeader>
                        <button scCalendarPrevious>
                          <svg siChevronLeftIcon></svg>
                          <span
                            class="sr-only"
                            i18n="@@shadcn.calendar.previous"
                            >Go to previous month</span
                          >
                        </button>
                        <button scCalendarNext>
                          <svg siChevronRightIcon></svg>
                          <span class="sr-only" i18n="@@shadcn.calendar.next"
                            >Go to next month</span
                          >
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
})
export default class ShadcnPage {
  private readonly locale = inject(LOCALE_ID);
  private readonly relative = new Intl.RelativeTimeFormat(this.locale, {
    style: 'narrow',
  });

  readonly basicDialogOpen = signal(false);
  readonly confirmDialogOpen = signal(false);
  readonly formDialogOpen = signal(false);
  readonly selectedDate = signal<Temporal.PlainDate | null>(null);

  readonly userGrowthData = [15, 22, 28, 35, 40, 48, 55, 60, 68, 75, 85, 100];

  readonly signupsByDay = [
    { label: this.weekday(0), value: 65 },
    { label: this.weekday(1), value: 80 },
    { label: this.weekday(2), value: 72 },
    { label: this.weekday(3), value: 90 },
    { label: this.weekday(4), value: 55 },
    { label: this.weekday(5), value: 40 },
    { label: this.weekday(6), value: 35 },
  ];

  readonly recentActivity = [
    {
      initials: 'AL',
      name: 'Alice Lee',
      action: $localize`:@@shadcn.activity.signedUp:signed up`,
      time: this.ago(-2, 'minute'),
    },
    {
      initials: 'BK',
      name: 'Bob Kim',
      action: $localize`:@@shadcn.activity.upgraded:upgraded to Pro`,
      time: this.ago(-14, 'minute'),
    },
    {
      initials: 'CJ',
      name: 'Clara Jones',
      action: $localize`:@@shadcn.activity.invited:invited 3 members`,
      time: this.ago(-1, 'hour'),
    },
    {
      initials: 'DM',
      name: 'Dan Moore',
      action: $localize`:@@shadcn.activity.submitted:submitted a report`,
      time: this.ago(-2, 'hour'),
    },
    {
      initials: 'EW',
      name: 'Eva Wang',
      action: $localize`:@@shadcn.activity.signedUp:signed up`,
      time: this.ago(-3, 'hour'),
    },
    {
      initials: 'FP',
      name: 'Frank Park',
      action: $localize`:@@shadcn.activity.cancelled:cancelled account`,
      time: this.ago(-5, 'hour'),
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
    {
      title: 'Monsters',
      year: '2022',
      type: $localize`:@@shadcn.album.album:Album`,
    },
    {
      title: 'Endless Summer',
      year: '2021',
      type: $localize`:@@shadcn.album.album:Album`,
    },
    {
      title: 'Kids',
      year: '2019',
      type: $localize`:@@shadcn.album.album:Album`,
    },
    {
      title: 'Nocturnal',
      year: '2017',
      type: $localize`:@@shadcn.album.album:Album`,
    },
    {
      title: 'Days of Thunder',
      year: '2018',
      type: $localize`:@@shadcn.album.ep:EP`,
    },
    {
      title: 'Burn',
      year: '2023',
      type: $localize`:@@shadcn.album.single:Single`,
    },
  ];

  readonly menuStarters = [
    {
      emoji: '🧀',
      name: 'Burrata & Heirloom Tomatoes',
      tags: [
        $localize`:@@shadcn.tag.vegetarian:Vegetarian`,
        $localize`:@@shadcn.tag.glutenFree:Gluten-free`,
      ],
      description:
        'Creamy burrata, rainbow tomatoes, basil oil, flaked sea salt',
      price: 14,
    },
    {
      emoji: '🦑',
      name: 'Crispy Calamari',
      tags: [$localize`:@@shadcn.tag.spicy:Spicy 🌶`],
      description:
        'Flash-fried squid, lemon aioli, pickled chilli, fresh herbs',
      price: 13,
    },
    {
      emoji: '🍄',
      name: 'Wild Mushroom Crostini',
      tags: [$localize`:@@shadcn.tag.vegetarian:Vegetarian`],
      description: 'Sourdough, whipped ricotta, truffle, aged parmesan',
      price: 11,
    },
    {
      emoji: '🥣',
      name: 'Spiced Lentil Soup',
      tags: [
        $localize`:@@shadcn.tag.vegan:Vegan`,
        $localize`:@@shadcn.tag.glutenFree:Gluten-free`,
      ],
      description: 'Red lentils, cumin, coriander, coconut cream, crusty bread',
      price: 10,
    },
  ];

  readonly spendingBreakdown = [
    {
      name: $localize`:@@shadcn.category.housing:Housing`,
      amount: '1,225',
      color: 'bg-blue-500',
    },
    {
      name: $localize`:@@shadcn.category.food:Food`,
      amount: '770',
      color: 'bg-emerald-500',
    },
    {
      name: $localize`:@@shadcn.category.transport:Transport`,
      amount: '490',
      color: 'bg-yellow-500',
    },
    {
      name: $localize`:@@shadcn.category.shopping:Shopping`,
      amount: '630',
      color: 'bg-purple-500',
    },
    {
      name: $localize`:@@shadcn.category.other:Other`,
      amount: '385',
      color: 'bg-gray-400',
    },
  ];

  readonly budgetItems = [
    {
      name: $localize`:@@shadcn.category.dining:Food & Dining`,
      spent: 770,
      limit: 900,
      percent: 86,
      over: false,
    },
    {
      name: $localize`:@@shadcn.category.shopping:Shopping`,
      spent: 630,
      limit: 500,
      percent: 100,
      over: true,
    },
    {
      name: $localize`:@@shadcn.category.transport:Transport`,
      spent: 490,
      limit: 600,
      percent: 82,
      over: false,
    },
    {
      name: $localize`:@@shadcn.category.entertainment:Entertainment`,
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
      date: $localize`:@@shadcn.tx.today:Today, ${this.time('14:30')}:time:`,
      amount: '$89.50',
      category: $localize`:@@shadcn.category.groceries:Groceries`,
      positive: false,
    },
    {
      icon: '🎬',
      name: 'Netflix',
      date: $localize`:@@shadcn.tx.yesterday:Yesterday`,
      amount: '$15.99',
      category: $localize`:@@shadcn.category.entertainment:Entertainment`,
      positive: false,
    },
    {
      icon: '⛽',
      name: 'Shell Gas',
      date: $localize`:@@shadcn.tx.yesterday:Yesterday`,
      amount: '$52.30',
      category: $localize`:@@shadcn.category.transport:Transport`,
      positive: false,
    },
    {
      icon: '💰',
      name: 'Salary Deposit',
      date: this.monthDay(6, 1),
      amount: '+$4200.00',
      category: $localize`:@@shadcn.category.income:Income`,
      positive: true,
    },
    {
      icon: '🛍️',
      name: 'Amazon',
      date: this.monthDay(5, 30),
      amount: '$124.00',
      category: $localize`:@@shadcn.category.shopping:Shopping`,
      positive: false,
    },
    {
      icon: '☕',
      name: 'Starbucks',
      date: this.monthDay(5, 29),
      amount: '$6.75',
      category: $localize`:@@shadcn.category.food:Food`,
      positive: false,
    },
  ];

  readonly incomeExpenseData = [
    { label: this.month(1), income: 140, expense: 100 },
    { label: this.month(2), income: 135, expense: 95 },
    { label: this.month(3), income: 150, expense: 110 },
    { label: this.month(4), income: 145, expense: 105 },
    { label: this.month(5), income: 155, expense: 120 },
    { label: this.month(6), income: 160, expense: 115 },
  ];

  /** A weekday's short name, Monday first. */
  weekday(index: number): string {
    return Temporal.PlainDate.from({
      year: 2026,
      month: 1,
      day: 5 + index,
    }).toLocaleString(this.locale, { weekday: 'short' });
  }

  /** A month's short name. */
  month(month: number): string {
    return Temporal.PlainDate.from({
      year: 2026,
      month,
      day: 1,
    }).toLocaleString(this.locale, { month: 'short' });
  }

  private monthDay(month: number, day: number): string {
    return Temporal.PlainDate.from({ year: 2026, month, day }).toLocaleString(
      this.locale,
      { month: 'short', day: 'numeric' },
    );
  }

  private time(time: string): string {
    return Temporal.PlainTime.from(time).toLocaleString(this.locale, {
      timeStyle: 'short',
    });
  }

  private ago(value: number, unit: Intl.RelativeTimeFormatUnit): string {
    return this.relative.format(value, unit);
  }
}
