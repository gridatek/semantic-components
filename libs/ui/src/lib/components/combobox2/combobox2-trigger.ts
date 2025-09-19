import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewEncapsulation,
  contentChild,
  input,
  output,
} from '@angular/core';

import { ScCombobox2Item } from './types';

@Component({
  selector: 'sc-combobox2-trigger',
  imports: [CommonModule],
  template: `
    <button
      class="inline-flex items-center justify-between whitespace-nowrap rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 h-10 w-full"
      [class.border-destructive]="isInvalid()"
      [disabled]="disabled()"
      (click)="triggerClick.emit()"
      (focus)="triggerFocus.emit()"
      (blur)="triggerBlur.emit()"
      type="button"
    >
      <div class="flex items-center space-x-2 overflow-hidden flex-1">
        @if (triggerTemplate()) {
          <ng-container
            [ngTemplateOutlet]="triggerTemplate()!"
            [ngTemplateOutletContext]="{ $implicit: selectedItem() }"
          />
        } @else {
          @if (selectedItem()) {
            <span class="truncate">{{ selectedItem()!.label }}</span>
          } @else {
            <span class="text-muted-foreground truncate">{{ placeholder() }}</span>
          }
        }
      </div>
      <svg
        class="h-4 w-4 opacity-50 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m6 9 6 6 6-6" />
      </svg>
    </button>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScCombobox2Trigger {
  readonly selectedItem = input.required<ScCombobox2Item | null>();
  readonly placeholder = input<string>('Select option...');
  readonly isInvalid = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly triggerTemplate = input<TemplateRef<{ $implicit: ScCombobox2Item | null }> | null>(null);

  readonly triggerClick = output<void>();
  readonly triggerFocus = output<void>();
  readonly triggerBlur = output<void>();
}
