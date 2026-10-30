import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { buttonGroup, buttonGroupText } from './button-group';

/** The luma preset: `provideScConfig({ preset: luma })`. */
export const luma: ScPreset = { button, buttonGroup, buttonGroupText };
