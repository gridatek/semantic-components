import type { CdkConnectedOverlay } from '@angular/cdk/overlay';
import { DestroyRef, afterRenderEffect, inject } from '@angular/core';

/**
 * Places an open overlay again whenever its size changes. The CDK picks a
 * position (and its fallback, the flip) when the overlay attaches — for a menu,
 * before its items are rendered, while it is nearly empty and fits anywhere.
 * Once the items make it taller, it would stay below a trigger at the bottom of
 * the window instead of flipping up. In an injection context.
 */
export function followOverlaySize(
  overlay: () => CdkConnectedOverlay | undefined,
  open: () => boolean,
): void {
  let observer: ResizeObserver | undefined;
  const stop = () => {
    observer?.disconnect();
    observer = undefined;
  };
  afterRenderEffect(() => {
    stop();
    const ref = open() ? overlay()?.overlayRef : undefined;
    if (!ref?.hasAttached() || typeof ResizeObserver === 'undefined') return;
    observer = new ResizeObserver(() => ref.updatePosition());
    observer.observe(ref.overlayElement);
  });
  inject(DestroyRef).onDestroy(stop);
}
