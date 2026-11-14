import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: '[scFieldContentWrapper]',
  host: {
    'data-slot': 'field-content-wrapper',
    '[class]': 'class()',
  },
})
export class ScFieldContentWrapper {
  private readonly styles = injectPreset().field;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.contentWrapper, this.classInput()),
  );
}
