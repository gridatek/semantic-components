import { CdkStepper, CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  computed,
  input,
  output,
} from '@angular/core';

import { cn } from '@semantic-components/utils';
import { VariantProps, cva } from 'class-variance-authority';

export const stepperVariants = cva('w-full', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type StepperVariants = VariantProps<typeof stepperVariants>;

@Component({
  selector: 'sc-stepper',
  imports: [CommonModule, CdkStepperModule],
  template: `
    <div [class]="class()">
      <!-- Step header navigation -->
      <div class="flex items-center space-x-4 mb-8">
        @for (step of steps; track step; let i = $index; let last = $last) {
          <div class="flex items-center">
            <!-- Step circle with number -->
            <button
              class="flex items-center justify-center size-10 rounded-full font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              [class]="getStepButtonClass(i)"
              (click)="onClick(i)"
            >
              @if (selectedIndex > i) {
                <svg class="size-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              } @else {
                <span>{{ i + 1 }}</span>
              }
            </button>

            <!-- Step label -->
            <div class="ml-4 min-w-0">
              <div class="text-sm font-medium transition-colors" [class]="getStepLabelClass(i)">
                {{ step.label }}
              </div>
            </div>
          </div>

          <!-- Connector line between steps -->
          @if (!last) {
            <div class="flex-1 h-px mx-4" [class]="getConnectorClass(i)"></div>
          }
        }
      </div>

      <!-- Step content -->
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div class="p-6">
          <ng-container [ngTemplateOutlet]="selected ? selected.content : null" />
        </div>

        <!-- Navigation buttons -->
        <div class="flex justify-between px-6 pb-6">
          @if (selectedIndex > 0) {
            <button
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              (click)="previous()"
            >
              Previous
            </button>
          } @else {
            <div></div>
          }

          @if (selectedIndex < steps.length - 1) {
            <button
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              (click)="next()"
            >
              Next
            </button>
          } @else {
            <button
              class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
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

  readonly orientationInput = input<StepperVariants['orientation']>('horizontal', {
    alias: 'orientation',
  });

  readonly classInput = input<string>('', {
    alias: 'class',
  });

  protected readonly class = computed(() =>
    cn(stepperVariants({ orientation: this.orientationInput() }), this.classInput()),
  );

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

  getStepButtonClass(index: number): string {
    if (this.selectedIndex > index) {
      return 'bg-primary text-primary-foreground hover:bg-primary/90';
    } else if (this.selectedIndex === index) {
      return 'bg-primary text-primary-foreground hover:bg-primary/90';
    } else {
      return 'bg-muted text-muted-foreground hover:bg-muted/80';
    }
  }

  getStepLabelClass(index: number): string {
    if (this.selectedIndex >= index) {
      return 'text-foreground';
    } else {
      return 'text-muted-foreground';
    }
  }

  getConnectorClass(index: number): string {
    if (this.selectedIndex > index) {
      return 'bg-primary';
    } else {
      return 'bg-border';
    }
  }
}
