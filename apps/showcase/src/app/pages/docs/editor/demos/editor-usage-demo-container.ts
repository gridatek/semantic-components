import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import {
  ScCodeViewer,
  ScCodeViewerContent,
  ScCodeViewerHeader,
  ScCodeViewerLabel,
} from '@semantic-components/code';
import { ScButton, ScCopyToClipboard } from '@semantic-components/ui';
import { SiCheckIcon, SiCopyIcon } from '@semantic-icons/lucide-icons';
import { ConfigService } from '../../../../services/config.service';
import { EditorUsageDemo } from './editor-usage-demo';

@Component({
  selector: 'app-editor-usage-demo-container',
  imports: [
    ScCodeViewer,
    ScCodeViewerHeader,
    ScCodeViewerLabel,
    ScCodeViewerContent,
    ScButton,
    ScCopyToClipboard,
    SiCheckIcon,
    SiCopyIcon,
    EditorUsageDemo,
  ],
  template: `
    <div scCodeViewer>
      <div scCodeViewerHeader>
        <span scCodeViewerLabel>angular-ts</span>
        <button
          scButton
          variant="ghost"
          size="icon"
          [scCopyToClipboard]="code"
          #copy="scCopyToClipboard"
          aria-label="Copy to clipboard"
        >
          @if (copy.copied()) {
            <svg siCheckIcon></svg>
          } @else {
            <svg siCopyIcon></svg>
          }
        </button>
      </div>
      <div scCodeViewerContent [code]="code" language="angular-ts"></div>
    </div>

    @if (devMode()) {
      <div
        class="mt-4 flex min-h-40 items-center justify-center rounded-md border p-6"
      >
        <app-editor-usage-demo />
      </div>
    }
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorUsageDemoContainer {
  private readonly config = inject(ConfigService);

  protected readonly devMode = this.config.devMode;

  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import {
  ScEditor,
  ScEditorBoldToggle,
  ScEditorContent,
  ScEditorItalicToggle,
  ScEditorToolbar,
  ScEditorToolbarGroup,
  ScEditorUnderlineToggle,
} from '@semantic-components/editor';
import {
  SiBoldIcon,
  SiItalicIcon,
  SiUnderlineIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-editor-usage-demo',
  imports: [
    ScEditor,
    ScEditorContent,
    ScEditorToolbar,
    ScEditorToolbarGroup,
    ScEditorBoldToggle,
    ScEditorItalicToggle,
    ScEditorUnderlineToggle,
    SiBoldIcon,
    SiItalicIcon,
    SiUnderlineIcon,
  ],
  template: \`
    <div class="w-full max-w-lg">
      <div scEditor class="overflow-hidden rounded-lg border">
        <div scEditorToolbar>
          <div scEditorToolbarGroup>
            <button scEditorBoldToggle value="bold">
              <svg siBoldIcon></svg>
              <span class="sr-only">Bold</span>
            </button>
            <button scEditorItalicToggle value="italic">
              <svg siItalicIcon></svg>
              <span class="sr-only">Italic</span>
            </button>
            <button scEditorUnderlineToggle value="underline">
              <svg siUnderlineIcon></svg>
              <span class="sr-only">Underline</span>
            </button>
          </div>
        </div>

        <div
          scEditorContent
          [(value)]="content"
          placeholder="Start writing..."
        ></div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditorUsageDemo {
  readonly content = signal('');
}`;
}
