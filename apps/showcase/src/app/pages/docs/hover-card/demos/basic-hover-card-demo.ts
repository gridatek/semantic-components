import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScAvatar,
  ScAvatarFallback,
  ScAvatarImage,
  ScHoverCard,
  ScHoverCardPortal,
  ScHoverCardProvider,
  ScHoverCardTrigger,
} from '@semantic-components/ui';
import { SiCalendarIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-hover-card-demo',
  imports: [
    ScAvatar,
    ScAvatarFallback,
    ScAvatarImage,
    ScHoverCardProvider,
    ScHoverCardPortal,
    ScHoverCard,
    ScHoverCardTrigger,
    SiCalendarIcon,
  ],
  template: `
    <div scHoverCardProvider>
      <a
        scHoverCardTrigger
        href="https://github.com/angular"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm font-medium underline underline-offset-4"
      >
        &#64;angular
      </a>
      <ng-template scHoverCardPortal>
        <div scHoverCard>
          <div class="flex justify-between gap-4">
            <span scAvatar class="size-12">
              <img
                scAvatarImage
                src="https://github.com/angular.png"
                alt="angular"
              />
              <span scAvatarFallback>A</span>
            </span>
            <div class="space-y-1">
              <h4 class="text-sm font-semibold">&#64;angular</h4>
              <p class="text-muted-foreground text-sm">
                The modern web developer's platform.
              </p>
              <div class="flex items-center pt-2">
                <svg
                  siCalendarIcon
                  class="text-muted-foreground mr-2 size-4"
                ></svg>
                <span class="text-muted-foreground text-xs">
                  Joined September 2014
                </span>
              </div>
            </div>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicHoverCardDemo {}
