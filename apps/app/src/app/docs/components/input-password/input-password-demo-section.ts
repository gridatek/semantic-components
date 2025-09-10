import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { InputPasswordDemo } from './input-password-demo';

@Component({
  selector: 'app-input-password-demo-section',
  imports: [PreviewCodeTabs, InputPasswordDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-input-password-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordDemoSection {
  readonly title = input<string>('');

  readonly level = input<'2' | '3'>('2');

  protected readonly code = `<div sc-input-password class="space-y-2">
  <label for="password-field" sc-label>Password</label>
  <div class="relative">
    <input
      id="password-field"
      sc-input-password-field
      [isVisible]="isVisible()"
      [strengthScore]="strengthScore()"
      (passwordChange)="onPasswordChange($event)"
      aria-describedby="password-description"
    />
    <button
      sc-input-password-toggle
      [isVisible]="isVisible()"
      (visibilityChange)="onVisibilityChange($event)"
    />
  </div>

  <div sc-input-password-strength [strengthScore]="strengthScore()">
    <p
      sc-input-password-description
      id="password-description"
      [strengthScore]="strengthScore()"
    />
    <ul sc-input-password-requirements [requirements]="requirements()" />
  </div>
</div>`;
}
