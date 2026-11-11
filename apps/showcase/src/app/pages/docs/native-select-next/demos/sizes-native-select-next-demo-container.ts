import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesNativeSelectNextDemo } from './sizes-native-select-next-demo';

@Component({
  selector: 'app-sizes-native-select-next-demo-container',
  imports: [DemoContainer, SizesNativeSelectNextDemo],
  template: `
    <app-demo-container
      title="Sizes"
      demoUrl="/demos/native-select-next/sizes-native-select-next-demo"
      [code]="code"
    >
      <app-sizes-native-select-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesNativeSelectNextDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScNativeSelectNext,
  ScNativeSelectNextContainer,
  ScNativeSelectNextIcon,
  ScNativeSelectNextOption,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

/** Two heights: default, and sm (size="sm"), its chevron following. */
@Component({
  selector: 'app-sizes-native-select-next-demo',
  imports: [
    ScNativeSelectNext,
    ScNativeSelectNextContainer,
    ScNativeSelectNextIcon,
    ScNativeSelectNextOption,
    SiChevronDownIcon,
  ],
  template: \`
    <div class="flex flex-wrap items-center gap-4">
      @for (size of sizes; track size) {
        <div scNativeSelectNextContainer>
          <select
            scNativeSelectNext
            [size]="size"
            [attr.aria-label]="size === 'sm' ? 'Small' : 'Default'"
          >
            <option scNativeSelectNextOption value="">
              {{ size === 'sm' ? 'Small' : 'Default' }}
            </option>
            <option scNativeSelectNextOption value="one">One</option>
            <option scNativeSelectNextOption value="two">Two</option>
          </select>
          <svg siChevronDownIcon scNativeSelectNextIcon></svg>
        </div>
      }
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SizesNativeSelectNextDemo {
  protected readonly sizes = ['default', 'sm'] as const;
}`;
}
