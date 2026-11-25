import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame, ScSpinner } from '@semantic-components/ui';
import {
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerCategory,
  ScEmojiPickerCategoryButton,
  ScEmojiPickerCategoryHeader,
  ScEmojiPickerCategoryNav,
  ScEmojiPickerEmoji,
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerFooter,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerRow,
  ScEmojiPickerSearch,
  ScEmojiPickerSearchField,
  ScEmojiPickerSkinTone,
  ScEmojiPickerViewport,
} from '@semantic-components/ui/emoji-picker';
import {
  SiClockIcon,
  SiFlagIcon,
  SiHandIcon,
  SiHeartIcon,
  SiLightbulbIcon,
  SiLoaderCircleIcon,
  SiPawPrintIcon,
  SiPizzaIcon,
  SiPlaneIcon,
  SiSearchIcon,
  SiSmileIcon,
  SiVolleyballIcon,
} from '@semantic-icons/lucide-icons';

/**
 * Right to left: the rows, the categories and the arrow keys run from the
 * right. Emojibase has no Arabic: the emojis' names are in English.
 */
@Component({
  selector: 'app-rtl-emoji-picker-demo',
  imports: [
    Dir,
    ScFrame,
    ScEmojiPicker,
    ScEmojiPickerCategoryNav,
    ScEmojiPickerCategoryButton,
    ScEmojiPickerSearchField,
    ScEmojiPickerSearch,
    ScEmojiPickerViewport,
    ScEmojiPickerLoading,
    ScEmojiPickerEmpty,
    ScEmojiPickerError,
    ScEmojiPickerAnnouncer,
    ScEmojiPickerList,
    ScEmojiPickerCategory,
    ScEmojiPickerCategoryHeader,
    ScEmojiPickerRow,
    ScEmojiPickerEmoji,
    ScEmojiPickerFooter,
    ScEmojiPickerSkinTone,
    ScSpinner,
    SiClockIcon,
    SiSmileIcon,
    SiHandIcon,
    SiPawPrintIcon,
    SiPizzaIcon,
    SiPlaneIcon,
    SiVolleyballIcon,
    SiLightbulbIcon,
    SiHeartIcon,
    SiFlagIcon,
    SiSearchIcon,
    SiLoaderCircleIcon,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full flex-col items-center">
      <div
        scEmojiPicker
        scFrame
        class="h-[420px]"
        recentLabel="المستخدمة مؤخرًا"
        [(recent)]="recent"
        (emojiSelect)="selected.set($event)"
        #picker="scEmojiPicker"
      >
        <div scEmojiPickerCategoryNav aria-label="فئات الرموز التعبيرية">
          @for (category of picker.categories(); track category.key) {
            <button [scEmojiPickerCategoryButton]="category">
              @switch (category.key) {
                @case ('recent') {
                  <svg siClockIcon></svg>
                }
                @case ('smileys-emotion') {
                  <svg siSmileIcon></svg>
                }
                @case ('people-body') {
                  <svg siHandIcon></svg>
                }
                @case ('animals-nature') {
                  <svg siPawPrintIcon></svg>
                }
                @case ('food-drink') {
                  <svg siPizzaIcon></svg>
                }
                @case ('travel-places') {
                  <svg siPlaneIcon></svg>
                }
                @case ('activities') {
                  <svg siVolleyballIcon></svg>
                }
                @case ('objects') {
                  <svg siLightbulbIcon></svg>
                }
                @case ('symbols') {
                  <svg siHeartIcon></svg>
                }
                @case ('flags') {
                  <svg siFlagIcon></svg>
                }
              }
            </button>
          }
        </div>
        <div scEmojiPickerSearchField>
          <svg siSearchIcon></svg>
          <input
            scEmojiPickerSearch
            placeholder="ابحث…"
            aria-label="البحث عن الرموز التعبيرية"
          />
        </div>
        <div scEmojiPickerViewport>
          <span scEmojiPickerLoading>
            <svg
              scSpinner
              siLoaderCircleIcon
              aria-label="جارٍ تحميل الرموز التعبيرية"
            ></svg>
          </span>
          <span scEmojiPickerEmpty>لم يُعثر على رمز تعبيري.</span>
          <span scEmojiPickerError>تعذّر تحميل الرموز التعبيرية.</span>
          <span scEmojiPickerAnnouncer></span>
          <div
            scEmojiPickerList
            aria-label="الرموز التعبيرية"
            #list="scEmojiPickerList"
          >
            @for (category of list.categories(); track category.key) {
              <div [scEmojiPickerCategory]="category">
                <div scEmojiPickerCategoryHeader>{{ category.label }}</div>
              </div>
            }
            @for (row of list.rows(); track row.index) {
              <div [scEmojiPickerRow]="row">
                @for (emoji of row.emojis; track emoji.columnIndex) {
                  <button [scEmojiPickerEmoji]="emoji">
                    {{ emoji.emoji }}
                  </button>
                }
              </div>
            }
          </div>
        </div>
        <div scEmojiPickerFooter>
          @if (picker.activeEmoji(); as emoji) {
            <span
              class="flex size-7 flex-none items-center justify-center text-lg"
            >
              {{ emoji.emoji }}
            </span>
            <span class="text-secondary-foreground truncate text-xs">
              {{ emoji.label }}
            </span>
          } @else {
            <span
              class="text-muted-foreground ms-1.5 flex h-7 items-center truncate text-xs"
            >
              اختر رمزًا تعبيريًا…
            </span>
          }
          <button
            scEmojiPickerSkinTone
            #tone="scEmojiPickerSkinTone"
            class="ms-auto"
          >
            {{ tone.variation() }}
            <span class="sr-only">تغيير لون البشرة</span>
          </button>
        </div>
      </div>
      <p class="text-muted-foreground mt-4 text-sm" aria-live="polite">
        @if (selected(); as emoji) {
          المحدد: {{ emoji.emoji }} {{ emoji.label }}
        }
      </p>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlEmojiPickerDemo {
  private readonly selected = signal<ScEmoji | null>(null);
  private readonly recent = signal<ScEmoji[]>([]);
}
