import { Directive, computed, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';

@Directive({
  selector: 'div[scAvatarGroupCount]',
  host: {
    '[class]': 'class()',
  },
})
export class ScAvatarGroupCount {
  private readonly styles = injectStyle().avatarGroupCount;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn(this.styles, this.classInput()));
}
