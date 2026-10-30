import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';
import { input } from './input';

/** The lyra preset: `provideScConfig({ preset: lyra })`. */
export const lyra: ScPreset = { button, controlGroup, controlGroupText, input };
