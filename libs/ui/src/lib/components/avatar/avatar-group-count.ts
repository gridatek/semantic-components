import { Directive, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scAvatarGroupCount]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAvatarGroupCount {
  private readonly styles = injectPreset().avatarGroupCount;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.styles, this.classInput()));
}
