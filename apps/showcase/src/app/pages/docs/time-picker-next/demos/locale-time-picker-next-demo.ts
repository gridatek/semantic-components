import { Component, ViewEncapsulation, signal } from '@angular/core';
import {
  ScField,
  ScInputGroup,
  ScInputGroupAddon,
  ScLabel,
  ScPopover,
  ScPopoverPortal,
  ScPopoverProvider,
  ScTimeInput,
  ScTimePickerNext,
  ScTimePickerNextList,
  ScTimePickerNextTrigger,
} from '@semantic-components/ui';
import { SiClockIcon } from '@semantic-icons/lucide-icons';

/** The input’s locale and hour cycle write the list too: here French, 24 hours. */
@Component({
  selector: 'app-locale-time-picker-next-demo',
  imports: [
    ScTimePickerNext,
    ScTimePickerNextTrigger,
    ScTimePickerNextList,
    ScTimeInput,
    ScInputGroup,
    ScInputGroupAddon,
    ScPopoverProvider,
    ScPopoverPortal,
    ScPopover,
    ScField,
    ScLabel,
    SiClockIcon,
  ],
  template: `
    <div scField class="w-44">
      <label scLabel>Heure de départ</label>
      <div scTimePickerNext>
        <div scPopoverProvider [origin]="trigger.overlayOrigin" align="end">
          <div scInputGroup>
            <div scTimeInput locale="fr-FR" [(value)]="time"></div>
            <div scInputGroupAddon align="inline-end">
              <button
                scTimePickerNextTrigger
                #trigger="scTimePickerNextTrigger"
              >
                <svg siClockIcon></svg>
                <span class="sr-only">Choisir une heure</span>
              </button>
            </div>
          </div>
          <ng-template scPopoverPortal>
            <div scPopover class="w-auto p-0" aria-label="Choisir une heure">
              <div scTimePickerNextList aria-label="Heures"></div>
            </div>
          </ng-template>
        </div>
      </div>
    </div>
    <p class="text-muted-foreground text-sm" data-testid="picked">
      {{ time()?.toString() ?? 'No time.' }}
    </p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-3' },
  encapsulation: ViewEncapsulation.None,
})
export class LocaleTimePickerNextDemo {
  readonly time = signal<Temporal.PlainTime | null>(
    Temporal.PlainTime.from('18:30'),
  );
}
