import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  ScTokenInputTokenRemove,
  type ScTokenInputValue,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuEmpty,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the text runs right to left, the arrows step over a token the way they read, the menu opens at the @. */
@Component({
  selector: 'app-rtl-token-input-demo',
  imports: [
    Dir,
    ScField,
    ScLabel,
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputToken,
    ScTokenInputTokenRemove,
    ScTriggerMenu,
    ScTriggerMenuEmpty,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
    SiXIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="w-full max-w-md">
      <div scField>
        <label scLabel>الرسالة</label>
        <div scTokenInput [(value)]="message">
          <div scTokenInputEditor placeholder="اكتب @ لذكر شخص…"></div>
          <ng-template scTokenInputToken let-token>
            &#64;{{ token.label }}
            <span scTokenInputTokenRemove><svg siXIcon></svg></span>
          </ng-template>
          <div scTriggerMenu #menu="scTriggerMenu" [triggers]="triggers">
            <ng-template scTriggerMenuPortal>
              <div scTriggerMenuPopup>
                <div scTriggerMenuEmpty>لا أحد.</div>
                <div scTriggerMenuList aria-label="الأشخاص">
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
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTokenInputDemo {
  private readonly triggers: readonly ScTrigger[] = [
    {
      char: '@',
      type: 'mention',
      items: [
        { value: 'u1', label: 'ليلى حسن' },
        { value: 'u2', label: 'عمر خالد' },
        { value: 'u3', label: 'سارة يوسف' },
      ],
    },
  ];
  private readonly message = signal<ScTokenInputValue>([
    'شكرا ',
    { type: 'mention', value: 'u1', label: 'ليلى حسن' },
    ' على المراجعة.',
  ]);
}
