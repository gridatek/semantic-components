import { Directive, computed, contentChildren, input } from '@angular/core';
import { cn } from '../../utils';
import { ScResizableHandle } from './resizable-handle';
import { ScResizablePanel } from './resizable-panel';
import { ScResizableDirection } from './resizable.types';

@Directive({
  selector: '[scResizablePanelGroup]',
  host: {
    'data-slot': 'resizable-panel-group',
    '[class]': 'class()',
    '[attr.aria-orientation]': 'direction()',
  },
})
export class ScResizablePanelGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<ScResizableDirection>('horizontal');

  private readonly allPanels = contentChildren(ScResizablePanel, {
    descendants: true,
  });
  private readonly allHandles = contentChildren(ScResizableHandle, {
    descendants: true,
  });

  private readonly ownPanels = computed(() =>
    this.allPanels().filter((p) => p.group === this),
  );
  private readonly ownHandles = computed(() =>
    this.allHandles().filter((h) => h.group === this),
  );

  protected readonly class = computed(() =>
    cn(
      'flex h-full w-full overflow-hidden aria-[orientation=vertical]:flex-col',
      this.classInput(),
    ),
  );

  getPanels() {
    return this.ownPanels();
  }

  getHandles() {
    return this.ownHandles();
  }
}
