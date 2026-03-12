import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ScButton } from '@semantic-components/ui';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, ScButton],
  host: { class: 'block' },
  template: `
    <div
      class="bg-background flex min-h-screen flex-col items-center justify-center px-6"
    >
      <p class="text-muted-foreground/20 text-8xl font-bold">404</p>

      <h1 class="mt-4 text-3xl font-bold tracking-tight">Page not found</h1>

      <p class="text-muted-foreground mt-2 text-center text-base">
        Sorry, we couldn't find the page you're looking for.
      </p>

      <div class="mt-8 flex gap-4">
        <a scButton routerLink="/">Go Home</a>
        <button scButton variant="outline" (click)="goBack()">Go Back</button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundPage {
  private readonly location = inject(Location);

  goBack() {
    this.location.back();
  }
}
