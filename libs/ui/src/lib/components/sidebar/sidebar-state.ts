import { Injectable, computed, signal } from '@angular/core';

@Injectable()
export class ScSidebarState {
  // Signals for reactive state
  readonly open = signal(true);
  readonly openMobile = signal(false);
  readonly isMobile = signal(false);

  // Computed state
  readonly state = computed(() => (this.open() ? 'expanded' : 'collapsed'));

  // Methods
  toggle(): void {
    this.open.update((value) => !value);
  }

  toggleMobile(): void {
    this.openMobile.update((value) => !value);
  }

  setOpen(value: boolean): void {
    this.open.set(value);
  }

  setOpenMobile(value: boolean): void {
    this.openMobile.set(value);
  }

  setIsMobile(value: boolean): void {
    this.isMobile.set(value);
  }
}
