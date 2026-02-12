import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import Navbar from '../../components/navbar/navbar';

@Component({
  selector: 'app-home-page',
  imports: [Navbar],
  template: `
    <app-navbar />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {}
