import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  input,
  signal,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { ScContextMenuContent } from './context-menu-content';

@Component({
  selector: 'div[sc-context-menu]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'context-menu',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScContextMenu {
  private readonly overlay = inject(Overlay);
  private readonly viewContainerRef = inject(ViewContainerRef);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Whether the context menu is open */
  readonly open = signal<boolean>(false);

  /** Position where the context menu should appear */
  readonly position = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  private overlayRef: OverlayRef | null = null;
  private contentChild = contentChild(ScContextMenuContent);

  protected readonly class = computed(() => cn('relative', this.classInput()));

  openAt(x: number, y: number, template: TemplateRef<unknown>): void {
    this.closeMenu();

    this.position.set({ x, y });

    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo({ x, y })
        .withPositions([
          {
            originX: 'start',
            originY: 'bottom',
            overlayX: 'start',
            overlayY: 'top',
          },
          {
            originX: 'start',
            originY: 'top',
            overlayX: 'start',
            overlayY: 'bottom',
          },
          {
            originX: 'end',
            originY: 'bottom',
            overlayX: 'end',
            overlayY: 'top',
          },
          {
            originX: 'end',
            originY: 'top',
            overlayX: 'end',
            overlayY: 'bottom',
          },
        ]),
      scrollStrategy: this.overlay.scrollStrategies.close(),
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });

    const portal = new TemplatePortal(template, this.viewContainerRef);
    this.overlayRef.attach(portal);
    this.open.set(true);

    this.overlayRef.backdropClick().subscribe(() => this.closeMenu());
    this.overlayRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.closeMenu();
      }
    });
  }

  closeMenu(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
    this.open.set(false);
  }
}
