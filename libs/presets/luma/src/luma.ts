import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';
import { input } from './input';

/** The luma preset: `provideScConfig({ preset: luma })`. */
export const luma: ScPreset = { button, controlGroup, controlGroupText, input };
