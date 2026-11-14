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
import { carousel } from './carousel';
import { chart } from './chart';
import { checkbox } from './checkbox';
import { codeBlock } from './code-block';
import { combobox } from './combobox';
import { command } from './command';
import { contextMenu } from './context-menu';
import { controlGroup, controlGroupText } from './control-group';
import { dialog } from './dialog';
import { drawer } from './drawer';
import { empty } from './empty';
import { field } from './field';
import { frame, frameSm } from './frame';
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
import { link } from './link';
import { marker } from './marker';
import { menu } from './menu';
import { menubar } from './menubar';
import { message } from './message';
import { messageScrollerContent } from './message-scroller';
import { nativeSelect } from './native-select';
import { navigationMenu } from './navigation-menu';
import { otpField } from './otp-field';
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
import { sidebar } from './sidebar';
import { skeleton } from './skeleton';
import { slider } from './slider';
import { switchStyles } from './switch';
import { table } from './table';
/** The maia preset: `provideSemanticComponents({ preset: maia })`. */
import { tabs } from './tabs';
import { textarea } from './textarea';
import { toast } from './toast';
import { toggle } from './toggle';
import { toggleGroup } from './toggle-group';
import { tooltip } from './tooltip';
import { trace } from './trace';

export const maia: ScPreset = {
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
  carousel,
  chart,
  checkbox,
  codeBlock,
  combobox,
  command,
  frame,
  frameSm,
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
  link,
  label,
  menu,
  menubar,
  message,
  messageScrollerContent,
  nativeSelect,
  navigationMenu,
  otpField,
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
  sidebar,
  skeleton,
  slider,
  switch: switchStyles,
  table,
  tabs,
  textarea,
  toast,
  toggle,
  toggleGroup,
  tooltip,
  trace,
};
