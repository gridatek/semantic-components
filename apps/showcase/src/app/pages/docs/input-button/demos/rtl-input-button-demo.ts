import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { ScInputButton, ScKbd } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

/** In a right-to-left page: the icon at the right, the shortcut at the left. */
@Component({
  selector: 'app-rtl-input-button-demo',
  imports: [Dir, ScInputButton, ScKbd, SiSearchIcon],
  template: `
    <div dir="rtl" lang="ar" class="flex w-full justify-center">
      <button scInputButton class="max-w-sm">
        <svg siSearchIcon></svg>
        <span class="flex-1">بحث...</span>
        <kbd scKbd>⌘<span class="sr-only"> Command</span>J</kbd>
      </button>
    </div>
  `,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlInputButtonDemo {}
