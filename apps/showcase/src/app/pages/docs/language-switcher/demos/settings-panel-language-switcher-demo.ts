import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ScLanguageSelect } from '@semantic-components/ui-lab';

@Component({
  selector: 'app-settings-panel-language-switcher-demo',
  imports: [ScLanguageSelect],
  template: `
    <div class="w-[400px] rounded-lg border p-4">
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <div class="space-y-0.5">
            <label class="text-sm font-medium">Language</label>
            <p class="text-sm text-muted-foreground">
              Select your preferred language
            </p>
          </div>
          <sc-language-select class="w-32"></sc-language-select>
        </div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPanelLanguageSwitcherDemo {}
