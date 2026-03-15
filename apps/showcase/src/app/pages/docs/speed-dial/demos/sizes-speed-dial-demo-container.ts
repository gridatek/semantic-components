import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesSpeedDialDemo } from './sizes-speed-dial-demo';

@Component({
  selector: 'app-sizes-speed-dial-demo-container',
  imports: [DemoContainer, SizesSpeedDialDemo],
  template: `
    <app-demo-container
      title="Sizes"
      [code]="code"
      demoUrl="/demos/speed-dial/sizes-speed-dial-demo"
    >
      <app-sizes-speed-dial-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesSpeedDialDemoContainer {
  readonly code = `import {
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
  SiCopyIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiShare2Icon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialAction,
    ScSpeedDialActionButton,
    ScSpeedDialActionLabel,
    ScSpeedDialActionList,
    ScSpeedDialTrigger,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
    SiPlusIcon,
    SiXIcon,
  ],
  template: \`
    <div class="flex items-end gap-8 p-4">
      <div class="text-center">
        <div scSpeedDial #dialSm="scSpeedDial" size="sm" direction="up">
          <div scSpeedDialActionList>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Edit">
                <svg siPencilIcon class="size-4" />
              </button>
              @if (dialSm.open()) {
                <span scSpeedDialActionLabel>Edit</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Copy">
                <svg siCopyIcon class="size-4" />
              </button>
              @if (dialSm.open()) {
                <span scSpeedDialActionLabel>Copy</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Share">
                <svg siShare2Icon class="size-4" />
              </button>
              @if (dialSm.open()) {
                <span scSpeedDialActionLabel>Share</span>
              }
            </div>
          </div>
          <button scSpeedDialTrigger aria-label="Small speed dial">
            @if (dialSm.open()) {
              <svg siXIcon class="size-5" />
            } @else {
              <svg siPlusIcon class="size-5" />
            }
          </button>
        </div>
        <p class="text-muted-foreground mt-2 text-xs">Small</p>
      </div>
      <div class="text-center">
        <div scSpeedDial #dialMd="scSpeedDial" size="md" direction="up">
          <div scSpeedDialActionList>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Edit">
                <svg siPencilIcon class="size-5" />
              </button>
              @if (dialMd.open()) {
                <span scSpeedDialActionLabel>Edit</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Copy">
                <svg siCopyIcon class="size-5" />
              </button>
              @if (dialMd.open()) {
                <span scSpeedDialActionLabel>Copy</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Share">
                <svg siShare2Icon class="size-5" />
              </button>
              @if (dialMd.open()) {
                <span scSpeedDialActionLabel>Share</span>
              }
            </div>
          </div>
          <button scSpeedDialTrigger aria-label="Medium speed dial">
            @if (dialMd.open()) {
              <svg siXIcon class="size-6" />
            } @else {
              <svg siPlusIcon class="size-6" />
            }
          </button>
        </div>
        <p class="text-muted-foreground mt-2 text-xs">Medium</p>
      </div>
      <div class="text-center">
        <div scSpeedDial #dialLg="scSpeedDial" size="lg" direction="up">
          <div scSpeedDialActionList>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Edit">
                <svg siPencilIcon class="size-6" />
              </button>
              @if (dialLg.open()) {
                <span scSpeedDialActionLabel>Edit</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Copy">
                <svg siCopyIcon class="size-6" />
              </button>
              @if (dialLg.open()) {
                <span scSpeedDialActionLabel>Copy</span>
              }
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Share">
                <svg siShare2Icon class="size-6" />
              </button>
              @if (dialLg.open()) {
                <span scSpeedDialActionLabel>Share</span>
              }
            </div>
          </div>
          <button scSpeedDialTrigger aria-label="Large speed dial">
            @if (dialLg.open()) {
              <svg siXIcon class="size-7" />
            } @else {
              <svg siPlusIcon class="size-7" />
            }
          </button>
        </div>
        <p class="text-muted-foreground mt-2 text-xs">Large</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesSpeedDialDemo {}`;
}
