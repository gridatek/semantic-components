import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

/**
 * Around the search: your search icon (an SVG, placed first) and the
 * `scCommandInput`, in shadcn's input group look.
 */
@Component({
  selector: 'div[scCommandInputGroup]',
  template: `
    <div data-slot="input-group" [class]="groupClass">
      <span
        data-slot="input-group-addon"
        data-align="inline-start"
        [class]="addonClass"
      >
        <ng-content select="svg" />
      </span>
      <ng-content />
    </div>
  `,
  host: {
    'data-slot': 'command-input-wrapper',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCommandInputGroup {
  private readonly preset = injectPreset();

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly groupClass = cn(
    this.preset.inputGroup,
    this.preset.command.inputGroup,
  );
  protected readonly addonClass = cn(
    this.preset.inputGroupAddon({ align: 'inline-start' }),
    this.preset.command.inputIcon,
  );

  protected readonly class = computed(() =>
    cn(this.preset.command.inputWrapper, this.classInput()),
  );
}
