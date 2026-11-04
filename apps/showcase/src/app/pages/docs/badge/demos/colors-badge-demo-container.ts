import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { ColorsBadgeDemo } from './colors-badge-demo';

@Component({
  selector: 'app-colors-badge-demo-container',
  imports: [DemoContainer, ColorsBadgeDemo],
  template: `
    <app-demo-container
      title="Custom Colors"
      demoUrl="/demos/badge/colors-badge-demo"
      [code]="code"
    >
      <app-colors-badge-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class ColorsBadgeDemoContainer {
  readonly code = `import { Component, ViewEncapsulation } from '@angular/core';
import { ScBadge } from '@semantic-components/ui';

/** Your own colors: classes over the preset's (cn: a later class wins). */
@Component({
  selector: 'app-colors-badge-demo',
  imports: [ScBadge],
  template: \`
    <div class="flex flex-wrap justify-center gap-2">
      <span
        scBadge
        class="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
      >
        Blue
      </span>
      <span
        scBadge
        class="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300"
      >
        Green
      </span>
      <span
        scBadge
        class="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300"
      >
        Sky
      </span>
      <span
        scBadge
        class="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300"
      >
        Purple
      </span>
      <span
        scBadge
        class="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300"
      >
        Red
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class ColorsBadgeDemo {}`;
}
