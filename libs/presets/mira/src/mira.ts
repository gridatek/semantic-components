import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { buttonGroup, buttonGroupText } from './button-group';

/** The mira preset: `provideScConfig({ preset: mira })`. */
export const mira: ScPreset = { button, buttonGroup, buttonGroupText };
