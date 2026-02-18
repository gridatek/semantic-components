import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSpinner } from '@semantic-components/ui';
import { SiLoader2Icon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-colors-spinner-demo',
  imports: [ScSpinner, SiLoader2Icon],
  template: `
    <div class="flex items-center gap-6">
      <svg scSpinner siLoader2Icon class="text-primary"></svg>
      <svg scSpinner siLoader2Icon class="text-blue-500"></svg>
      <svg scSpinner siLoader2Icon class="text-green-500"></svg>
      <svg scSpinner siLoader2Icon class="text-yellow-500"></svg>
      <svg scSpinner siLoader2Icon class="text-red-500"></svg>
      <svg scSpinner siLoader2Icon class="text-purple-500"></svg>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorsSpinnerDemo {}
