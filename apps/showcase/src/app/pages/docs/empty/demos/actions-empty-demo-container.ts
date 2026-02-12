import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ActionsEmptyDemo } from './actions-empty-demo';

@Component({
  selector: 'app-actions-empty-demo-container',
  imports: [DemoContainer, ActionsEmptyDemo],
  template: `
    <app-demo-container title="With Actions" [code]="code">
      <app-actions-empty-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsEmptyDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScButton,
  ScEmpty,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScEmptyDescription,
  ScEmptyContent,
} from '@semantic-components/ui-lab';
import { SiFolderIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-actions-empty-demo',
  imports: [
    ScButton,
    ScEmpty,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScEmptyDescription,
    ScEmptyContent,
    SiFolderIcon,
  ],
  template: \`
    <div sc-empty class="border">
      <div sc-empty-header>
        <div sc-empty-media variant="icon">
          <svg si-folder-icon></svg>
        </div>
        <div sc-empty-title>No projects yet</div>
        <div sc-empty-description>
          Get started by creating your first project.
        </div>
      </div>
      <div sc-empty-content>
        <button sc-button>Create Project</button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsEmptyDemo {}`;
}
