import { Component, ViewEncapsulation } from '@angular/core';
import {
  ScCard,
  ScCardBody,
  ScCardHeader,
  ScCardTitle,
  ScItem,
  ScItemActions,
  ScItemBody,
  ScItemGroup,
  ScItemMedia,
  ScItemTitle,
} from '@semantic-components/ui';

const CIRCUMFERENCE = 2 * Math.PI * 42.5;

/** Usage this cycle: each meter a link, its share drawn as a ring. */
@Component({
  selector: 'app-preview-usage-card',
  imports: [
    ScCard,
    ScCardBody,
    ScCardHeader,
    ScCardTitle,
    ScItem,
    ScItemActions,
    ScItemBody,
    ScItemGroup,
    ScItemMedia,
    ScItemTitle,
  ],
  template: `
    <div scCard class="w-full gap-4">
      <div scCardHeader>
        <h2 scCardTitle class="px-1 text-sm">5 days remaining in cycle</h2>
      </div>
      <div scCardBody>
        <div scItemGroup class="gap-0" role="list">
          @for (item of items; track item.name) {
            <div role="listitem">
              <a
                scItem
                href="#"
                size="xs"
                class="px-0 group-hover/item-group:bg-transparent"
              >
                <div scItemMedia variant="icon" class="text-primary">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    height="16"
                    width="16"
                    viewBox="0 0 100 100"
                    class="-rotate-90"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="42.5"
                      stroke-width="12"
                      stroke-linecap="round"
                      stroke="currentColor"
                      class="opacity-20"
                      [attr.stroke-dasharray]="
                        circumference + ' ' + circumference
                      "
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="42.5"
                      stroke-width="12"
                      stroke-linecap="round"
                      stroke="currentColor"
                      class="transition-all duration-300"
                      [attr.stroke-dasharray]="
                        (item.percentage / 100) * circumference +
                        ' ' +
                        circumference
                      "
                    />
                  </svg>
                </div>
                <div scItemBody class="inline-block truncate">
                  <div scItemTitle class="inline">{{ item.name }}</div>
                </div>
                <div scItemActions>
                  <span
                    class="text-muted-foreground font-mono text-xs font-medium tabular-nums"
                  >
                    {{ item.value }}
                  </span>
                </div>
              </a>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PreviewUsageCard {
  protected readonly circumference = CIRCUMFERENCE;
  protected readonly items = [
    { name: 'Edge Requests', value: '$1.83K', percentage: 67.34 },
    { name: 'Fast Data Transfer', value: '$952.51', percentage: 52.18 },
    { name: 'Monitoring data points', value: '$901.20', percentage: 89.42 },
    { name: 'Web Analytics Events', value: '$603.71', percentage: 45.67 },
    { name: 'ISR Writes', value: '524.52K / 2M', percentage: 26.23 },
    {
      name: 'Function Duration',
      value: '5.11 GB Hrs / 1K GB Hrs',
      percentage: 5.11,
    },
  ];
}
