import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlPasswordFieldDemo } from './rtl-password-field-demo';

@Component({
  selector: 'app-rtl-password-field-demo-container',
  imports: [DemoContainer, RtlPasswordFieldDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/password-field/rtl-password-field-demo"
      [code]="code"
    >
      <app-rtl-password-field-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPasswordFieldDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScLabel,
  ScPasswordCapsLock,
  ScPasswordField,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordStrength,
  ScPasswordStrengthLabel,
  ScPasswordToggle,
} from '@semantic-components/ui';
import {
  SiArrowBigUpIcon,
  SiEyeIcon,
  SiEyeOffIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-rtl-password-field-demo',
  imports: [
    FormField,
    ScLabel,
    ScPasswordCapsLock,
    ScPasswordField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordStrengthLabel,
    ScPasswordStrength,
    ScPasswordToggle,
    SiArrowBigUpIcon,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-sm">
      <div scPasswordField #password="scPasswordField">
        <label scLabel>كلمة المرور الجديدة</label>
        <div scPasswordGroup>
          <input
            scPasswordInput
            autocomplete="new-password"
            [formField]="signup.password"
          />
          <button scPasswordToggle>
            @if (password.visible()) {
              <svg siEyeOffIcon></svg>
              <span class="sr-only">إخفاء كلمة المرور</span>
            } @else {
              <svg siEyeIcon></svg>
              <span class="sr-only">إظهار كلمة المرور</span>
            }
          </button>
        </div>
        <p scPasswordCapsLock>
          <svg siArrowBigUpIcon></svg>
          مفتاح الأحرف الكبيرة مفعّل
        </p>
        <div scPasswordStrength [score]="score()" aria-label="قوة كلمة المرور">
          <span scPasswordStrengthLabel>{{ strength() }}</span>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlPasswordFieldDemo {
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
    () => ['', 'ضعيفة', 'مقبولة', 'جيدة', 'قوية'][this.score()],
  );
}`;
}
