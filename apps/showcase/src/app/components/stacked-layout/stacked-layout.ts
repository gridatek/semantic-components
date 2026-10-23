import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScStackedLayout } from '@semantic-components/ui-lab';
import { Footer } from '../footer/footer';
import Navbar from '../navbar/navbar';

@Component({
  selector: 'app-stacked-layout',
  imports: [ScStackedLayout, Navbar, Footer],
  template: `
    <div scStackedLayout>
      <app-navbar scNavbar />
      <app-footer scFooter />
    </div>
  `,
  host: {
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class StackedLayout {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));
}
