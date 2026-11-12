import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

/**
 * A key, in the preset's look — in a button, an input group or a tooltip it
 * takes their colours. Read as text: where a symbol alone is unclear, write
 * its name too (⌘ with sr-only "Command").
 */
@Directive({
  selector: 'kbd[scKbd]',
  host: {
    'data-slot': 'kbd',
    '[class]': 'class()',
  },
})
export class ScKbd {
  private readonly styles = injectPreset().kbd;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.styles, this.classInput()));
}
