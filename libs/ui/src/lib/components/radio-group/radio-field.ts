import { _IdGenerator } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '../../utils';
import { SC_FIELD } from '../field/field';

@Component({
  selector: 'div[scRadioField], label[scRadioField]',
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
  readonly descriptionIds = signal<string[]>([]);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly role = computed(() => {
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });

  protected readonly class = computed(() =>
    cn(
      'grid grid-cols-[1rem_1fr] items-center gap-x-2 gap-y-1 text-sm font-medium has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50',
      '*:data-[slot=radio]:col-start-1 *:data-[slot=radio]:row-start-1',
      '*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1',
      '*:data-[slot=field-description]:col-start-2 *:data-[slot=field-description]:row-start-2',
      'has-[>[data-slot=field-description]]:*:data-[slot=label]:font-medium',
      this.classInput(),
    ),
  );
}
