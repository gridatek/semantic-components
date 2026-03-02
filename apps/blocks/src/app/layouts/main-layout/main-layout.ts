import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { Footer } from '../../components/footer/footer';
import { Navbar } from '../../components/navbar/navbar';
import { StackedLayout } from '../../components/stacked-layout/stacked-layout';

@Component({
  selector: 'app-main-layout',
  imports: [StackedLayout, Navbar, Footer],
  template: `
    <app-stacked-layout>
      <app-navbar slot="navbar" />
      <app-footer slot="footer" />
    </app-stacked-layout>
  `,
  host: {
    'data-slot': 'main-layout',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
