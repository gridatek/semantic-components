import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';

/** The mira preset: `provideScConfig({ preset: mira })`. */
export const mira: ScPreset = { button, controlGroup, controlGroupText };
