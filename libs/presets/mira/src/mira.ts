import type { ScPreset } from '@semantic-components/presets';
import { alert } from './alert';
import { alertDialog } from './alert-dialog';
import { avatarGroupCount } from './avatar';
import { backdrop } from './backdrop';
import { badge } from './badge';
import { breadcrumb } from './breadcrumb';
import { button } from './button';
import { card } from './card';
import { controlGroup, controlGroupText } from './control-group';
import { frame } from './frame';
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

/** The mira preset: `provideScConfig({ preset: mira })`. */
export const mira: ScPreset = {
  alert,
  alertDialog,
  avatarGroupCount,
  backdrop,
  badge,
  breadcrumb,
  button,
  card,
  frame,
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
