import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'cms-root',
  template: `
    <router-outlet />
  `,
  styles: ``,
})
export class App {
  protected title = 'cms';
}
