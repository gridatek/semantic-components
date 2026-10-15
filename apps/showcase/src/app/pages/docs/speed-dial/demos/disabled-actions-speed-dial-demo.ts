import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScSpeedDial,
  ScSpeedDialAction,
  ScSpeedDialActionButton,
  ScSpeedDialActionLabel,
  ScSpeedDialActionList,
  ScSpeedDialTrigger,
} from '@semantic-components/ui-lab';
import {
  SiArchiveIcon,
  SiDownloadIcon,
  SiPlusIcon,
  SiPrinterIcon,
  SiSaveIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-disabled-actions-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialAction,
    ScSpeedDialActionButton,
    ScSpeedDialActionLabel,
    ScSpeedDialActionList,
    ScSpeedDialTrigger,
    SiSaveIcon,
    SiPrinterIcon,
    SiDownloadIcon,
    SiArchiveIcon,
    SiPlusIcon,
    SiXIcon,
  ],
  template: `
    <div class="bg-muted/20 relative h-96 w-full rounded-lg border">
      <div class="absolute right-4 bottom-4">
        <div scSpeedDial #dial="scSpeedDial" direction="up">
          <div scSpeedDialActionList>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton>
                <svg siSaveIcon class="size-5" />
                <span class="sr-only">Save</span>
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Save</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton disabled>
                <svg siPrinterIcon class="size-5" />
                <span class="sr-only">Print</span>
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Print</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton>
                <svg siDownloadIcon class="size-5" />
                <span class="sr-only">Download</span>
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Download</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton disabled>
                <svg siArchiveIcon class="size-5" />
                <span class="sr-only">Archive</span>
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Archive</span>
              }
            </div>
          </div>
          <button scSpeedDialTrigger>
            @if (dial.open()) {
              <svg siXIcon class="size-6" />
            } @else {
              <svg siPlusIcon class="size-6" />
            }
            <span class="sr-only">Actions with disabled items</span>
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class DisabledActionsSpeedDialDemo {}
