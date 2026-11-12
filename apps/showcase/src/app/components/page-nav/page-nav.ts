import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ScLink } from '@semantic-components/ui';
import {
  SiArrowLeftIcon,
  SiArrowRightIcon,
} from '@semantic-icons/lucide-icons';
import { filter, map } from 'rxjs';

/** A docs page, as the sidebar lists it. */
export interface PageNavItem {
  name: string;
  path: string;
}

/**
 * The previous and next pages, in the sidebar's order, at the bottom of a
 * docs page (as shadcn's site has them).
 */
@Component({
  selector: 'app-page-nav',
  imports: [RouterLink, ScLink, SiArrowLeftIcon, SiArrowRightIcon],
  template: `
    @if (previous() || next()) {
      <nav
        aria-label="Previous and next page"
        class="mt-12 flex items-center gap-4 border-t pt-6"
      >
        @if (previous(); as page) {
          <a scLink variant="secondary" size="sm" [routerLink]="page.path">
            <svg siArrowLeftIcon class="rtl:rotate-180"></svg>
            {{ page.name }}
          </a>
        }
        @if (next(); as page) {
          <a
            scLink
            variant="secondary"
            size="sm"
            class="ms-auto"
            [routerLink]="page.path"
          >
            {{ page.name }}
            <svg siArrowRightIcon class="rtl:rotate-180"></svg>
          </a>
        }
      </nav>
    }
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class PageNav {
  /** Every page, in the sidebar's order. */
  readonly pages = input.required<readonly PageNavItem[]>();

  private readonly router = inject(Router);
  /** The page shown: its path, without query or fragment. */
  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.path()),
    ),
    { initialValue: this.path() },
  );

  private readonly index = computed(() =>
    this.pages().findIndex((page) => page.path === this.url()),
  );
  protected readonly previous = computed(() =>
    this.index() > 0 ? this.pages()[this.index() - 1] : null,
  );
  protected readonly next = computed(() => {
    const i = this.index();
    return i !== -1 && i < this.pages().length - 1 ? this.pages()[i + 1] : null;
  });

  private path(): string {
    return this.router.url.split(/[?#]/)[0];
  }
}
