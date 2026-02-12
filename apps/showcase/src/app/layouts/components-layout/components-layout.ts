import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs';
import { Toc } from '../../components/toc/toc';
import { TocService } from '../../components/toc/toc.service';
import { COMPONENTS } from '../../data/components';

@Component({
  selector: 'app-components-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Toc],
  template: `
    <div class="flex min-h-screen">
      <!-- Left Sidebar -->
      <aside
        class="hidden md:block w-64 border-r bg-background p-6 overflow-y-auto shrink-0"
      >
        <nav class="space-y-1">
          <h4 class="font-semibold mb-4">Components</h4>

          @for (item of components; track item.path) {
            <a
              [routerLink]="'/docs/components/' + item.path"
              routerLinkActive="bg-accent text-accent-foreground"
              class="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {{ item.name }}
            </a>
          }
        </nav>
      </aside>

      <!-- Main Content -->
      <main #contentArea class="flex-1 overflow-auto p-6">
        <div class="max-w-4xl">
          <router-outlet />
        </div>
      </main>

      <!-- TOC (Right Sidebar) -->
      <aside class="hidden xl:block w-56 border-l p-6 shrink-0 overflow-y-auto">
        <div class="sticky top-6">
          <app-toc
            [items]="tocService.items()"
            [activeId]="tocService.activeId()"
          />
        </div>
      </aside>
    </div>
  `,
  host: {
    'data-slot': 'components-layout',
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsLayout {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly tocService = inject(TocService);

  private readonly contentArea =
    viewChild.required<ElementRef<HTMLElement>>('contentArea');

  readonly components = COMPONENTS;

  constructor() {
    afterNextRender(() => {
      this.extractTocHeadings();

      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe(() => {
          setTimeout(() => this.extractTocHeadings(), 100);
        });
    });
  }

  private extractTocHeadings(): void {
    const container = this.contentArea().nativeElement;
    this.tocService.extractHeadings(container);
  }
}
