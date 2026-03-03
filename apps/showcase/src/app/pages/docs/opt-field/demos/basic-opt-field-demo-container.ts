import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicOptFieldDemo } from './basic-opt-field-demo';

@Component({
  selector: 'app-basic-opt-field-demo-container',
  imports: [DemoContainer, BasicOptFieldDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/opt-field/basic-opt-field-demo"
      [code]="code"
    >
      <app-basic-opt-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOptFieldDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScOptField,
  ScOptFieldSlot,
  ScOptFieldSlotGroup,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-opt-field-demo',
  imports: [ScOptField, ScOptFieldSlotGroup, ScOptFieldSlot],
  template: \`
    <div scOptField [(value)]="otp">
      <div scOptFieldSlotGroup>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
        <div scOptFieldSlot></div>
      </div>
    </div>
    <p class="text-muted-foreground mt-4 text-sm">
      Value: {{ otp() || 'empty' }}
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicOptFieldDemo {
  readonly otp = signal('');
}`;
}
