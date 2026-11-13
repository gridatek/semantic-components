import { Component, ViewEncapsulation, inject } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScFrame,
  ScStorage,
} from '@semantic-components/ui';
import { presetFrom } from '../../../presets';

/** The preset at a glance: its name and font, then the theme's colors. */
@Component({
  selector: 'app-preview-style-overview',
  imports: [ScCard, ScCardBody, ScFrame],
  template: `
    <div scCard>
      <div scCardBody class="flex flex-col gap-6">
        <div class="flex flex-col gap-1">
          <h2 class="font-heading text-2xl font-medium capitalize">
            {{ preset }} - Geist
          </h2>
          <p class="text-muted-foreground line-clamp-2 text-base">
            Designers love packing quirky glyphs into test phrases. This is a
            preview of the typography styles.
          </p>
        </div>
        <ul class="grid grid-cols-4 gap-3">
          @for (variable of variables; track variable) {
            <li class="flex min-w-0 flex-col items-center gap-2">
              <div
                scFrame
                size="sm"
                class="aspect-square w-full bg-(--color)"
                aria-hidden="true"
                [style.--color]="'var(' + variable + ')'"
              ></div>
              <span
                class="hidden max-w-full truncate font-mono text-[0.60rem] md:block"
                >{{ variable }}</span
              >
            </li>
          }
        </ul>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewStyleOverview {
  protected readonly preset = presetFrom(inject(ScStorage));
  protected readonly variables = [
    '--background',
    '--foreground',
    '--primary',
    '--secondary',
    '--muted',
    '--accent',
    '--border',
    '--chart-1',
    '--chart-2',
    '--chart-3',
    '--chart-4',
    '--chart-5',
  ];
}
