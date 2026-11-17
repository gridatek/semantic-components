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
import { SiWrenchIcon } from '@semantic-icons/lucide-icons';

/** The maintenance page (shadcndashboard's auth/maintenance). */
@Component({
  selector: 'app-maintenance-page',
  imports: [
    RouterLink,
    ScEmpty,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScLink,
    SiWrenchIcon,
  ],
  template: `
    <div scEmpty class="bg-background max-w-md border">
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon"><svg siWrenchIcon></svg></div>
        <h1 class="sr-only">Maintenance</h1>
        <h2 scEmptyTitle>Maintenance Mode!!!</h2>
        <div scEmptyDescription>
          Website is in under maintenance. Check back later!
        </div>
      </div>
      <a scLink variant="button" routerLink="/">Go Back to Home</a>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class MaintenancePage {}
