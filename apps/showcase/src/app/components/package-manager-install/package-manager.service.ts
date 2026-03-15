import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PackageManagerService {
  readonly selected = signal('pnpm');
}
