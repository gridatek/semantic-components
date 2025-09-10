import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

import { PreviewCodeTabs } from '../../../components/preview-code-tabs/preview-code-tabs';
import { InputPasswordModernDemo } from './input-password-modern-demo';

@Component({
  selector: 'app-input-password-modern-section',
  imports: [PreviewCodeTabs, InputPasswordModernDemo],
  template: `
    <app-preview-code-tabs [code]="code" [title]="title()" [level]="level()">
      <app-input-password-modern-demo />
    </app-preview-code-tabs>
  `,
  styles: ``,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputPasswordModernSection {
  readonly title = input<string>('');
  readonly level = input<'2' | '3'>('2');

  protected readonly code = `// Modern password input with full form integration
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { 
  ScInputPasswordField, 
  ScInputPasswordToggle,
  ScInputPasswordStrength,
  ScInputPasswordDescription,
  ScInputPasswordRequirements,
  PasswordValidationService 
} from '@semantic-components/ui';

@Component({
  providers: [PasswordValidationService], // Scoped validation service
  template: \`
    <form [formGroup]="form">
      <div class="space-y-2">
        <label for="password" sc-label [required]="true">Password</label>
        <div class="relative">
          <input
            id="password"
            sc-input-password-field
            formControlName="password"
            [isVisible]="isVisible()"
            [required]="true"
            ariaDescribedby="password-description"
          />
          <button
            sc-input-password-toggle
            [isVisible]="isVisible()"
            [controlsId]="'password'"
            (visibilityChange)="isVisible.set($event)"
          />
        </div>
      </div>

      <!-- Real-time validation feedback -->
      <div sc-input-password-strength [animate]="true" [size]="'md'">
        <p id="password-description" sc-input-password-description />
        <ul sc-input-password-requirements [size]="'md'" />
      </div>

      <button sc-button [disabled]="!form.valid">Submit</button>
    </form>
  \`
})
export class PasswordFormComponent {
  private readonly fb = inject(FormBuilder);
  
  readonly isVisible = signal(false);
  readonly form = this.fb.group({
    password: ['', [Validators.required]]
  });
}`;
}
