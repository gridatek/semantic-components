import { Directive } from '@angular/core';

@Directive({
  selector: '[scResizableHandleIndicator]',
  host: {
    'data-slot': 'resizable-handle-indicator',
    class: 'bg-border z-10 flex h-6 w-1 shrink-0 rounded-lg',
  },
})
export class ScResizableHandleIndicator {}
