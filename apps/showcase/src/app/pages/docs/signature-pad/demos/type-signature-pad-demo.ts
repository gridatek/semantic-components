import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScLabel,
  ScTab,
  ScTabContent,
  ScTabList,
  ScTabPanel,
  ScTabs,
} from '@semantic-components/ui';
import {
  ScSignaturePad,
  ScSignaturePadClear,
  ScSignaturePadLine,
  ScSignaturePadSurface,
  ScSignaturePadText,
} from '@semantic-components/ui-lab';

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
    ScTabList,
    ScTab,
    ScTabPanel,
    ScTabContent,
    ScLabel,
  ],
  template: `
    <div scSignaturePad #pad="scSignaturePad" class="w-full max-w-md">
      <div scTabs>
        <div scTabList [selectedTab]="'draw'" class="grid w-full grid-cols-2">
          <button scTab value="draw">Draw</button>
          <button scTab value="type">Type</button>
        </div>
        <div scTabPanel value="draw">
          <ng-template scTabContent>
            <div scSignaturePadSurface aria-label="Signature">
              <div scSignaturePadLine>× Sign here</div>
            </div>
          </ng-template>
        </div>
        <div scTabPanel value="type">
          <ng-template scTabContent>
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
