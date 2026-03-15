import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicInputButtonDemo } from './basic-input-button-demo';

@Component({
  selector: 'app-basic-input-button-demo-container',
  imports: [DemoContainer, BasicInputButtonDemo],
  template: `
    <app-demo-container
      title="Basic"
      demoUrl="/demos/input-button/basic-input-button-demo"
      [code]="code"
    >
      <app-basic-input-button-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputButtonDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScInputButton, ScKbd } from '@semantic-components/ui';
import { SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-input-button-demo',
  imports: [ScInputButton, ScKbd, SiSearchIcon],
  template: \`
    <button scInputButton class="max-w-sm">
      <svg siSearchIcon class="size-4 shrink-0"></svg>
      <span class="flex-1 text-start">Search...</span>
      <kbd scKbd>&#8984;J</kbd>
    </button>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicInputButtonDemo {}`;
}
