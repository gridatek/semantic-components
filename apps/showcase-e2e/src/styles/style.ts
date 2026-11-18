import type { ScStyle, ScStyleName } from '@semantic-components/styles';
import { luma } from '@semantic-components/styles/luma';
import { lyra } from '@semantic-components/styles/lyra';
import { maia } from '@semantic-components/styles/maia';
import { mira } from '@semantic-components/styles/mira';
import { nova } from '@semantic-components/styles/nova';
import { rhea } from '@semantic-components/styles/rhea';
import { sera } from '@semantic-components/styles/sera';
import { vega } from '@semantic-components/styles/vega';
import { twMerge } from 'cn';
import { type Locator, expect, test } from '../test';

/** Every style, as the showcase lists them. */
export const STYLES: Record<ScStyleName, ScStyle> = {
  nova,
  vega,
  maia,
  lyra,
  mira,
  luma,
  sera,
  rhea,
};

/** The style of the running project (`styles-lyra`…): its name. */
export function styleName(): ScStyleName {
  const name = (test.info().project.metadata as { style?: ScStyleName }).style;
  if (!name) throw new Error('A styles spec runs in a styles-… project.');
  return name;
}

/** The style of the running project: its classes. */
export function currentStyle(): ScStyle {
  return STYLES[styleName()];
}

/** Reads until the element has every class of `wanted` (merged as cn does). */
export async function expectClasses(
  target: Locator,
  wanted: string,
  what: string,
): Promise<void> {
  const classes = twMerge(wanted).split(/\s+/).filter(Boolean);
  await expect
    .poll(async () => {
      const have = new Set(
        ((await target.getAttribute('class')) ?? '').split(/\s+/),
      );
      return classes.filter((c) => !have.has(c));
    }, `${styleName()} ${what} classes missing`)
    .toEqual([]);
}
