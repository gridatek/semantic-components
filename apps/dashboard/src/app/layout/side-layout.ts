import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiLayoutDashboardIcon } from '@semantic-icons/lucide-icons';

/**
 * The sign-in screens' side variant (shadcndashboard's auth1): a picture and
 * a word on one half, the form on the other; the picture drops on phones.
 */
@Component({
  selector: 'app-side-layout',
  imports: [NgOptimizedImage, RouterOutlet, SiLayoutDashboardIcon],
  template: `
    <main class="grid min-h-svh lg:grid-cols-2">
      <div
        class="bg-muted relative hidden flex-col justify-between p-10 lg:flex"
      >
        <div class="flex items-center gap-2 font-semibold">
          <span
            class="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg"
          >
            <svg siLayoutDashboardIcon></svg>
          </span>
          <ng-container i18n>Dashboard</ng-container>
        </div>
        <div class="relative mx-auto aspect-square w-full max-w-md">
          <img
            ngSrc="images/backgrounds/login-bg.png"
            fill
            priority
            alt=""
            class="object-contain"
          />
        </div>
        <blockquote class="flex flex-col gap-2">
          <p i18n class="text-lg">
            “Every screen of this dashboard is built from the same parts: one
            look, carried by the preset.”
          </p>
          <footer i18n class="text-muted-foreground text-sm">
            Semantic Components
          </footer>
        </blockquote>
      </div>
      <div class="flex items-center justify-center p-4 md:p-10">
        <router-outlet />
      </div>
    </main>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class SideLayout {}
