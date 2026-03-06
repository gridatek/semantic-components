import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesTimezoneDemo } from './sizes-timezone-demo';

@Component({
  selector: 'app-sizes-timezone-demo-container',
  imports: [DemoContainer, SizesTimezoneDemo],
  template: `
    <app-demo-container title="Sizes" [code]="code">
      <app-sizes-timezone-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesTimezoneDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScTimezoneDisplay } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-timezone-demo',
  imports: [ScTimezoneDisplay],
  template: \`
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button scTimezoneDisplay variant="outline" size="sm"></button>
        <span class="text-muted-foreground text-xs">Small</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button scTimezoneDisplay variant="outline" size="default"></button>
        <span class="text-muted-foreground text-xs">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button scTimezoneDisplay variant="outline" size="lg"></button>
        <span class="text-muted-foreground text-xs">Large</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          scTimezoneDisplay
          variant="outline"
          size="icon"
          [iconOnly]="true"
        ></button>
        <span class="text-muted-foreground text-xs">Icon</span>
      </div>
    </div>
  \`,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesTimezoneDemo {}`;
}
