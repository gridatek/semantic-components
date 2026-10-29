import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils';
import { ScQuestionnaire } from './questionnaire';

/**
 * Where the reader is: a progressbar — name it (`aria-label`) and write its
 * text ("Question {{ q.current() }} of {{ q.total() }}"), which screen
 * readers hear as its value, politely, as it changes.
 */
@Directive({
  selector: 'div[scQuestionnaireProgress]',
  host: {
    'data-slot': 'questionnaire-progress',
    role: 'progressbar',
    'aria-live': 'polite',
    '[attr.aria-valuemin]': 'questionnaire.total() ? 1 : null',
    '[attr.aria-valuemax]': 'questionnaire.total() || null',
    '[attr.aria-valuenow]':
      'questionnaire.total() ? questionnaire.current() : null',
    '[class]': 'class()',
  },
})
export class ScQuestionnaireProgress {
  protected readonly questionnaire = inject(ScQuestionnaire);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground min-h-[1lh] w-fit min-w-[14ch] text-xs font-medium tabular-nums',
      this.classInput(),
    ),
  );

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    // Its value as words: your text, once drawn.
    afterRenderEffect({
      write: () => {
        this.questionnaire.current();
        const text = element.textContent?.trim();
        if (text) element.setAttribute('aria-valuetext', text);
        else element.removeAttribute('aria-valuetext');
      },
    });
  }
}
