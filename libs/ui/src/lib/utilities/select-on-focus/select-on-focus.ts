import { FocusMonitor } from '@angular/cdk/a11y';
import { DestroyRef, Directive, ElementRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Directive({
  selector: 'input[scSelectOnFocus]',
})
export class ScSelectOnFocus {
  private readonly focusMonitor = inject(FocusMonitor);
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  constructor() {
    this.focusMonitor
      .monitor(this.elementRef, false)
      .pipe(takeUntilDestroyed())
      .subscribe((origin) => {
        if (origin === 'program' && this.elementRef.nativeElement.value) {
          this.elementRef.nativeElement.select();
        }
      });

    inject(DestroyRef).onDestroy(() => {
      this.focusMonitor.stopMonitoring(this.elementRef);
    });
  }
}
