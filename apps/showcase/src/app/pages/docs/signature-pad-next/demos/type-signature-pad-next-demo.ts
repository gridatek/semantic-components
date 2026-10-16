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
  ScSignaturePadNext,
  ScSignaturePadNextClear,
  ScSignaturePadNextLine,
  ScSignaturePadNextSurface,
  ScSignaturePadNextText,
} from '@semantic-components/ui-lab';

/** Without a pointer, type your name: the text is the signature, in the input's font. One pad, two ways in. */
@Component({
  selector: 'app-type-signature-pad-next-demo',
  imports: [
    ScSignaturePadNext,
    ScSignaturePadNextSurface,
    ScSignaturePadNextLine,
    ScSignaturePadNextText,
    ScSignaturePadNextClear,
    ScTabs,
    ScTabList,
    ScTab,
    ScTabPanel,
    ScTabContent,
    ScLabel,
  ],
  template: `
    <div scSignaturePadNext #pad="scSignaturePadNext" class="w-full max-w-md">
      <div scTabs>
        <div scTabList [selectedTab]="'draw'" class="grid w-full grid-cols-2">
          <button scTab value="draw">Draw</button>
          <button scTab value="type">Type</button>
        </div>
        <div scTabPanel value="draw">
          <ng-template scTabContent>
            <div scSignaturePadNextSurface aria-label="Signature">
              <div scSignaturePadNextLine>× Sign here</div>
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
              scSignaturePadNextText
              style="font-family: 'Segoe Script', 'Snell Roundhand', 'Brush Script MT', cursive"
            />
          </ng-template>
        </div>
      </div>
      <div class="mt-2 flex items-center justify-between text-sm">
        <span class="text-muted-foreground" aria-live="polite">{{
          pad.empty() ? 'Not signed' : 'Signed'
        }}</span>
        <button scSignaturePadNextClear size="sm">Clear</button>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class TypeSignaturePadNextDemo {}
