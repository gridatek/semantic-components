import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { InternationalFormatPhoneInputDemo } from './international-format-phone-input-demo';

@Component({
  selector: 'app-international-format-phone-input-demo-container',
  imports: [DemoContainer, InternationalFormatPhoneInputDemo],
  template: `
    <app-demo-container title="International Format" [code]="code">
      <app-international-format-phone-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalFormatPhoneInputDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScPhoneInputSimple } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-international-format-phone-input-demo',
  imports: [ScPhoneInputSimple],
  template: \`
    <div class="max-w-sm">
      <sc-phone-input-simple
        [(value)]="phone"
        format="international"
        placeholder="+1 555 555 5555"
      />
    </div>
    <p class="text-sm text-muted-foreground mt-2">
      Value: {{ phone() || 'Empty' }}
    </p>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InternationalFormatPhoneInputDemo {
  readonly phone = signal('');
}`;
}
