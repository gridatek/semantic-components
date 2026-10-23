import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicToggleLanguageSwitcherDemo } from './basic-toggle-language-switcher-demo';

@Component({
  selector: 'app-basic-toggle-language-switcher-demo-container',
  imports: [DemoContainer, BasicToggleLanguageSwitcherDemo],
  template: `
    <app-demo-container title="Basic Toggle" [code]="code">
      <app-basic-toggle-language-switcher-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicToggleLanguageSwitcherDemoContainer {
  readonly code = `import { Component, ViewEncapsulation, inject } from '@angular/core';
import { ScLanguageService, ScLanguageToggle } from '@semantic-components/ui';
import { SiGlobeIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-basic-toggle-language-switcher-demo',
  imports: [ScLanguageToggle, SiGlobeIcon],
  template: \`
    <div class="flex items-center gap-4">
      <button scLanguageToggle #toggle="scLanguageToggle">
        <svg siGlobeIcon></svg>
        {{ toggle.current().code }}
        <span class="sr-only">Switch to {{ toggle.next().label }}</span>
      </button>
      <span class="text-muted-foreground text-sm">
        Current: {{ languageService.currentLanguage().label }}
      </span>
    </div>
  \`,
  host: { class: 'flex w-full justify-center' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicToggleLanguageSwitcherDemo {
  protected readonly languageService = inject(ScLanguageService);
}`;
}
