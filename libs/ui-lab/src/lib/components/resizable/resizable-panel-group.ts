import { computed, Directive, input, contentChildren } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ResizableDirection } from './resizable.types';
import { ScResizablePanel } from './resizable-panel';
import { ScResizableHandle } from './resizable-handle';

@Directive({
  selector: '[scResizablePanelGroup]',
  host: {
    'data-slot': 'resizable-panel-group',
    'data-panel-group': '',
    '[class]': 'class()',
    '[attr.aria-orientation]': 'direction()',
  },
})
export class ScResizablePanelGroup {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<ResizableDirection>('horizontal');

  private readonly panels = contentChildren(ScResizablePanel, {
    descendants: true,
  });
  private readonly handles = contentChildren(ScResizableHandle, {
    descendants: true,
  });

  protected readonly class = computed(() =>
    cn(
      'flex h-full w-full aria-[orientation=vertical]:flex-col',
      this.classInput(),
    ),
  );

  getPanels() {
    return this.panels();
  }

  getHandles() {
    return this.handles();
  }
}
