import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { SizesLanguageSwitcherDemo } from './sizes-language-switcher-demo';

@Component({
  selector: 'app-sizes-language-switcher-demo-container',
  imports: [DemoContainer, SizesLanguageSwitcherDemo],
  template: `
    <app-demo-container title="Sizes" [code]="code">
      <app-sizes-language-switcher-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesLanguageSwitcherDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-sizes-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: \`
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button sc-language-toggle variant="outline" size="sm"></button>
        <span class="text-xs text-muted-foreground">Small</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-language-toggle variant="outline" size="default"></button>
        <span class="text-xs text-muted-foreground">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-language-toggle variant="outline" size="lg"></button>
        <span class="text-xs text-muted-foreground">Large</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button
          sc-language-toggle
          variant="outline"
          size="icon"
          [iconOnly]="true"
        ></button>
        <span class="text-xs text-muted-foreground">Icon</span>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SizesLanguageSwitcherDemo {}`;
}
