import type { Direction } from '@angular/cdk/bidi';
import { ConnectedPosition } from '@angular/cdk/overlay';

export type ScOverlaySide = 'top' | 'right' | 'bottom' | 'left';
export type ScOverlayAlign = 'start' | 'center' | 'end';

const oppositeSide: Record<ScOverlaySide, ScOverlaySide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

/**
 * A position for an overlay beside its trigger. `align` is logical (`start` is
 * the reading start: the right in right to left); `side` is physical: `left`
 * and `right` stay where they are in right to left, as Base UI's. CDK reads
 * `start` and `end` by the overlay's direction, so the horizontal sides are
 * swapped for `rtl`.
 */
export function buildOverlayPosition(
  side: ScOverlaySide,
  align: ScOverlayAlign,
  gap: number,
  direction: Direction = 'ltr',
): ConnectedPosition {
  const isVertical = side === 'top' || side === 'bottom';

  if (isVertical) {
    return {
      originX: align,
      originY: side,
      overlayX: align,
      overlayY: side === 'bottom' ? 'top' : 'bottom',
      offsetY: side === 'bottom' ? gap : -gap,
    };
  }

  const alignY =
    align === 'start' ? 'top' : align === 'end' ? 'bottom' : 'center';
  // The physical right is the end in left to right, the start in right to left.
  const toEnd = (side === 'right') === (direction === 'ltr');
  return {
    originX: toEnd ? 'end' : 'start',
    originY: alignY,
    overlayX: toEnd ? 'start' : 'end',
    overlayY: alignY,
    offsetX: side === 'right' ? gap : -gap,
  };
}

const oppositeAlign: Record<ScOverlayAlign, ScOverlayAlign> = {
  start: 'end',
  center: 'start',
  end: 'start',
};

export function buildOverlayPositionsWithFallback(
  side: ScOverlaySide,
  align: ScOverlayAlign,
  gap: number,
  direction: Direction = 'ltr',
): ConnectedPosition[] {
  const positions = [
    // Preferred position
    buildOverlayPosition(side, align, gap, direction),
    // Fallback: opposite side, same align
    buildOverlayPosition(oppositeSide[side], align, gap, direction),
  ];

  if (align !== 'center') {
    // Fallback: same side, center align
    positions.push(buildOverlayPosition(side, 'center', gap, direction));
    // Fallback: opposite side, center align
    positions.push(
      buildOverlayPosition(oppositeSide[side], 'center', gap, direction),
    );
    // Fallback: same side, opposite align
    positions.push(
      buildOverlayPosition(side, oppositeAlign[align], gap, direction),
    );
    // Fallback: opposite side, opposite align
    positions.push(
      buildOverlayPosition(
        oppositeSide[side],
        oppositeAlign[align],
        gap,
        direction,
      ),
    );
  }

  return positions;
}
