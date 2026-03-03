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
import {
  ScButton,
  ScSheet,
  ScSheetClose,
  ScSheetDescription,
  ScSheetHeader,
  ScSheetPortal,
  ScSheetProvider,
  ScSheetTitle,
  ScSheetTrigger,
} from '@semantic-components/ui';
import { SiXIcon } from '@semantic-icons/lucide-icons';

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
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm"
            >
              Home
            </a>
            <a
              href="#"
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm"
            >
              Products
            </a>
            <a
              href="#"
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm"
            >
              About
            </a>
            <a
              href="#"
              class="hover:bg-accent hover:text-accent-foreground rounded-md px-3 py-2 text-sm"
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
