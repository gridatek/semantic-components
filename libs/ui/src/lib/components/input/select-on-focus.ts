import { Directive, ElementRef, inject } from '@angular/core';

@Directive({
  selector: 'input[scSelectOnFocus]',
  host: {
    '(focus)': 'onFocus()',
  },
})
export class ScSelectOnFocus {
  private readonly el = inject<ElementRef<HTMLInputElement>>(ElementRef);

  protected onFocus(): void {
    const input = this.el.nativeElement;
    if (input.value.length > 0) {
      input.select();
    }
  }
}
