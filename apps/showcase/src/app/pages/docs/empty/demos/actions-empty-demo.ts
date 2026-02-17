import {
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
  ScEmptyBody,
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
  template: `
    <div scEmpty class="border">
      <div scEmptyHeader>
        <div scEmptyMedia variant="icon">
          <svg si-folder-icon></svg>
        </div>
        <div scEmptyTitle>No projects yet</div>
        <div scEmptyDescription>
          Get started by creating your first project.
        </div>
      </div>
      <div scEmptyContent>
        <button scButton>Create Project</button>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionsEmptyDemo {}
