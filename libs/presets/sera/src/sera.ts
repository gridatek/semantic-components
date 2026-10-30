import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';
import { input } from './input';

/** The sera preset: `provideScConfig({ preset: sera })`. */
export const sera: ScPreset = { button, controlGroup, controlGroupText, input };
