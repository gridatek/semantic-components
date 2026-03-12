import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScAvatar,
  ScAvatarFallback,
  ScBadge,
  ScCard,
  ScCardBody,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScSeparator,
} from '@semantic-components/ui';

@Component({
  selector: 'app-blog',
  imports: [
    RouterLink,
    ScAvatar,
    ScAvatarFallback,
    ScBadge,
    ScCard,
    ScCardBody,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScSeparator,
  ],
  host: { class: 'block' },
  template: `
    <div class="bg-background min-h-screen">
      <div class="mx-auto max-w-5xl px-6 py-12">
        <div class="mb-8 space-y-2">
          <h1 class="text-4xl font-bold tracking-tight">Blog</h1>
          <p class="text-muted-foreground text-lg">
            Insights, updates, and tutorials from our team.
          </p>
        </div>

        <div scSeparator class="mb-10"></div>

        <!-- Featured Article -->
        <a routerLink="/blog/getting-started" class="group mb-10 block">
          <div scCard class="overflow-hidden">
            <div scCardHeader>
              <div class="mb-2 flex items-center gap-2">
                <div scBadge variant="secondary">Featured</div>
                <div scBadge>Tutorial</div>
              </div>
              <h2 scCardTitle class="text-2xl group-hover:underline">
                Getting Started with Angular Signals
              </h2>
              <p scCardDescription>
                A comprehensive guide to understanding and using Angular Signals
                for reactive state management. Learn how signals simplify your
                component architecture and improve performance.
              </p>
            </div>
            <div scCardBody>
              <div class="flex items-center gap-3">
                <span scAvatar size="sm">
                  <span scAvatarFallback>AJ</span>
                </span>
                <div>
                  <p class="text-sm font-medium">Alex Johnson</p>
                  <p class="text-muted-foreground text-xs">Jan 15, 2026</p>
                </div>
              </div>
            </div>
          </div>
        </a>

        <!-- Article Grid -->
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Article 1 -->
          <a routerLink="/blog/getting-started" class="group block">
            <div scCard class="h-full">
              <div scCardHeader>
                <div class="mb-2">
                  <div scBadge>Tutorial</div>
                </div>
                <h3 scCardTitle class="group-hover:underline">
                  Getting Started with Angular Signals
                </h3>
                <p scCardDescription>
                  Learn how to use Angular Signals for reactive state management
                  in your components.
                </p>
              </div>
              <div scCardBody>
                <div class="flex items-center gap-3">
                  <span scAvatar size="sm">
                    <span scAvatarFallback>AJ</span>
                  </span>
                  <div>
                    <p class="text-sm font-medium">Alex Johnson</p>
                    <p class="text-muted-foreground text-xs">Jan 15, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- Article 2 -->
          <a routerLink="/blog/getting-started" class="group block">
            <div scCard class="h-full">
              <div scCardHeader>
                <div class="mb-2">
                  <div scBadge variant="secondary">Engineering</div>
                </div>
                <h3 scCardTitle class="group-hover:underline">
                  Building Accessible Components
                </h3>
                <p scCardDescription>
                  Best practices for creating UI components that work for
                  everyone, including keyboard and screen reader users.
                </p>
              </div>
              <div scCardBody>
                <div class="flex items-center gap-3">
                  <span scAvatar size="sm">
                    <span scAvatarFallback>SR</span>
                  </span>
                  <div>
                    <p class="text-sm font-medium">Sam Rivera</p>
                    <p class="text-muted-foreground text-xs">Feb 2, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- Article 3 -->
          <a routerLink="/blog/getting-started" class="group block">
            <div scCard class="h-full">
              <div scCardHeader>
                <div class="mb-2">
                  <div scBadge variant="outline">Design</div>
                </div>
                <h3 scCardTitle class="group-hover:underline">
                  Design System Best Practices
                </h3>
                <p scCardDescription>
                  How to build and maintain a design system that scales with
                  your team and product.
                </p>
              </div>
              <div scCardBody>
                <div class="flex items-center gap-3">
                  <span scAvatar size="sm">
                    <span scAvatarFallback>MC</span>
                  </span>
                  <div>
                    <p class="text-sm font-medium">Morgan Chen</p>
                    <p class="text-muted-foreground text-xs">Feb 20, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </a>

          <!-- Article 4 -->
          <a routerLink="/blog/getting-started" class="group block">
            <div scCard class="h-full">
              <div scCardHeader>
                <div class="mb-2">
                  <div scBadge variant="destructive">Announcement</div>
                </div>
                <h3 scCardTitle class="group-hover:underline">
                  Announcing v2.0
                </h3>
                <p scCardDescription>
                  A major release with new components, improved accessibility,
                  and a refreshed design language.
                </p>
              </div>
              <div scCardBody>
                <div class="flex items-center gap-3">
                  <span scAvatar size="sm">
                    <span scAvatarFallback>TK</span>
                  </span>
                  <div>
                    <p class="text-sm font-medium">Taylor Kim</p>
                    <p class="text-muted-foreground text-xs">Mar 1, 2026</p>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BlogPage {}
