import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { CardSeparatorDemo } from './card-separator-demo';

@Component({
  selector: 'app-card-separator-demo-container',
  imports: [DemoContainer, CardSeparatorDemo],
  template: `
    <app-demo-container title="In a Card" [code]="code">
      <app-card-separator-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSeparatorDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSeparator } from '@semantic-components/ui';

@Component({
  selector: 'app-card-separator-demo',
  imports: [ScSeparator],
  template: \`
    <div class="w-[350px] rounded-lg border p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Account Settings</span>
        <span class="text-muted-foreground text-xs">v1.0.0</span>
      </div>
      <div scSeparator class="my-4"></div>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm">Email notifications</span>
          <span class="text-muted-foreground text-sm">On</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm">Push notifications</span>
          <span class="text-muted-foreground text-sm">Off</span>
        </div>
      </div>
      <div scSeparator class="my-4"></div>
      <div class="flex items-center justify-between">
        <span class="text-muted-foreground text-sm">
          Last updated: 2 hours ago
        </span>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSeparatorDemo {}`;
}
