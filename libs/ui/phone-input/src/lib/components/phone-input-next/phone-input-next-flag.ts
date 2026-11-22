import { Directive, computed, inject, input } from '@angular/core';
import { injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import type { ScPhoneCountryCode } from '../phone-input/phone-input-types';
import { SC_PHONE_INPUT_NEXT } from './phone-input-next-token';
import { SC_PHONE_INPUT_CONFIG } from './with-phone-input';

/**
 * A country's flag: your `img` (`alt=""`: the name says the country), from
 * the app's flags (`withPhoneInput({ flagUrl })`) — none set, it isn't shown.
 * The country chosen, or `[country]`.
 */
@Directive({
  selector: 'img[scPhoneInputNextFlag]',
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
export class ScPhoneInputNextFlag {
  private readonly phone = inject(SC_PHONE_INPUT_NEXT, { optional: true });
  private readonly flagUrl = inject(SC_PHONE_INPUT_CONFIG).flagUrl;
  private readonly frameXs = injectStyle().frameXs;

  readonly classInput = input<string>('', { alias: 'class' });
  /** The country; by default, the one chosen. */
  readonly country = input<ScPhoneCountryCode | undefined>(undefined);

  private readonly src = computed(() => {
    const country = this.country() ?? this.phone?.country();
    if (!country || !this.flagUrl) return null;
    return this.flagUrl
      .replace(/\{XX\}/g, country)
      .replace(/\{xx\}/g, country.toLowerCase());
  });

  private readonly class = computed(() =>
    cn(
      // A tiny box: the style's frameXs corners; a hairline so white flags show.
      'aspect-[3/2] h-3 w-auto shrink-0 object-cover outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10',
      this.frameXs,
      this.classInput(),
    ),
  );
}
