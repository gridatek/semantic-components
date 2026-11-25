# Draft issues for angular/angular (`@angular/aria`)

Ready to paste into https://github.com/angular/angular/issues/new?template=1-bug-report.yaml. Found while building on `@angular/aria` 22.2.1; each one is worked around in this repo (see `aria-followups.md`).

---

## 1. aria/combobox: keys pressed within the same frame are coalesced — only the last one reaches the popup

**Which @angular/\* package(s) are the source of the bug?** aria

**Is this a regression?** No

**Description**

`ComboboxPattern` stores each relayed keydown in a signal (`keyboardEventRelay`) and dispatches it to the popup from an `afterRenderEffect` (`keyboardEventRelayEffect`). If several keys arrive before the next render, the signal is overwritten and only the last event is relayed.

Visible with fast input: scripted typing, barcode scanners, or quick type-ahead. E.g. opening a select-like combobox and typing `tr` immediately: the `t` is dropped and type-ahead matches on `r`. Pressing `ArrowDown` twice in the same task moves the active option once.

**Minimal reproduction**

```html
<div ngCombobox #cb="ngCombobox" tabindex="0">Pick</div>
<ng-template ngComboboxPopup [combobox]="cb" popupType="listbox">
  <div ngComboboxWidget ngListbox #lb="ngListbox" focusMode="activedescendant" [activeDescendant]="lb.activeDescendant()">
    <div ngOption value="a">Apple</div>
    <div ngOption value="b">Banana</div>
    <div ngOption value="c">Cherry</div>
  </div>
</ng-template>
```

```ts
// With the popup open and focus on the trigger:
const el = document.querySelector('[ngCombobox]')!;
el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
el.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
// Expected: active option moved twice. Actual: moved once.
```

**Expected:** every relayed key is applied, in order.
**Actual:** only the last key per render is applied.

**Suggestion:** relay synchronously in the keydown handler, or queue events (e.g. an array drained by the effect) instead of keeping only the latest.

**Version:** @angular/aria 22.2.1, Chromium.

---

## 2. aria/menu: MenuBar has no Escape handling for a menu opened from the bar

**Which @angular/\* package(s) are the source of the bug?** aria

**Is this a regression?** No

**Description**

When a submenu is opened by clicking a menubar item, focus stays on the bar item. Pressing Escape there does nothing: `MenuBarPattern`'s keydown manager has no `Escape` binding (Escape inside the menu works, via `MenuPattern.closeAll`). The WAI-ARIA menubar pattern expects Escape to close the open menu.

**Minimal reproduction**

```html
<div ngMenuBar>
  <div ngMenuItem value="file" [submenu]="file">File</div>
</div>
<div ngMenu #file="ngMenu">
  <ng-template ngMenuContent>
    <div ngMenuItem value="new">New</div>
  </ng-template>
</div>
```

Click "File" (menu opens, focus on the bar item), press Escape.

**Expected:** the menu closes, focus stays on "File".
**Actual:** the menu stays open.

**Suggestion:** add `.on('Escape', () => this.close())` (or close the active item's submenu) to `MenuBarPattern.keydownManager`.

**Version:** @angular/aria 22.2.1.

---

## 3. aria/menu: Tab does not close the menu; in a menubar focus is pulled back to the bar item

**Which @angular/\* package(s) are the source of the bug?** aria

**Is this a regression?** No

**Description**

`MenuPattern` has no Tab handling. The WAI-ARIA menu button / menubar patterns expect Tab to close the menu(s) and move focus to the next element after the trigger (or the menubar).

- Menu button: when the menu popover sits before its trigger in the DOM (e.g. CDK overlay, inline popover), Tab moves focus to the trigger; `onFocusOut` sees focus landing on the parent and keeps the menu open.
- Menubar: closing the menu refocuses the bar item asynchronously, after the browser's default Tab action, so focus ends up back on the bar item instead of leaving the menubar.

**Minimal reproduction**

Menu button with the menu in a CDK connected overlay (`usePopover: 'inline'`); open it, press Tab.
Menubar as in issue 2; open "File" with ArrowDown, press Tab (with a focusable element after the menubar).

**Expected:** menu(s) close; focus moves past the trigger / menubar.
**Actual:** menu stays open (menu button), or focus returns to the bar item (menubar).

**Suggestion:** handle Tab in `MenuPattern`: close the whole chain (`closeAll`) without refocusing and let the default Tab proceed from the top-level trigger / menubar.

**Version:** @angular/aria 22.2.1.
