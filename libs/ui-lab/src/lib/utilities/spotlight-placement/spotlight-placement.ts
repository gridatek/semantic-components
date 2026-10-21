/** Where a card goes around its target: logical, `start`/`end` follow the direction. */
export type ScPlacementSide = 'top' | 'bottom' | 'start' | 'end';

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
  /** The side it took — or `center`, with no target. */
  readonly side: ScPlacementSide | 'center';
}

/** Room kept between the card, its target and the screen's edges. */
const GAP = 12;
const EDGE = 8;

const OPPOSITE: Record<ScPlacementSide, ScPlacementSide> = {
  top: 'bottom',
  bottom: 'top',
  start: 'end',
  end: 'start',
};

/**
 * A spotlight on `target`, and a card beside it: on `side`, or — without
 * room — the opposite, then the others; then shifted to stay on screen.
 * Without a target, the card is centred. In viewport pixels.
 */
export function spotlightPlacement(options: {
  target: DOMRect | null;
  card: { width: number; height: number };
  viewport: { width: number; height: number };
  side: ScPlacementSide;
  padding: number;
  rtl: boolean;
}): ScSpotlightPlacement {
  const { target, card, viewport, padding, rtl } = options;
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
  const physical = (side: ScPlacementSide) =>
    side === 'start'
      ? rtl
        ? 'right'
        : 'left'
      : side === 'end'
        ? rtl
          ? 'left'
          : 'right'
        : side;
  const at = (side: ScPlacementSide) => {
    switch (physical(side)) {
      case 'top':
        return {
          top: lit.top - GAP - card.height,
          left: lit.left + lit.width / 2 - card.width / 2,
        };
      case 'bottom':
        return {
          top: lit.top + lit.height + GAP,
          left: lit.left + lit.width / 2 - card.width / 2,
        };
      case 'left':
        return {
          top: lit.top + lit.height / 2 - card.height / 2,
          left: lit.left - GAP - card.width,
        };
      default:
        return {
          top: lit.top + lit.height / 2 - card.height / 2,
          left: lit.left + lit.width + GAP,
        };
    }
  };
  const fits = (side: ScPlacementSide) => {
    const { top, left } = at(side);
    const across = physical(side) === 'top' || physical(side) === 'bottom';
    return across
      ? top >= EDGE && top + card.height <= viewport.height - EDGE
      : left >= EDGE && left + card.width <= viewport.width - EDGE;
  };

  const wanted = options.side;
  const order: ScPlacementSide[] = [
    wanted,
    OPPOSITE[wanted],
    ...(['bottom', 'top', 'end', 'start'] as const).filter(
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
