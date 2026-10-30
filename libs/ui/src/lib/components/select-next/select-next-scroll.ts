import type { ScSelectNextPopup } from './select-next-popup';

/** Pixels scrolled per frame while a scroll button is hovered. */
const STEP = 4;

/** Scrolls the popup one way, frame by frame, from `start` to `stop`. */
export function scrollWhileHovered(
  popup: ScSelectNextPopup,
  direction: 1 | -1,
): { start: () => void; stop: () => void } {
  let frame: number | null = null;
  const step = () => {
    popup.element.scrollTop += direction * STEP;
    popup.measureScroll();
    frame = requestAnimationFrame(step);
  };
  return {
    start: () => {
      if (frame === null) frame = requestAnimationFrame(step);
    },
    stop: () => {
      if (frame !== null) cancelAnimationFrame(frame);
      frame = null;
    },
  };
}
