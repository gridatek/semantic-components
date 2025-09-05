import { Dialog, DialogConfig, DialogRef } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, TemplateRef, inject } from '@angular/core';

import { Observable } from 'rxjs';

export interface CommandDialogConfig {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
  hasBackdrop?: boolean;
  backdropClass?: string | string[];
  disableClose?: boolean;
  closeOnNavigation?: boolean;
  panelClass?: string | string[];
  data?: any;
}

export interface CommandDialogData {
  title?: string;
  description?: string;
  showCloseButton?: boolean;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class CommandDialog {
  private dialog = inject(Dialog);

  openComponent<T>(component: ComponentType<T>, config?: CommandDialogConfig): DialogRef<T, any> {
    const dialogConfig = this.buildConfig(config);
    return this.dialog.open(component, dialogConfig as any);
  }

  openTemplate<T>(template: TemplateRef<T>, config?: CommandDialogConfig): DialogRef<T, any> {
    const dialogConfig = this.buildConfig(config);
    return this.dialog.open(template, dialogConfig as any);
  }

  private buildConfig(config?: CommandDialogConfig): DialogConfig {
    return {
      width: config?.width,
      height: config?.height,
      maxWidth: config?.maxWidth,
      maxHeight: config?.maxHeight,
      panelClass: [
        'overflow-hidden',
        'p-0',
        'shadow-lg',
        'rounded-md',
        'bg-popover',
        'text-popover-foreground',
        ...(config?.panelClass
          ? Array.isArray(config.panelClass)
            ? config.panelClass
            : [config.panelClass]
          : []),
      ],
      data: {
        title: config?.title || 'Command Palette',
        description: config?.description || 'Search for a command to run...',
        showCloseButton: config?.showCloseButton ?? true,
        ...config?.data,
      },
      hasBackdrop: config?.hasBackdrop ?? true,
      backdropClass: config?.backdropClass || 'cdk-overlay-dark-backdrop',
      closeOnNavigation: config?.closeOnNavigation ?? true,
      disableClose: config?.disableClose ?? false,
    } as DialogConfig;
  }

  closeAll(): void {
    this.dialog.closeAll();
  }

  getOpenDialogs(): readonly DialogRef<any>[] {
    return this.dialog.openDialogs;
  }

  afterOpened(): Observable<DialogRef<any>> {
    return this.dialog.afterOpened;
  }

  afterAllClosed(): Observable<void> {
    return this.dialog.afterAllClosed;
  }
}
