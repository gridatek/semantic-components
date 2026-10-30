import { Service, signal } from '@angular/core';

@Service()
export class CommandPaletteService {
  readonly open = signal(false);

  toggle(): void {
    this.open.update((v) => !v);
  }
}
