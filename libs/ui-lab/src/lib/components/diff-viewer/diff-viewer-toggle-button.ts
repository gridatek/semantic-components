import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { DiffViewMode, SC_DIFF_VIEWER } from './diff-viewer';

@Directive({
  selector: 'button[scDiffViewerToggleButton]',
  host: {
    'data-slot': 'diff-viewer-toggle-button',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'onClick()',
  },
})
export class ScDiffViewerToggleButton {
  private readonly diffViewer = inject(SC_DIFF_VIEWER);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly mode = input.required<DiffViewMode>();

  private readonly isActive = computed(
    () => this.diffViewer.viewMode() === this.mode(),
  );

  protected readonly class = computed(() =>
    cn(
      'px-3 py-1 text-xs transition-colors',
      this.isActive()
        ? 'bg-primary text-primary-foreground'
        : 'bg-background hover:bg-muted',
      this.classInput(),
    ),
  );

  protected onClick(): void {
    this.diffViewer.viewMode.set(this.mode());
  }
}
