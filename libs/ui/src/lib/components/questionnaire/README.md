# Questionnaire

Questions one at a time, as [shadcn/ui's Questionnaire](https://ui.shadcn.com/docs/components/questionnaire) — on your `<form>` and its Signal Form:

- each question is a `<fieldset>` bound to its answer's field (`[field]="survey.goal"`): **required**, **valid** — as your schema says;
- **Next** checks the question first: wrong, its error shows and its answer takes the focus; right, the next question is shown and focused;
- **Skip** passes a question the schema doesn't require; **Submit**, on the last one, runs your form's submission — or goes back to a question left wrong;
- choices are **cards** around native radios (one answer) or checkboxes (several), bound with `[formField]`; letters or numbers can pick them.

## Usage

```html
<form scQuestionnaire [formRoot]="survey" #questionnaire="scQuestionnaire">
  <div scQuestionnaireProgress aria-label="Progress">Question {{ questionnaire.current() }} of {{ questionnaire.total() }}</div>

  <fieldset scQuestionnaireItem name="goal" [field]="survey.goal">
    <legend scQuestionnaireTitle>What should we work on first?</legend>
    <p scQuestionnaireDescription>Pick the one that matters most this week.</p>
    <div scQuestionnaireChoices>
      <label scQuestionnaireChoice>
        <input type="radio" scQuestionnaireChoiceInput value="tests" [formField]="survey.goal" />
        <span scQuestionnaireChoiceIndicator></span>
        <span scQuestionnaireChoiceLabel>
          Add tests
          <span scQuestionnaireChoiceDescription>Cover the parts that broke last month.</span>
        </span>
        <kbd scQuestionnaireChoiceShortcut></kbd>
      </label>
      …
    </div>
    <p scQuestionnaireError>Choose an answer to continue.</p>
  </fieldset>
  …

  <div scQuestionnaireActions>
    <button scQuestionnairePrevious>Previous</button>
    <button scQuestionnaireSkip>Skip</button>
    <button scQuestionnaireNext>Next</button>
    <button scQuestionnaireSubmit>Submit</button>
  </div>
</form>
```

```ts
readonly survey = form(
  signal({ goal: '', scope: '' }),
  (s) => {
    required(s.goal);
    required(s.scope);
  },
  { submission: { action: async (survey) => save(survey().value()) } },
);
```

Several answers: checkboxes, each bound to a boolean (`survey.sources.docs`), the question to their group (`[field]="survey.sources"`) — with your check icon in the indicator (`<span scQuestionnaireChoiceIndicator><svg siCheckIcon></svg></span>`). A free answer: your `scInput` or `scTextarea` with `[formField]`, named (`aria-label`, or a label) — a placeholder isn't a name.

## Parts

| Part                                                  | What it does                                                                                                                                                                                                               |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `form[scQuestionnaire]`                               | `item` (two-way: the question shown, by `name`; the first until set), `shortcuts` (`letters` \| `numbers`). Through `exportAs`: `current()`, `total()`, `first()`, `last()`, `previous()`, `next()`, `skip()`, `advance()` |
| `div[scQuestionnaireProgress]`                        | A progressbar: name it, write its text — its value for screen readers                                                                                                                                                      |
| `fieldset[scQuestionnaireItem]`                       | `name`, `field` (the answer's field). Shown when it is the `item`; hidden and inert when not                                                                                                                               |
| `legend[scQuestionnaireTitle]`                        | The question                                                                                                                                                                                                               |
| `p[scQuestionnaireDescription]`                       | Read with the question                                                                                                                                                                                                     |
| `div[scQuestionnaireChoices]`                         | The choices, in a column                                                                                                                                                                                                   |
| `label[scQuestionnaireChoice]`                        | A choice's card — the whole card picks it                                                                                                                                                                                  |
| `input[scQuestionnaireChoiceInput]`                   | `type="radio"` or `"checkbox"`, with your `[formField]` (and a radio's `value`): over the card, unseen                                                                                                                     |
| `span[scQuestionnaireChoiceIndicator]`                | A radio's dot; a checkbox's tick — your icon inside                                                                                                                                                                        |
| `span[scQuestionnaireChoiceLabel]`                    | The choice's text                                                                                                                                                                                                          |
| `span[scQuestionnaireChoiceDescription]`              | More about it, under its text                                                                                                                                                                                              |
| `kbd[scQuestionnaireChoiceShortcut]`                  | Its key, written for you; hidden without `shortcuts`                                                                                                                                                                       |
| `p[scQuestionnaireError]`                             | Your words: shown and announced once the question is tried wrong                                                                                                                                                           |
| `div[scQuestionnaireActions]`                         | The buttons' row                                                                                                                                                                                                           |
| `button[scQuestionnairePrevious\|Skip\|Next\|Submit]` | `variant`, `size` (the preset's button). Each shows when it applies — Previous from the second question, Skip on an optional one, Next before the last, Submit on it                                                       |

## Keyboard and screen readers

- **Enter** on a chosen answer (or a filled text field) moves on — or submits on the last question; **Ctrl/⌘+Enter** from anywhere in the question.
- **↑/↓** between the answers (radios move on their own); **←/→** outside them: back, and forward once answered — mirrored in right-to-left.
- **Letters or numbers** (with `shortcuts`) pick a choice, outside text fields; its input says so (`aria-keyshortcuts`).
- Each question is a named group (`fieldset`, `legend`), its description and — when shown — its error read with it (`aria-describedby`); invalid, it and its choices say so (`aria-invalid`).
- Moving on focuses the new question; a wrong answer, the answer.

## Not shadcn's

- **Your Signal Form holds the answers**, its schema the rules (`required`, your validators) — not `required` on each question, nor a `FormData` on submit.
- **No default strings**: the progress text, the error, the buttons' text are yours.
- **Choices are your inputs**, bound with `[formField]`; free answers are your `scInput` / `scTextarea`, not a part of their own.
