import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicNativeCheckboxDemo } from './basic-native-checkbox-demo';

@Component({
  selector: 'app-basic-native-checkbox-demo-container',
  imports: [DemoContainer, BasicNativeCheckboxDemo],
  template: `
    <app-demo-container
      title="Basic Native Checkbox"
      demoUrl="/demos/native-checkbox/basic-native-checkbox-demo"
      [code]="code"
    >
      <app-basic-native-checkbox-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScNativeCheckbox } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-native-checkbox-demo',
  imports: [ScNativeCheckbox],
  template: \`
    <div class="flex items-center space-x-2">
      <input
        scNativeCheckbox
        id="terms-native"
        (change)="onTermsChange($event)"
      />
      <label
        for="terms-native"
        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
    <p class="text-sm text-muted-foreground mt-2">Checked: {{ terms() }}</p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeCheckboxDemo {
  readonly terms = signal(false);

  onTermsChange(event: Event): void {
    this.terms.set((event.target as HTMLInputElement).checked);
  }
}`;
}
