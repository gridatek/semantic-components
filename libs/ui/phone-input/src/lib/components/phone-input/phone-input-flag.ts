import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PHONE_INPUT, type ScPhoneCountryCode } from './phone-input-types';

/**
 * A country's flag, as an image from the phone input's `flagUrl` — no flags in
 * your bundle, and each one loads only when shown. Shows the selected country
 * unless given `[country]` (e.g. in the list). Give it `alt=""` when the
 * country's name or code is next to it.
 */
@Directive({
  selector: 'img[scPhoneInputFlag]',
  host: {
    width: '18',
    height: '12',
    loading: 'lazy',
    'data-slot': 'phone-input-flag',
    '[attr.src]': 'src()',
    '[hidden]': '!src()',
    '[class]': 'class()',
  },
})
export class ScPhoneInputFlag {
  private readonly phone = inject(SC_PHONE_INPUT);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The country; defaults to the selected one. */
  readonly country = input<ScPhoneCountryCode | undefined>(undefined);

  protected readonly src = computed(() => {
    const country = this.country() ?? this.phone.country();
    if (!country) return null;
    return this.phone
      .flagUrl()
      .replace(/\{XX\}/g, country)
      .replace(/\{xx\}/g, country.toLowerCase());
  });

  protected readonly class = computed(() =>
    cn(
      'aspect-[3/2] h-3 w-auto shrink-0 rounded-[2px] object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10',
      this.classInput(),
    ),
  );
}
