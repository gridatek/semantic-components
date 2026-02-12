import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field';

@Component({
  selector: 'div[sc-radio-field], label[sc-radio-field]',
  imports: [],
  providers: [{ provide: SC_FIELD, useExisting: ScRadioField }],
  host: {
    '[attr.role]': 'role()',
    'data-slot': 'radio-field',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScRadioField {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly id = input(inject(_IdGenerator).getId('sc-radio-field-'));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly role = computed(() => {
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });

  protected readonly class = computed(() =>
    cn('relative inline-flex items-start gap-2', this.classInput()),
  );
}
