# `ɵ`: The Library's Own API

Some code is shared between parts of the library but is not for apps: a helper several components call (`ɵregisterFieldControl()`, `ɵkeepDigitOrder()`, `ɵweekStart()`), or a member one part reads on another (`ScFileInput.ɵtriggerId`, `ScSegmentedInput.ɵfirstPartId`). TypeScript can't keep these private, because another class or another entry point reads them. They start with `ɵ`, as Angular's own private exports do (`ɵɵdefineComponent`, `ɵSharedStylesHost`).

## What `ɵ` says

- **Not for apps.** It may change or go in any release, with no notice and no changelog entry.
- **Shared inside the library.** Parts, entry points (`ui/editor`, `ui/charts`…) and the library's own tests may use it. The showcase and the other apps should not, except to test the library.
- **Exported because it must be.** A part in another file or another entry point can only reach what is exported or public.

## When to use it

| What                                                                           | Name                                   |
| ------------------------------------------------------------------------------ | -------------------------------------- |
| An app uses it: inputs, outputs, models, the `exportAs` API, services, helpers | plain (`open()`, `injectFormatDate()`) |
| Only this class reads it                                                       | plain, TS `private`                    |
| A subclass reads it                                                            | plain, `protected`                     |
| Another part or entry point of the library reads it, apps shouldn't            | **`ɵ`**, public or exported            |

The visibility rule in [.claude/CLAUDE.md](../../.claude/CLAUDE.md) still applies: a member is `private` unless something outside the class reads it. `ɵ` is for what is public only for the library's own sake. It never goes on a private member.

## Templates can't read it

Angular's template and host-binding expressions don't accept `ɵ` in a name. `[attr.aria-labelledby]="ɵtriggerId()"` fails to compile (`Lexer Error: Unexpected character [ɵ]`). Give the template a private name of its own:

```ts
/** That trigger's id: what names the hidden picker. */
readonly ɵtriggerId = signal<string | null>(null);
private readonly pickerLabelledBy = this.ɵtriggerId.asReadonly();
```

```html
<input type="file" [attr.aria-labelledby]="pickerLabelledBy()" />
```

Or a `computed()` that reads it (`ScDateTimeSegment.id`, from `owner.ɵfirstPart()`).

## Today

The convention is used in many places, but not everywhere:

- 82 `ɵ` names across 139 files in `packages`: helpers (`ɵwarnIfUnnamed`, `ɵkeepDigitOrder`, `ɵregisterFieldControl`) and members (`ɵtrigger`, `ɵset`, `ɵcommit`, `ɵeditor`…).
- About 20 members marked `/** @internal */` instead, with a plain name.
- Members that only sibling parts read but have plain, public names, so nothing tells an app to stay away from them.

Making this consistent is on the [to do list](../todo.md).
