import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_PDF_VIEWER } from './pdf-viewer-root';

const HIGHLIGHT_COLORS = [
  '#FFFF00',
  '#00FF00',
  '#00FFFF',
  '#FF69B4',
  '#FF0000',
];

@Component({
  selector: 'sc-pdf-viewer-editor-highlight-params',
  template: `
    <div class="flex flex-col gap-4 p-3">
      <!-- Color picker -->
      <div class="flex flex-col gap-2">
        <span class="text-[13px] leading-[150%] font-normal">
          Highlight color
        </span>
        <div class="flex items-center justify-between">
          @for (color of colors; track color) {
            <button
              type="button"
              class="highlight-color-swatch"
              [class.highlight-color-swatch-active]="
                pdfViewer.highlightColor() === color
              "
              [style.--swatch-color]="color"
              (click)="pdfViewer.highlightColor.set(color)"
              [attr.aria-label]="'Highlight color ' + color"
              [attr.aria-pressed]="pdfViewer.highlightColor() === color"
            ></button>
          }
        </div>
      </div>

      <!-- Thickness -->
      <div class="flex flex-col items-center gap-1 self-stretch">
        <label
          for="editorFreeHighlightThickness"
          class="self-start text-[13px] leading-[150%] font-normal"
        >
          Thickness
        </label>
        <div class="flex items-center justify-between gap-2 self-stretch">
          <span class="block size-2 rounded-full bg-[#80808e]"></span>
          <input
            id="editorFreeHighlightThickness"
            type="range"
            min="8"
            max="24"
            step="1"
            [value]="pdfViewer.highlightThickness()"
            (input)="
              pdfViewer.highlightThickness.set(+$any($event.target).value)
            "
            class="highlight-thickness-slider h-3.5 flex-1"
          />
          <span class="block size-6 rounded-full bg-[#80808e]"></span>
        </div>
      </div>

      <!-- Divider -->
      <div class="h-px w-full bg-[#8f8f9d]"></div>

      <!-- Show all toggle -->
      <div class="flex items-center justify-between self-stretch">
        <span class="text-[13px] leading-[150%] font-normal">Show all</span>
        <button
          type="button"
          role="switch"
          class="highlight-toggle"
          [class.highlight-toggle-on]="pdfViewer.highlightShowAll()"
          [attr.aria-checked]="pdfViewer.highlightShowAll()"
          (click)="
            pdfViewer.highlightShowAll.set(!pdfViewer.highlightShowAll())
          "
        >
          <span class="highlight-toggle-thumb"></span>
        </button>
      </div>
    </div>
  `,
  styles: `
    .highlight-color-swatch {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 2px solid transparent;
      background-color: var(--swatch-color);
      cursor: pointer;
      outline: none;
      padding: 0;
      transition: border-color 0.15s;

      &:hover {
        border-color: rgba(0, 0, 0, 0.3);
      }

      &:focus-visible {
        outline: 2px solid #0060df;
        outline-offset: 2px;
      }
    }

    .highlight-color-swatch-active {
      border-color: #0060df !important;
      box-shadow: 0 0 0 1px #0060df;
    }

    .highlight-thickness-slider {
      appearance: none;
      background: transparent;
      cursor: pointer;

      &::-webkit-slider-runnable-track {
        height: 4px;
        border-radius: 2px;
        background: #80808e;
      }

      &::-moz-range-track {
        height: 4px;
        border-radius: 2px;
        background: #80808e;
      }

      &::-webkit-slider-thumb {
        appearance: none;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #0060df;
        margin-top: -6px;
        border: none;
      }

      &::-moz-range-thumb {
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background: #0060df;
        border: none;
      }
    }

    .highlight-toggle {
      position: relative;
      width: 32px;
      height: 16px;
      border-radius: 8px;
      border: 1px solid #8f8f9d;
      background: #80808e;
      cursor: pointer;
      padding: 0;
      transition:
        background-color 0.2s,
        border-color 0.2s;

      &:focus-visible {
        outline: 2px solid #0060df;
        outline-offset: 2px;
      }
    }

    .highlight-toggle-on {
      background: #0060df;
      border-color: #0060df;
    }

    .highlight-toggle-thumb {
      position: absolute;
      top: 1px;
      left: 1px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      transition: transform 0.2s;

      .highlight-toggle-on & {
        transform: translateX(16px);
      }
    }
  `,
  host: {
    'data-slot': 'pdf-viewer-editor-highlight-params',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScPdfViewerEditorHighlightParams {
  readonly pdfViewer = inject(SC_PDF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('block', this.classInput()));

  readonly colors = HIGHLIGHT_COLORS;
}
