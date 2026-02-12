import { computed, Directive, input, contentChildren } from '@angular/core';
import { cn } from '../../utils';
import { ResizableDirection } from './resizable.types';
import { ScResizablePanel } from './resizable-panel';
import { ScResizableHandle } from './resizable-handle';

@Directive({
  selector: '[sc-resizable-panel-group]',
  host: {
    'data-slot': 'resizable-panel-group',
    'data-panel-group': '',
    '[class]': 'class()',
    '[attr.data-direction]': 'direction()',
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
    cn('flex size-full data-[direction=vertical]:flex-col', this.classInput()),
  );

  getPanels() {
    return this.panels();
  }

  getHandles() {
    return this.handles();
  }
}
