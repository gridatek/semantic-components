# Signal Forms Control Integration

Status: **decided — push.** All form controls declare `invalid`, `touched` and
`disabled` as inputs and let the `Field` directive bind them.

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

| Pattern                                                          | Components                                                        |
| ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Push** — declares `invalid` / `touched` / `disabled` as inputs | `checkbox`, `switch`, `input`, `textarea`, `password-input`       |
| **Push, partial** — `invalid` / `touched` only                   | `radio` (see below)                                               |
| **Container** — queries the field with `contentChild(FormField)` | `field`, `password-provider`; `field-errors` reads via `SC_FIELD` |

### Radio is a special case

`ScRadio` implements no control contract, and for a long time I assumed that
meant a radio group could not participate in a form. **That was wrong.** A
native `<input type="radio">` with `[formField]` is handled by Signal Forms'
built-in native-input support: value, checked reflection and disabled all work
with no contract on our side. `apps/showcase/src/app/radio-form.spec.ts` pins
this down.

The one thing that support does _not_ provide is `aria-invalid`, so `ScRadio`
declares `invalid` and `touched` as inputs purely to surface that. It has no
`value` model of its own and does not need one.

Push arrived with #1515 and #1516; the remaining controls followed. No control
injects `FormField` any more. `ScPasswordProvider` is the one place that still
reaches for it, and it queries rather than injects — see "Controls versus
containers" below.

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

## Decisions

- [x] **Decide** whether to unify on push, leave the split, or unify on pull.
      Push, chiefly for testability: a pushed control can be exercised by
      setting an input, where a pulling one needs a real `form()` and a
      `markAsTouched()` call. Also because a consumer can then drive `invalid`
      from outside Signal Forms — server errors, a wizard step — which pull
      forbids outright (`Can't bind to 'invalid'`).
- [x] **Write tests for the pull components first**, against the then-current
      implementation, so the refactor could be shown to preserve behaviour.
      See `apps/showcase/src/app/text-control-form-state.spec.ts`.
- [x] **Convert them to push.** `input`, `textarea` and `password-input` now
      declare the inputs; no component injects `FormField`.
- [x] **Publish the password field state to `ScPasswordToggle`.** The toggle is
      a button beside the input, so the field on the input is neither in its
      injector chain nor injectable from the provider above it — injection only
      walks up, never down. `ScPasswordProvider` therefore _queries_ it with
      `contentChild(FormField)` and exposes `disabled`; the toggle ORs that with
      its own `disabled` input. Before this, the toggle's `disabled` was
      permanently `false`.
- [x] **Give `radio` a Signal Forms integration.** It turned out to have one
      already, via native-input support — see the radio section above. The only
      genuine gap was `aria-invalid`, now surfaced through `invalid`/`touched`
      inputs. No `FormValueControl` on the group is needed, which is what I had
      expected to write.
- [x] **Decide about `errors` and `disabledReasons`.** Leave them as they are.
      See "Controls versus containers" below — `ScFieldErrors` is not a third,
      inconsistent pattern, it is the container one.

## Controls versus containers

Two roles, and they need different mechanisms.

**Controls** declare inputs and let the `Field` directive push state in. This is
everything in the first two rows of the table above.

**Containers** query downward with `contentChild(FormField)`, because the field
lives on a descendant and injection only walks up. `ScField` does this,
`ScPasswordProvider` does it since #1519, and `ScFieldErrors` reads the result
through `SC_FIELD`.

Declaring `errors` as an input on `ScFieldErrors` would be **dead code**: it is
not a form control, nothing binds `[formField]` to it, so the `Field` directive
would never populate the input. That is the same trap the password toggle's
`disabled` fell into.

`apps/showcase/src/app/field-errors.spec.ts` pins this down, including a control
nested inside an input group rather than sitting as a direct child — the case
where a downward query could plausibly miss.

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
