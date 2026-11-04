# Aspect Ratio

Keeps its content to a ratio of width to height — a photo, a video, a map — whatever its width.

## Usage

```html
<div scAspectRatio [ratio]="16 / 9" class="bg-muted w-full max-w-sm rounded-lg">
  <img ngSrc="/photo.jpg" fill alt="A forest path" class="rounded-lg object-cover" />
</div>
```

## Notes

- Its width is yours — a class (`w-full max-w-sm`) or its parent's; the height follows. (It used to be `w-full` by itself; shadcn's isn't, and neither is ours now.)
- The ratio goes through a CSS variable, `--ratio`, read by `aspect-(--ratio)` — as shadcn's — not an inline `aspect-ratio` style: a class can still change it, by breakpoint (`max-sm:aspect-square`).
- It is `relative`: what fills it can be placed inside it (an image with `fill`, a video with `size-full`).
- The same in every shadcn style: no preset.

## API reference

### ScAspectRatio — `[scAspectRatio]`

| Input   | Type     | Default | Description                                                   |
| ------- | -------- | ------- | ------------------------------------------------------------- |
| `ratio` | `number` | `1`     | Width over height: `16 / 9`, `1`, `9 / 16`. Set as `--ratio`. |
| `class` | `string` | `''`    | Merged over its own — its width, or a ratio by breakpoint.    |
