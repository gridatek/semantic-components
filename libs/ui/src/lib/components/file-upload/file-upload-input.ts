import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScFileUpload } from './file-upload';

/**
 * The native file picker, written once in `scFileUpload`: hidden, and
 * not a Tab stop — the trigger and the dropzone open it.
 */
@Directive({
  selector: 'input[scFileUploadInput]',
  host: {
    'data-slot': 'file-upload-input',
    type: 'file',
    hidden: '',
    tabindex: '-1',
    'aria-hidden': 'true',
    '[multiple]': 'upload.multiple()',
    '[attr.accept]': 'upload.accept() || null',
    '[disabled]': 'upload.disabled()',
    '[class]': 'class()',
    '(change)': 'onChange()',
    '(cancel)': 'upload.touch.emit()',
  },
})
export class ScFileUploadInput {
  protected readonly upload = inject(ScFileUpload);
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    this.upload.ɵregister(this.element);
    inject(DestroyRef).onDestroy(() => this.upload.ɵregister(null));
  }

  protected onChange(): void {
    this.upload.add(this.element.files ?? []);
    // Cleared: the same file can be picked again.
    this.element.value = '';
    this.upload.touch.emit();
  }
}
