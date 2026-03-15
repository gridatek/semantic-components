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
  SiCircleQuestionMarkIcon,
  SiHouseIcon,
  SiPlusIcon,
  SiSettingsIcon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-directions-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialAction,
    ScSpeedDialActionButton,
    ScSpeedDialActionLabel,
    ScSpeedDialActionList,
    ScSpeedDialTrigger,
    SiHouseIcon,
    SiSettingsIcon,
    SiCircleQuestionMarkIcon,
    SiPlusIcon,
    SiXIcon,
  ],
  template: `
    <div class="grid w-full grid-cols-2 gap-4">
      <!-- Up Direction -->
      <div class="bg-muted/20 relative h-72 rounded-lg border">
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2">
          <div scSpeedDial #dialUp="scSpeedDial" direction="up">
            <div scSpeedDialActionList>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Home">
                  <svg siHouseIcon class="size-5" />
                </button>
                @if (dialUp.open()) {
                  <span scSpeedDialActionLabel>Home</span>
                }
              </div>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Settings">
                  <svg siSettingsIcon class="size-5" />
                </button>
                @if (dialUp.open()) {
                  <span scSpeedDialActionLabel>Settings</span>
                }
              </div>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Help">
                  <svg siCircleQuestionMarkIcon class="size-5" />
                </button>
                @if (dialUp.open()) {
                  <span scSpeedDialActionLabel>Help</span>
                }
              </div>
            </div>
            <button scSpeedDialTrigger aria-label="Up direction">
              @if (dialUp.open()) {
                <svg siXIcon class="size-6" />
              } @else {
                <svg siPlusIcon class="size-6" />
              }
            </button>
          </div>
        </div>
        <span class="text-muted-foreground absolute top-2 left-2 text-xs">
          Up (default)
        </span>
      </div>

      <!-- Down Direction -->
      <div class="bg-muted/20 relative h-72 rounded-lg border">
        <div class="absolute top-4 left-1/2 -translate-x-1/2">
          <div scSpeedDial #dialDown="scSpeedDial" direction="down">
            <div scSpeedDialActionList>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Home">
                  <svg siHouseIcon class="size-5" />
                </button>
                @if (dialDown.open()) {
                  <span scSpeedDialActionLabel>Home</span>
                }
              </div>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Settings">
                  <svg siSettingsIcon class="size-5" />
                </button>
                @if (dialDown.open()) {
                  <span scSpeedDialActionLabel>Settings</span>
                }
              </div>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Help">
                  <svg siCircleQuestionMarkIcon class="size-5" />
                </button>
                @if (dialDown.open()) {
                  <span scSpeedDialActionLabel>Help</span>
                }
              </div>
            </div>
            <button scSpeedDialTrigger aria-label="Down direction">
              @if (dialDown.open()) {
                <svg siXIcon class="size-6" />
              } @else {
                <svg siPlusIcon class="size-6" />
              }
            </button>
          </div>
        </div>
        <span class="text-muted-foreground absolute top-2 left-2 text-xs">
          Down
        </span>
      </div>

      <!-- Left Direction -->
      <div class="bg-muted/20 relative h-72 rounded-lg border">
        <div class="absolute top-1/2 left-4 -translate-y-1/2">
          <div scSpeedDial #dialLeft="scSpeedDial" direction="left">
            <div scSpeedDialActionList>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Home">
                  <svg siHouseIcon class="size-5" />
                </button>
                @if (dialLeft.open()) {
                  <span scSpeedDialActionLabel>Home</span>
                }
              </div>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Settings">
                  <svg siSettingsIcon class="size-5" />
                </button>
                @if (dialLeft.open()) {
                  <span scSpeedDialActionLabel>Settings</span>
                }
              </div>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Help">
                  <svg siCircleQuestionMarkIcon class="size-5" />
                </button>
                @if (dialLeft.open()) {
                  <span scSpeedDialActionLabel>Help</span>
                }
              </div>
            </div>
            <button scSpeedDialTrigger aria-label="Left direction">
              @if (dialLeft.open()) {
                <svg siXIcon class="size-6" />
              } @else {
                <svg siPlusIcon class="size-6" />
              }
            </button>
          </div>
        </div>
        <span class="text-muted-foreground absolute top-2 left-2 text-xs">
          Left
        </span>
      </div>

      <!-- Right Direction -->
      <div class="bg-muted/20 relative h-72 rounded-lg border">
        <div class="absolute top-1/2 right-4 -translate-y-1/2">
          <div scSpeedDial #dialRight="scSpeedDial" direction="right">
            <div scSpeedDialActionList>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Home">
                  <svg siHouseIcon class="size-5" />
                </button>
                @if (dialRight.open()) {
                  <span scSpeedDialActionLabel>Home</span>
                }
              </div>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Settings">
                  <svg siSettingsIcon class="size-5" />
                </button>
                @if (dialRight.open()) {
                  <span scSpeedDialActionLabel>Settings</span>
                }
              </div>
              <div scSpeedDialAction>
                <button scSpeedDialActionButton aria-label="Help">
                  <svg siCircleQuestionMarkIcon class="size-5" />
                </button>
                @if (dialRight.open()) {
                  <span scSpeedDialActionLabel>Help</span>
                }
              </div>
            </div>
            <button scSpeedDialTrigger aria-label="Right direction">
              @if (dialRight.open()) {
                <svg siXIcon class="size-6" />
              } @else {
                <svg siPlusIcon class="size-6" />
              }
            </button>
          </div>
        </div>
        <span class="text-muted-foreground absolute top-2 left-2 text-xs">
          Right
        </span>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DirectionsSpeedDialDemo {}
