import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScButton,
  ScCard,
  ScCardContent,
  ScCardDescription,
  ScCardHeader,
  ScCardTitle,
  ScCollapsibleNext,
  ScCollapsibleNextPanel,
  ScCollapsibleNextTrigger,
  ScInput,
} from '@semantic-components/ui';
import { SiMaximizeIcon, SiMinimizeIcon } from '@semantic-icons/lucide-icons';

/** Two fields shown, two more on demand; the trigger beside them, its icon following the state. */
@Component({
  selector: 'app-settings-collapsible-next-demo',
  imports: [
    ScButton,
    ScCard,
    ScCardContent,
    ScCardDescription,
    ScCardHeader,
    ScCardTitle,
    ScCollapsibleNext,
    ScCollapsibleNextPanel,
    ScCollapsibleNextTrigger,
    ScInput,
    SiMaximizeIcon,
    SiMinimizeIcon,
  ],
  template: `
    <div scCard class="w-full max-w-xs">
      <div scCardHeader>
        <h3 scCardTitle>Radius</h3>
        <p scCardDescription>Set the corner radius of the element.</p>
      </div>
      <div scCardContent>
        <div scCollapsibleNext [(open)]="open" class="flex items-start gap-2">
          <div class="grid w-full grid-cols-2 gap-2">
            <input scInput aria-label="Radius, top start" placeholder="0" />
            <input scInput aria-label="Radius, top end" placeholder="0" />
            <div
              scCollapsibleNextPanel
              class="col-span-full grid grid-cols-subgrid gap-2"
            >
              <input
                scInput
                aria-label="Radius, bottom start"
                placeholder="0"
              />
              <input scInput aria-label="Radius, bottom end" placeholder="0" />
            </div>
          </div>
          <button
            scButton
            scCollapsibleNextTrigger
            variant="outline"
            size="icon"
          >
            @if (open()) {
              <svg siMinimizeIcon></svg>
              <span class="sr-only">Fewer corners</span>
            } @else {
              <svg siMaximizeIcon></svg>
              <span class="sr-only">Each corner</span>
            }
          </button>
        </div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class SettingsCollapsibleNextDemo {
  protected readonly open = signal(false);
}
