import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  ScMarquee,
  ScMarqueeClone,
  ScMarqueeItem,
} from '@semantic-components/ui-lab';

@Component({
  selector: 'app-vertical-marquee-demo',
  imports: [ScMarquee, ScMarqueeClone, ScMarqueeItem],
  template: `
    <div class="h-48 overflow-hidden rounded-lg border">
      <sc-marquee direction="vertical" [duration]="20" [gap]="12">
        @for (notification of notifications; track notification.id) {
          <div
            scMarqueeItem
            class="bg-background mx-2 rounded-lg border p-3 shadow-sm"
          >
            <div class="flex items-start gap-2">
              <span class="text-lg">{{ notification.icon }}</span>
              <div>
                <p class="text-sm font-medium">{{ notification.title }}</p>
                <p class="text-muted-foreground text-xs">
                  {{ notification.time }}
                </p>
              </div>
            </div>
          </div>
        }
        <ng-container scMarqueeClone>
          @for (notification of notifications; track notification.id) {
            <div
              scMarqueeItem
              class="bg-background mx-2 rounded-lg border p-3 shadow-sm"
            >
              <div class="flex items-start gap-2">
                <span class="text-lg">{{ notification.icon }}</span>
                <div>
                  <p class="text-sm font-medium">
                    {{ notification.title }}
                  </p>
                  <p class="text-muted-foreground text-xs">
                    {{ notification.time }}
                  </p>
                </div>
              </div>
            </div>
          }
        </ng-container>
      </sc-marquee>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalMarqueeDemo {
  readonly notifications = [
    { id: 1, icon: '📧', title: 'New message from John', time: '2 min ago' },
    { id: 2, icon: '🎉', title: 'Project completed!', time: '5 min ago' },
    { id: 3, icon: '📦', title: 'Package delivered', time: '10 min ago' },
    { id: 4, icon: '🔔', title: 'Meeting reminder', time: '15 min ago' },
    { id: 5, icon: '⭐', title: 'New review received', time: '20 min ago' },
  ];
}
