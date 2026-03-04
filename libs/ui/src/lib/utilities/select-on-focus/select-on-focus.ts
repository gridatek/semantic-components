import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export type ScFocusOrigin = NonNullable<FocusOrigin>;

@Directive({
  selector: 'input[scSelectOnFocus]',
})
export class ScSelectOnFocus {
  readonly origins = input<ScFocusOrigin[]>(['program'], {
    alias: 'scSelectOnFocus',
  });

  private readonly focusMonitor = inject(FocusMonitor);
  private readonly elementRef = inject(ElementRef<HTMLInputElement>);

  constructor() {
    this.focusMonitor
      .monitor(this.elementRef, false)
      .pipe(takeUntilDestroyed())
      .subscribe((origin) => {
        if (
          origin &&
          this.origins().includes(origin) &&
          this.elementRef.nativeElement.value
        ) {
          this.elementRef.nativeElement.select();
        }
      });

    inject(DestroyRef).onDestroy(() => {
      this.focusMonitor.stopMonitoring(this.elementRef);
    });
  }
}
