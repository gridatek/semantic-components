import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { ScSheetNextProvider } from './sheet-next-provider';

/**
 * The sheet's panel, in the preset's look: a modal dialog at its side's
 * edge, named by its title and described by its description. It slides in
 * and out from its side (animate.enter / animate.leave; the preset's side
 * classes set the direction); a close straight in it goes in its corner.
 */
@Directive({
  selector: 'div[scSheetNext]',
  host: {
    role: 'dialog',
    'aria-modal': 'true',
    '[id]': 'sheet.id',
    '[attr.aria-labelledby]': 'sheet.titleId()',
    '[attr.aria-describedby]': 'sheet.descriptionId()',
    '[attr.data-side]': 'sheet.physicalSide()',
    '[attr.dir]': 'direction',
    '[attr.lang]': 'lang',
    '[tabindex]': '-1',
    '[class]': 'class()',
    'animate.enter': 'animate-in fade-in-0',
    'animate.leave': 'animate-out fade-out-0',
  },
})
export class ScSheetNext {
  private readonly styles = injectPreset().sheet;
  protected readonly sheet = inject(ScSheetNextProvider);
  // Created as it opens: its provider's direction and language then.
  protected readonly direction = this.sheet.direction();
  protected readonly lang = this.sheet.lang();
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(this.styles.content, this.styles.close, this.classInput()),
  );
}
