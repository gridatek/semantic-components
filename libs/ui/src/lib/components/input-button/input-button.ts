import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'button[scInputButton]',
  host: {
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScInputButton {
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: 'outline', size: 'default' }),
      'w-full justify-start gap-2 text-muted-foreground',
      this.classInput(),
    ),
  );
}
