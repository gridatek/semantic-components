import type { ScPreset, ScPresetName } from '@semantic-components/presets';
import { luma } from '@semantic-components/presets/luma';
import { lyra } from '@semantic-components/presets/lyra';
import { maia } from '@semantic-components/presets/maia';
import { mira } from '@semantic-components/presets/mira';
import { nova } from '@semantic-components/presets/nova';
import { rhea } from '@semantic-components/presets/rhea';
import { sera } from '@semantic-components/presets/sera';
import { vega } from '@semantic-components/presets/vega';
import { twMerge } from 'cn';
import { type Locator, expect, test } from '../test';

/** Every preset, as the showcase's preset sheet lists them. */
export const PRESETS: Record<ScPresetName, ScPreset> = {
  nova,
  vega,
  maia,
  lyra,
  mira,
  luma,
  sera,
  rhea,
};

/** The preset of the running project (`presets-lyra`…): its name. */
export function presetName(): ScPresetName {
  const name = (test.info().project.metadata as { preset?: ScPresetName })
    .preset;
  if (!name) throw new Error('A presets spec runs in a presets-… project.');
  return name;
}

/** The preset of the running project: its classes. */
export function presetStyles(): ScPreset {
  return PRESETS[presetName()];
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
    }, `${presetName()} ${what} classes missing`)
    .toEqual([]);
}
