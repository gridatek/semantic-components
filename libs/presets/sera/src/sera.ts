import type { ScPreset } from '@semantic-components/presets';
import { badge } from './badge';
import { button } from './button';
import { card } from './card';
import { controlGroup, controlGroupText } from './control-group';
import { input } from './input';
import {
  inputGroup,
  inputGroupAddon,
  inputGroupButton,
  inputGroupText,
} from './input-group';
import { pagination } from './pagination';
import { select } from './select';
import { table } from './table';

/** The sera preset: `provideScConfig({ preset: sera })`. */
export const sera: ScPreset = {
  badge,
  button,
  card,
  controlGroup,
  controlGroupText,
  input,
  inputGroup,
  inputGroupAddon,
  inputGroupButton,
  inputGroupText,
  pagination,
  select,
  table,
};
