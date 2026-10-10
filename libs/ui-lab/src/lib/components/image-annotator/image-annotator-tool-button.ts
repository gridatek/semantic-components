import { ToolbarWidget } from '@angular/aria/toolbar';
import {
  Directive,
  HostAttributeToken,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScImageAnnotatorState } from './image-annotator-state';
import type { AnnotationTool } from './image-annotator-types';

/** Selects a drawing tool. Named after the tool's label unless given an `aria-label`. */
@Directive({
  selector: 'button[scImageAnnotatorToolButton]',
  hostDirectives: [ToolbarWidget],
  host: {
    type: 'button',
    'data-slot': 'image-annotator-tool-button',
    '[attr.aria-label]': 'label()',
    '[attr.aria-pressed]': 'isActive()',
    '[class]': 'class()',
    '(click)': 'select()',
  },
})
export class ScImageAnnotatorToolButton {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly tool = input.required<AnnotationTool>();

  private readonly state = inject(ScImageAnnotatorState);
  private readonly ariaLabel = inject(new HostAttributeToken('aria-label'), {
    optional: true,
  });

  protected readonly label = computed(
    () =>
      this.ariaLabel ??
      this.state.tools().find((t) => t.id === this.tool())?.label ??
      this.tool(),
  );

  protected readonly isActive = computed(
    () => this.state.currentTool() === this.tool(),
  );

  protected readonly class = computed(() =>
    cn(
      'rounded-md p-2 outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50',
      this.isActive() ? 'bg-primary text-primary-foreground' : 'hover:bg-muted',
      this.classInput(),
    ),
  );

  protected select(): void {
    this.state.selectTool(this.tool());
  }
}
