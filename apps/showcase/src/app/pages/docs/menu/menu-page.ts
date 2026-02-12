import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScMenuDemoContainer } from './demos/menu-demo-container';
import { MenuShortcutsDemoContainer } from './demos/menu-shortcuts-demo-container';
import { MenuToolsDemoContainer } from './demos/menu-tools-demo-container';
import { MenuAvatarDemoContainer } from './demos/menu-avatar-demo-container';
import { TocHeading } from '../../../components/toc/toc-heading';
import { ComponentStatusBadge } from '../../../components/component-status-badge/component-status-badge';
import { COMPONENTS } from '../../../data/components';

@Component({
  selector: 'app-menu-page',
  imports: [
    ScMenuDemoContainer,
    MenuShortcutsDemoContainer,
    MenuToolsDemoContainer,
    MenuAvatarDemoContainer,
    TocHeading,
    ComponentStatusBadge,
  ],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Menu</h1>
        <p class="text-muted-foreground">
          Displays a menu to the user — such as a set of actions or functions —
          triggered by a button.
        </p>
        <app-component-status-badge [status]="componentStatus" />
      </div>

      <section class="space-y-8">
        <h2 toc class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-menu-demo-container />
        <app-menu-shortcuts-demo-container />
        <app-menu-tools-demo-container />
        <app-menu-avatar-demo-container />
      </section>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MenuPage {
  readonly componentStatus = COMPONENTS.find((c) => c.path === 'menu')!.status;
}
