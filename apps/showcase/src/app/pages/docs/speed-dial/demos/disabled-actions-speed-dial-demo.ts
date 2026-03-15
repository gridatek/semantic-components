import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
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
              <button scSpeedDialActionButton aria-label="Save">
                <svg siSaveIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Save</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Print" disabled>
                <svg siPrinterIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Print</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Download">
                <svg siDownloadIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Download</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Archive" disabled>
                <svg siArchiveIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Archive</span>
              }
            </div>
          </div>
          <button scSpeedDialTrigger aria-label="Actions with disabled items">
            @if (dial.open()) {
              <svg siXIcon class="size-6" />
            } @else {
              <svg siPlusIcon class="size-6" />
            }
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledActionsSpeedDialDemo {}
