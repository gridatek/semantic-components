# Signal Forms Control Integration — Open Work

Status: **not decided.** This records what is true today and what the options
are, so the decision can be made deliberately rather than one component at a
time.

Nothing here is broken. Both patterns below work. The issue is that we have two
of them, and one component has neither.

## The contract

`FormUiControl` (in `@angular/forms/signals`) declares these as **optional
inputs that the `Field` directive binds automatically**:

```ts
readonly disabled?:  InputSignal<boolean> | InputSignalWithTransform<boolean, unknown>;
readonly invalid?:   InputSignal<boolean> | InputSignalWithTransform<boolean, unknown>;
readonly touched?:   InputSignal<boolean> | InputSignalWithTransform<boolean, unknown>;
readonly errors?:    InputSignal<readonly ValidationError.WithOptionalFieldTree[]> | …;
readonly disabledReasons?: …;
```

The state is **pushed into** the control. A control does not need to look
anything up.

## Where we are

| Pattern                                                          | Components                                                   |
| ---------------------------------------------------------------- | ------------------------------------------------------------ |
| **Push** — declares `invalid` / `touched` / `disabled` as inputs | `checkbox`, `switch`                                         |
| **Pull** — `inject(FormField)` + `computed`                      | `input`, `textarea`, `password-input`, `password-toggle`     |
| **Pull via `SC_FIELD`**                                          | `field-errors` (reads `field.formField()?.state().errors()`) |
| **Neither**                                                      | `radio` / `radio-group`                                      |

Push arrived with #1515 and #1516. Pull predates it.

### Why pull works

`inject(FormField, { optional: true })` resolves because `[formField]` is always
applied to the _same element_ as the control directive, so both directives share
an injector. Read `formField?.state().invalid()` and you get the state.

It is not wrong. It just depends on `FormField` being an injectable directive
class, which is an implementation detail, and it only works for the
same-element case.

### Why push is preferable

- It is the documented contract; the framework is designed to drive it.
- No dependency on where `FormField` sits, or on it being injectable at all.
- Works with anything that binds those inputs, not only the `Field` directive.
- It is less code. The push version of checkbox/switch came out smaller than the
  pull version I wrote first.

## TODO

- [ ] **Decide** whether to unify on push, leave the split, or unify on pull.
- [ ] **Write tests for the four pull components first.** None of `input`,
      `textarea`, `password-input` or `password-toggle` has any test for invalid
      or disabled behaviour. Tests should be written against the _current_
      implementation and pass, so that a later refactor is proven
      behaviour-preserving rather than merely proven to run.
      Model them on `apps/showcase/src/app/form-control-invalid.spec.ts`.
- [ ] **Convert the four to push**, if that is the decision. Each needs
      `invalid`/`touched`/`disabled` as inputs, the `FormField` injection
      removed, and `aria-invalid` gated on `touched` (see below).
- [ ] **Give `radio` a Signal Forms integration.** `ScRadio` and `ScRadioGroup`
      have no `FormField`, no value binding, and implement no control contract,
      so a radio group cannot participate in a form at all. This is a feature
      gap, not a refactor, and it is why radio was excluded from #1515 and
      #1516. Likely wants `FormValueControl` on the group rather than the item.
- [ ] **Decide about `errors` and `disabledReasons`.** No component declares
      either as an input. `ScFieldErrors` uses a third variant: it pulls through
      the `SC_FIELD` context rather than injecting `FormField` directly —
      `field.formField()?.state().errors()`, already gated on
      `touched() && invalid()`. So the split is really three ways, not two.
      Worth deciding whether that one stays as-is; reading from the field
      context is arguably right for a component that renders _the field's_
      errors rather than its own.

## Gotchas to carry into the work

**`aria-invalid` must be gated on `touched`.** Otherwise a pristine form renders
every required field as invalid before the user has touched anything. All the
current implementations do `touched() && invalid()`; keep that.

**Declaring an input named `disabled` changes what `[disabled]` binds.** Without
such an input, Angular binds the native DOM property. With one, it binds the
directive input, and the host must re-apply it (`'[attr.disabled]':
'disabled() || null'`). This is exactly why the checkbox bug in #1516 was
invisible from the control and only showed on the field.

**Test hosts need signals.** `OnPush` is the default in v22, so mutating a plain
property on a test host and calling `detectChanges()` does not re-render. Use
`signal()` in the host and `.set()` in the test.

**Assert where the behaviour actually differs.** The first version of the #1516
tests asserted on the native input and passed against both the old and new
implementations, because Angular was already binding the DOM property. The
difference only showed on the field's `data-disabled`.

## Related

- [signal-forms-migration.md](signal-forms-migration.md)
- [sc-field-signal-forms.md](sc-field-signal-forms.md)
- PRs: #1515 (aria-invalid), #1516 (disabled)
