import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { InputPhoneDemo } from './input-phone-demo';

@Component({
  selector: 'app-input-phone-demo-section',
  imports: [InputPhoneDemo, PreviewCodeTabs],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-input-phone-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `import { ChangeDetectionStrategy, Component, ViewEncapsulation, signal } from '@angular/core';

import { ScInputPhone } from '@semantic-components/ui';

@Component({
  selector: 'app-input-phone-demo',
  imports: [ScInputPhone],
  template: \`
    <div class="space-y-6">
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Basic phone input</h3>
        <div class="space-y-2">
          <label for="phone1" class="text-sm font-medium">Phone Number</label>
          <input
            id="phone1"
            sc-input-phone
            [(value)]="phoneNumber1"
            class="max-w-sm"
          />
        </div>
        <p class="text-sm text-muted-foreground">
          Value: {{ phoneNumber1() || 'Empty' }}
        </p>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">With custom placeholder</h3>
        <div class="space-y-2">
          <label for="phone2" class="text-sm font-medium">Mobile Number</label>
          <input
            id="phone2"
            sc-input-phone
            [(value)]="phoneNumber2"
            placeholder="+1 (555) 123-4567"
            class="max-w-sm"
          />
        </div>
        <p class="text-sm text-muted-foreground">
          Value: {{ phoneNumber2() || 'Empty' }}
        </p>
      </div>

      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Different sizes</h3>
        <div class="space-y-4">
          <div class="space-y-2">
            <label for="phone3" class="text-sm font-medium">Small</label>
            <input
              id="phone3"
              sc-input-phone
              [(value)]="phoneNumber3"
              class="h-8 px-2 text-sm max-w-xs"
            />
          </div>
          <div class="space-y-2">
            <label for="phone4" class="text-sm font-medium">Default</label>
            <input
              id="phone4"
              sc-input-phone
              [(value)]="phoneNumber4"
              class="max-w-sm"
            />
          </div>
          <div class="space-y-2">
            <label for="phone5" class="text-sm font-medium">Large</label>
            <input
              id="phone5"
              sc-input-phone
              [(value)]="phoneNumber5"
              class="h-12 px-4 text-lg max-w-md"
            />
          </div>
        </div>
      </div>
    </div>
  \`,
  styles: \`\`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPhoneDemo {
  readonly phoneNumber1 = signal('');
  readonly phoneNumber2 = signal('');
  readonly phoneNumber3 = signal('');
  readonly phoneNumber4 = signal('');
  readonly phoneNumber5 = signal('');
}`;
}
