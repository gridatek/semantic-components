import type { Direction } from '@angular/cdk/bidi';
import type { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import type { ScOverlaySide } from './overlay-positions';

/**
 * A side of the trigger: physical (`left`, `right`, as Base UI's) or logical
 * (`inline-start`, `inline-end`, which follow the direction). Shared by the
 * overlays that take a side (Tooltip, Popover).
 */
export type ScOverlayLogicalSide =
  ScOverlaySide | 'inline-start' | 'inline-end';

/** The side as the screen sees it. */
export function physicalSide(
  side: ScOverlayLogicalSide,
  direction: Direction,
): ScOverlaySide {
  if (side !== 'inline-start' && side !== 'inline-end') return side;
  return (side === 'inline-start') !== (direction === 'rtl') ? 'left' : 'right';
}

/** The physical side an overlay was placed on, from CDK's position change. */
export function placedSide(
  change: ConnectedOverlayPositionChange,
  direction: Direction,
): ScOverlaySide {
  const { originX, originY, overlayX, overlayY } = change.connectionPair;
  if (originY === 'top' && overlayY === 'bottom') return 'top';
  if (originY === 'bottom' && overlayY === 'top') return 'bottom';
  // Horizontal: CDK's start and end follow the direction.
  const toEnd = originX === 'end' && overlayX === 'start';
  return toEnd !== (direction === 'rtl') ? 'right' : 'left';
}
