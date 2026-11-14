import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlScrollAreaNextDemo } from './rtl-scroll-area-next-demo';

@Component({
  selector: 'app-rtl-scroll-area-next-demo-container',
  imports: [DemoContainer, RtlScrollAreaNextDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/scroll-area-next/rtl-scroll-area-next-demo"
      [code]="code"
    >
      <app-rtl-scroll-area-next-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlScrollAreaNextDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import {
  ScFrame,
  ScScrollAreaNext,
  ScScrollAreaNextScrollbar,
  ScScrollAreaNextThumb,
  ScScrollAreaNextViewport,
  ScScrollAreaNextViewportContent,
  ScSeparator,
} from '@semantic-components/ui';

/** In a right-to-left page: the scrollbar at the end — the left. */
@Component({
  selector: 'app-rtl-scroll-area-next-demo',
  imports: [
    Dir,
    ScFrame,
    ScScrollAreaNext,
    ScScrollAreaNextViewportContent,
    ScScrollAreaNextScrollbar,
    ScScrollAreaNextThumb,
    ScScrollAreaNextViewport,
    ScSeparator,
  ],
  template: \`
    <div dir="rtl" lang="ar">
      <div scScrollAreaNext scFrame class="h-72 w-48">
        <div scScrollAreaNextViewport>
          <div scScrollAreaNextViewportContent class="p-4">
            <p class="mb-4 text-sm leading-none font-medium">العلامات</p>
            @for (tag of tags; track tag) {
              <div class="text-sm">{{ tag }}</div>
              <div scSeparator class="my-2"></div>
            }
          </div>
        </div>
        <div scScrollAreaNextScrollbar>
          <div scScrollAreaNextThumb></div>
        </div>
      </div>
    </div>
  \`,
  providers: [{ provide: LOCALE_ID, useValue: 'ar' }],
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlScrollAreaNextDemo {
  protected readonly tags = Array.from(
    { length: 50 },
    (_, i) => \`v1.2.0-beta.\${50 - i}\`,
  );
}`;
}
