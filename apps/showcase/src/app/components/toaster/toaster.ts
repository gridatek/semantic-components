import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScToast,
  ScToastAction,
  ScToastClose,
  ScToastDescription,
  ScToastIcon,
  ScToastTemplate,
  ScToastTitle,
} from '@semantic-components/ui';
import {
  SiCircleCheckIcon,
  SiLoaderCircleIcon,
  SiOctagonXIcon,
  SiTriangleAlertIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/** How the app's toasts look: written once, rendered by `ScToaster` for each toast. */
@Component({
  selector: 'app-toaster',
  imports: [
    ScToastTemplate,
    ScToast,
    ScToastIcon,
    ScToastTitle,
    ScToastDescription,
    ScToastAction,
    ScToastClose,
    SiCircleCheckIcon,
    SiLoaderCircleIcon,
    SiOctagonXIcon,
    SiTriangleAlertIcon,
    SiXIcon,
  ],
  template: `
    <ng-template scToastTemplate let-toast label="Notifications, Alt+T">
      <div scToast>
        @switch (toast.variant) {
          @case ('success') {
            <span scToastIcon><svg siCircleCheckIcon></svg></span>
          }
          @case ('warning') {
            <span scToastIcon><svg siTriangleAlertIcon></svg></span>
          }
          @case ('error') {
            <span scToastIcon><svg siOctagonXIcon></svg></span>
          }
          @case ('loading') {
            <span scToastIcon><svg siLoaderCircleIcon></svg></span>
          }
        }
        <div class="grid gap-1">
          @if (toast.title) {
            <div scToastTitle>{{ toast.title }}</div>
          }
          @if (toast.description) {
            <div scToastDescription>{{ toast.description }}</div>
          }
        </div>
        @if (toast.action) {
          <button scToastAction>{{ toast.action.label }}</button>
        }
        <button scToastClose>
          <svg siXIcon></svg>
          <span class="sr-only">Close</span>
        </button>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Toaster {}
