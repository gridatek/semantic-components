import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  ViewEncapsulation,
  output,
} from '@angular/core';

@Component({
  selector: 'sc-stepper',
  imports: [CommonModule, CdkStepperModule],
  template: `
    <div class="w-full">
      <!-- Step header navigation -->
      <div class="flex justify-between mb-8">
        @for (step of steps; track step; let i = $index; let last = $last) {
          <div class="flex items-center">
            <!-- Step circle with number -->
            <button
              class="flex items-center justify-center w-10 h-10 rounded-full font-medium transition-colors duration-200"
              [ngClass]="{
                'bg-blue-600 text-white': selectedIndex >= i,
                'bg-gray-200 text-gray-600': selectedIndex < i,
              }"
              (click)="onClick(i)"
            >
              @if (selectedIndex > i) {
                <span class="text-lg">✓</span>
              }
              @if (selectedIndex <= i) {
                <span>{{ i + 1 }}</span>
              }
            </button>
            <!-- Step label -->
            <span
              class="ml-3 font-medium transition-colors duration-200"
              [ngClass]="{
                'text-blue-600': selectedIndex >= i,
                'text-gray-500': selectedIndex < i,
              }"
            >
              {{ step.label }}
            </span>
          </div>
          <!-- Connector line between steps -->
          @if (!last) {
            <div
              class="grow mx-4 h-0.5 mt-5"
              [ngClass]="{ 'bg-blue-600': selectedIndex > i, 'bg-gray-200': selectedIndex <= i }"
            ></div>
          }
        }
      </div>

      <!-- Step content -->
      <div class="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <ng-container [ngTemplateOutlet]="selected ? selected.content : null" />

        <!-- Navigation buttons -->
        <div class="flex justify-between mt-8">
          @if (selectedIndex > 0) {
            <button
              class="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50 transition-colors duration-200"
              (click)="previous()"
            >
              Previous
            </button>
          }
          <div class="grow"></div>
          @if (selectedIndex < steps.length - 1) {
            <button
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
              (click)="next()"
            >
              Next
            </button>
          }
          @if (selectedIndex === steps.length - 1) {
            <button
              class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
              (click)="complete()"
            >
              Complete
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: CdkStepper, useExisting: ScStepper }],
})
export class ScStepper extends CdkStepper implements OnInit {
  readonly stepCompleteEvent = output<void>();

  ngOnInit() {
    this.linear = false; // Allow steps to be accessed in any order
  }

  onClick(index: number): void {
    this.selectedIndex = index;
  }

  complete(): void {
    this.stepCompleteEvent.emit();
    console.log('Stepper completed!');
  }
}
