import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';

@Directive({
  selector: 'div[scMessageGroup]',
  host: {
    'data-slot': 'message-group',
    '[class]': 'class()',
  },
})
export class ScMessageGroup {
  private readonly styles = injectPreset().message;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.group, this.classInput()),
  );
}
