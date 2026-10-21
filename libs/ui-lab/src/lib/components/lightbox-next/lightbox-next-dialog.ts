import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScLightboxNext } from './lightbox-next';

/**
 * The viewer: your native `dialog`, opened modal — the page behind inert,
 * Escape closes, focus returns. Name it; put the image and your controls in
 * it. The keys: ← → Home End, + − 0.
 */
@Directive({
  selector: 'dialog[scLightboxNextDialog]',
  host: {
    'data-slot': 'lightbox-dialog',
    '[class]': 'class()',
    '(close)': 'lightbox.open.set(false)',
    '(keydown)': 'onKeydown($event)',
    '(cancel)': 'onCancel($event)',
  },
})
export class ScLightboxNextDialog {
  protected readonly lightbox = inject(ScLightboxNext);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'm-0 h-dvh max-h-none w-dvw max-w-none flex-col overflow-hidden bg-black/95 p-0 text-white open:flex',
      'backdrop:bg-black/80',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scLightboxNextDialog');
    this.lightbox.ɵdialog.set(
      inject<ElementRef<HTMLDialogElement>>(ElementRef).nativeElement,
    );
  }

  /** Escape: closed by the lightbox — back into its thumbnail, unzoomed, focus on the one shown. */
  protected onCancel(event: Event): void {
    event.preventDefault();
    this.lightbox.close();
  }

  protected onKeydown(event: KeyboardEvent): void {
    this.lightbox.ɵonKeydown(event);
  }
}
