import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ScMenuAlignDemo } from './menu-align-demo';

@Component({
  selector: 'app-menu-align-demo-container',
  imports: [DemoContainer, ScMenuAlignDemo],
  template: `
    <app-demo-container
      title="Alignment"
      demoUrl="/demos/menu/menu-align-demo"
      [code]="code"
    >
      <app-menu-align-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuAlignDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScMenu,
  ScMenuContent,
  ScMenuItem,
  ScMenuPortal,
  ScMenuProvider,
  ScMenuTrigger,
} from '@semantic-components/ui';

@Component({
  selector: 'app-menu-align-demo',
  imports: [
    ScMenu,
    ScMenuContent,
    ScMenuItem,
    ScMenuPortal,
    ScMenuProvider,
    ScMenuTrigger,
    ScButton,
  ],
  template: \`
    <div class="flex w-full items-start justify-between">
      <div scMenuProvider align="start">
        <button scButton scMenuTrigger variant="outline">Start</button>
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="one">Option One</div>
              <div scMenuItem value="two">Option Two</div>
              <div scMenuItem value="three">Option Three</div>
            </ng-template>
          </div>
        </ng-template>
      </div>

      <div scMenuProvider align="center" [offset]="8">
        <button scButton scMenuTrigger variant="outline">
          Center (offset 8)
        </button>
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="one">Option One</div>
              <div scMenuItem value="two">Option Two</div>
              <div scMenuItem value="three">Option Three</div>
            </ng-template>
          </div>
        </ng-template>
      </div>

      <div scMenuProvider align="end">
        <button scButton scMenuTrigger variant="outline">End</button>
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="one">Option One</div>
              <div scMenuItem value="two">Option Two</div>
              <div scMenuItem value="three">Option Three</div>
            </ng-template>
          </div>
        </ng-template>
      </div>

      <div scMenuProvider side="top" align="end">
        <button scButton scMenuTrigger variant="outline">Top</button>
        <ng-template scMenuPortal>
          <div scMenu>
            <ng-template scMenuContent>
              <div scMenuItem value="one">Option One</div>
              <div scMenuItem value="two">Option Two</div>
              <div scMenuItem value="three">Option Three</div>
            </ng-template>
          </div>
        </ng-template>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScMenuAlignDemo {}`;
}
