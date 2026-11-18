import type { Direction } from '@angular/cdk/bidi';
import {
  type ScOverlayLogicalSide,
  type ScOverlaySide,
  physicalSide,
} from '../../utils/overlay-positions';

export interface ScPlacementBox {
  readonly top: number;
  readonly left: number;
  readonly width: number;
  readonly height: number;
}

export interface ScSpotlightPlacement {
  /** The lit area: the target and its padding (none: a point at the centre). */
  readonly spotlight: ScPlacementBox;
  /** Where the card goes. */
  readonly card: { readonly top: number; readonly left: number };
  /**
   * The side it landed on, as the screen sees it (`data-side`: physical, as
   * the popups') — or `center`, with no target.
   */
  readonly side: ScOverlaySide | 'center';
}

/** The card's distance from its target (the overlays' `sideOffset`). */
const SIDE_OFFSET = 12;
/** Room kept between the card and the screen's edges. */
const EDGE = 8;

const OPPOSITE: Record<ScOverlaySide, ScOverlaySide> = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

/**
 * A spotlight on `target`, and a card beside it: on `side` (the library's
 * sides — `inline-start` / `inline-end` follow the direction, `left` / `right`
 * stay put), or, without room, the opposite, then the others; then shifted to
 * stay on screen. Without a target, the card is centred. In viewport pixels.
 * Worked out physically: the side is turned to the screen's first.
 */
export function spotlightPlacement(options: {
  target: DOMRect | null;
  card: { width: number; height: number };
  viewport: { width: number; height: number };
  side: ScOverlayLogicalSide;
  padding: number;
  direction: Direction;
}): ScSpotlightPlacement {
  const { target, card, viewport, padding } = options;
  if (!target) {
    return {
      spotlight: {
        top: viewport.height / 2,
        left: viewport.width / 2,
        width: 0,
        height: 0,
      },
      card: {
        top: (viewport.height - card.height) / 2,
        left: (viewport.width - card.width) / 2,
      },
      side: 'center',
    };
  }

  const lit = {
    top: target.top - padding,
    left: target.left - padding,
    width: target.width + padding * 2,
    height: target.height + padding * 2,
  };
  const at = (side: ScOverlaySide) => {
    switch (side) {
      case 'top':
        return {
          top: lit.top - SIDE_OFFSET - card.height,
          left: lit.left + lit.width / 2 - card.width / 2,
        };
      case 'bottom':
        return {
          top: lit.top + lit.height + SIDE_OFFSET,
          left: lit.left + lit.width / 2 - card.width / 2,
        };
      case 'left':
        return {
          top: lit.top + lit.height / 2 - card.height / 2,
          left: lit.left - SIDE_OFFSET - card.width,
        };
      default:
        return {
          top: lit.top + lit.height / 2 - card.height / 2,
          left: lit.left + lit.width + SIDE_OFFSET,
        };
    }
  };
  const fits = (side: ScOverlaySide) => {
    const { top, left } = at(side);
    return side === 'top' || side === 'bottom'
      ? top >= EDGE && top + card.height <= viewport.height - EDGE
      : left >= EDGE && left + card.width <= viewport.width - EDGE;
  };

  // The side asked, then its opposite, then the others.
  const wanted = physicalSide(options.side, options.direction);
  const order: ScOverlaySide[] = [
    wanted,
    OPPOSITE[wanted],
    ...(['bottom', 'top', 'right', 'left'] as const).filter(
      (side) => side !== wanted && side !== OPPOSITE[wanted],
    ),
  ];
  const side = order.find(fits) ?? wanted;
  const { top, left } = at(side);
  return {
    spotlight: lit,
    card: {
      top: Math.min(Math.max(EDGE, top), viewport.height - card.height - EDGE),
      left: Math.min(Math.max(EDGE, left), viewport.width - card.width - EDGE),
    },
    side,
  };
}
