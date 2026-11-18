import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScEmpty,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScLink,
} from '@semantic-components/ui';
import { SiCircleAlertIcon } from '@semantic-icons/lucide-icons';

/** The 404 page (shadcndashboard's auth/error). */
@Component({
  selector: 'app-error-page',
  imports: [
    RouterLink,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScLink,
    SiCircleAlertIcon,
  ],
  template: `
    <div scEmpty class="bg-background max-w-md border">
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon"><svg siCircleAlertIcon></svg></div>
        <h1 class="text-6xl font-semibold tracking-tight tabular-nums">404</h1>
        <h2 i18n="@@auth.error.opps" scEmptyTitle>Opps!!!</h2>
        <div i18n="@@auth.error.thisPageYouAreLooking" scEmptyDescription>
          This page you are looking for could not be found.
        </div>
      </div>
      <a i18n="@@auth.error.goBackToHome" scLink variant="button" routerLink="/"
        >Go Back to Home</a
      >
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ErrorPage {}
