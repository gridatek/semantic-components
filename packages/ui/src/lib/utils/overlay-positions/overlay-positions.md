# Overlay Positioning Strategy

The `buildOverlayPositionsWithFallback` function generates a list of CDK connected overlay positions ordered by priority. The overlay tries each position in order and uses the first one that fits within the viewport.

## Default Fallback Chain (side: bottom, align: start)

| Priority | Side   | Align  | Description                |
| -------- | ------ | ------ | -------------------------- |
| 1        | bottom | start  | Preferred position         |
| 2        | top    | start  | Flip side                  |
| 3        | bottom | center | Center align               |
| 4        | top    | center | Flip side + center align   |
| 5        | bottom | end    | Opposite align             |
| 6        | top    | end    | Flip side + opposite align |

## How It Works

- Positions 1-2 are always generated (preferred + opposite side).
- Positions 3-6 are added only when the requested `align` is not `center` (i.e., `start` or `end`).
- The CDK overlay evaluates each position in order and picks the first one where the overlay fits within the viewport.

## Behavior

- **Enough space**: The overlay opens at the preferred position (e.g., bottom-start).
- **Not enough vertical space**: The overlay flips to the opposite side (e.g., top-start).
- **Not enough horizontal space**: The overlay shifts to center, then to the opposite alignment (e.g., bottom-center, then bottom-end).
- **Tight on both axes**: The overlay combines side flip with alignment shift (e.g., top-center or top-end).
