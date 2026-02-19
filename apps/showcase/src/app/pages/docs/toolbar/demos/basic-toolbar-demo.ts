import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScToolbar,
  ScToolbarSeparator,
  ScToolbarWidget,
  ScToolbarWidgetGroup,
} from '@semantic-components/ui';
import {
  SiAlignCenterIcon,
  SiAlignLeftIcon,
  SiAlignRightIcon,
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-toolbar-demo',
  imports: [
    ScToolbar,
    ScToolbarWidget,
    ScToolbarWidgetGroup,
    ScToolbarSeparator,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
    SiAlignLeftIcon,
    SiAlignCenterIcon,
    SiAlignRightIcon,
  ],
  template: `
    <div scToolbar [values]="['bold']">
      <div scToolbarWidgetGroup>
        <button scToolbarWidget value="bold" aria-label="Bold">
          <svg siBoldIcon></svg>
        </button>
        <button scToolbarWidget value="italic" aria-label="Italic">
          <svg siItalicIcon></svg>
        </button>
        <button scToolbarWidget value="underline" aria-label="Underline">
          <svg siUnderlineIcon></svg>
        </button>
      </div>

      <div scToolbarSeparator></div>

      <div scToolbarWidgetGroup>
        <button scToolbarWidget value="align-left" aria-label="Align left">
          <svg siAlignLeftIcon></svg>
        </button>
        <button scToolbarWidget value="align-center" aria-label="Align center">
          <svg siAlignCenterIcon></svg>
        </button>
        <button scToolbarWidget value="align-right" aria-label="Align right">
          <svg siAlignRightIcon></svg>
        </button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicToolbarDemo {}
