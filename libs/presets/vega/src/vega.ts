import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { buttonGroup, buttonGroupText } from './button-group';

/** The vega preset: `provideScConfig({ preset: vega })`. */
export const vega: ScPreset = { button, buttonGroup, buttonGroupText };
