import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';
import { input } from './input';

/** The maia preset: `provideScConfig({ preset: maia })`. */
export const maia: ScPreset = { button, controlGroup, controlGroupText, input };
