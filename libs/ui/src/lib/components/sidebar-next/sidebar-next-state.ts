import { Service, computed, signal } from '@angular/core';

/** A sidebar's state, shared by its parts (one per `scSidebarNextProvider`). */
@Service({ autoProvided: false })
export class ScSidebarNextState {
  /** Open on wide screens (beside the page). */
  readonly open = signal(true);
  /** Open on phones (a sheet over the page). */
  readonly openMobile = signal(false);
  readonly isMobile = signal(false);
  /** The sidebar's id, for its trigger's `aria-controls`. */
  readonly sidebarId = signal<string | null>(null);

  readonly state = computed(() => (this.open() ? 'expanded' : 'collapsed'));
  /** Open as shown now: the sheet on phones, the sidebar otherwise. */
  readonly expanded = computed(() =>
    this.isMobile() ? this.openMobile() : this.open(),
  );

  /** Opens or closes what is shown: the sheet on phones, the sidebar otherwise. */
  toggle(): void {
    if (this.isMobile()) this.openMobile.update((open) => !open);
    else this.open.update((open) => !open);
  }
}
