import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cn } from '../../utils';

@Component({
  selector: 'sc-stacked-layout',
  imports: [RouterOutlet],
  template: `
    <ng-content select="[scNavbar]" />

    <main data-slot="stacked-layout-content" class="flex-1">
      <router-outlet />
    </main>

    <ng-content select="[scFooter]" />
  `,
  host: {
    'data-slot': 'stacked-layout',
    '[class]': 'class()',
  },
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScStackedLayout {
  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn('min-h-screen flex flex-col', this.classInput()),
  );
}
