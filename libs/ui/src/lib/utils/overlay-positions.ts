import { ConnectedPosition } from '@angular/cdk/overlay';

export type OverlaySide = 'top' | 'right' | 'bottom' | 'left';
export type OverlayAlign = 'start' | 'center' | 'end';

const oppositeSide: Record<OverlaySide, OverlaySide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export function buildOverlayPosition(
  side: OverlaySide,
  align: OverlayAlign,
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

export function buildOverlayPositionsWithFallback(
  side: OverlaySide,
  align: OverlayAlign,
  gap: number,
): ConnectedPosition[] {
  return [
    // Preferred position
    buildOverlayPosition(side, align, gap),
    // Fallback: opposite side
    buildOverlayPosition(oppositeSide[side], align, gap),
  ];
}
