# Avatar

A person's picture, with initials when there is none — alone, in a group, with a status badge. In the look of the app's preset.

## Usage

```html
<span scAvatar>
  <img scAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
  <span scAvatarFallback>CN</span>
</span>
```

## Anatomy

Every part is a directive on your element. The image and the fallback fill the avatar, the image on top.

```html
<div scAvatarGroup>
  <span scAvatar size="lg">
    <img scAvatarImage src="…" alt="…" />
    <span scAvatarFallback>…</span>
    <span scAvatarBadge></span>
  </span>
  <div scAvatarGroupCount>+3</div>
</div>
```

## Loading

As Base UI's avatar (its `keepMounted` way):

- The image is rendered at once and loads in place, so `loading="lazy"` and `NgOptimizedImage` work. Until it has loaded, and if it fails, it is invisible (`data-loading`, `data-error`) and the fallback shows through.
- Hidden with `visibility`, not `display: none`: an element with no box never enters the viewport, and a lazy image would never load.
- Rendered on the server, an image that loads before hydration is seen as loaded (`img.complete`) — its load event has gone by then.
- The state is in attributes (`data-image` on the avatar), not in classes: hydration updates attributes, and may leave a class behind.
- Loading, the image is not read: the fallback names the avatar. Give the image an `alt` for when it shows.

## API reference

Each part takes `class`, merged over the preset.

| Part                 | Selector                  | Description                                                                                             |
| -------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `ScAvatar`           | `span[scAvatar]`          | Round, with a thin outline. Input `size`: `'sm'`, `'default'`, `'lg'`. `data-image`: the image's state. |
| `ScAvatarImage`      | `img[scAvatarImage]`      | The picture, over the fallback; invisible while it loads and if it fails.                               |
| `ScAvatarFallback`   | `span[scAvatarFallback]`  | Initials or an icon: shown until the image has loaded, or with none.                                    |
| `ScAvatarBadge`      | `span[scAvatarBadge]`     | A dot in the corner (a status, your color), or a small icon; sized by the avatar.                       |
| `ScAvatarGroup`      | `div[scAvatarGroup]`      | Avatars overlapping, each ringed by the background; mirrored right to left.                             |
| `ScAvatarGroupCount` | `div[scAvatarGroupCount]` | How many more: text or an icon, sized by the group's avatars.                                           |

## Styles

shadcn's avatar is the same in every style but for the group count's text (`text-xs` in lyra and mira): that one is the preset's (`avatarGroupCount`).
