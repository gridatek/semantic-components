import { Component, ViewEncapsulation, signal } from '@angular/core';
import { ScIntersectionObserver } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-intersection-observer-demo',
  imports: [ScIntersectionObserver],
  template: `
    <div class="w-full max-w-md space-y-4">
      <div class="bg-muted rounded-md p-4 text-sm">
        The target is
        <span class="font-medium">
          {{ target.isIntersecting() ? 'visible' : 'hidden' }}
        </span>
        ({{ ratio() }}% in view)
      </div>

      <div
        #scroller
        role="region"
        aria-label="Scrollable area"
        tabindex="0"
        class="focus-visible:ring-ring/50 h-64 overflow-y-auto rounded-md border outline-none focus-visible:ring-[3px]"
      >
        <div
          class="text-muted-foreground flex h-72 items-center justify-center text-sm"
        >
          Scroll down
        </div>
        <div
          scIntersectionObserver
          #target="scIntersectionObserver"
          [root]="scroller"
          [threshold]="thresholds"
          (intersectionObserver)="onIntersect($event)"
          class="bg-muted data-[intersecting=true]:bg-primary data-[intersecting=true]:text-primary-foreground mx-4 flex h-32 items-center justify-center rounded-md text-sm font-medium transition-colors"
        >
          Target
        </div>
        <div class="h-72"></div>
      </div>
    </div>
  `,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicIntersectionObserverDemo {
  readonly thresholds = [0, 0.25, 0.5, 0.75, 1];

  readonly ratio = signal(0);

  onIntersect(entry: IntersectionObserverEntry): void {
    this.ratio.set(Math.round(entry.intersectionRatio * 100));
  }
}
