import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScButton } from '@semantic-components/ui';
import { SiSettingsIcon, SiUploadIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-with-icons-button-demo',
  imports: [ScButton, SiUploadIcon, SiSettingsIcon],
  template: `
    <div class="flex flex-wrap items-center gap-4">
      <button scButton>
        <svg siUploadIcon></svg>
        Upload
      </button>
      <button scButton variant="outline">
        <svg siUploadIcon></svg>
        Export
      </button>
      <button scButton variant="secondary">
        Settings
        <svg siSettingsIcon></svg>
      </button>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithIconsButtonDemo {}
