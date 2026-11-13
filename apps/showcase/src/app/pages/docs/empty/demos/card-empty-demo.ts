import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardBody,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScLink,
} from '@semantic-components/ui';
import { SiArrowUpRightIcon, SiFolderIcon } from '@semantic-icons/lucide-icons';

/** In a Card: the empty state fills it. */
@Component({
  selector: 'app-card-empty-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardBody,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScLink,
    SiFolderIcon,
    SiArrowUpRightIcon,
  ],
  template: `
    <div scCard class="w-full max-w-md">
      <div scCardBody>
        <div scEmpty>
          <div scEmptyHeader>
            <div scEmptyMedia variant="icon"><svg siFolderIcon></svg></div>
            <h2 scEmptyTitle>No projects yet</h2>
            <div scEmptyDescription>
              You haven&apos;t created any projects yet. Get started by creating
              your first project.
            </div>
          </div>
          <div scEmptyBody>
            <div class="flex gap-2">
              <a scLink variant="button" href="#card">Create project</a>
              <button scButton variant="outline">Import project</button>
            </div>
            <a scLink variant="link" href="#card" class="text-muted-foreground">
              Learn more <svg siArrowUpRightIcon></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class CardEmptyDemo {}
