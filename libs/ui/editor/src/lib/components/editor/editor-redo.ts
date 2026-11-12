import { ToolbarWidget } from '@angular/aria/toolbar';
import { Directive, computed, inject, input } from '@angular/core';
import { bindInput, injectPreset } from '@semantic-components/ui';
import { cn } from 'cn';
import { SC_EDITOR } from './editor';

/** Redoes the last undone change (disabled when there is none). Write its icon and name it (`aria-label` or visually hidden text). */
@Directive({
  selector: 'button[scEditorRedo]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    '[class]': 'class()',
    '[disabled]': 'disabled()',
    '(click)': 'onClick()',
  },
})
export class ScEditorRedo {
  private readonly toggleStyles = injectPreset().toggle;
  protected readonly editor = inject(SC_EDITOR);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly disabledInput = input(false, { alias: 'disabled' });

  protected readonly class = computed(() =>
    cn(
      this.toggleStyles({ variant: 'default', size: 'default' }),
      this.classInput(),
    ),
  );

  protected readonly disabled = computed(
    () =>
      this.disabledInput() ||
      !this.editor.editable() ||
      !this.editor.can((chain) => chain.redo()),
  );

  constructor() {
    bindInput(inject(ToolbarWidget).disabled, this.disabled);
  }

  protected onClick(): void {
    this.editor.run((chain) => chain.redo());
  }
}
