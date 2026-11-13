import { Dir } from '@angular/cdk/bidi';
import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  email,
  form,
  required,
} from '@angular/forms/signals';
import {
  ScButton,
  ScCard,
  ScCardAction,
  ScCardBody,
  ScCardDescription,
  ScCardFooter,
  ScCardHeader,
  ScCardTitle,
  ScField,
  ScFieldGroup,
  ScInput,
  ScLabel,
  ScLink,
} from '@semantic-components/ui';

/** Right to left: the action on the left, the text from the right. */
@Component({
  selector: 'app-rtl-card-demo',
  imports: [
    Dir,
    FormField,
    FormRoot,
    ScButton,
    ScCard,
    ScCardAction,
    ScCardBody,
    ScCardDescription,
    ScCardFooter,
    ScCardHeader,
    ScCardTitle,
    ScField,
    ScFieldGroup,
    ScInput,
    ScLabel,
    ScLink,
  ],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <div scCard class="w-full max-w-sm">
        <div scCardHeader>
          <h4 scCardTitle>تسجيل الدخول إلى حسابك</h4>
          <p scCardDescription>
            أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
          </p>
          <div scCardAction>
            <button scButton variant="link">إنشاء حساب</button>
          </div>
        </div>
        <div scCardBody>
          <form id="login-form-rtl" [formRoot]="loginForm">
            <div scFieldGroup>
              <div scField>
                <label scLabel>البريد الإلكتروني</label>
                <input
                  scInput
                  type="email"
                  dir="ltr"
                  [formField]="loginForm.email"
                  placeholder="m&#64;example.com"
                />
              </div>
              <div scField>
                <div class="flex items-center">
                  <label scLabel>كلمة المرور</label>
                  <a scLink href="#" class="ms-auto"> نسيت كلمة المرور؟ </a>
                </div>
                <input
                  scInput
                  type="password"
                  [formField]="loginForm.password"
                />
              </div>
            </div>
          </form>
        </div>
        <div scCardFooter class="flex-col gap-2">
          <button scButton type="submit" form="login-form-rtl" class="w-full">
            تسجيل الدخول
          </button>
          <button scButton variant="outline" class="w-full">
            تسجيل الدخول باستخدام Google
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlCardDemo {
  private readonly model = signal({ email: '', password: '' });
  protected readonly loginForm = form(
    this.model,
    (path) => {
      required(path.email);
      email(path.email);
      required(path.password);
    },
    // Submitted from the footer's Login (form="…"); invalid, the fields are
    // marked and the action waits.
    { submission: { action: async () => undefined } },
  );
}
