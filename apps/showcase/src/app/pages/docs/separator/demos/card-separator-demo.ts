import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScSeparator } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-card-separator-demo',
  imports: [ScSeparator],
  template: `
    <div class="w-[350px] rounded-lg border p-4">
      <div class="flex items-center justify-between">
        <span class="text-sm font-medium">Account Settings</span>
        <span class="text-xs text-muted-foreground">v1.0.0</span>
      </div>
      <div sc-separator class="my-4"></div>
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <span class="text-sm">Email notifications</span>
          <span class="text-sm text-muted-foreground">On</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-sm">Push notifications</span>
          <span class="text-sm text-muted-foreground">Off</span>
        </div>
      </div>
      <div sc-separator class="my-4"></div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-muted-foreground">
          Last updated: 2 hours ago
        </span>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardSeparatorDemo {}
