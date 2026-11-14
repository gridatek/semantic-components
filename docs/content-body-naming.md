# Provider, Content and Body: naming the parts around a component

The rule (the user, 2026-11-13), and every part it touches. The parts get fixed one at a time; tick each one when it's done.

## The rule

```
XProvider          the parent of X: holds the state, unstyled (display: contents)
└─ X               the component itself
   └─ XContent     the whole content of X: an ng-template, or X's direct child
      ├─ XHeader   a section
      ├─ XBody     a section
      └─ XFooter   a section

X
├─ (a control, an icon, an avatar…)
└─ XContentWrapper  some of X's children grouped beside another part
```

- **XProvider**, not XContainer: the parent holds the state and gives it to the parts inside (open or not, the side, the ids that tie a trigger to its popup), and is ignored by the content's CSS (`display: contents`). "Container" suggests a styled box. A **Container** is a real box (`ScTableContainer`: the scroll box).
- **XContent** is everything inside X, in one of two forms (for now):
  - an `ng-template`, when the content is rendered later (a menu once it opens, a panel once it expands);
  - X's direct child, an element holding the whole content.
- **Header, Body, Footer** are the sections inside the content. The main section is **Body**, never Content.
- A nested part names its content after itself: a panel's template is `XPanelContent`, not `XContent`.
- **XContentWrapper** (the user, 2026-11-14) groups some of X's children — not all of them — beside another part: a field's title and description beside its checkbox. It has no meaning of its own (no role), only layout. Other libraries name this element the same two ways: Content (shadcn's `FieldContent`, Chakra's `CheckboxCard.Content`) and Wrapper (Mantine's `labelWrapper`: "contains label, description and error"; Nuxt UI's `wrapper` slot); Headless UI and Base UI have none. `ContentWrapper` keeps shadcn's word and says it is a wrapper, not the whole content.

This replaces the older rule in [component-design-principles.md](component-design-principles.md) ("`Content`: only for content rendered later"), which is to be rewritten from this one once the cases are settled.

## Already following it

| Part                                                                                                                                                                                                                              | Form                                    |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| Providers: `ScAlertDialogProvider`, `ScDialogProvider`, `ScDrawerProvider`, `ScMenuProvider`, `ScNativeDialogProvider`, `ScPopoverProvider`, `ScPreviewCardProvider`, `ScSheetProvider`, `ScSidebarProvider`, `ScTooltipProvider` | State, `display: contents`              |
| Containers: `ScTableContainer`, `ScNativeSelectContainer`                                                                                                                                                                         | Styled boxes, not parents to ignore     |
| `ScMenuContent`, `ScMarqueeContent`, `ScComboboxListContent`, `ScNativeDialogContent`                                                                                                                                             | `ng-template` holding the whole content |
| `ScNavigationMenuContent`, `ScMessageScrollerContent`                                                                                                                                                                             | Direct child holding the whole content  |
| `ScEmptyBody`, `ScItemBody`, `ScNativeDialogBody`                                                                                                                                                                                 | Sections named Body                     |
| `ScFieldContentWrapper` (was `ScFieldBody`, 2026-11-14)                                                                                                                                                                           | Some children grouped beside a control  |
| `ScTableBody`                                                                                                                                                                                                                     | HTML's own name (`tbody`)               |

Native Dialog shows the whole shape: `scNativeDialogProvider` → `dialog[scNativeDialog]` → `ng-template[scNativeDialogContent]` → Header / Body / Footer.

## To fix

### 1. A section between a header and a footer → Body

- [x] `ScCardContent` → `ScCardBody` (`div[scCardContent]`). shadcn names it CardContent; we differ, and say why in the README.
- [ ] `ScSidebarContent` → `ScSidebarBody` (`div[scSidebarContent], nav[scSidebarContent]`): the scrolling middle, between the Sidebar's header and footer.
- [ ] `ScSidebarGroupContent` → `ScSidebarGroupBody`? (`div[scSidebarGroupContent]`): the group's menu, under its label. A closer call: the label is a header only loosely.

### 2. A nested part's content → named after that part

- [x] `ScAccordionContent` → `ScAccordionPanelContent` (`ng-template`, inside `scAccordionPanel`).
- [x] `ScTabsContent` → `ScTabsPanelContent` (`ng-template`, inside `scTabsPanel`).
- [x] `ScTraceCollapsibleContent` → `ScTraceCollapsiblePanelContent` (`div`, a step's details inside `scCollapsiblePanel`; its own element because the panel's height animates — shadcn's inner div).
- [x] `ScScrollAreaNextContent` → `ScScrollAreaNextViewportContent` (`div`, what scrolls inside `scScrollAreaNextViewport`).

### 3. Beside something else (an icon, an avatar, actions) → Body, or ContentWrapper?

Not the whole content of X: the main section, beside another part. Check each one before renaming — those that only group children beside another part may become `XContentWrapper`, as the Field's did.

- [ ] `ScAttachmentContent` (`div`): title and description, between `scAttachmentMedia` and `scAttachmentActions`.
- [ ] `ScBubbleContent` (`div`, `button`, `a`): the bubble's text in its look, beside `scBubbleReactions`.
- [ ] `ScMarkerContent` (`span`): the text, beside `scMarkerIcon`.
- [ ] `ScMessageContent` (`div`): header and bubbles, beside `scMessageAvatar`.
- [ ] `ScNotificationContent` (`div`): title, description, time, beside its icon.
- [ ] `ScTimelineContent` (`[scTimelineContent]`): an event's text, beside `scTimelineMarker`.

## For each rename

- The class, the selector, the file name (`card-body.ts`), its export in `index.ts`.
- Templates in the apps (showcase, blocks), the README, the API reference on the docs page, [why-semantic-components.md](why-semantic-components.md); then `node scripts/sync-demo-code.mjs`.
- The preset key, when the part has one (a `content` key becomes `body`, in the eight presets and the blocks copy).
- No alias for the old name (pre-release).
