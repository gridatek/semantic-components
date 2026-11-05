import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLabel,
  ScSignaturePad,
  ScSignaturePadClear,
  ScSignaturePadLine,
  ScSignaturePadSurface,
  ScSignaturePadText,
  ScTabs,
  ScTabsContent,
  ScTabsList,
  ScTabsPanel,
  ScTabsTab,
} from '@semantic-components/ui';

/** Without a pointer, type your name: the text is the signature, in the input's font. One pad, two ways in. */
@Component({
  selector: 'app-type-signature-pad-demo',
  imports: [
    ScSignaturePad,
    ScSignaturePadSurface,
    ScSignaturePadLine,
    ScSignaturePadText,
    ScSignaturePadClear,
    ScTabs,
    ScTabsList,
    ScTabsTab,
    ScTabsPanel,
    ScTabsContent,
    ScLabel,
  ],
  template: `
    <div scSignaturePad #pad="scSignaturePad" class="w-full max-w-md">
      <div scTabs value="draw">
        <div scTabsList class="grid w-full grid-cols-2">
          <button scTabsTab value="draw">Draw</button>
          <button scTabsTab value="type">Type</button>
        </div>
        <div scTabsPanel value="draw">
          <ng-template scTabsContent>
            <div scSignaturePadSurface aria-label="Signature">
              <div scSignaturePadLine>× Sign here</div>
            </div>
          </ng-template>
        </div>
        <div scTabsPanel value="type">
          <ng-template scTabsContent>
            <label scLabel for="signature-name" class="mb-2">
              Type your name
            </label>
            <input
              id="signature-name"
              scSignaturePadText
              style="font-family: 'Segoe Script', 'Snell Roundhand', 'Brush Script MT', cursive"
            />
          </ng-template>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between text-sm">
        <span class="text-muted-foreground" aria-live="polite">{{
          pad.empty() ? 'Not signed' : 'Signed'
        }}</span>
        <button scSignaturePadClear size="sm">Clear</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TypeSignaturePadDemo {}
