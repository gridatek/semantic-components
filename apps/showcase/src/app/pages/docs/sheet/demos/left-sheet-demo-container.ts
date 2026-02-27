import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { LeftSheetDemo } from './left-sheet-demo';

@Component({
  selector: 'app-left-sheet-demo-container',
  imports: [DemoContainer, LeftSheetDemo],
  template: `
    <app-demo-container
      title="Left"
      demoUrl="/demos/sheet/left-sheet-demo"
      [code]="code"
    >
      <app-left-sheet-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSheetDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SiXIcon } from '@semantic-icons/lucide-icons';
import {
  ScSheetProvider,
  ScSheetClose,
  ScSheet,
  ScSheetDescription,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetTitle,
  ScSheetTrigger,
  ScButton,
} from '@semantic-components/ui';

@Component({
  selector: 'app-left-sheet-demo',
  imports: [
    ScSheetProvider,
    ScSheetClose,
    ScSheet,
    ScSheetDescription,
    ScSheetHeader,
    ScSheetPortal,
    ScSheetTitle,
    ScSheetTrigger,
    ScButton,
    SiXIcon,
  ],
  template: \`
    <div scSheetProvider side="left">
      <button scButton scSheetTrigger variant="outline">Open Left Sheet</button>
      <ng-template scSheetPortal>
        <div scSheet>
          <button scSheetClose>
            <svg siXIcon></svg>
            <span class="sr-only">Close</span>
          </button>
          <div scSheetHeader>
            <h2 scSheetTitle>Navigation</h2>
            <p scSheetDescription>Browse through different sections.</p>
          </div>
          <nav class="flex flex-col gap-2 py-4">
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Home
            </a>
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Products
            </a>
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              About
            </a>
            <a
              href="#"
              class="rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground"
            >
              Contact
            </a>
          </nav>
        </div>
      </ng-template>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSheetDemo {}`;
}
