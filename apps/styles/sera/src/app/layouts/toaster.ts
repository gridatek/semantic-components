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
  SiInfoIcon,
  SiLoaderCircleIcon,
  SiOctagonXIcon,
  SiTriangleAlertIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

/**
 * How the app's toasts look — written once, the library's `ScToaster` renders
 * it for each: the confirmations of what was done (saved, uploaded…).
 */
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
    SiInfoIcon,
    SiLoaderCircleIcon,
    SiOctagonXIcon,
    SiTriangleAlertIcon,
    SiXIcon,
  ],
  template: `
    <ng-template scToastTemplate let-toast label="Notifications">
      <div scToast>
        @switch (toast.variant) {
          @case ('success') {
            <span scToastIcon><svg siCircleCheckIcon></svg></span>
          }
          @case ('info') {
            <span scToastIcon><svg siInfoIcon></svg></span>
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
        <div class="flex min-w-0 flex-1 flex-col gap-1">
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
