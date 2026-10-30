import { type Direction, Directionality } from '@angular/cdk/bidi';
import { ElementRef, Service, inject } from '@angular/core';

/**
 * The direction an element is laid out in: `rtl` under any `dir="rtl"`
 * ancestor, not only the document's. `ltr` on the server.
 */
export function elementDirection(element: Element): Direction {
  return typeof getComputedStyle === 'function' &&
    getComputedStyle(element).direction === 'rtl'
    ? 'rtl'
    : 'ltr';
}

/**
 * CDK's `Directionality`, read from the host element. CDK alone knows the
 * document's direction, or a `Dir` directive's; a part with a connected
 * overlay provides this instead, so the overlay's `start` and `end` follow a
 * `dir="rtl"` container too:
 * `providers: [{ provide: Directionality, useClass: ScElementDirectionality }]`.
 */
@Service({ autoProvided: false })
export class ScElementDirectionality extends Directionality {
  private readonly host = inject<ElementRef<Element>>(ElementRef).nativeElement;

  override get value(): Direction {
    return elementDirection(this.host);
  }
}
