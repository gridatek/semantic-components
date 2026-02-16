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
import { cn } from '@semantic-components/ui';
import { SC_FIELD } from '@semantic-components/ui';

@Component({
  selector: 'div[scThemeField], label[scThemeField]',
  providers: [{ provide: SC_FIELD, useExisting: ScThemeField }],
  host: {
    '[attr.role]': 'role()',
    'data-slot': 'theme-field',
    '[class]': 'class()',
  },
  template: `
    <ng-content />
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScThemeField {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly id = input(inject(_IdGenerator).getId('sc-theme-field-'));
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly role = computed(() => {
    const tagName = this.elementRef.nativeElement.tagName;
    return tagName === 'LABEL' ? null : 'group';
  });

  protected readonly class = computed(() => cn('space-y-2', this.classInput()));
}
