import { _IdGenerator } from '@angular/cdk/a11y';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { SC_FIELD, cn } from '@semantic-components/ui';
import { ScMentionInputState } from './mention-input-state';

@Directive({
  selector: 'textarea[scMentionInputControl]',
  hostDirectives: [CdkOverlayOrigin],
  host: {
    'data-slot': 'control',
    '[attr.id]': 'id()',
    '[attr.aria-describedby]': 'ariaDescribedBy()',
    '[class]': 'class()',
    '[value]': 'state.value()',
    '(input)': 'state.onInput($event)',
    '(keydown)': 'state.onKeydown($event)',
    '(blur)': 'state.onBlur()',
  },
})
export class ScMentionInputControl {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly idInput = input('', { alias: 'id' });

  protected readonly state = inject(ScMentionInputState);
  private readonly field = inject(SC_FIELD, { optional: true });
  private readonly elementRef = inject(ElementRef<HTMLTextAreaElement>);
  private readonly fallbackId = inject(_IdGenerator).getId('sc-mention-input-');
  readonly overlayOrigin = inject(CdkOverlayOrigin);

  readonly id = computed(
    () => this.idInput() || this.field?.id() || this.fallbackId,
  );

  readonly ariaDescribedBy = computed(
    () => this.field?.descriptionIds().join(' ') || null,
  );

  protected readonly class = computed(() =>
    cn(
      'border-input dark:bg-input/30 focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 disabled:bg-input/50 dark:disabled:bg-input/80 rounded-lg border bg-transparent px-2.5 py-2 text-base transition-colors focus-visible:ring-3 aria-invalid:ring-3 md:text-sm placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full outline-none disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    this.state.textareaEl = this.elementRef;
    this.state.overlayOrigin = this.overlayOrigin;
  }
}
