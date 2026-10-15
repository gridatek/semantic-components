import { Component, ViewEncapsulation } from '@angular/core';
import {
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

/** How the app's toasts look: written once, rendered by `ScToaster` for each toast. */
@Component({
  selector: 'app-toaster',
  imports: [
    ScToastTemplate,
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
    <ng-template scToastTemplate let-toast>
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
      <button scToastClose aria-label="Close">
        <svg siXIcon></svg>
      </button>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Toaster {}
