import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { DownloadProgressDemo } from './download-progress-demo';

@Component({
  selector: 'app-download-progress-demo-container',
  imports: [DemoContainer, DownloadProgressDemo],
  template: `
    <app-demo-container
      title="Download"
      demoUrl="/demos/progress/download-progress-demo"
      [code]="code"
    >
      <app-download-progress-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class DownloadProgressDemoContainer {
  readonly code = `import { PercentPipe } from '@angular/common';
import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import {
  ScButton,
  ScProgress,
  ScProgressCircle,
  ScProgressValueText,
} from '@semantic-components/ui';

@Component({
  selector: 'app-download-progress-demo',
  imports: [
    PercentPipe,
    ScButton,
    ScProgress,
    ScProgressCircle,
    ScProgressValueText,
  ],
  template: \`
    <div class="flex items-center gap-4">
      <div
        scProgress
        [value]="received()"
        aria-label="Downloading report.pdf"
        class="size-20"
      >
        <svg scProgressCircle [spin]="downloading()"></svg>
        <span scProgressValueText>{{ received() / 100 | percent }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-sm font-medium">report.pdf</span>
        <button
          scButton
          size="sm"
          [disabled]="downloading()"
          (click)="download()"
        >
          {{ received() === 100 ? 'Download again' : 'Download' }}
        </button>
      </div>
    </div>
  \`,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class DownloadProgressDemo {
  private timer: ReturnType<typeof setInterval> | undefined;

  readonly received = signal(0);
  readonly downloading = signal(false);

  constructor() {
    inject(DestroyRef).onDestroy(() => clearInterval(this.timer));
  }

  /** A download of chunks of uneven size, until all of it is here. */
  download(): void {
    this.received.set(0);
    this.downloading.set(true);
    this.timer = setInterval(() => {
      const next = Math.min(
        100,
        this.received() + 4 + Math.round(Math.random() * 8),
      );
      this.received.set(next);
      if (next === 100) {
        clearInterval(this.timer);
        this.downloading.set(false);
      }
    }, 250);
  }
}`;
}
