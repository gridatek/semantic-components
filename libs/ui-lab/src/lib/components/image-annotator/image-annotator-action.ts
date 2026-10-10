import { ToolbarWidget } from '@angular/aria/toolbar';
import {
  Directive,
  HostAttributeToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { bindInput, cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';

export type ScImageAnnotatorActionType = 'undo' | 'redo' | 'clear' | 'download';

const LABELS: Record<ScImageAnnotatorActionType, string> = {
  undo: 'Undo',
  redo: 'Redo',
  clear: 'Clear all',
  download: 'Download',
};

/**
 * Runs an annotator action. Disabled when there is nothing to do (it stays
 * focusable in the toolbar, `aria-disabled`). Named after the action unless
 * given an `aria-label`.
 */
@Directive({
  selector: 'button[scImageAnnotatorAction]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    'data-slot': 'image-annotator-action',
    '[attr.aria-label]': 'label()',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScImageAnnotatorAction {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly action = input.required<ScImageAnnotatorActionType>();

  private readonly state = inject(ScImageAnnotatorState);
  private readonly widget = inject(ToolbarWidget);
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });

  protected readonly label = computed(
    () => this.ariaLabel ?? LABELS[this.action()],
  );

  protected readonly isDisabled = computed(() => {
    switch (this.action()) {
      case 'undo':
        return !this.state.canUndo();
      case 'redo':
        return !this.state.canRedo();
      case 'clear':
        return this.state.annotations().length === 0;
      case 'download':
        return !this.state.imageLoaded();
    }
  });

  protected readonly class = computed(() =>
    cn(
      'hover:bg-muted rounded-md p-2 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    bindInput(this.widget.disabled, this.isDisabled);
  }

  protected onClick(): void {
    if (this.isDisabled()) return;
    switch (this.action()) {
      case 'undo':
        this.state.undo();
        break;
      case 'redo':
        this.state.redo();
        break;
      case 'clear':
        this.state.clearAll();
        break;
      case 'download':
        this.state.download();
        break;
    }
  }
}
