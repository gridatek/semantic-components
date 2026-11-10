import type { ScPreset } from '@semantic-components/presets';
import { accordion } from './accordion';
import { alert } from './alert';
import { alertDialog } from './alert-dialog';
import { attachment } from './attachment';
import { avatarGroupCount } from './avatar';
import { backdrop } from './backdrop';
import { badge } from './badge';
import { breadcrumb } from './breadcrumb';
import { bubble } from './bubble';
import { button } from './button';
import { calendar } from './calendar';
import { card } from './card';
import { checkbox } from './checkbox';
import { codeBlock } from './code-block';
import { contextMenu } from './context-menu';
import { controlGroup, controlGroupText } from './control-group';
import { dialog } from './dialog';
import { drawer } from './drawer';
import { empty } from './empty';
import { field } from './field';
import { frame } from './frame';
import { input } from './input';
import {
  inputGroup,
  inputGroupAddon,
  inputGroupButton,
  inputGroupText,
} from './input-group';
import { item } from './item';
import { kbd } from './kbd';
import { label } from './label';
import { marker } from './marker';
import { menu } from './menu';
import { menubar } from './menubar';
import { message } from './message';
import { messageScrollerContent } from './message-scroller';
import { pagination } from './pagination';
import { popover } from './popover';
import { previewCard } from './preview-card';
import { progress } from './progress';
import { questionnaire } from './questionnaire';
import { radioGroup } from './radio-group';
import { resizable } from './resizable';
import { scrollArea } from './scroll-area';
import { select } from './select';
import { sheet } from './sheet';
import { skeleton } from './skeleton';
import { switchStyles } from './switch';
import { table } from './table';
/** The lyra preset: `provideSemanticComponents({ preset: lyra })`. */
import { tabs } from './tabs';
import { textarea } from './textarea';
import { tooltip } from './tooltip';
import { trace } from './trace';

export const lyra: ScPreset = {
  accordion,
  alert,
  alertDialog,
  attachment,
  bubble,
  avatarGroupCount,
  backdrop,
  badge,
  breadcrumb,
  button,
  calendar,
  card,
  checkbox,
  codeBlock,
  frame,
  controlGroup,
  controlGroupText,
  dialog,
  drawer,
  empty,
  field,
  contextMenu,
  input,
  marker,
  inputGroup,
  inputGroupAddon,
  inputGroupButton,
  inputGroupText,
  item,
  kbd,
  label,
  menu,
  menubar,
  message,
  messageScrollerContent,
  pagination,
  popover,
  previewCard,
  progress,
  questionnaire,
  radioGroup,
  resizable,
  scrollArea,
  select,
  sheet,
  skeleton,
  switch: switchStyles,
  table,
  tabs,
  textarea,
  tooltip,
  trace,
};
