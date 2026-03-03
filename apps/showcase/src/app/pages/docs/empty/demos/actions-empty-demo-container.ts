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
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
} from '@semantic-components/ui';
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
    ScEmptyBody,
    SiFolderIcon,
  ],
  template: \`
    <div scEmpty class="border">
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon">
          <svg siFolderIcon></svg>
        </div>
        <div scEmptyTitle>No projects yet</div>
        <div scEmptyDescription>
          Get started by creating your first project.
        </div>
      </div>
      <div scEmptyBody>
        <button scButton>Create Project</button>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsEmptyDemo {}`;
}
