import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { buttonGroup, buttonGroupText } from './button-group';

/** The lyra preset: `provideScConfig({ preset: lyra })`. */
export const lyra: ScPreset = { button, buttonGroup, buttonGroupText };
