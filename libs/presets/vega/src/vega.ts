import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';
import { input } from './input';

/** The vega preset: `provideScConfig({ preset: vega })`. */
export const vega: ScPreset = { button, controlGroup, controlGroupText, input };
