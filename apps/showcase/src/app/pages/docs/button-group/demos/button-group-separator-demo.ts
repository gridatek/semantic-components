import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScButtonGroup,
  ScButtonGroupSeparator,
} from '@semantic-components/ui';
import {
  SiClipboardIcon,
  SiClipboardPasteIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-button-group-separator-demo',
  imports: [
    ScButton,
    ScButtonGroup,
    ScButtonGroupSeparator,
    SiClipboardIcon,
    SiClipboardPasteIcon,
  ],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  template: `
    <div scButtonGroup>
      <button scButton variant="outline">
        <svg siClipboardIcon></svg>
        Copy
      </button>
      <div scButtonGroupSeparator></div>
      <button scButton variant="outline">
        <svg siClipboardPasteIcon></svg>
        Paste
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonGroupSeparatorDemo {}
