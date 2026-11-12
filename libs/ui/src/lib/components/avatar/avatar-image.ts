import { isPlatformBrowser } from '@angular/common';
import {
  Directive,
  ElementRef,
  PLATFORM_ID,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScAvatar } from './avatar';

/**
 * The avatar's image, over its fallback (both fill the avatar). Rendered at
 * once and loaded in place — `loading="lazy"` and image optimizers work —
 * but invisible until it has loaded, and while broken: the fallback shows
 * through. Hidden with `visibility`, not `display: none`: an element with no
 * box never enters the viewport, and a lazy image would never load.
 */
@Directive({
  selector: 'img[scAvatarImage]',
  host: {
    '[class]': 'class()',
    '[attr.data-loading]': 'avatar.imageStatus() === "loading" || null',
    '[attr.data-error]': 'avatar.imageStatus() === "error" || null',
    '(load)': 'onLoad()',
    '(error)': 'onError()',
  },
})
export class ScAvatarImage {
  protected readonly avatar = inject(ScAvatar);
  private readonly image =
    inject<ElementRef<HTMLImageElement>>(ElementRef).nativeElement;
  private readonly browser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly classInput = input<string>('', { alias: 'class' });

  // The same classes on the server and in the browser — the state is in
  // attributes, which hydration updates (a class it may leave behind).
  protected readonly class = computed(() =>
    cn(
      'absolute inset-0 aspect-square size-full rounded-full object-cover data-error:invisible data-loading:invisible',
      this.classInput(),
    ),
  );

  constructor() {
    // Loaded already — cached, or before hydration (the server's element is
    // this one): its load event has gone.
    const loaded =
      this.browser && this.image.complete && this.image.naturalWidth > 0;
    this.avatar.imageStatus.set(loaded ? 'loaded' : 'loading');
  }

  protected onLoad(): void {
    this.avatar.imageStatus.set('loaded');
  }

  protected onError(): void {
    this.avatar.imageStatus.set('error');
  }
}
