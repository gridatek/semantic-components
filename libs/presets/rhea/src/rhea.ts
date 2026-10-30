import type { ScPreset } from '@semantic-components/presets';
import { button } from './button';
import { controlGroup, controlGroupText } from './control-group';
import { input } from './input';
import {
  inputGroup,
  inputGroupAddon,
  inputGroupButton,
  inputGroupText,
} from './input-group';

/** The rhea preset: `provideScConfig({ preset: rhea })`. */
export const rhea: ScPreset = {
  button,
  controlGroup,
  controlGroupText,
  input,
  inputGroup,
  inputGroupAddon,
  inputGroupButton,
  inputGroupText,
};
