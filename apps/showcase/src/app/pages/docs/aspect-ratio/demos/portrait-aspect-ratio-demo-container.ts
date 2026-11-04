import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { PortraitAspectRatioDemo } from './portrait-aspect-ratio-demo';

@Component({
  selector: 'app-portrait-aspect-ratio-demo-container',
  imports: [DemoContainer, PortraitAspectRatioDemo],
  template: `
    <app-demo-container
      title="Portrait"
      demoUrl="/demos/aspect-ratio/portrait-aspect-ratio-demo"
      [code]="code"
    >
      <app-portrait-aspect-ratio-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class PortraitAspectRatioDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio } from '@semantic-components/ui';

/** Taller than wide: 9 / 16. */
@Component({
  selector: 'app-portrait-aspect-ratio-demo',
  imports: [NgOptimizedImage, ScAspectRatio],
  template: \`
    <div
      scAspectRatio
      [ratio]="9 / 16"
      class="bg-muted w-full max-w-40 rounded-lg"
    >
      <img
        ngSrc="/images/gallery/gorge.jpg"
        fill
        priority
        alt="A narrow gorge"
        class="rounded-lg object-cover"
      />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class PortraitAspectRatioDemo {}`;
}
