import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { GeneratePasswordFieldDemo } from './generate-password-field-demo';

@Component({
  selector: 'app-generate-password-field-demo-container',
  imports: [DemoContainer, GeneratePasswordFieldDemo],
  template: `
    <app-demo-container
      title="Generate"
      demoUrl="/demos/password-field/generate-password-field-demo"
      [code]="code"
    >
      <app-generate-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class GeneratePasswordFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScPasswordField,
  ScPasswordGenerate,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordStrength,
  ScPasswordStrengthLabel,
  ScPasswordToggle,
} from '@semantic-components/ui';
import {
  SiEyeIcon,
  SiEyeOffIcon,
  SiWandSparklesIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-generate-password-field-demo',
  imports: [
    FormField,
    ScLabel,
    ScPasswordField,
    ScPasswordGenerate,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordStrengthLabel,
    ScPasswordStrength,
    ScPasswordToggle,
    SiEyeIcon,
    SiEyeOffIcon,
    SiWandSparklesIcon,
  ],
  template: \`
    <div scPasswordField #password="scPasswordField" class="w-full max-w-sm">
      <div class="flex items-center justify-between">
        <label scLabel>New password</label>
        <button scPasswordGenerate [length]="20">
          <svg siWandSparklesIcon></svg>
          Generate
        </button>
      </div>
      <div scPasswordGroup>
        <input
          scPasswordInput
          autocomplete="new-password"
          [formField]="signup.password"
        />
        <button scPasswordToggle>
          @if (password.visible()) {
            <svg siEyeOffIcon></svg>
          } @else {
            <svg siEyeIcon></svg>
          }
          <span class="sr-only">Show password</span>
        </button>
      </div>
      <div scPasswordStrength [score]="score()" aria-label="Password strength">
        <span scPasswordStrengthLabel>{{ strength() }}</span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class GeneratePasswordFieldDemo {
  private readonly model = signal({ password: '' });
  readonly signup = form(this.model);

  /** 0: nothing yet; then a point for each rule met, at least 1. */
  readonly score = computed(() => {
    const value = this.model().password;
    if (!value) return 0;
    const met = [
      value.length >= 12,
      /\\d/.test(value),
      /[a-z]/.test(value) && /[A-Z]/.test(value),
      /[^A-Za-z0-9]/.test(value),
    ].filter(Boolean).length;
    return Math.max(met, 1);
  });
  readonly strength = computed(
    () => ['', 'Weak', 'Fair', 'Good', 'Strong'][this.score()],
  );
}`;
}
