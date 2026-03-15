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
  signal,
} from '@angular/core';
import { ScSpeedDial, type SpeedDialAction } from '@semantic-components/ui-lab';
import {
  SiCopyIcon,
  SiPencilIcon,
  SiShare2Icon,
  SiTrash2Icon,
} from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-sizes-speed-dial-demo',
  imports: [ScSpeedDial],
  template: \`
    <div class="flex items-end gap-8 p-4">
      <div class="text-center">
        <sc-speed-dial
          [actions]="basicActions().slice(0, 3)"
          size="sm"
          actionSize="sm"
          ariaLabel="Small speed dial"
        />
        <p class="text-muted-foreground mt-2 text-xs">Small</p>
      </div>
      <div class="text-center">
        <sc-speed-dial
          [actions]="basicActions().slice(0, 3)"
          size="md"
          actionSize="md"
          ariaLabel="Medium speed dial"
        />
        <p class="text-muted-foreground mt-2 text-xs">Medium</p>
      </div>
      <div class="text-center">
        <sc-speed-dial
          [actions]="basicActions().slice(0, 3)"
          size="lg"
          actionSize="lg"
          ariaLabel="Large speed dial"
        />
        <p class="text-muted-foreground mt-2 text-xs">Large</p>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesSpeedDialDemo {
  readonly basicActions = signal<SpeedDialAction[]>([
    {
      id: 'edit',
      icon: SiPencilIcon,
      label: 'Edit',
    },
    {
      id: 'copy',
      icon: SiCopyIcon,
      label: 'Copy',
    },
    {
      id: 'share',
      icon: SiShare2Icon,
      label: 'Share',
    },
    {
      id: 'delete',
      icon: SiTrash2Icon,
      label: 'Delete',
    },
  ]);
}`;
}
