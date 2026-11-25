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
 * swapped for `rtl`. `gap` is the distance from the side; `alignGap` moves it
 * along the side, toward its end (the reading end across, down beside).
 */
export function buildOverlayPosition(
  side: ScOverlaySide,
  align: ScOverlayAlign,
  gap: number,
  direction: Direction = 'ltr',
  alignGap = 0,
): ConnectedPosition {
  const isVertical = side === 'top' || side === 'bottom';

  if (isVertical) {
    return {
      originX: align,
      originY: side,
      overlayX: align,
      overlayY: side === 'bottom' ? 'top' : 'bottom',
      offsetY: side === 'bottom' ? gap : -gap,
      // CDK's offsetX is physical: the reading end is the left in rtl.
      offsetX: direction === 'rtl' ? -alignGap : alignGap,
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
    offsetY: alignGap,
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
  alignGap = 0,
): ConnectedPosition[] {
  const positions = [
    // Preferred position
    buildOverlayPosition(side, align, gap, direction, alignGap),
    // Fallback: opposite side, same align
    buildOverlayPosition(oppositeSide[side], align, gap, direction, alignGap),
  ];

  if (align !== 'center') {
    // Fallback: same side, center align
    positions.push(
      buildOverlayPosition(side, 'center', gap, direction, alignGap),
    );
    // Fallback: opposite side, center align
    positions.push(
      buildOverlayPosition(
        oppositeSide[side],
        'center',
        gap,
        direction,
        alignGap,
      ),
    );
    // Fallback: same side, opposite align
    positions.push(
      buildOverlayPosition(
        side,
        oppositeAlign[align],
        gap,
        direction,
        alignGap,
      ),
    );
    // Fallback: opposite side, opposite align
    positions.push(
      buildOverlayPosition(
        oppositeSide[side],
        oppositeAlign[align],
        gap,
        direction,
        alignGap,
      ),
    );
  }

  return positions;
}
