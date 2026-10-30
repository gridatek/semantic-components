import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';
import { input } from './input';

/** The nova preset: `provideScConfig({ preset: nova })`. */
export const nova: ScPreset = { button, controlGroup, controlGroupText, input };
