import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';

/** The lyra preset: `provideScConfig({ preset: lyra })`. */
export const lyra: ScPreset = { button, controlGroup, controlGroupText };
