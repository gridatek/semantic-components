import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpinner } from '@semantic-components/ui-lab';
import { SiLoader2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-colors-spinner-demo',
  imports: [ScSpinner, SiLoader2Icon],
  template: `
    <div class="flex items-center gap-6">
      <svg sc-spinner si-loader-2-icon class="text-primary"></svg>
      <svg sc-spinner si-loader-2-icon class="text-blue-500"></svg>
      <svg sc-spinner si-loader-2-icon class="text-green-500"></svg>
      <svg sc-spinner si-loader-2-icon class="text-yellow-500"></svg>
      <svg sc-spinner si-loader-2-icon class="text-red-500"></svg>
      <svg sc-spinner si-loader-2-icon class="text-purple-500"></svg>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsSpinnerDemo {}
