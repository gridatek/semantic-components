import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScStackedLayout } from '@semantic-components/ui-lab';
import { Footer } from '../footer/footer';
import Navbar from '../navbar/navbar';

@Component({
  selector: 'app-stacked-layout',
  imports: [ScStackedLayout, Navbar, Footer],
  template: `
    <sc-stacked-layout>
      <app-navbar scNavbar />
      <app-footer scFooter />
    </sc-stacked-layout>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedLayout {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
