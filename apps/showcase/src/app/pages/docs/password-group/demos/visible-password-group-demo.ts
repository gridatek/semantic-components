import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import {
  ScField,
  ScLabel,
  ScPasswordGroup,
  ScPasswordInput,
  ScPasswordToggle,
} from '@semantic-components/ui';
import { SiEyeIcon, SiEyeOffIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-visible-password-group-demo',
  imports: [
    FormField,
    ScLabel,
    ScField,
    ScPasswordGroup,
    ScPasswordInput,
    ScPasswordToggle,
    SiEyeIcon,
    SiEyeOffIcon,
  ],
  template: `
    <div scField class="w-full max-w-sm">
      <label scLabel>API key</label>
      <div scPasswordGroup #password="scPasswordGroup" [(visible)]="visible">
        <input
          scPasswordInput
          ignorePasswordManagers
          [formField]="settings.key"
        />
        <button scPasswordToggle>
          @if (password.visible()) {
            <svg siEyeOffIcon></svg>
            <span class="sr-only">Hide key</span>
          } @else {
            <svg siEyeIcon></svg>
            <span class="sr-only">Show key</span>
          }
        </button>
      </div>
    </div>
    <p class="text-muted-foreground text-sm">Shown: {{ visible() }}</p>
  `,
  host: { class: 'flex w-full flex-col items-center gap-4' },
  encapsulation: ViewEncapsulation.None,
})
export class VisiblePasswordGroupDemo {
  private readonly visible = signal(true);
  private readonly settings = form(signal({ key: 'sk-4f9c2e7a1b8d' }));
}
