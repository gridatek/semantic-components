import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-stacked-layout',
  imports: [RouterOutlet],
  template: `
    <ng-content select="[slot=navbar]" />

    <main data-slot="stacked-layout-content" class="flex-1">
      <router-outlet />
    </main>

    <ng-content select="[slot=footer]" />
  `,
  host: {
    'data-slot': 'stacked-layout',
    class: 'min-h-screen flex flex-col block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedLayout {}
