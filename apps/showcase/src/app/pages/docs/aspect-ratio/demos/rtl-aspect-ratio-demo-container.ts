import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { RtlAspectRatioDemo } from './rtl-aspect-ratio-demo';

@Component({
  selector: 'app-rtl-aspect-ratio-demo-container',
  imports: [DemoContainer, RtlAspectRatioDemo],
  template: `
    <app-demo-container
      title="RTL"
      demoUrl="/demos/aspect-ratio/rtl-aspect-ratio-demo"
      [code]="code"
    >
      <app-rtl-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAspectRatioDemoContainer {
  readonly code = `import { Dir } from '@angular/cdk/bidi';
import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

/** Right to left: the ratio doesn't change; the caption reads from the right. */
@Component({
  selector: 'app-rtl-aspect-ratio-demo',
  imports: [Dir, NgOptimizedImage, ScAspectRatio, ScFrame],
  template: \`
    <figure dir="rtl" lang="ar" class="grid w-full max-w-sm gap-2">
      <div scAspectRatio scFrame [ratio]="16 / 9">
        <img
          ngSrc="/images/gallery/cafe.jpg"
          fill
          priority
          alt="مقهى"
          class="object-cover"
        />
      </div>
      <figcaption class="text-muted-foreground text-sm">
        مقهى صغير في المدينة القديمة.
      </figcaption>
    </figure>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class RtlAspectRatioDemo {}`;
}
