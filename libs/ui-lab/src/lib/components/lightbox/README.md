# Lightbox

Your gallery of links, opened in the native dialog — the thumbnail growing into the photo — with zoom, pan, swipes and the keys.

## Architecture

```
[scLightbox] (open, index — two-way; loop)
│  items() · current() · zoom() · pan() · loading() · morphing()
├── a[scLightboxTrigger]        — your link to the full image, around its thumbnail img
└── dialog[scLightboxDialog]    — your native dialog, opened modal; name it
    ├── img[scLightboxImage]    — the current image: zoom, pan, swipe
    ├── buttons: Close, Previous, Next, ZoomIn, ZoomOut, ZoomReset
    └── button[scLightboxThumbnail]="i" — your strip, from items()
```

## Usage

```html
<div scLightbox #lightbox="scLightbox">
  @for (photo of photos; track photo.name) {
  <a scLightboxTrigger [href]="photo.full">
    <img [src]="photo.thumbnail" [alt]="photo.alt" />
  </a>
  }

  <dialog scLightboxDialog aria-label="Photo viewer">
    <p aria-live="polite">{{ lightbox.index() + 1 }} of {{ lightbox.items().length }}</p>
    <button scLightboxClose><svg siXIcon></svg><span class="sr-only">Close</span></button>
    <img scLightboxImage [alt]="lightbox.current()?.alt" />
    <button scLightboxPrevious><svg siChevronLeftIcon></svg><span class="sr-only">Previous image</span></button>
    <button scLightboxNext><svg siChevronRightIcon></svg><span class="sr-only">Next image</span></button>
    <p>{{ photos[lightbox.index()].caption }}</p>
  </dialog>
</div>
```

## Items

Each trigger is an item: its `href` is the full image, its `img` gives the `alt` and the thumbnail. Without the lightbox — or with Ctrl, ⌘ or Shift — it is a link still. Your data for an item is yours, at `lightbox.index()` (captions, credits).

## The viewer

- A native `dialog`, opened modal: the page behind is inert, Escape closes it.
- Opening, the thumbnail morphs into the image (View Transitions) — not under reduced motion; closing, back into the thumbnail of the photo shown, which gets the focus. `data-morphing` while it does.
- The image: zoom with the wheel, a double-click or a pinch — where you point; drag to pan, zoomed; swipe sideways to change, down to close. The neighbours are fetched before they are asked for; `data-loading` while one loads.
- Keys: ← → Home End, + − 0, Escape.
- `loop` (on): past the last, the first — off, Previous and Next are disabled at the ends.

## Accessibility

- Name the dialog; write the image's alt — the thumbnail's is `lightbox.current()?.alt`.
- Say where it is in a polite live region ("3 of 8"), from `index()`.
- Name every button; the thumbnails are named by their image's alt.

## Not here

Video, a slideshow, fullscreen, the URL following the photo.
