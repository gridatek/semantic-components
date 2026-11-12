import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardFooter,
  ScItem,
} from '@semantic-components/ui';
import { SiImageIcon } from '@semantic-icons/lucide-icons';

/** Cover art to upload: a square drop target and a button, one file input. */
@Component({
  selector: 'app-preview-cover-art',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardFooter,
    ScItem,
    SiImageIcon,
  ],
  template: `
    <div scCard>
      <div scCardContent class="flex flex-col gap-3">
        <label
          for="preview-cover-art"
          class="text-muted-foreground text-center text-xs tracking-wider uppercase"
        >
          Cover Art
        </label>
        <div scItem variant="outline" class="aspect-square">
          <label
            for="preview-cover-art"
            class="flex size-full cursor-pointer items-center justify-center"
          >
            <svg siImageIcon class="text-muted-foreground/50 size-10"></svg>
            <span class="sr-only">Choose cover art</span>
          </label>
        </div>
        <input
          #file
          id="preview-cover-art"
          type="file"
          accept="image/jpeg,image/png"
          class="sr-only"
        />
      </div>
      <div scCardFooter class="flex-col gap-2">
        <button
          scButton
          variant="secondary"
          class="w-full"
          (click)="file.click()"
        >
          Upload Artwork
        </button>
        <p scCardDescription class="text-center text-xs">
          Minimum 3000 × 3000px
          <br />
          JPEG or PNG only
        </p>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewCoverArt {}
