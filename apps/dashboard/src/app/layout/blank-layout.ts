import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/** The sign-in screens, the error and the maintenance pages: the page alone, centred. */
@Component({
  selector: 'app-blank-layout',
  imports: [RouterOutlet],
  template: `
    <main
      class="bg-muted flex min-h-svh items-center justify-center p-4 md:p-10"
    >
      <router-outlet />
    </main>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class BlankLayout {}
