import { ConnectedPosition } from '@angular/cdk/overlay';

export type ScOverlaySide = 'top' | 'right' | 'bottom' | 'left';
export type ScOverlayAlign = 'start' | 'center' | 'end';

const oppositeSide: Record<ScOverlaySide, ScOverlaySide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export function buildOverlayPosition(
  side: ScOverlaySide,
  align: ScOverlayAlign,
  gap: number,
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
  return {
    originX: side === 'right' ? 'end' : 'start',
    originY: alignY,
    overlayX: side === 'right' ? 'start' : 'end',
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
): ConnectedPosition[] {
  const positions = [
    // Preferred position
    buildOverlayPosition(side, align, gap),
    // Fallback: opposite side, same align
    buildOverlayPosition(oppositeSide[side], align, gap),
  ];

  if (align !== 'center') {
    // Fallback: same side, center align
    positions.push(buildOverlayPosition(side, 'center', gap));
    // Fallback: opposite side, center align
    positions.push(buildOverlayPosition(oppositeSide[side], 'center', gap));
    // Fallback: same side, opposite align
    positions.push(buildOverlayPosition(side, oppositeAlign[align], gap));
    // Fallback: opposite side, opposite align
    positions.push(
      buildOverlayPosition(oppositeSide[side], oppositeAlign[align], gap),
    );
  }

  return positions;
}
