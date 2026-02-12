import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { VariantsLanguageSwitcherDemo } from './variants-language-switcher-demo';

@Component({
  selector: 'app-variants-language-switcher-demo-container',
  imports: [DemoContainer, VariantsLanguageSwitcherDemo],
  template: `
    <app-demo-container title="Variants" [code]="code">
      <app-variants-language-switcher-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsLanguageSwitcherDemoContainer {
  readonly code = `import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageToggle } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-variants-language-switcher-demo',
  imports: [ScLanguageToggle],
  template: \`
    <div class="flex items-center gap-4">
      <div class="flex flex-col items-center gap-2">
        <button sc-language-toggle variant="default"></button>
        <span class="text-xs text-muted-foreground">Default</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-language-toggle variant="outline"></button>
        <span class="text-xs text-muted-foreground">Outline</span>
      </div>
      <div class="flex flex-col items-center gap-2">
        <button sc-language-toggle variant="ghost"></button>
        <span class="text-xs text-muted-foreground">Ghost</span>
      </div>
    </div>
  \`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VariantsLanguageSwitcherDemo {}`;
}
