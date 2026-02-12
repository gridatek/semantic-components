import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ScProgress } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-basic-progress-demo',
  imports: [ScProgress],
  template: `
    <div class="space-y-2">
      <div sc-progress [value]="progress()" class="w-[60%]"></div>
      <p class="text-sm text-muted-foreground">{{ progress() }}% complete</p>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicProgressDemo implements OnInit, OnDestroy {
  readonly progress = signal(13);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.progress.update((prev) => {
        if (prev >= 100) return 13;
        return prev + 1;
      });
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
