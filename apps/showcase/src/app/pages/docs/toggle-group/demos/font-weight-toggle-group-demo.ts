import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { ScToggleGroup, ScToggleGroupItem } from '@semantic-components/ui';

/** Big items, each a sample and its name: one weight at a time. */
@Component({
  selector: 'app-font-weight-toggle-group-demo',
  imports: [ScToggleGroup, ScToggleGroupItem],
  template: `
    <div class="flex flex-col gap-3">
      <p id="font-weight-label" class="text-sm font-medium">Font Weight</p>
      <div
        scToggleGroup
        variant="outline"
        size="lg"
        aria-labelledby="font-weight-label"
        [(value)]="weight"
      >
        @for (weight of weights; track weight.value) {
          <button
            scToggleGroupItem
            [value]="weight.value"
            class="flex size-16 flex-col items-center justify-center rounded-xl"
          >
            <span
              class="text-2xl leading-none"
              [class]="weight.className"
              aria-hidden="true"
              >Aa</span
            >
            <span class="text-muted-foreground text-xs">{{
              weight.label
            }}</span>
          </button>
        }
      </div>
      <p class="text-muted-foreground text-sm">
        Use
        <span class="text-foreground" [class]="className()"
          >font-{{ weight()[0] ?? 'normal' }}</span
        >
        for your text.
      </p>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FontWeightToggleGroupDemo {
  protected readonly weights = [
    { value: 'light', label: 'Light', className: 'font-light' },
    { value: 'normal', label: 'Normal', className: 'font-normal' },
    { value: 'medium', label: 'Medium', className: 'font-medium' },
    { value: 'bold', label: 'Bold', className: 'font-bold' },
  ];
  protected readonly weight = signal(['normal']);
  protected readonly className = computed(
    () =>
      this.weights.find((weight) => weight.value === this.weight()[0])
        ?.className ?? 'font-normal',
  );
}
