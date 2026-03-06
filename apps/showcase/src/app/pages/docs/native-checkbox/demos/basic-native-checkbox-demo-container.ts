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
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicNativeCheckboxDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ScNativeCheckbox } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-native-checkbox-demo',
  imports: [ScNativeCheckbox],
  template: \`
    <label class="flex items-center space-x-2">
      <input
        scNativeCheckbox
        (change)="onTermsChange($event)"
      />
      <span class="text-sm leading-none font-medium">Accept terms and conditions</span>
    </label>
    <p class="text-muted-foreground mt-2 text-sm">Checked: {{ terms() }}</p>
  \`,
  host: { class: 'block w-full' },
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
