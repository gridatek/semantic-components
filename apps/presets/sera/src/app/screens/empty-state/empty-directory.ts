import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ScBadge,
  ScCard,
  ScCardBody,
  ScEmpty,
  ScEmptyBody,
  ScEmptyDescription,
  ScEmptyHeader,
  ScEmptyMedia,
  ScEmptyTitle,
  ScLink,
  ScSeparator,
} from '@semantic-components/ui';
import { SiFileTextIcon, SiPlusIcon } from '@semantic-icons/lucide-icons';
import { cn } from 'cn';

interface Stage {
  id: string;
  label: string;
  description: string;
  dotClass: string;
}

const STAGES: Stage[] = [
  {
    id: 'drafting',
    label: 'Drafting',
    description:
      'Start the writing process. Articles here are works in progress, visible only to editors and authors.',
    dotClass: 'bg-amber-600',
  },
  {
    id: 'in-revision',
    label: 'In Revision',
    description:
      'Content undergoing editorial review. Track changes and word counts as pieces take shape.',
    dotClass: 'bg-orange-700',
  },
  {
    id: 'final-edit',
    label: 'Final Edit',
    description:
      'The final polish before publication. Ensure all styling and factual checks are complete.',
    dotClass: 'bg-foreground',
  },
];

/** No articles yet: a first one to create, and the stages an article goes through. */
@Component({
  selector: 'app-empty-directory',
  imports: [
    RouterLink,
    ScBadge,
    ScCard,
    ScCardBody,
    ScEmpty,
    ScEmptyBody,
    ScEmptyDescription,
    ScEmptyHeader,
    ScEmptyMedia,
    ScEmptyTitle,
    ScLink,
    ScSeparator,
    SiFileTextIcon,
    SiPlusIcon,
  ],
  template: `
    <div scCard class="py-24">
      <div scCardBody class="flex flex-col items-center gap-10">
        <div scEmpty class="min-h-96">
          <div scEmptyHeader>
            <div
              scEmptyMedia
              variant="icon"
              class="bg-muted/70 text-muted-foreground size-14 rounded-full"
            >
              <svg siFileTextIcon class="size-5"></svg>
            </div>
            <h2
              scEmptyTitle
              class="font-heading text-2xl tracking-normal normal-case"
            >
              A Blank Canvas
            </h2>
            <div scEmptyDescription>
              Your editorial directory is currently empty. Start building your
              publication's next issue by drafting the first piece.
            </div>
          </div>
          <div scEmptyBody>
            <a scLink variant="button" routerLink="/articles/new">
              <svg siPlusIcon data-icon="inline-start"></svg>
              Create first article
            </a>
          </div>
        </div>
        <div scSeparator class="max-w-2xl"></div>
        <div class="grid w-full max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
          @for (stage of stages; track stage.id) {
            <div class="flex flex-col gap-2">
              <span scBadge>
                <span aria-hidden="true" [class]="dot(stage)"></span>
                {{ stage.label }}
              </span>
              <p class="text-muted-foreground text-xs leading-relaxed">
                {{ stage.description }}
              </p>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
})
export class EmptyDirectory {
  protected readonly stages = STAGES;

  protected dot(stage: Stage): string {
    return cn('size-1.5 rounded-full', stage.dotClass);
  }
}
