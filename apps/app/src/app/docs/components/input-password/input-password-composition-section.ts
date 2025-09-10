import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { InputPasswordCompositionDemo } from './input-password-composition-demo';

@Component({
  selector: 'app-input-password-composition-section',
  imports: [PreviewCodeTabs, InputPasswordCompositionDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-input-password-composition-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordCompositionSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<div class="space-y-4">
  <!-- Custom composition example -->
  <div class="space-y-2">
    <label for="custom-password" sc-label>Custom Password Layout</label>
    <div class="relative">
      <input
        id="custom-password"
        sc-input-password-field
        [isVisible]="isVisible()"
        [strengthScore]="strengthScore()"
        (passwordChange)="onPasswordChange($event)"
        aria-describedby="custom-password-description"
      />
      <button
        sc-input-password-toggle
        [isVisible]="isVisible()"
        (visibilityChange)="onVisibilityChange($event)"
      />
    </div>
  </div>

  <!-- Separate strength indicator -->
  <div class="rounded-lg border p-4">
    <div sc-input-password-strength [strengthScore]="strengthScore()">
      <h4 class="text-sm font-semibold mb-2">Password Strength</h4>
      <p
        sc-input-password-description
        id="custom-password-description"
        [strengthScore]="strengthScore()"
      />
      <ul sc-input-password-requirements [requirements]="requirements()" />
    </div>
  </div>
</div>`;
}
