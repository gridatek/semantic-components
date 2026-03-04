import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'input[scAutoSelect]',
})
export class ScAutoSelect {
  private readonly focusMonitor = inject(FocusMonitor);
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  constructor() {
    const subscription = this.focusMonitor
      .monitor(this.elementRef, false)
      .subscribe((origin: FocusOrigin) => {
        if (origin === 'program' && this.elementRef.nativeElement.value) {
          this.elementRef.nativeElement.select();
        }
      });

    inject(DestroyRef).onDestroy(() => {
      subscription.unsubscribe();
      this.focusMonitor.stopMonitoring(this.elementRef);
    });
  }
}
