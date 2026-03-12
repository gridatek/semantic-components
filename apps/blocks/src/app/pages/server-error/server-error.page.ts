import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-server-error',
  imports: [RouterLink, ScButton],
  host: { class: 'block' },
  template: `
    <div
      class="bg-background flex min-h-screen flex-col items-center justify-center px-6"
    >
      <p class="text-muted-foreground/20 text-8xl font-bold">500</p>

      <h1 class="mt-4 text-3xl font-bold tracking-tight">Server Error</h1>

      <p class="text-muted-foreground mt-2 text-center text-base">
        Something went wrong on our end. Please try again later.
      </p>

      <div class="mt-8 flex gap-4">
        <a scButton routerLink="/">Go Home</a>
        <button scButton variant="outline" (click)="tryAgain()">
          Try Again
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ServerErrorPage {
  private readonly document = inject(DOCUMENT);

  tryAgain() {
    this.document.defaultView?.location.reload();
  }
}
