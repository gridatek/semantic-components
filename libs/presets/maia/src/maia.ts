import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { buttonGroup, buttonGroupText } from './button-group';

/** The maia preset: `provideScConfig({ preset: maia })`. */
export const maia: ScPreset = { button, buttonGroup, buttonGroupText };
