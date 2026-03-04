# Native Dialog

A modal dialog built on the native HTML `<dialog>` element with built-in backdrop, focus trapping, and keyboard handling.

## Why Native Dialog?

Unlike `ScDialog` (which uses CDK Overlay), `ScNativeDialog` leverages the browser's native `<dialog>` element. This provides:

- **Native modal behavior** - `showModal()` / `close()` managed by the browser
- **Built-in backdrop** - `::backdrop` pseudo-element, no custom overlay needed
- **Built-in focus trapping** - The browser traps focus inside the modal
- **Built-in Escape key** - Native `close` event handles Escape dismissal
- **Lazy content** - Dialog content is only rendered when open via `ng-template`
- **No CDK dependency** - No Overlay, Portal, or FocusTrap modules required

## Components

- `ScNativeDialogProvider` - Wrapper that manages the `open` state
- `ScNativeDialogTrigger` - Button directive that opens the dialog
- `ScNativeDialog` - Component on `<dialog>` that controls the native element
- `ScNativeDialogContent` - Directive on `ng-template` for lazy content rendering
- `ScNativeDialogClose` - Button directive that closes the dialog
- `ScNativeDialogHeader` - Layout directive for the header section
- `ScNativeDialogTitle` - Title directive with aria-labelledby binding
- `ScNativeDialogDescription` - Description directive with aria-describedby binding
- `ScNativeDialogFooter` - Layout directive for the footer section

## Usage

```html
<div scNativeDialogProvider [(open)]="isOpen">
  <button scNativeDialogTrigger scButton variant="outline">Open Dialog</button>

  <dialog scNativeDialog class="sm:max-w-sm">
    <ng-template scNativeDialogContent>
      <button scNativeDialogClose>
        <svg siXIcon class="size-4"></svg>
        <span class="sr-only">Close</span>
      </button>
      <div scNativeDialogHeader>
        <h2 scNativeDialogTitle>Edit profile</h2>
        <p scNativeDialogDescription>Make changes to your profile here.</p>
      </div>
      <!-- content -->
      <div scNativeDialogFooter>
        <button scButton variant="outline" (click)="isOpen.set(false)">Cancel</button>
        <button scButton (click)="isOpen.set(false)">Save changes</button>
      </div>
    </ng-template>
  </dialog>
</div>
```

## Comparison with ScDialog

| Feature        | ScDialog               | ScNativeDialog           |
| -------------- | ---------------------- | ------------------------ |
| Element        | `<div>` + CDK Overlay  | Native `<dialog>`        |
| Backdrop       | Custom `ScBackdrop`    | Native `::backdrop`      |
| Focus trapping | `CdkTrapFocus`         | Browser built-in         |
| Escape key     | CDK keydown events     | Native `close` event     |
| Lazy content   | `ng-template` + Portal | `ng-template` + `@if`    |
| Animations     | CSS data-attribute     | CSS (user-defined)       |
| CDK dependency | Yes                    | No (only `_IdGenerator`) |
| Portal         | `ScDialogPortal`       | `ScNativeDialogContent`  |

## Accessibility

- Native `<dialog>` provides built-in `dialog` role when opened with `showModal()`
- `aria-labelledby` bound to `ScNativeDialogTitle` id
- `aria-describedby` bound to `ScNativeDialogDescription` id
- Focus is automatically trapped inside the modal by the browser
- Escape key closes the dialog via the native `close` event
- Backdrop click dismisses the dialog
- `ScNativeDialogClose` has screen-reader-only label support
