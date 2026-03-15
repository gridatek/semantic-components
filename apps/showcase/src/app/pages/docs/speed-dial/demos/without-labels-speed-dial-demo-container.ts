import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { WithoutLabelsSpeedDialDemo } from './without-labels-speed-dial-demo';

@Component({
  selector: 'app-without-labels-speed-dial-demo-container',
  imports: [DemoContainer, WithoutLabelsSpeedDialDemo],
  template: `
    <app-demo-container
      title="Without Labels"
      [code]="code"
      demoUrl="/demos/speed-dial/without-labels-speed-dial-demo"
    >
      <app-without-labels-speed-dial-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutLabelsSpeedDialDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScSpeedDial,
  ScSpeedDialAction,
  ScSpeedDialActionButton,
  ScSpeedDialActionList,
  ScSpeedDialTrigger,
} from '@semantic-components/ui-lab';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiPlusIcon,
  SiShare2Icon,
  SiTrash2Icon,
  SiXIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-without-labels-speed-dial-demo',
  imports: [
    ScSpeedDial,
    ScSpeedDialAction,
    ScSpeedDialActionButton,
    ScSpeedDialActionList,
    ScSpeedDialTrigger,
    SiPencilIcon,
    SiCopyIcon,
    SiShare2Icon,
    SiTrash2Icon,
    SiPlusIcon,
    SiXIcon,
  ],
  template: \`
    <div class="bg-muted/20 relative h-96 w-full rounded-lg border">
      <div class="absolute right-4 bottom-4">
        <div scSpeedDial #dial="scSpeedDial" direction="up">
          <div scSpeedDialActionList>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Edit">
                <svg siPencilIcon class="size-5" />
              </button>
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Copy">
                <svg siCopyIcon class="size-5" />
              </button>
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Share">
                <svg siShare2Icon class="size-5" />
              </button>
            </div>
            <div scSpeedDialAction>
              <button scSpeedDialActionButton aria-label="Delete">
                <svg siTrash2Icon class="size-5" />
              </button>
            </div>
          </div>
          <button scSpeedDialTrigger aria-label="Actions without labels">
            @if (dial.open()) {
              <svg siXIcon class="size-6" />
            } @else {
              <svg siPlusIcon class="size-6" />
            }
          </button>
        </div>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WithoutLabelsSpeedDialDemo {}`;
}
