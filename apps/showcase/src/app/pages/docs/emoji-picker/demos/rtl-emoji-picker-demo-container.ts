import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlEmojiPickerDemo } from './rtl-emoji-picker-demo';

@Component({
  selector: 'app-rtl-emoji-picker-demo-container',
  imports: [DemoContainer, RtlEmojiPickerDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/emoji-picker/rtl-emoji-picker-demo"
      [code]="code"
    >
      <app-rtl-emoji-picker-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlEmojiPickerDemoContainer {
  private readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation, signal } from '@angular/core';
import { ScFrame, ScSpinner } from '@semantic-components/ui';
import {
  type ScEmoji,
  ScEmojiPicker,
  ScEmojiPickerAnnouncer,
  ScEmojiPickerCategoryButton,
  ScEmojiPickerCategoryNav,
  ScEmojiPickerEmpty,
  ScEmojiPickerError,
  ScEmojiPickerFooter,
  ScEmojiPickerList,
  ScEmojiPickerLoading,
  ScEmojiPickerPreview,
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
    ScEmojiPickerPreview,
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
  template: \`
    <div dir="rtl" lang="ar" class="flex w-full flex-col items-center">
      <div
        scEmojiPicker
        scFrame
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
          <div scEmojiPickerList aria-label="الرموز التعبيرية"></div>
        </div>
        <div scEmojiPickerFooter>
          <div scEmojiPickerPreview>اختر رمزًا تعبيريًا…</div>
          <button scEmojiPickerSkinTone #tone="scEmojiPickerSkinTone">
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
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlEmojiPickerDemo {
  private readonly selected = signal<ScEmoji | null>(null);
  private readonly recent = signal<ScEmoji[]>([]);
}`;
}
