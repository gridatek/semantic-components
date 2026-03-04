import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PinOptFieldDemo } from './pin-opt-field-demo';

@Component({
  selector: 'app-pin-opt-field-demo-container',
  imports: [DemoContainer, PinOptFieldDemo],
  template: `
    <app-demo-container
      title="PIN (4 digits)"
      demoUrl="/demos/opt-field/pin-opt-field-demo"
      [code]="code"
    >
      <app-pin-opt-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PinOptFieldDemoContainer {
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
} from '@semantic-components/ui';

@Component({
  selector: 'app-pin-opt-field-demo',
  imports: [ScOptField, ScOptFieldSlotGroup, ScOptFieldSlot],
  template: \`
    <div scOptField [(value)]="otp">
      <div scOptFieldSlotGroup>
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
export class PinOptFieldDemo {
  readonly otp = signal('');
}`;
}
