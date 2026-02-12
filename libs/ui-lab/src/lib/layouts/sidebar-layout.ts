import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from '../utils';

@Component({
  selector: 'sc-sidebar-layout',
  imports: [RouterOutlet],
  template: `
    <ng-content select="[scSidebar]" />

    <main data-slot="sidebar-layout-content" class="flex-1 overflow-auto">
      <router-outlet />
    </main>
  `,
  host: {
    'data-slot': 'sidebar-layout',
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScSidebarLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('flex min-h-screen', this.classInput()),
  );
}
