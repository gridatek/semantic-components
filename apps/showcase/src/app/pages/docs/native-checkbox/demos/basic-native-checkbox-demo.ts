import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScNativeCheckbox } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-native-checkbox-demo',
  imports: [ScNativeCheckbox],
  template: `
    <label class="flex items-center space-x-2">
      <input scNativeCheckbox (change)="onTermsChange($event)" />
      <span class="text-sm leading-none font-medium">
        Accept terms and conditions
      </span>
    </label>
    <p class="text-muted-foreground mt-2 text-sm">Checked: {{ terms() }}</p>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeCheckboxDemo {
  readonly terms = signal(false);

  onTermsChange(event: Event): void {
    this.terms.set((event.target as HTMLInputElement).checked);
  }
}
