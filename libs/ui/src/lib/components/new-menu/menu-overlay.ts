import {
  CdkConnectedOverlay,
  ConnectedOverlayPositionChange,
  ConnectedPosition,
} from '@angular/cdk/overlay';
import { Directive, computed, effect, inject, input, output, signal } from '@angular/core';

const MENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'start', originY: 'bottom', overlayX: 'start', overlayY: 'top', offsetY: 4 },
  { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'bottom', offsetY: -4 },
  { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 4 },
  { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -4 },
];

const SUBMENU_POSITIONS: ConnectedPosition[] = [
  { originX: 'end', originY: 'top', overlayX: 'start', overlayY: 'top', offsetX: 6 },
  { originX: 'start', originY: 'top', overlayX: 'end', overlayY: 'top', offsetX: -6 },
  { originX: 'end', originY: 'bottom', overlayX: 'start', overlayY: 'bottom', offsetX: 6 },
  { originX: 'start', originY: 'bottom', overlayX: 'end', overlayY: 'bottom', offsetX: -6 },
];

type OverlayVariant = 'menu' | 'submenu';

@Directive({
  selector: 'ng-template[scAriaMenuOverlay]',
  exportAs: 'scAriaMenuOverlay',
  hostDirectives: [
    {
      directive: CdkConnectedOverlay,
      inputs: [
        'cdkConnectedOverlayOpen: open',
        'cdkConnectedOverlay: origin',
        'cdkConnectedOverlayPositions: positions',
      ],
      outputs: ['positionChange'],
    },
  ],
  host: {
    cdkAttachPopoverAsChild: '',
  },
})
export class ScAriaMenuOverlay {
  readonly variant = input<OverlayVariant>('menu');

  readonly positionChange = output<ConnectedOverlayPositionChange>();

  // Default positions based on variant
  readonly positions = computed(() => {
    return this.variant() === 'submenu' ? SUBMENU_POSITIONS : MENU_POSITIONS;
  });

  // Track current position for animations
  private readonly menuPosition = signal<'top' | 'bottom'>('bottom');
  private readonly submenuPosition = signal<'left' | 'right'>('right');

  // Computed animations based on variant and position
  readonly enterAnimation = computed(() => {
    if (this.variant() === 'submenu') {
      const position = this.submenuPosition();
      const slideDirection =
        position === 'right' ? 'slide-in-from-left-2' : 'slide-in-from-right-2';
      return `animate-in fade-in-0 zoom-in-95 ${slideDirection}`;
    } else {
      const position = this.menuPosition();
      const slideDirection =
        position === 'bottom' ? 'slide-in-from-top-2' : 'slide-in-from-bottom-2';
      return `animate-in fade-in-0 zoom-in-95 ${slideDirection}`;
    }
  });

  readonly leaveAnimation = computed(() => {
    if (this.variant() === 'submenu') {
      const position = this.submenuPosition();
      const slideDirection = position === 'right' ? 'slide-out-to-left-2' : 'slide-out-to-right-2';
      return `animate-out fade-out-0 zoom-out-95 ${slideDirection}`;
    } else {
      const position = this.menuPosition();
      const slideDirection = position === 'bottom' ? 'slide-out-to-top-2' : 'slide-out-to-bottom-2';
      return `animate-out fade-out-0 zoom-out-95 ${slideDirection}`;
    }
  });

  constructor() {
    const overlay = inject(CdkConnectedOverlay, { self: true });

    // Wire up position change handling
    overlay.positionChange.subscribe((event: ConnectedOverlayPositionChange) => {
      if (this.variant() === 'submenu') {
        const position = event.connectionPair.overlayX === 'start' ? 'right' : 'left';
        this.submenuPosition.set(position);
      } else {
        const position = event.connectionPair.overlayY === 'top' ? 'bottom' : 'top';
        this.menuPosition.set(position);
      }
      this.positionChange.emit(event);
    });
  }
}
