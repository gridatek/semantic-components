import { CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { ElementRef, computed, signal } from '@angular/core';

export interface DropdownConfig {
  hasBackdrop?: boolean;
  backdropClass?: string;
  panelClass?: string;
  minWidth?: number;
  maxWidth?: number;
  positions?: ConnectedPosition[];
}

export class DropdownBehavior {
  private readonly _isOpen = signal<boolean>(false);
  private readonly _triggerWidth = signal<number>(400);

  readonly isOpen = this._isOpen.asReadonly();
  readonly triggerWidth = this._triggerWidth.asReadonly();

  readonly defaultPositions: ConnectedPosition[] = [
    {
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: 4,
    },
    {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom',
      offsetY: -4,
    },
  ];

  open(): void {
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
  }

  toggle(): void {
    this._isOpen.update((open) => !open);
  }

  updateTriggerWidth(triggerElement: ElementRef<HTMLElement> | undefined): void {
    if (triggerElement?.nativeElement) {
      const width = triggerElement.nativeElement.offsetWidth;
      this._triggerWidth.set(Math.max(400, width));
    }
  }

  handleBackdropClick(): void {
    this.close();
  }

  handleEscapeKey(): void {
    this.close();
  }
}
