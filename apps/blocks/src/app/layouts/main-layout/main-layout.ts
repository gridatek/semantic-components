import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { StackedLayout } from '../../components/stacked-layout/stacked-layout';
import { Navbar } from '../../components/navbar/navbar';
import { Footer } from '../../components/footer/footer';

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
