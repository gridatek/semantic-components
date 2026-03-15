import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommandPaletteService {
  readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }
}
