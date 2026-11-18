import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScSelect,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectItemText,
  ScSelectList,
  ScSelectPopup,
  ScSelectPortal,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
import { ScI18n } from '@semantic-components/ui/i18n';
import {
  SiCheckIcon,
  SiChevronDownIcon,
  SiLanguagesIcon,
} from '@semantic-icons/lucide-icons';

/**
 * The header's language: English, French or Arabic. A choice is kept (a
 * cookie) and the page reloads in it — Arabic right to left.
 */
@Component({
  selector: 'app-locale-select',
  imports: [
    ScSelect,
    ScSelectIcon,
    ScSelectItem,
    ScSelectItemIndicator,
    ScSelectItemText,
    ScSelectList,
    ScSelectPopup,
    ScSelectPortal,
    ScSelectTrigger,
    ScSelectValue,
    SiCheckIcon,
    SiChevronDownIcon,
    SiLanguagesIcon,
  ],
  template: `
    <div
      scSelect
      [value]="i18n.locale.id"
      (valueChange)="i18n.setLocale($any($event))"
    >
      <div
        scSelectTrigger
        size="sm"
        aria-label="Language"
        i18n-aria-label="@@layout.localeSelect.language"
        class="w-auto gap-2"
      >
        <svg siLanguagesIcon></svg>
        <span
          scSelectValue
          [attr.lang]="i18n.locale.id"
          class="hidden sm:inline"
        >
          {{ i18n.locale.label }}
        </span>
        <svg scSelectIcon siChevronDownIcon></svg>
      </div>
      <ng-template scSelectPortal>
        <div scSelectPopup>
          <div scSelectList>
            @for (locale of i18n.locales; track locale.id) {
              <div
                scSelectItem
                [value]="locale.id"
                [label]="locale.label"
                [attr.lang]="locale.id"
              >
                <span scSelectItemText>{{ locale.label }}</span>
                <span scSelectItemIndicator><svg siCheckIcon></svg></span>
              </div>
            }
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleSelect {
  private readonly i18n = inject(ScI18n);
}
