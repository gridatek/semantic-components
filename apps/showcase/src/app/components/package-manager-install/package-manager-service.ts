import { Service, signal } from '@angular/core';

@Service()
export class PackageManagerService {
  readonly selected = signal('pnpm');
}
