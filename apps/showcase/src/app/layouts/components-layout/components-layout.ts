import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
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
import { cn } from '@semantic-components/ui';
import { filter } from 'rxjs';
import { Toc } from '../../components/toc/toc';
import { TocService } from '../../components/toc/toc.service';
import { ComponentsService } from '../../services/components.service';

@Component({
  selector: 'app-components-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, Toc],
  template: `
    <div class="flex min-h-screen">
      <!-- Left Sidebar -->
      <aside
        class="bg-background hidden w-64 shrink-0 overflow-y-auto border-r p-6 md:block"
      >
        <nav class="space-y-1">
          <h4 class="mb-4 font-semibold">Components</h4>

          @for (item of components(); track item.path) {
            <a
              [routerLink]="'/docs/components/' + item.path"
              routerLinkActive="bg-accent text-accent-foreground"
              class="hover:bg-accent hover:text-accent-foreground block rounded-md px-3 py-2 text-sm transition-colors"
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
      <aside class="hidden w-56 shrink-0 overflow-y-auto border-l p-6 xl:block">
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
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ComponentsLayout {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  protected readonly tocService = inject(TocService);
  private readonly componentsService = inject(ComponentsService);

  private readonly contentArea =
    viewChild.required<ElementRef<HTMLElement>>('contentArea');

  readonly components = this.componentsService.visibleComponents;

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
