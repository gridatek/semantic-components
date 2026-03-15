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
  SiFacebookIcon,
  SiLinkedinIcon,
  SiMailIcon,
  SiShare2Icon,
  SiTwitterIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-custom-icons-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialAction,
    ScSpeedDialActionButton,
    ScSpeedDialActionLabel,
    ScSpeedDialActionList,
    ScSpeedDialTrigger,
    SiShare2Icon,
    SiXIcon,
    SiFacebookIcon,
    SiTwitterIcon,
    SiLinkedinIcon,
    SiMailIcon,
  ],
  template: `
    <div class="bg-muted/20 relative h-96 w-full rounded-lg border">
      <div class="absolute right-4 bottom-4">
        <div scSpeedDial #dial="scSpeedDial" direction="up">
          <div scSpeedDialActionList>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Facebook">
                <svg siFacebookIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Facebook</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Twitter">
                <svg siTwitterIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Twitter</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="LinkedIn">
                <svg siLinkedinIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>LinkedIn</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Email">
                <svg siMailIcon class="size-5" />
              </button>
              @if (dial.open()) {
                <span scSpeedDialActionLabel>Email</span>
              }
            </div>
          </div>
          <button scSpeedDialTrigger aria-label="Share options">
            @if (dial.open()) {
              <svg siXIcon class="size-6" />
            } @else {
              <svg siShare2Icon class="size-6" />
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
export class CustomIconsSpeedDialDemo {}
