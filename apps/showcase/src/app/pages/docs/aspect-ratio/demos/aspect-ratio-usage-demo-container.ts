import { Component, ViewEncapsulation } from '@angular/core';
import { UsageCode } from '../../../../components/usage-code/usage-code';
import { AspectRatioUsageDemo } from './aspect-ratio-usage-demo';

@Component({
  selector: 'app-aspect-ratio-usage-demo-container',
  imports: [UsageCode, AspectRatioUsageDemo],
  template: `
    <app-usage-code [code]="code">
      <ng-template><app-aspect-ratio-usage-demo /></ng-template>
    </app-usage-code>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class AspectRatioUsageDemoContainer {
  readonly code = `import { NgOptimizedImage } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAspectRatio, ScFrame } from '@semantic-components/ui';

@Component({
  selector: 'app-aspect-ratio-usage-demo',
  imports: [NgOptimizedImage, ScAspectRatio, ScFrame],
  template: \`
    <div scAspectRatio scFrame [ratio]="16 / 9" class="w-full max-w-sm">
      <img
        ngSrc="/images/gallery/forest.jpg"
        fill
        priority
        alt="A forest path"
        class="object-cover"
      />
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class AspectRatioUsageDemo {}`;
}
