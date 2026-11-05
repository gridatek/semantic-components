import type { ScQuestionnaireStyles } from '@semantic-components/presets';

// shadcn's questionnaire in maia (shadcn-reference/presets/maia/questionnaire.tsx).
// Its data-checked / data-disabled are our :has(>input:checked / :disabled);
// the check icon is yours, in the indicator ([&>svg]:).
export const questionnaire: ScQuestionnaireStyles = {
  root: 'flex w-full min-w-0 flex-col gap-6',
  progress:
    'min-h-[1lh] w-fit min-w-[14ch] text-xs font-medium text-muted-foreground tabular-nums',
  item: 'flex min-w-0 flex-col gap-5 border-0 p-0 outline-none',
  title:
    'font-heading text-base font-semibold text-pretty [&:not(:has(~[data-slot=questionnaire-description]))]:mb-5',
  description: 'text-sm text-pretty text-muted-foreground',
  choices: 'group/questionnaire-choices grid min-w-0 gap-3',
  choice:
    'group/questionnaire-choice relative flex min-h-11 cursor-pointer items-start gap-3 rounded-4xl border border-input px-4 py-3.5 text-start text-sm transition-colors outline-none select-none hover:bg-input/40 has-[>input:focus-visible]:border-ring has-[>input:focus-visible]:ring-[3px] has-[>input:focus-visible]:ring-ring/50 data-invalid:border-destructive has-[>input:checked]:border-primary/40 has-[>input:checked]:bg-primary/10 has-[>input:disabled]:pointer-events-none has-[>input:disabled]:cursor-not-allowed has-[>input:disabled]:opacity-50',
  indicator:
    'pointer-events-none relative flex size-4 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-[6px] border border-input group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 group-data-[type=radio]/questionnaire-choice:rounded-full group-has-[>input:checked]/questionnaire-choice:border-primary group-has-[>input:checked]/questionnaire-choice:bg-primary group-has-[>input:checked]/questionnaire-choice:text-primary-foreground dark:bg-input/30 dark:group-has-[>input:checked]/questionnaire-choice:bg-primary [&>svg]:hidden [&>svg]:size-3.5 group-has-[>input:checked]/questionnaire-choice:[&>svg]:block',
  indicatorDot:
    'hidden size-2 rounded-full bg-primary-foreground group-has-[>input:checked]/questionnaire-choice:block',
  choiceLabel: 'flex min-w-0 flex-1 flex-col gap-1 leading-snug',
  shortcut:
    'pointer-events-none ms-auto size-5 shrink-0 translate-y-[--spacing(0.45)] items-center justify-center rounded-full border border-input bg-background/80 font-mono text-[0.625rem] leading-none font-medium text-muted-foreground group-has-data-[slot=questionnaire-choice-description]/questionnaire-choice:translate-y-0.5 inline-flex',
  error: 'mt-2 text-sm text-destructive',
  actions:
    'grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 sm:min-h-9',
};
