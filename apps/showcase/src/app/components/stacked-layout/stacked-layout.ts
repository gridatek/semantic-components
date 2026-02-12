import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScStackedLayout } from '@semantic-components/ui-lab';
import Navbar from '../navbar/navbar';
import { Footer } from '../footer/footer';

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
    class: 'block',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackedLayout {}
