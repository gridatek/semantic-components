import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlTriggerMenuDemo } from './rtl-trigger-menu-demo';

@Component({
  selector: 'app-rtl-trigger-menu-demo-container',
  imports: [DemoContainer, RtlTriggerMenuDemo],
  template: `
    <app-demo-container
      title="RTL"
      [code]="code"
      demoUrl="/demos/trigger-menu/rtl-trigger-menu-demo"
    >
      <app-rtl-trigger-menu-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTriggerMenuDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScField,
  ScLabel,
  ScTokenInput,
  ScTokenInputEditor,
  ScTokenInputToken,
  type ScTrigger,
  ScTriggerMenu,
  ScTriggerMenuEmpty,
  ScTriggerMenuItem,
  ScTriggerMenuList,
  ScTriggerMenuPopup,
  ScTriggerMenuPortal,
  ScTriggerMenuStatus,
} from '@semantic-components/ui';

/** In a right-to-left page: the list opens at the @, its start edge on the character's. */
@Component({
  selector: 'app-rtl-trigger-menu-demo',
  imports: [
    Dir,
    ScField,
    ScLabel,
    ScTokenInput,
    ScTokenInputEditor,
    ScTokenInputToken,
    ScTriggerMenu,
    ScTriggerMenuEmpty,
    ScTriggerMenuItem,
    ScTriggerMenuList,
    ScTriggerMenuPopup,
    ScTriggerMenuPortal,
    ScTriggerMenuStatus,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: \`
    <div dir="rtl" lang="ar" class="w-full max-w-md">
      <div scField>
        <label scLabel>الرسالة</label>
        <div scTokenInput>
          <div scTokenInputEditor placeholder="اكتب @ لذكر شخص…"></div>
          <ng-template scTokenInputToken let-token>
            &#64;{{ token.label }}
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
                <div scTriggerMenuStatus>{{ menu.items().length }}</div>
              </div>
            </ng-template>
          </div>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlTriggerMenuDemo {
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
}`;
}
