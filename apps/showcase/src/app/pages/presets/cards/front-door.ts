import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScBadge,
  ScCard,
  ScCardAction,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScFrame,
} from '@semantic-components/ui';
import { SiLockIcon } from '@semantic-icons/lucide-icons';

/** A smart lock: its state, and its camera's (striped) feed. */
@Component({
  selector: 'app-preview-front-door',
  imports: [
    ScFrame,
    ScBadge,
    ScCard,
    ScCardAction,
    ScCardContent,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    SiLockIcon,
  ],
  template: `
    <div scCard>
      <div scCardHeader>
        <h2 scCardTitle>Front Door</h2>
        <p scCardDescription>Smart Lock Pro</p>
        <div scCardAction>
          <div class="text-muted-foreground flex items-center gap-1.5 text-sm">
            Locked
            <svg siLockIcon class="size-4"></svg>
          </div>
        </div>
      </div>
      <div scCardContent>
        <div
          scFrame
          class="bg-muted relative flex aspect-video items-center justify-center overflow-hidden bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,var(--border)_10px,var(--border)_11px)]"
        >
          <span scBadge variant="destructive" class="absolute end-2 top-2">
            Live
          </span>
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewFrontDoor {}
