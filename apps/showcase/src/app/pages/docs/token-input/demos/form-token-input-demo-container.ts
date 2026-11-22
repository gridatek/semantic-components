import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { FormTokenInputDemo } from './form-token-input-demo';

@Component({
  selector: 'app-form-token-input-demo-container',
  imports: [DemoContainer, FormTokenInputDemo],
  template: `
    <app-demo-container
      title="Form"
      [code]="code"
      demoUrl="/demos/token-input/form-token-input-demo"
    >
      <app-form-token-input-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTokenInputDemoContainer {
  private readonly code = `import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, FormRoot, form, validate } from '@angular/forms/signals';
import {
  ScButton,
  ScField,
  ScFieldDescription,
  ScFieldErrors,
  ScLabel,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  type ScTokenInputValue,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
  tokenInputToLabel,
  tokenInputToText,
} from '@semantic-components/ui';

/** A [formField]: the value is the text and its tokens — here required (some text) and a reviewer mentioned, from the schema. */
@Component({
  selector: 'app-form-token-input-demo',
  imports: [
    FormField,
    FormRoot,
    ScButton,
    ScField,
    ScFieldDescription,
    ScFieldErrors,
    ScLabel,
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputToken,
    ScTriggerMenu,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
  ],
  template: \`
    <form [formRoot]="reviewForm" class="grid w-full max-w-md gap-3">
      <div scField>
        <label scLabel>Review request</label>
        <div scTokenInput [formField]="reviewForm.request">
          <div scTokenInputEditor></div>
          <ng-template scTokenInputToken let-token>
            &#64;{{ token.label }}
          </ng-template>
          <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
            <ng-template scTriggerMenuPortal>
              <div scTriggerMenuPopup>
                <div scTriggerMenuList aria-label="People">
                  @for (person of menu.items(); track person.value) {
                    <div scTriggerMenuItem [item]="person">
                      {{ person.label }}
                    </div>
                  }
                </div>
              </div>
            </ng-template>
          </div>
        </div>
        <p scFieldDescription>Mention a reviewer with &#64;.</p>
        <div scFieldErrors></div>
      </div>
      <button scButton type="submit" class="justify-self-start">Send</button>
      @if (sent()) {
        <p class="font-mono text-xs" role="status">{{ sent() }}</p>
      }
    </form>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class FormTokenInputDemo {
  private readonly triggers: readonly ScTrigger[] = [
    {
      char: '@',
      type: 'mention',
      items: [
        { value: 'u1', label: 'Hollis Grant' },
        { value: 'u2', label: 'Amara Diallo' },
        { value: 'u3', label: 'Kenji Watanabe' },
      ],
    },
  ];
  private readonly model = signal<{ request: ScTokenInputValue }>({
    request: [],
  });
  private readonly sent = signal('');
  private readonly reviewForm = form(
    this.model,
    (s) => {
      validate(s.request, ({ value }) => {
        if (!tokenInputToLabel(value()).trim())
          return { kind: 'required', message: 'Write a request.' };
        return value().some((part) => typeof part !== 'string')
          ? null
          : { kind: 'reviewer', message: 'Mention a reviewer.' };
      });
    },
    {
      submission: {
        action: async () =>
          this.sent.set(tokenInputToText(this.model().request)),
      },
    },
  );
}`;
}
